"use client";

import {
    createNote as fCreateNote,
    deleteNote as fDeleteNote,
    renameNote as fRenameNote,
    createFolder as fCreatefolder,
    deleteFolder as fDeleteFolder,
    renamefolder as fRenameFolder,
    FileNode,
    findChildrenByID,
    hasNote,
} from "@/app/actions";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuSub } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight, File, FilePlus2, FolderPlus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

export type ExplorerRef = {
    reload: () => void;
};

const treeCache = new Map<string, FileNode>();

export default function Explorer({
    id,
    openDialogInput,
    ref,
}: {
    id?: string;
    openDialogInput: (title: string, defaultValue?: string) => Promise<string | null>;
    ref?: React.RefObject<ExplorerRef | null>;
}) {
    const [fileTree, setFileTree] = useState<FileNode | null>(null);
    const [folderOpenState, setFolderOpenState] = useState<Record<string, boolean>>({});

    const pathNoteID = usePathname()
        .split("/")
        .filter((p) => p.length)
        .slice(2)[0];

    const childrenRefs = useRef<Map<string, React.RefObject<ExplorerRef | null>>>(new Map());

    const reloadTree = useCallback(() => {
        if (!id) throw new Error("ID is needed to build tree");

        findChildrenByID(id).then((data) => {
            treeCache.set(id, data);
            setFileTree(data);
        });
    }, [id]);

    useImperativeHandle(ref, () => ({ reload: reloadTree }), [reloadTree]);

    useEffect(() => {
        reloadTree();
    }, [id, reloadTree]);

    async function createNote(parentID: string) {
        const name = await openDialogInput("Dê um nome para esta nota");

        if (!name) {
            return;
        }

        setFolderOpenState((prev) => ({ ...prev, [parentID]: true }));

        const id = await fCreateNote(name, parentID);

        childrenRefs.current.get(parentID)?.current?.reload();

        redirect(`/app/notes/${id}?name=${name}`);
    }

    async function deleteNote(noteID: string) {
        await fDeleteNote(noteID);

        reloadTree();

        if (pathNoteID === noteID) {
            redirect(`/app/notes/`);
        }
    }

    async function renameNote(noteID: string, prevName: string) {
        const name = await openDialogInput("Dê um nome para esta nota", prevName);

        if (!name) {
            return;
        }

        await fRenameNote(noteID, name);

        reloadTree();

        if (pathNoteID === noteID) {
            redirect(`/app/notes/${noteID}?name=${name}`);
        }
    }

    async function createFolder(parentID: string) {
        const name = await openDialogInput("Dê um nome para esta pasta");

        if (!name) {
            return;
        }

        setFolderOpenState((prev) => ({ ...prev, [parentID]: true }));

        await fCreatefolder(name, parentID);

        childrenRefs.current.get(parentID)?.current?.reload();
    }

    async function deleteFolder(folderID: string) {
        await fDeleteFolder(folderID);

        reloadTree();

        if (!(await hasNote(pathNoteID))) {
            redirect("/app/notes");
        }
    }

    async function renameFolder(noteID: string, prevName: string) {
        const name = await openDialogInput("Dê um nome para esta pasta", prevName);

        if (!name) {
            return;
        }

        await fRenameFolder(noteID, name);

        reloadTree();
    }

    if (!id) {
        throw new Error("ID is needed to build tree");
    }

    return (
        <SidebarMenu>
            {(treeCache.get(id)?.children || fileTree?.children || []).map((f) => {
                if (f.type === "file") {
                    return (
                        <ContextMenu key={f._id}>
                            <ContextMenuTrigger asChild>
                                <Link href={`/app/notes/${f._id}?name=${f.name}`}>
                                    <SidebarMenuButton
                                        className={cn("hover:cursor-pointer", pathNoteID === f._id && "bg-gray-500/15")}
                                    >
                                        <File /> {f.name}
                                    </SidebarMenuButton>
                                </Link>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="flex min-w-fit">
                                <ContextMenuItem
                                    className="hover:cursor-pointer"
                                    onClick={() => renameNote(f._id, f.name)}
                                >
                                    <SquarePen />
                                </ContextMenuItem>
                                <ContextMenuItem className="hover:cursor-pointer" onClick={() => deleteNote(f._id)}>
                                    <Trash2 />
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    );
                }

                const ref = childrenRefs.current.get(f._id) || React.createRef<ExplorerRef>();
                childrenRefs.current.set(f._id, ref);

                return (
                    <Collapsible
                        key={f._id}
                        open={folderOpenState[f._id]}
                        onOpenChange={(s) => setFolderOpenState((prev) => ({ ...prev, [f._id]: s }))}
                    >
                        <ContextMenu>
                            <CollapsibleTrigger asChild>
                                <ContextMenuTrigger asChild>
                                    <SidebarMenuButton className="hover:cursor-pointer group/collapsible">
                                        <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />{" "}
                                        {f.name}
                                    </SidebarMenuButton>
                                </ContextMenuTrigger>
                            </CollapsibleTrigger>
                            <ContextMenuContent className="flex min-w-fit">
                                <ContextMenuItem className="hover:cursor-pointer" onClick={() => createNote(f._id)}>
                                    <FilePlus2 />
                                </ContextMenuItem>
                                <ContextMenuItem className="hover:cursor-pointer" onClick={() => createFolder(f._id)}>
                                    <FolderPlus />
                                </ContextMenuItem>
                                <ContextMenuItem
                                    className="hover:cursor-pointer"
                                    onClick={() => renameFolder(f._id, f.name)}
                                >
                                    <SquarePen />
                                </ContextMenuItem>
                                <ContextMenuItem className="hover:cursor-pointer" onClick={() => deleteFolder(f._id)}>
                                    <Trash2 />
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>

                        <CollapsibleContent>
                            <SidebarMenuSub className="mr-0 pr-0 min-w-[220px]">
                                <Explorer id={f._id} openDialogInput={openDialogInput} ref={ref} />
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </Collapsible>
                );
            })}
        </SidebarMenu>
    );
}

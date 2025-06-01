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
    findChildrenByPath,
} from "@/app/actions";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuSub } from "@/components/ui/sidebar";
import { ChevronRight, File, FilePlus2, FolderPlus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

export type ExplorerRef = {
    reload: () => void;
};

const treeCache = new Map<string, FileNode>();

export default function Explorer({
    path,
    id,
    openDialogInput,
    ref,
}: {
    path?: string;
    id?: string;
    openDialogInput: (title: string, defaultValue?: string) => Promise<string | null>;
    ref?: React.RefObject<ExplorerRef | null>;
}) {
    const [fileTree, setFileTree] = useState<FileNode | null>(null);
    const cacheKey = path || id;

    const pathName = usePathname();

    const childrenRefs = useRef<Map<string, React.RefObject<ExplorerRef | null>>>(new Map());

    const reloadTree = useCallback(() => {
        if (!cacheKey) throw new Error("Path or ID is needed to build tree");

        const fetchFn = path ? findChildrenByPath : findChildrenByID;

        fetchFn(cacheKey).then((data) => {
            treeCache.set(cacheKey, data);
            setFileTree(data);
        });
    }, [cacheKey, path]);

    useImperativeHandle(ref, () => ({ reload: reloadTree }), [reloadTree]);

    useEffect(() => {
        reloadTree();
    }, [cacheKey, reloadTree]);

    async function createNote(parentID: string) {
        const name = await openDialogInput("Dê um nome para esta nota");

        if (!name) {
            return;
        }

        const id = await fCreateNote(name, parentID);

        childrenRefs.current.get(parentID)?.current?.reload();

        redirect(`/app/notes/${id}?name=${name}`);
    }

    async function deleteNote(noteID: string) {
        await fDeleteNote(noteID);

        reloadTree();

        if (pathName.endsWith(noteID)) {
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

        if (pathName.endsWith(noteID)) {
            redirect(`/app/notes/${noteID}?name=${name}`);
        }
    }

    async function createFolder(parentID: string) {
        const name = await openDialogInput("Dê um nome para esta pasta");

        if (!name) {
            return;
        }

        await fCreatefolder(name, parentID);

        childrenRefs.current.get(parentID)?.current?.reload();
    }

    async function deleteFolder(folderID: string) {
        await fDeleteFolder(folderID);

        reloadTree();
    }

    async function renameFolder(noteID: string, prevName: string) {
        const name = await openDialogInput("Dê um nome para esta pasta", prevName);

        if (!name) {
            return;
        }

        await fRenameFolder(noteID, name);

        reloadTree();
    }

    if (!cacheKey) {
        throw new Error("Path or ID is needed to build tree");
    }

    return (
        <SidebarMenu>
            {(fileTree?.children || treeCache.get(cacheKey)?.children || []).map((f) => {
                if (f.type === "file") {
                    return (
                        <ContextMenu key={f._id}>
                            <ContextMenuTrigger asChild>
                                <Link href={`/app/notes/${f._id}?name=${f.name}`}>
                                    <SidebarMenuButton className="hover:cursor-pointer">
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
                    <Collapsible key={f._id}>
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
                            <SidebarMenuSub>
                                <Explorer id={f._id} openDialogInput={openDialogInput} ref={ref} />
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </Collapsible>
                );
            })}
        </SidebarMenu>
    );
}

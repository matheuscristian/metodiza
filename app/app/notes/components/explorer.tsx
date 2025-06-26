"use client";

import { findChildrenByID, searchNotes } from "@/app/app/notes/actions";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuSub } from "@/components/ui/sidebar";
import useFolder from "@/app/app/notes/hooks/use-folder";
import useNote from "@/app/app/notes/hooks/use-note";
import { cn } from "@/lib/utils";
import { ExplorerRef } from "@/types/explorer";
import { FileNode } from "@/types/file";
import { ChevronRight, File, FilePlus2, FolderPlus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

const treeCache = new Map<string, FileNode>();

export default function Explorer({
    id,
    search,
    openDialogInput,
    ref,
}: {
    id?: string;
    search?: string;
    openDialogInput: (title: string, defaultValue?: string) => Promise<string | null>;
    ref?: React.RefObject<ExplorerRef | null>;
}) {
    const [fileTree, setFileTree] = useState<FileNode | null>(null);
    const [folderOpenState, setFolderOpenState] = useState<Record<string, boolean>>({});

    const childrenRefs = useRef<Map<string, React.RefObject<ExplorerRef | null>>>(new Map());

    const pathNoteID = usePathname()
        .split("/")
        .filter((p) => p.length)
        .slice(2)[0];

    const reloadTree = useCallback(() => {
        if (!id) throw new Error("ID is needed to build tree");

        if (!search) {
            findChildrenByID(id).then((data) => {
                treeCache.set(id, data);
                setFileTree(data);
            });
        } else {
            searchNotes(search).then((data) => {
                console.log(data);

                setFileTree(data);
            });
        }
    }, [id, search]);

    useEffect(() => {
        reloadTree();
    }, [id, search, reloadTree]);

    useImperativeHandle(ref, () => ({ reload: reloadTree }), [reloadTree]);

    const [createNote, renameNote, deleteNote] = useNote(
        pathNoteID,
        openDialogInput,
        setFolderOpenState,
        childrenRefs,
        reloadTree
    );

    const [createFolder, renameFolder, deleteFolder] = useFolder(
        pathNoteID,
        openDialogInput,
        setFolderOpenState,
        childrenRefs,
        reloadTree
    );

    if (!id) {
        throw new Error("ID is needed to build tree");
    }

    return (
        <SidebarMenu>
            {(fileTree?.children || treeCache.get(id)?.children || []).map((f) => {
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

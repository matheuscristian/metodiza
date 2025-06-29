"use client";

import { findChildrenByID, moveEntry, searchNotes } from "@/app/app/notes/actions";
import useFolder from "@/app/app/notes/hooks/use-folder";
import useNote from "@/app/app/notes/hooks/use-note";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuSub } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ExplorerRef } from "@/types/explorer";
import { FileNode } from "@/types/file";
import { ChevronRight, File, FilePlus2, FolderPlus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { dragType } from "../dragType";

const treeCache = new Map<string, FileNode>();

function FolderComponent(props: {
    name: string;
    id: string;
    setFolderOpenstate: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    reloadTree: () => void;
    ref: React.RefObject<ExplorerRef | null>;
}) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: dragType,
        collect(monitor) {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            };
        },
        drop(item) {
            const { id: fileId, reloadParent } = item as { id: string; reloadParent: () => void };

            moveEntry(fileId, props.id).then(() => {
                props.setFolderOpenstate((prev) => ({ ...prev, [props.id]: true }));

                props.ref.current?.reload();

                if (props.reloadTree == reloadParent) {
                    reloadParent();
                } else {
                    reloadParent();
                    props.reloadTree();
                }
            });
        },
        canDrop(item) {
            return ((item as { id: string }).id as string) !== props.id;
        },
    });

    const [, drag] = useDrag(
        {
            type: dragType,
            item: { id: props.id, reloadParent: props.reloadTree },
        },
        [props.id]
    );

    return (
        <div ref={drag as any} className="size-full">
            <div ref={drop as any} className="flex items-center justify-start gap-1 size-full">
                <ChevronRight
                    className="transition-transform group-data-[state=open]/collapsible:rotate-90"
                    size={16.5}
                />{" "}
                {props.name}
                {isOver && canDrop && <div className="absolute h-full w-full bg-white/10 left-0 rounded-md" />}
            </div>
        </div>
    );
}

function FileComponent(props: { f: { _id: string; name: string }; pathNoteID: string; reloadTree: () => void }) {
    const [, drag] = useDrag(
        {
            type: dragType,
            item: { id: props.f._id, reloadParent: props.reloadTree },
        },
        [props.f._id]
    );

    return (
        <SidebarMenuButton
            ref={drag as any}
            className={cn("hover:cursor-pointer w-full", props.pathNoteID === props.f._id && "bg-gray-500/15")}
        >
            <File /> {props.f.name}
        </SidebarMenuButton>
    );
}

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
                                    <FileComponent pathNoteID={pathNoteID} f={f} reloadTree={reloadTree} />
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
                                <ContextMenuTrigger className="w-fit" asChild>
                                    <SidebarMenuButton className="hover:cursor-pointer group/collapsible relative w-full">
                                        <FolderComponent
                                            name={f.name}
                                            setFolderOpenstate={setFolderOpenState}
                                            id={f._id}
                                            reloadTree={reloadTree}
                                            ref={ref}
                                        />
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
                            <SidebarMenuSub className="mr-0 pr-0 w-full">
                                <Explorer id={f._id} openDialogInput={openDialogInput} ref={ref} />
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </Collapsible>
                );
            })}
        </SidebarMenu>
    );
}

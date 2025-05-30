"use client";

import {
    createFolder,
    createNote,
    deleteFolder,
    deleteNote,
    getNotesTree,
    renameNote,
    TreeDirectory,
} from "@/app/actions";
import { useEffect, useRef, useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuSub } from "@/components/ui/sidebar";
import { Collapsible } from "@/components/ui/collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, File, FilePlus2, Folder, FolderPlus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { redirect, useSearchParams } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Tree({
    _directory,
    parentUpdate,
}: {
    _directory: TreeDirectory | null;
    parentUpdate:
        | ((action: "CREATE" | "DELETE" | "RENAME", p1: string | undefined, p2: string | undefined) => void)
        | null;
}) {
    const [directory, setDirectory] = useState<TreeDirectory | null>(_directory && { ..._directory });

    const root = _directory?.name == "root" || !_directory;

    const searchParams = useSearchParams();
    const newNoteName = useRef<HTMLInputElement | null>(null);
    const lastAction = useRef<"CREATE-FILE" | "CREATE" | "RENAME">("CREATE-FILE");

    function updateDirectory(
        action: "CREATE" | "DELETE" | "RENAME",
        folder: boolean,
        p1: string | undefined,
        p2: string | undefined
    ) {
        console.log(action, folder, p1, p2, directory?.name);

        if (!["CREATE", "DELETE", "RENAME"].includes(action))
            throw new Error(`Invalid action on updateDirectory: ${action}`);

        if (!folder) {
            if (action === "CREATE") {
                if (!p1 || !p2) {
                    throw new Error("Missing parameters!");
                }
                createNote(p1, p2).then(setDirectory);
            }
            if (action === "DELETE") {
                if (!p1 || !p2) {
                    throw new Error("Missing parameters!");
                }
                deleteNote(p1, p2).then(setDirectory);
            }
            if (action === "RENAME") {
                if (!p1 || !p2) {
                    throw new Error("Missing parameters!");
                }
                renameNote(p1, p2).then(setDirectory);
            }
        }
        if (folder) {
            if (action === "CREATE") {
                if (!p1 || !p2) {
                    throw new Error("Missing parameters!");
                }
                createFolder(p1, p2).then(setDirectory);
            }
            if (action === "DELETE") {
                if (!p1) {
                    throw new Error("Missing parameters!");
                }
                deleteFolder(p1).then(setDirectory);
            }
        }
    }

    if (root) {
        parentUpdate = (action, p1, p2) => updateDirectory(action, true, p1, p2);
    }

    useEffect(() => {
        if (!root) return;
        getNotesTree().then(setDirectory);
    }, [root]);

    if (!parentUpdate) return null;

    const renderEntry = (entry: TreeDirectory | { type: "file"; name: string; uuid: string }, index: number) => {
        if (entry.type === "file") {
            return (
                <Dialog key={entry.uuid}>
                    <ContextMenu>
                        <ContextMenuTrigger asChild>
                            <Link href={`/app/notes/?uuid=${entry.uuid}&name=${entry.name}`}>
                                <SidebarMenuButton className="hover:cursor-pointer">
                                    <File /> {entry.name}
                                </SidebarMenuButton>
                            </Link>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="min-w-fit flex">
                            <DialogTrigger asChild>
                                <ContextMenuItem className="hover:cursor-pointer">
                                    <SquarePen />
                                </ContextMenuItem>
                            </DialogTrigger>

                            <ContextMenuItem
                                className="hover:cursor-pointer"
                                onClick={() => {
                                    updateDirectory("DELETE", false, entry.uuid, directory?.path);

                                    if (searchParams.get("uuid") === entry.uuid) {
                                        redirect("/app/notes");
                                    }
                                }}
                            >
                                <Trash2 />
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                    <DialogContent showCloseButton={false}>
                        <DialogTitle>Novo Nome</DialogTitle>
                        <form
                            className="grid gap-4"
                            onSubmit={(e) => {
                                e.preventDefault();

                                updateDirectory("RENAME", false, entry.uuid, newNoteName.current?.value);

                                if (searchParams.get("uuid") === entry.uuid) {
                                    redirect(`/app/notes/?uuid=${entry.uuid}&name=${newNoteName.current?.value}`);
                                }
                            }}
                        >
                            <Input type="text" ref={newNoteName} />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancelar</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button type="submit">Adicionar</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            );
        }

        return (
            <Tree
                _directory={entry}
                parentUpdate={(action, p1, p2) => updateDirectory(action, true, p1, p2)}
                key={index}
            />
        );
    };

    if (root && directory?.children.length) {
        // Should also returns button the will be on the top of the tree to add new files and folders to the root
        return directory.children.map(renderEntry);
    }

    console.log(directory?.children);

    return directory?.children ? (
        <SidebarMenu>
            <Collapsible defaultOpen={root}>
                {!root && (
                    <Dialog>
                        <ContextMenu>
                            <CollapsibleTrigger asChild>
                                <ContextMenuTrigger asChild>
                                    <SidebarMenuButton className="hover:cursor-pointer group/trigger">
                                        <ChevronRight className="transition-transform group-data-[state=open]/trigger:rotate-90" />
                                        <Folder /> {directory.name}{" "}
                                    </SidebarMenuButton>
                                </ContextMenuTrigger>
                            </CollapsibleTrigger>
                            <ContextMenuContent className="min-w-fit flex">
                                <DialogTrigger asChild>
                                    <ContextMenuItem
                                        className="hover:cursor-pointer"
                                        onClick={() => {
                                            lastAction.current = "CREATE-FILE";
                                        }}
                                    >
                                        <FilePlus2 />
                                    </ContextMenuItem>
                                </DialogTrigger>

                                <DialogTrigger asChild>
                                    <ContextMenuItem
                                        className="hover:cursor-pointer"
                                        onClick={() => {
                                            lastAction.current = "CREATE";
                                        }}
                                    >
                                        <FolderPlus />
                                    </ContextMenuItem>
                                </DialogTrigger>
                                <ContextMenuItem
                                    className="hover:cursor-pointer"
                                    onClick={() => {
                                        parentUpdate?.("DELETE", directory.path, undefined);
                                    }}
                                >
                                    <Trash2 />
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                        <DialogContent showCloseButton={false}>
                            <DialogTitle>Novo Nome</DialogTitle>
                            <form
                                className="grid gap-4"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (lastAction.current === "CREATE-FILE") {
                                        updateDirectory("CREATE", false, newNoteName.current?.value, directory.path);
                                    }
                                    if (lastAction.current === "CREATE") {
                                        updateDirectory("CREATE", true, newNoteName.current?.value, directory.path);
                                    }
                                }}
                            >
                                <Input type="text" ref={newNoteName} />

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancelar</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button type="submit">Adicionar</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                )}
                <CollapsibleContent>
                    <SidebarMenuSub>{[...directory.children.map(renderEntry)]}</SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenu>
    ) : null;
}

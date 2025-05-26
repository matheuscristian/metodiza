"use client";

import { getNotesTree, TreeEntry } from "@/app/actions";
import { useEffect, useState } from "react";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton } from "./ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronRight, File, Folder } from "lucide-react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Tree() {
    const [notesTree, setNotesTree] = useState<TreeEntry[] | null>(null);
    const pathName = usePathname().split("/").pop() || "";

    // This is temporary, this should send a DELETE request to the server
    // and then fetch the result again or do this only if successful
    function deleteEntry(uuid: string, _tree: TreeEntry[] | null = null) {
        if (!notesTree) return;

        const tree = _tree ? _tree : notesTree;

        let found = false;
        for (const entry of tree) {
            if (entry.uuid === uuid) {
                const newTree = tree.filter((v) => v.uuid !== uuid);

                if (_tree) return newTree;

                setNotesTree(newTree);
                return;
            }

            if (entry.type === "directory") {
                const res = deleteEntry(uuid, entry.children);
                if (res) {
                    found = true;
                    entry.children = res;
                }
            }
        }

        if (found) setNotesTree([...notesTree]);

        if (pathName === uuid) redirect("/app/notes");
    }

    useEffect(() => {
        getNotesTree().then(setNotesTree);
    }, []);

    if (!notesTree) return null;

    return makeTree(notesTree, deleteEntry, pathName);
}

function makeTree(notesTree: TreeEntry[], deleteEntry: (uuid: string) => void, pathName: string) {
    return notesTree.map((entry) => {
        if (entry.type === "file") {
            return (
                <ContextMenu key={entry.uuid}>
                    <ContextMenuTrigger>
                        <Link href={`/app/notes/${entry.uuid}`}>
                            <SidebarMenuButton
                                className={cn(
                                    "hover:cursor-pointer hover:bg-gray-600/50",
                                    pathName === entry.uuid && "bg-gray-600/50"
                                )}
                            >
                                <File /> {entry.name}
                            </SidebarMenuButton>
                        </Link>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem className="hover:cursor-pointer" onClick={() => deleteEntry(entry.uuid)}>
                            Delete
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            );
        }

        return (
            <SidebarMenuItem key={entry.uuid}>
                <Collapsible>
                    <ContextMenu>
                        <ContextMenuTrigger>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuSubButton className="group/trigger hover:cursor-pointer hover:bg-gray-600/50 select-none">
                                    <ChevronRight className="transition-transform group-data-[state=open]/trigger:rotate-90" />
                                    <Folder /> {entry.name}
                                </SidebarMenuSubButton>
                            </CollapsibleTrigger>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem className="hover:cursor-pointer" onClick={() => deleteEntry(entry.uuid)}>
                                Delete
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>

                    <CollapsibleContent>
                        <SidebarMenuSub>{makeTree(entry.children, deleteEntry, pathName)}</SidebarMenuSub>
                    </CollapsibleContent>
                </Collapsible>
            </SidebarMenuItem>
        );
    });
}

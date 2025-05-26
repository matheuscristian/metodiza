"use client";

import { deleteNote, getNotesTree, TreatedTreeEntry } from "@/app/actions";
import { useEffect, useState } from "react";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton } from "./ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronRight, File, Folder, Trash2 } from "lucide-react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Tree() {
    const [notesTree, setNotesTree] = useState<TreatedTreeEntry[] | null>(null);
    const pathName = usePathname().split("/").pop() || "";

    function deleteEntry(uuid: string) {
        deleteNote(uuid).then((successful) => {
            if (successful) {
                getNotesTree().then(setNotesTree);
                if (pathName === uuid) redirect("/app/notes");
            }
        });
    }

    useEffect(() => {
        getNotesTree().then(setNotesTree);
    }, []);

    if (!notesTree) return null;

    return makeTree(notesTree, deleteEntry, pathName);
}

function makeTree(notesTree: TreatedTreeEntry[], deleteEntry: (uuid: string) => void, pathName: string) {
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
                            <Trash2 />
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
                                <Trash2 />
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

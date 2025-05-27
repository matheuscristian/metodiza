"use client";

import { getNotesTree, TreeDirectory as TreeDirectoryT } from "@/app/actions";
import { useEffect, useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuSub } from "./ui/sidebar";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronRight, File, Folder } from "lucide-react";

export default function TreeDirectory({
    _directory,
    parentUpdate,
}: {
    _directory: TreeDirectoryT | null;
    parentUpdate: (() => void) | null;
}) {
    const [directory, setDirectory] = useState<TreeDirectoryT | null>(_directory && { ..._directory });

    const root = _directory?.name == "root" || !_directory;

    function updateDirectory(
        target: string | undefined,
        action: "CREATE" | "DELETE" | "RELOAD",
        folder: boolean | undefined
    ) {
        console.log(target, action, folder);
        setDirectory(directory && { ...directory });
    }

    if (root) parentUpdate = () => updateDirectory("root", "RELOAD", undefined);

    useEffect(() => {
        if (!root) return;

        getNotesTree().then(setDirectory);
    }, [root]);

    if (root && directory?.children.length) {
        return directory?.children.map((entry, index) => {
            if (entry.type === "file")
                return (
                    <SidebarMenuButton key={entry.uuid} onClick={() => updateDirectory(entry.uuid, "RELOAD", false)}>
                        <File /> {entry.name}
                    </SidebarMenuButton>
                );

            return (
                <TreeDirectory
                    _directory={entry}
                    parentUpdate={() => updateDirectory(entry.path, "RELOAD", true)}
                    key={index}
                />
            );
        });
    }

    return directory?.children.length ? (
        <SidebarMenu>
            <Collapsible defaultOpen={root}>
                {!root && (
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                            onClick={function () {
                                return parentUpdate && parentUpdate();
                            }}
                            className="hover:cursor-pointer group/trigger"
                        >
                            <ChevronRight className="transition-transform group-data-[state=open]/trigger:rotate-90" />{" "}
                            <Folder /> {directory?.name}
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                )}
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {directory?.children.map((entry, index) => {
                            if (entry.type === "file")
                                return (
                                    <SidebarMenuButton
                                        key={entry.uuid}
                                        onClick={() => updateDirectory(entry.uuid, "RELOAD", false)}
                                        className="hover:cursor-pointer"
                                    >
                                        <File /> {entry.name}
                                    </SidebarMenuButton>
                                );

                            return (
                                <TreeDirectory
                                    _directory={entry}
                                    parentUpdate={() => updateDirectory(entry.path, "RELOAD", true)}
                                    key={index}
                                />
                            );
                        })}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenu>
    ) : null;
}

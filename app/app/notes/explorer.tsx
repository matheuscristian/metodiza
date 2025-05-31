"use client";

import { FileNode, findChildrenByID, findChildrenByPath } from "@/app/actions";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarMenu, SidebarMenuButton, SidebarMenuSub } from "@/components/ui/sidebar";
import { ChevronRight, File } from "lucide-react";
import React, { useEffect, useState } from "react";

const treeCache = new Map<string, FileNode>();

export default function Explorer({ path, id }: { path?: string; id?: string }) {
    const [fileTree, setFileTree] = useState<FileNode | null>(null);

    useEffect(() => {
        if (fileTree === null) {
            const cacheKey = path || id;

            if (!cacheKey) throw new Error("Path or ID is needed to build tree");

            const fetchFn = path ? findChildrenByPath : findChildrenByID;

            fetchFn(cacheKey).then((data) => {
                treeCache.set(cacheKey, data);
                setFileTree(data);
            });
        }
    }, [path, id]);

    if (!path && !id) {
        throw new Error("Path or ID is needed to build tree");
    }

    return (
        <SidebarMenu>
            {(fileTree?.children || treeCache.get(path || id as string)?.children || []).map((f) =>
                f.type === "file" ? (
                    <SidebarMenuButton key={f._id} className="hover:cursor-pointer">
                        <File /> {f.name}
                    </SidebarMenuButton>
                ) : (
                    <Collapsible key={f._id} className="group/collapsible">
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="hover:cursor-pointer">
                                <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />{" "}
                                {f.name}
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                <Explorer id={f._id} />
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </Collapsible>
                )
            )}
        </SidebarMenu>
    );
}

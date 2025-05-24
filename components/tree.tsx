"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "./ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronRight, File, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Tree({ item, path }: { item: string | any[]; path: string }) {
    const [name, ...items] = Array.isArray(item) ? item : [item];

    path += name + "/";
    const browserPath = decodeURIComponent(usePathname()) + "/";

    console.log(path, browserPath);

    if (!items.length) {
        return (
            <Link href={path}>
                <SidebarMenuButton className={cn("hover:cursor-pointer", path === browserPath ? "bg-gray-600/20" : "")}>
                    <File />
                    {name}
                </SidebarMenuButton>
            </Link>
        );
    }

    return (
        <SidebarMenuItem>
            <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="hover:cursor-pointer">
                        <ChevronRight className="transition-transform" />
                        <Folder />
                        {name}
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items.map((subItem, index) => (
                            <Tree key={index} item={subItem} path={path} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
}

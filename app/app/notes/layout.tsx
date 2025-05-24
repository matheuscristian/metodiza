import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { ChevronRight, File, Folder } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
    tree: [["Abacate", "Queijinho Mineiro", "Cafezinho"]],
};

export default function NotesLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <ScrollArea className="max-h-screen" type="scroll">
                <Sidebar collapsible="none">
                    <SidebarContent className="min-h-screen">
                        <SidebarGroup>
                            <SidebarGroupLabel>Notas</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {data.tree.map((item, index) => (
                                        <Tree key={index} item={item} path="/app/notes/" />
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </ScrollArea>
            <ScrollArea className="max-h-screen w-full">
                <SidebarInset className="px-20 py-10">{children}</SidebarInset>
            </ScrollArea>
        </SidebarProvider>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Tree({ item, path }: { item: string | any[]; path: string }) {
    const [name, ...items] = Array.isArray(item) ? item : [item];

    path += name + "/";

    if (!items.length) {
        return (
            <Link href={path}>
                <SidebarMenuButton className="hover:cursor-pointer">
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

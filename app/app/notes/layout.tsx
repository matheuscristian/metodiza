import Tree from "@/app/app/notes/tree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/components/ui/sidebar";

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
                                    <Tree _directory={null} parentUpdate={null} />
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

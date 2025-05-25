import Tree from "@/components/tree";
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

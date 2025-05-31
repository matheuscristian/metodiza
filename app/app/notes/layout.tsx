import {
    Sidebar,
    SidebarProvider,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar";
import Explorer from "./explorer";

export default function NotesLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar collapsible="none" className="h-screen">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Notas</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <Explorer path="/" />
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
}

import SideBar from "@/features/web/components/sidebar";

export default async function WebAppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex max-h-screen max-w-screen overflow-hidden">
            <SideBar />
            {children}
        </div>
    );
}

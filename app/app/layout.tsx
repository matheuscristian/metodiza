import SideNav from "@/components/shared/side-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <SideNav />
            <div className="w-full">{children}</div>
        </div>
    );
}

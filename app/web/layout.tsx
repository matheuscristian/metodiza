import SideBar from "@/features/web/components/sidebar";
import { getVerifiedSession } from "@/libs/auth/session";
import { redirect } from "next/navigation";

export default async function WebAppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = await getVerifiedSession();

    if (!token) {
        redirect("/login");
    }

    return (
        <div className="flex max-h-screen max-w-screen overflow-hidden">
            <SideBar />
            {children}
        </div>
    );
}

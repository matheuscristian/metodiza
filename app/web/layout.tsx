import SideBar from "@/features/web/components/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function WebAppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = (await cookies()).get("__session");

    if (!token) {
        redirect("/join");
    }

    return (
        <div className="flex max-h-screen max-w-screen overflow-hidden">
            <SideBar />
            {children}
        </div>
    );
}

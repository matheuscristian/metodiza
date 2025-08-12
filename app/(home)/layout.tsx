import { getVerifiedSession } from "@/libs/auth/session";
import { redirect } from "next/navigation";

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    if (await getVerifiedSession()) redirect("/web/editor");

    return children;
}

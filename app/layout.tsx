import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Metodiza",
    description: "*Slogan*",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className="bg-[var(--bg-1)] text-gray-100 dark">{children}</body>
        </html>
    );
}

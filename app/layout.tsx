import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ContextMenuProvider from "@/libs/contextMenu/components/contextMenuProvider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Metodiza",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body
                className={`${inter.className} bg-background text-text-primary`}
            >
                {children}
                <ContextMenuProvider />
            </body>
        </html>
    );
}

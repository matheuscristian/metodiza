import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Projeto TCC",
    description: "Projeto TCC - Ainda a decidir o que colocar aqui",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body>{children}</body>
        </html>
    );
}

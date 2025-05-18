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
            <body>
                <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">{children}</main>
            </body>
        </html>
    );
}

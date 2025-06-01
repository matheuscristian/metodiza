"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Page() {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const [content, setContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setValue("");
            }

            if (e.key === "Enter") {
                searchContent(inputRef.current?.value.toLocaleLowerCase() ?? "");
                inputRef.current?.blur();
            }
        };

        const input = inputRef.current;
        input?.addEventListener("keydown", handleKeyDown);

        return () => input?.removeEventListener("keydown", handleKeyDown);
    }, []);

    async function searchContent(word: string) {
        if (!word.trim()) return;

        setLoading(true);
        setError(null);
        setContent(null);

        const url = `https://pt.wiktionary.org/w/api.php?action=query&titles=${encodeURIComponent(
            word
        )}&prop=extracts&format=json&formatversion=2&origin=*`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            const page = data.query.pages[0];
            if (page.missing) {
                setError("Palavra não encontrada no Wikcionário.");
            } else {
                setContent(page.extract || "Nenhuma definição encontrada.");
            }
        } catch {
            setError("Erro ao buscar definição.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollArea className="w-full h-screen">
            <div className="py-20 px-20 flex justify-center">
                <div className="w-[50%]">
                    <h1 className="text-4xl mb-5">Dicionário</h1>
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        {value && (
                            <X
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 cursor-pointer"
                                onClick={() => setValue("")}
                            />
                        )}
                        <Input
                            type="text"
                            value={value}
                            ref={inputRef}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Buscar..."
                            className="pl-9 pr-9 dark:bg-transparent border-0 rounded-none focus-visible:ring-0 focus:outline-none dark:border-b dark:border-cyan-200/25 dark:focus:border-cyan-200/75 transition-colors"
                        />
                    </div>
                    <div className="mt-4 min-h-[100px] p-4 text-sm whitespace-pre-wrap">
                        {loading && <p className="text-gray-300/30">Carregando...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {content && !loading && (
                            <div
                                className="text-sm leading-relaxed space-y-3 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_ul]:list-disc [&_ul]:ml-6 [&_p]:mt-2"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
}

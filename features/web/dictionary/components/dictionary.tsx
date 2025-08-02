"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Dictionary() {
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
                searchContent(
                    inputRef.current?.value.toLocaleLowerCase() ?? "",
                );
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
            word,
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
        <div className="size-full h-screen overflow-y-auto px-20 py-20">
            <div className="mx-auto w-[50%]">
                <h1 className="mb-5 text-4xl">Dicionário</h1>
                <div className="relative w-full">
                    <Search
                        className="text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2"
                        size={18}
                    />
                    {value && (
                        <X
                            className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                            size={14}
                            onClick={() => setValue("")}
                        />
                    )}
                    <input
                        type="text"
                        value={value}
                        ref={inputRef}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Buscar..."
                        className="border-accent-primary/25 focus:border-accent-focus/75 w-full rounded-none border-0 border-b bg-transparent px-9 py-1 transition-colors focus:outline-none focus-visible:ring-0"
                    />
                </div>
                <div className="mt-4 min-h-[100px] p-4 text-sm whitespace-pre-wrap">
                    {loading && (
                        <p className="text-text-muted">Carregando...</p>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                    {content && !loading && (
                        <div
                            className="prose prose-sm prose-invert text-text-primary space-y-3 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

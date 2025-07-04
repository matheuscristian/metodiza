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
        <div className="py-20 px-20 size-full h-screen overflow-y-auto">
            <div className="w-[50%] mx-auto">
                <h1 className="text-4xl mb-5">Dicionário</h1>
                <div className="relative w-full">
                    <Search
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={18}
                    />
                    {value && (
                        <X
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
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
                        className="px-9 py-1 w-full bg-transparent border-0 rounded-none focus-visible:ring-0 focus:outline-none border-b border-accent-primary/25 focus:border-accent-focus/75 transition-colors"
                    />
                </div>
                <div className="mt-4 min-h-[100px] p-4 text-sm whitespace-pre-wrap">
                    {loading && (
                        <p className="text-text-muted">Carregando...</p>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                    {content && !loading && (
                        <div
                            className="text-sm leading-relaxed space-y-3 prose prose-sm prose-invert text-text-primary"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

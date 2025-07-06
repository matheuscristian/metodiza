"use client";

import { getRoot } from "@/features/web/explorer/actions/treeActions";
import ContextMenu from "@/features/web/explorer/components/contextMenu";
import FileList from "@/features/web/explorer/components/fileList";
import Folder from "@/features/web/explorer/components/folder";
import useContextMenu from "@/features/web/explorer/hooks/contextMenuHook";
import { entry } from "@prisma/client";
import { Search } from "lucide-react";
import { MouseEvent, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Tree() {
    const [root, setRoot] = useState<entry | null>(null);
    const [pos, target, show] = useContextMenu();
    const [search, setSearch] = useState("");

    useEffect(() => {
        getRoot().then((res) => setRoot(res));
    }, []);

    function handleContextMenu(e: MouseEvent) {
        e.preventDefault();
        show(e);
    }

    return (
        <div className="size-full flex flex-col items-center gap-3">
            <div className="relative w-full px-3">
                <input
                    type="text"
                    name="search"
                    placeholder="Pesquisar"
                    onKeyDown={(e) =>
                        e.key === "Enter" && setSearch(e.currentTarget.value)
                    }
                    className="bg-text-primary/80 text-gray-900 outline-white/70 focus:outline-1 rounded-sm w-full text-sm  py-1 px-2"
                />
                <Search
                    size={14}
                    color="black"
                    className="absolute right-6 top-1/2 -translate-y-1/2"
                />
            </div>
            <DndProvider backend={HTML5Backend}>
                <div onContextMenu={handleContextMenu} className="size-full">
                    <RenderEntries root={root} search={search} />
                    <ContextMenu pos={pos} target={target} />
                </div>
            </DndProvider>
        </div>
    );
}

function RenderEntries({
    root,
    search,
}: {
    root: entry | null;
    search: string;
}) {
    if (search) {
        return <FileList search={search} />;
    }

    return root ? <Folder entry={root} root /> : null;
}

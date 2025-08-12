"use client";

import { getRoot } from "@/features/web/explorer/actions/treeActions";
import FileContextMenu from "@/features/web/explorer/components/fileContextMenu";
import FileList from "@/features/web/explorer/components/fileList";
import Folder from "@/features/web/explorer/components/folder";
import FolderContextMenu from "@/features/web/explorer/components/folderContextMenu";
import useContextMenuStore from "@/libs/contextMenu/stores/contextMenuStore";
import { entry } from "@prisma/client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Tree() {
    const [root, setRoot] = useState<entry | null>(null);
    const [search, setSearch] = useState("");

    const registerContextMenu = useContextMenuStore((s) => s.register);

    useEffect(() => {
        getRoot().then((res) => setRoot(res));

        registerContextMenu("file", FileContextMenu);
        registerContextMenu("folder", FolderContextMenu);
    }, [registerContextMenu]);

    return (
        <div className="flex size-full flex-col items-center gap-3">
            <div className="relative w-full px-3">
                <input
                    type="text"
                    name="search"
                    placeholder="Pesquisar"
                    onKeyDown={(e) =>
                        e.key === "Enter" && setSearch(e.currentTarget.value)
                    }
                    className="bg-text-primary/80 w-full rounded-sm px-2 py-1 text-sm text-gray-900 outline-white/70 focus:outline-1"
                />
                <Search
                    size={14}
                    color="black"
                    className="absolute top-1/2 right-6 -translate-y-1/2"
                />
            </div>
            <DndProvider backend={HTML5Backend}>
                <div className="size-full">
                    <RenderEntries root={root} search={search} />
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

"use client";

import { getRoot } from "@/features/web/explorer/actions/treeActions";
import ContextMenu from "@/features/web/explorer/components/contextMenu";
import Folder from "@/features/web/explorer/components/folder";
import useContextMenu from "@/features/web/explorer/hooks/contextMenuHook";
import { entry } from "@/libs/db/prisma";
import { MouseEvent, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Tree() {
    const [root, setRoot] = useState<entry | null>(null);
    const [pos, target, show] = useContextMenu();

    useEffect(() => {
        getRoot().then((res) => setRoot(res));
    }, []);

    function handleContextMenu(e: MouseEvent) {
        e.preventDefault();
        show(e);
    }

    return (
        <div onContextMenu={handleContextMenu} className="h-full w-full">
            <DndProvider backend={HTML5Backend}>
                {root ? <Folder entry={root} root /> : null}
            </DndProvider>
            <ContextMenu pos={pos} target={target} />
        </div>
    );
}

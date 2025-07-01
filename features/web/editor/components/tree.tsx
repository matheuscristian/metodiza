"use client";

import { getRoot } from "@/features/web/editor/actions/treeActions";
import ContextMenu from "@/features/web/editor/components/contextMenu";
import Folder from "@/features/web/editor/components/folder";
import useContextMenu from "@/features/web/editor/hooks/contextMenuHook";
import { entry } from "@/libs/db/prisma";
import { MouseEvent, useEffect, useState } from "react";

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
        <div
            onContextMenu={handleContextMenu}
            className="h-full w-full relative"
        >
            {root ? <Folder entry={root} root /> : null}
            {root && (
                <div
                    data-entry-id={root.id}
                    data-entry-type={root.type}
                    data-entry-parent={root.parent}
                    data-entry-root
                    className="w-full h-full"
                />
            )}
            <ContextMenu pos={pos} target={target} />
        </div>
    );
}

"use client";

import ContextMenu from "@/libs/contextMenu/components/contextMenu";
import useContextMenu from "@/libs/contextMenu/hooks/contextMenuHook";
import { useEffect } from "react";

export default function ContextMenuProvider() {
    const { handleContextMenu, handleMenu } = useContextMenu();

    useEffect(() => {
        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleMenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleMenu);
        };
    }, [handleContextMenu, handleMenu]);

    return <ContextMenu />;
}

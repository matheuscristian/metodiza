"use client";

import ContextMenu from "@/libs/contextMenu/components/contextMenu";
import useContextMenu from "@/libs/contextMenu/hooks/contextMenuHook";
import { useEffect } from "react";

export default function ContextMenuProvider() {
    const { handleContextMenu: handleClick, hide } = useContextMenu();

    useEffect(() => {
        document.addEventListener("contextmenu", handleClick);
        document.addEventListener("click", hide);

        return () => {
            document.removeEventListener("contextmenu", handleClick);
            document.removeEventListener("click", hide);
        };
    }, [handleClick]);

    return <ContextMenu />;
}

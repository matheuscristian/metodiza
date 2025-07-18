"use client";

import useContextMenuStore from "@/libs/contextMenu/stores/contextMenuStore";

export default function ContextMenu() {
    const position = useContextMenuStore((s) => s.getPosition());
    const Component = useContextMenuStore((s) => s.render)();

    return (
        <div
            data-context-menu
            className="fixed z-[1000] bg-border rounded-md"
            style={{
                top: position?.y,
                left: position?.x,
                display: position ? "block" : "none",
            }}
        >
            <Component />
        </div>
    );
}

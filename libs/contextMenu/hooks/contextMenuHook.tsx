"use client";

import useContextMenuStore from "@/libs/contextMenu/stores/contextMenuStore";

export default function useContextMenu() {
    const setPosition = useContextMenuStore((s) => s.setPosition);
    const setComponent = useContextMenuStore((s) => s.setComponent);
    const setTarget = useContextMenuStore((s) => s.setTarget);

    function handleContextMenu(e: MouseEvent) {
        if ((e.target as HTMLElement).closest("*[data-context-menu]")) {
            e.preventDefault();
        }

        const target = (e.target as HTMLElement).closest(
            "*[data-context-menu-name]",
        ) as HTMLElement;

        if (!target) {
            setPosition(null);
            setTarget(null);
            setComponent(null);
            return;
        }

        e.preventDefault();

        setPosition({ x: e.clientX, y: e.clientY });
        setComponent(target.dataset.contextMenuName ?? null);
        setTarget(target);
    }

    function hide() {
        setPosition(null);
        setTarget(null);
        setComponent(null);
    }

    return { handleContextMenu, hide };
}

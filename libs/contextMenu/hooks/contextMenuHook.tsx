"use client";

import useContextMenuStore from "@/libs/contextMenu/stores/contextMenuStore";

export default function useContextMenu() {
    const setPosition = useContextMenuStore((s) => s.setPosition);
    const setComponent = useContextMenuStore((s) => s.setComponent);
    const setTarget = useContextMenuStore((s) => s.setTarget);

    function handleContextMenu(e: MouseEvent) {
        // Prevents from opening a context menu within a custom context menu
        if ((e.target as HTMLElement).closest("*[data-context-menu]")) {
            e.preventDefault();
        }

        const target = (e.target as HTMLElement).closest(
            "*[data-context-menu-name]",
        ) as HTMLElement;

        if (!target) {
            hide();
            return;
        }

        e.preventDefault();

        setPosition({ x: e.clientX, y: e.clientY });
        setTarget(target);
        setComponent(target.dataset.contextMenuName ?? null);
    }

    function handleMenu(e: MouseEvent) {
        // Prevents from opening a context menu within a custom context menu
        if ((e.target as HTMLElement).closest("*[data-context-menu]")) {
            e.preventDefault();
        }

        const target = (e.target as HTMLElement).closest(
            "*[data-menu-name]",
        ) as HTMLElement;

        if (!target) {
            hide();
            return;
        }

        e.preventDefault();

        setPosition({ x: e.clientX, y: e.clientY });
        setTarget(target);
        setComponent(target.dataset.menuName ?? null);
    }

    function hide() {
        setPosition(null);
        setTarget(null);
        setComponent(null);
    }

    return { handleContextMenu, handleMenu, hide };
}

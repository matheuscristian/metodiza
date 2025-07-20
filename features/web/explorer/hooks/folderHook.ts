"use client";

import { moveEntry } from "@/features/web/explorer/actions/treeActions";
import useEntryDrag from "@/features/web/explorer/hooks/entryDragHook";
import useFolderStore from "@/features/web/explorer/stores/folderStore";
import { constants } from "@/features/web/explorer/utils/helpers";
import { entry } from "@prisma/client";
import { DnDItemType } from "@/types/features/web/explorer/dnd";
import { useEffect } from "react";
import { useDrop } from "react-dnd";

export default function useFolder(
    entry: entry,
): [() => void, entry[] | undefined, boolean, unknown, boolean, unknown] {
    const children = useFolderStore((s) => s.getFolder(entry.id));
    const fetchFolder = useFolderStore((s) => s.fetchFolder);
    const isChildren = useFolderStore((s) => s.isChildren);

    const isOpen = useFolderStore((s) => s.getOpenState(entry.id)) ?? false;
    const setOpenState = useFolderStore((s) => s.setOpenState);

    const [{ canDrop }, drop] = useDrop(() => ({
        accept: constants.dragType,
        collect(monitor) {
            return {
                canDrop: monitor.canDrop() && monitor.isOver(),
            };
        },
        canDrop(item) {
            const { id, parent } = item as DnDItemType;

            // Cannot drop inside itself
            if (id === entry.id) return false;

            // Cannot drop inside its parent (already inside)
            if (parent === entry.id) return false;

            // Cannot drop folder inside its children
            if (isChildren(entry.id, id)) return false;

            return true;
        },
        drop(item) {
            const { id, parent } = item as DnDItemType;

            moveEntry(id, entry.id);

            fetchFolder(parent || undefined);
            fetchFolder(entry.id);

            setOpenState(entry.id, true);
        },
    }));

    const [_, drag] = useEntryDrag(entry);

    useEffect(() => {
        if (!children) {
            fetchFolder(entry.id);
        }
    }, [entry, fetchFolder]);

    function handleClick() {
        setOpenState(entry.id, !isOpen);
    }

    return [handleClick, children, isOpen, drop, canDrop, drag];
}

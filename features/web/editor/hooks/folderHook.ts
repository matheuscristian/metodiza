"use client";

import { moveEntry } from "@/features/web/editor/actions/treeActions";
import useEntryDrag from "@/features/web/editor/hooks/entryDragHook";
import useFolderStore from "@/features/web/editor/stores/folderStore";
import { constants } from "@/features/web/editor/utils/helpers";
import { entry } from "@/libs/db/prisma";
import { DnDItemType } from "@/types/features/web/editor/dnd";
import { useEffect } from "react";
import { useDrop } from "react-dnd";

export default function useFolder(
    entry: entry,
): [() => void, entry[] | undefined, boolean, unknown, boolean, unknown] {
    const children = useFolderStore((s) => s.getFolder(entry.id));
    const fetchFolder = useFolderStore((s) => s.fetchFolder);

    const isOpen = useFolderStore((s) => s.getOpenState(entry.id)) ?? false;
    const setOpenState = useFolderStore((s) => s.setOpenState);

    const [{ canDrop }, drop] = useDrop(() => ({
        accept: constants.dragType,
        collect(monitor) {
            return {
                canDrop: monitor.isOver(),
            };
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
        fetchFolder(entry.id);
    }, [entry, fetchFolder]);

    function handleClick() {
        setOpenState(entry.id, !isOpen);
    }

    return [handleClick, children, isOpen, drop, canDrop, drag];
}

"use client";

import useFolderStore from "@/features/web/editor/stores/folderStore";
import { entry } from "@/libs/db/prisma";
import { MouseEvent, useEffect, useState } from "react";

export default function useFolder(
    entry: entry,
): [(e: MouseEvent) => void, entry[] | undefined, boolean] {
    const children = useFolderStore((s) => s.getFolder(entry.id));
    const fetchFolder = useFolderStore((s) => s.fetchFolder);

    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        fetchFolder(entry.id);
    }, [fetchFolder, entry]);

    function handleClick(_: MouseEvent) {
        setOpen((prev) => !prev);
    }

    return [handleClick, children, isOpen];
}

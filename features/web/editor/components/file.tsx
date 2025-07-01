"use client";

import { Entry } from "@/features/web/editor/components/entry";
import useFile from "@/features/web/editor/hooks/fileHook";
import { entry } from "@/libs/db/prisma";

export default function File({
    entry,
    level,
}: {
    entry: entry;
    level: number;
}) {
    const [handleClick, isSelected] = useFile(entry);

    return (
        <Entry
            entry={entry}
            level={level}
            isSelected={isSelected}
            handleClick={handleClick}
        />
    );
}

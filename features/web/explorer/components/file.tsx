import { Entry } from "@/features/web/explorer/components/entry";
import useEntryDrag from "@/features/web/explorer/hooks/entryDragHook";
import useFile from "@/features/web/explorer/hooks/fileHook";
import { entry } from "@/libs/db/prisma/client";
import { Ref } from "react";

export default function File({
    entry,
    level,
}: {
    entry: entry;
    level: number;
}) {
    const [handleClick, isSelected] = useFile(entry);

    const [_, drag] = useEntryDrag(entry);

    return (
        <Entry
            entry={entry}
            level={level}
            isSelected={isSelected}
            ref={drag as unknown as Ref<HTMLDivElement>}
            handleClick={handleClick}
        />
    );
}

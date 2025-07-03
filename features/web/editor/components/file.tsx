import { Entry } from "@/features/web/editor/components/entry";
import useEntryDrag from "@/features/web/editor/hooks/entryDragHook";
import useFile from "@/features/web/editor/hooks/fileHook";
import { entry } from "@/libs/db/prisma";
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

import { Entry } from "@/features/web/explorer/components/entry";
import File from "@/features/web/explorer/components/file";
import useFolder from "@/features/web/explorer/hooks/folderHook";
import { entry } from "@/libs/db/prisma";
import cn from "@/libs/utils/cn";
import { Ref } from "react";

export default function Folder({
    entry,
    level,
    root,
}: {
    entry: entry;
    level?: number;
    root?: boolean;
}) {
    // Ensures that root's direct children get level 0
    const currentLevel = root ? -1 : (level ?? 0);

    const [handleClick, children, isOpen, drop, canDrop, drag] =
        useFolder(entry);

    if (root) {
        return (
            <RenderRoot
                entry={entry}
                entryChildren={children}
                level={currentLevel}
                drop={drop}
                canDrop={canDrop}
            />
        );
    }

    return (
        <div ref={drag as Ref<HTMLDivElement>}>
            <Entry
                entry={entry}
                level={currentLevel}
                isOpen={isOpen}
                isSelected={canDrop}
                ref={drop as Ref<HTMLDivElement>}
                handleClick={handleClick}
            />

            {isOpen && renderChildren(children, currentLevel)}
        </div>
    );
}

function RenderRoot({
    entry,
    entryChildren,
    level,
    drop,
    canDrop,
}: {
    entry: entry;
    entryChildren: entry[] | undefined;
    level: number;
    drop: unknown;
    canDrop: boolean;
}) {
    return (
        <>
            {renderChildren(entryChildren, level)}
            <div
                data-entry-id={entry.id}
                data-entry-type={entry.type}
                data-entry-parent={entry.parent}
                data-entry-root
                ref={drop as Ref<HTMLDivElement>}
                className={cn(
                    "w-full h-full",
                    canDrop && "!bg-accent-primary/5",
                )}
            />
        </>
    );
}

function renderChildren(children: entry[] | undefined, level: number) {
    return children?.map((entry) =>
        entry.type === "file" ? (
            <File key={entry.id} entry={entry} level={level + 1} />
        ) : (
            <Folder key={entry.id} entry={entry} level={level + 1} />
        ),
    );
}

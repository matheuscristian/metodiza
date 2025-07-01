"use client";

import { Entry } from "@/features/web/editor/components/entry";
import File from "@/features/web/editor/components/file";
import useFolder from "@/features/web/editor/hooks/folderHook";
import { entry } from "@/libs/db/prisma";

export default function Folder({
    entry,
    level,
    root,
}: {
    entry: entry;
    level?: number;
    root?: boolean;
}) {
    const [handleClick, children, isOpen] = useFolder(entry);

    if (!level) {
        level = 0;
    }

    if (root) {
        // Ensure that root entries get level 0
        level = -1;
    }

    return (
        <>
            {!root && (
                <Entry
                    entry={entry}
                    level={level}
                    isOpen={isOpen}
                    handleClick={handleClick}
                />
            )}

            {(isOpen || root) &&
                children?.map((entry) =>
                    entry.type === "file" ? (
                        <File key={entry.id} entry={entry} level={level + 1} />
                    ) : (
                        <Folder
                            key={entry.id}
                            entry={entry}
                            level={level + 1}
                        />
                    ),
                )}
        </>
    );
}

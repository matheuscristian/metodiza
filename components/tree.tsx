"use client";

import { getNotesTree, TreeDirectory as TreeDirectoryT } from "@/app/actions";
import { useEffect, useState } from "react";

export default function TreeDirectory({
    _directory,
    parentUpdate,
}: {
    _directory: TreeDirectoryT | null;
    parentUpdate: (() => void) | null;
}) {
    const [directory, setDirectory] = useState<TreeDirectoryT | null>(_directory && { ..._directory });

    const root = _directory?.name == "root" || !_directory;

    function updateDirectory() {
    // target: string | undefined,
    // action: "CREATE" | "DELETE" | "RELOAD",
    // folder: boolean | undefined
        setDirectory(directory && { ...directory });
    }

    if (root) parentUpdate = () => updateDirectory("root", "RELOAD", undefined);

    useEffect(() => {
        if (!root) return;

        getNotesTree().then(setDirectory);
    }, [root]);

    return directory?.children.length ? (
        <div>
            {!root && (
                <p
                    onClick={function () {
                        return parentUpdate && parentUpdate();
                    }}
                >
                    dir: {directory?.name}
                </p>
            )}

            {directory?.children.map((entry, index) => {
                if (entry.type === "file")
                    return (
                        <div key={entry.uuid} onClick={() => updateDirectory(entry.uuid, "RELOAD", undefined)}>
                            {entry.name}
                        </div>
                    );

                return (
                    <TreeDirectory
                        _directory={entry}
                        parentUpdate={() => updateDirectory(entry.path, "RELOAD", undefined)}
                        key={index}
                    />
                );
            })}
        </div>
    ) : null;
}

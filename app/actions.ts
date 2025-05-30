"use server";

import makeConnection from "@/lib/db";
import noteModel from "@/model/note.model";
import treeEntry, { TreeEntry } from "@/model/tree-entry.model";

export interface TreeDirectory {
    type: "directory";
    name: string;
    path: string;
    children: Array<TreeDirectory | { type: "file"; name: string; uuid: string }>;
}

function findPath(
    _a: Array<TreeDirectory | { type: "file"; name: string; uuid: string }>,
    path: string[],
    fullPath: string
) {
    if (!path.length) {
        return _a;
    }

    const pname = path.shift() || "";
    const a = _a.find((v) => v.type === "directory" && v.name === pname);

    if (!a) {
        return findPath(
            (
                _a[
                    _a.push({ type: "directory", name: pname, path: fullPath.split(pname)[0] + pname, children: [] }) -
                        1
                ] as TreeDirectory
            ).children,
            path,
            fullPath
        );
    }

    return findPath((a as TreeDirectory).children, path, fullPath);
}

export async function getNotesTree(): Promise<TreeDirectory> {
    const entries = (await makeConnection(async () => await treeEntry.find().exec())) as Array<TreeEntry>;

    const root: TreeDirectory = {
        type: "directory",
        name: "root",
        path: "/",
        children: [],
    };

    for (const entry of entries) {
        const path = entry.path.split("/").filter((v) => v.trim().length);
        const target = findPath(root.children, path, entry.path);

        if (entry.name === "_marker_") continue;

        target.push({
            type: "file",
            name: entry.name,
            uuid: entry.uuid || "",
        });
    }

    return root;
}

export async function saveNote(content: string, uuid: string) {
    await makeConnection(async () => await noteModel.findOneAndUpdate({ uuid }, { content }).exec());
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteNote(uuid: string): Promise<boolean> {
    // To do
    return true;
}

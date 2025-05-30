"use server";

import makeConnection from "@/lib/db";
import noteModel, { Note } from "@/model/note.model";
import treeEntry, { TreeEntry } from "@/model/tree-entry.model";
import { randomUUID } from "crypto";

export interface TreeDirectory {
    type: "directory";
    name: string;
    path: string;
    children: Array<TreeDirectory | { type: "file"; name: string; uuid: string }>;
}

function createPath(
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
        return createPath(
            (
                _a[
                    _a.push({
                        type: "directory",
                        name: pname,
                        path: fullPath.split(pname)[0] + pname,
                        children: [],
                    }) - 1
                ] as TreeDirectory
            ).children,
            path,
            fullPath
        );
    }

    return createPath((a as TreeDirectory).children, path, fullPath);
}

export async function getNotesTree(): Promise<TreeDirectory> {
    const entries = (await makeConnection(
        async () => await treeEntry.find().sort({ path: 1, name: 1 }).exec()
    )) as Array<TreeEntry>;

    const root: TreeDirectory = {
        type: "directory",
        name: "root",
        path: "/",
        children: [],
    };

    for (const entry of entries) {
        const path = entry.path.split("/").filter((v) => v.trim().length);
        const target = createPath(root.children, path, entry.path);

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

export async function getNoteContent(uuid: string) {
    const noteEntry = await makeConnection(async () => (await noteModel.findOne({ uuid }).exec()) as Note | undefined);
    if (!noteEntry) {
        await makeConnection(async () => await noteModel.create({ uuid, content: "😎" }));
        return "";
    }
    return noteEntry.content;
}

export async function createNote(name: string, path: string) {
    await makeConnection(async () => await treeEntry.create({ name, uuid: randomUUID(), path }));

    const entries = (await makeConnection(
        async () =>
            await treeEntry
                .find({ path: { $regex: `^${path}` } })
                .sort({ path: 1, name: 1 })
                .exec()
    )) as Array<TreeEntry>;

    console.log(entries, path);

    const newTree: TreeDirectory = {
        type: "directory",
        name:
            path
                .split("/")
                .filter((p) => p.length > 0)
                .pop() || "erro loko",
        path: path,
        children: [],
    };

    for (const entry of entries) {
        const _path = entry.path
            .replace(path, "")
            .split("/")
            .filter((v) => v.trim().length);
        const target = createPath(newTree.children, _path, entry.path);

        if (entry.name === "_marker_") continue;

        target.push({
            type: "file",
            name: entry.name,
            uuid: entry.uuid || "",
        });
    }

    return newTree;
}

export async function deleteNote(uuid: string, path: string) {
    await makeConnection(async () => await treeEntry.findOneAndDelete({ uuid }).exec());
    await makeConnection(async () => await noteModel.findOneAndDelete({ uuid }).exec());

    const entries = (await makeConnection(
        async () =>
            await treeEntry
                .find({ path: { $regex: `^${path}` } })
                .sort({ path: 1, name: 1 })
                .exec()
    )) as Array<TreeEntry>;

    console.log(entries, path);

    const newTree: TreeDirectory = {
        type: "directory",
        name:
            path
                .split("/")
                .filter((p) => p.length > 0)
                .pop() || "erro loko",
        path: path,
        children: [],
    };

    for (const entry of entries) {
        const _path = entry.path
            .replace(path, "")
            .split("/")
            .filter((v) => v.trim().length);
        const target = createPath(newTree.children, _path, entry.path);

        if (entry.name === "_marker_") continue;

        target.push({
            type: "file",
            name: entry.name,
            uuid: entry.uuid || "",
        });
    }

    return newTree;
}

export async function renameNote(uuid: string, name: string) {
    const path = (
        await makeConnection(async () => (await treeEntry.findOneAndUpdate({ uuid }, { name }).exec()) as TreeEntry)
    ).path;

    const entries = (await makeConnection(
        async () =>
            await treeEntry
                .find({ path: { $regex: `^${path}` } })
                .sort({ path: 1, name: 1 })
                .exec()
    )) as Array<TreeEntry>;

    console.log(entries, path);

    const newTree: TreeDirectory = {
        type: "directory",
        name:
            path
                .split("/")
                .filter((p) => p.length > 0)
                .pop() || "erro loko",
        path: path,
        children: [],
    };

    for (const entry of entries) {
        const _path = entry.path
            .replace(path, "")
            .split("/")
            .filter((v) => v.trim().length);
        const target = createPath(newTree.children, _path, entry.path);

        if (entry.name === "_marker_") continue;

        target.push({
            type: "file",
            name: entry.name,
            uuid: entry.uuid || "",
        });
    }

    return newTree;
}
export async function createFolder(_name: string, path: string) {
    await makeConnection(async () => await treeEntry.create({ name: "_marker_", path: `${path}/${_name}` }));
    const entries = (await makeConnection(
        async () =>
            await treeEntry
                .find({ path: { $regex: `^${path}` } })
                .sort({ path: 1, name: 1 })
                .exec()
    )) as Array<TreeEntry>;

    const newTree: TreeDirectory = {
        type: "directory",
        name:
            path
                .split("/")
                .filter((p) => p.length > 0)
                .pop() || "erro loko",
        path: path,
        children: [],
    };

    for (const entry of entries) {
        const _path = entry.path
            .replace(path, "")
            .split("/")
            .filter((v) => v.trim().length);
        const target = createPath(newTree.children, _path, entry.path);

        if (entry.name === "_marker_") continue;

        target.push({
            type: "file",
            name: entry.name,
            uuid: entry.uuid || "",
        });
    }

    return newTree;
}
export async function deleteFolder(__path: string) {
    // Should also delete NoteModel's
    await makeConnection(
        async () =>
            await treeEntry
                .find({ path: { $regex: `^${__path}` } })
                .deleteMany()
                .exec()
    );
    console.log(__path, ", ", __path.split("/").slice(0, -1).join("/"));
    const path =
        "/" +
        __path
            .split("/")
            .filter((p) => p.length > 0)
            .slice(0, -1)
            .join("/");
    console.log(path);
    const entries = (await makeConnection(
        async () =>
            await treeEntry
                .find({ path: { $regex: `^${path}` } })
                .sort({ path: 1, name: 1 })
                .exec()
    )) as Array<TreeEntry>;

    const newTree: TreeDirectory = {
        type: "directory",
        name:
            path
                .split("/")
                .filter((p) => p.length > 0)
                .pop() || "erro loko",
        path: path,
        children: [],
    };

    for (const entry of entries) {
        const _path = entry.path
            .replace(path, "")
            .split("/")
            .filter((v) => v.trim().length);
        const target = createPath(newTree.children, _path, entry.path);

        if (entry.name === "_marker_") continue;

        target.push({
            type: "file",
            name: entry.name,
            uuid: entry.uuid || "",
        });
    }

    return newTree;
}

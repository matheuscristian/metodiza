"use server";

import connectToDatabase from "@/lib/db";
import filesModel, { IFile } from "@/model/files.model";

export type FileNode = {
    _id: string;
    name: string;
    type: "file" | "folder";
    path: string;
    parent: string | null;
    children?: FileNode[];
};

function buildFileTree(parent: IFile, entries: IFile[]): FileNode {
    const root: FileNode = {
        _id: parent.id,
        name: parent.name,
        type: parent.type,
        path: parent.path,
        parent: parent.parent?.toString() || null,
        children: [],
    };

    const nodeMap = new Map<string, FileNode>();

    entries.forEach((entry) => {
        nodeMap.set(entry.id, {
            _id: entry.id,
            name: entry.name,
            type: entry.type,
            path: entry.path,
            parent: entry.parent?.toString() || null,
        });
    });

    nodeMap.forEach((node) => {
        if (node.parent && node.parent !== root._id) {
            const parentNode = nodeMap.get(node.parent);
            if (parentNode) {
                if (parentNode.children) {
                    parentNode.children.push(node);
                } else {
                    parentNode.children = [node];
                }
            }
        } else {
            root.children?.push(node);
        }
    });

    function sortChildren(node: FileNode) {
        if (node.children) {
            node.children.sort((a, b) => {
                if (a.type !== b.type) {
                    return a.type === "folder" ? -1 : 1;
                }
                return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
            });
            node.children.forEach(sortChildren);
        }
    }

    sortChildren(root);

    return root;
}

export async function findChildrenByPath(path: string): Promise<FileNode> {
    await connectToDatabase();

    const entry = await filesModel.findOne({ path, type: "folder" }).orFail();

    if (entry.type !== "folder") {
        throw new Error("Path isn't a folder");
    }

    const allChildren = await filesModel.find({ parent: entry.id }).exec();

    return buildFileTree(entry, allChildren);
}

export async function findChildrenByID(id: string): Promise<FileNode> {
    await connectToDatabase();

    const entry = await filesModel.findOne({ _id: id, type: "folder" }).orFail();

    if (entry.type !== "folder") {
        throw new Error("Path isn't a folder");
    }

    const allChildren = await filesModel.find({ parent: entry.id }).exec();

    return buildFileTree(entry, allChildren);
}

export async function getRootID() {
    await connectToDatabase();

    return (await filesModel.findOne({ name: "root", path: "/", type: "folder" }).orFail()).id;
}

export async function createNote(name: string, parentID: string) {
    await connectToDatabase();

    const parent = await filesModel.findOne({ _id: parentID }).orFail();

    return (await filesModel.create({ name, type: "file", path: parent.path + name, parent: parent.id })).id;
}

export async function deleteNote(noteID: string) {
    await connectToDatabase();

    await filesModel.findOneAndDelete({ _id: noteID, type: "file" }).orFail();
}

export async function renameNote(noteID: string, newName: string) {
    await connectToDatabase();

    const note = await filesModel.findOne({ _id: noteID, type: "file" }).orFail();

    const newPath = note.path?.split("/").filter((p) => p.length);
    newPath?.pop();
    newPath?.push(newName);

    await filesModel
        .findOneAndUpdate({ _id: noteID, type: "file" }, { name: newName, path: "/" + newPath?.join("/") })
        .orFail();
}

export async function createFolder(name: string, parentID: string) {
    await connectToDatabase();

    const parent = await filesModel.findOne({ _id: parentID }).orFail();

    await filesModel.create({ name, type: "folder", path: parent.path + name + "/", parent: parent.id });
}

export async function deleteFolder(folderID: string) {
    await connectToDatabase();

    const folder = await filesModel.findOne({ _id: folderID, type: "folder" }).orFail();
    await filesModel
        .find({ path: { $regex: `^${folder.path}.*` } })
        .deleteMany()
        .orFail();
}

export async function renamefolder(folderID: string, newName: string) {
    await connectToDatabase();

    const folder = await filesModel.findOne({ _id: folderID, type: "folder" }).orFail();

    const splitPath = folder.path?.split("/").filter((p) => p.length);
    splitPath?.pop();
    splitPath?.push(newName);
    const newPath = "/" + splitPath?.join("/") + "/";

    (await filesModel.find({ path: { $regex: `^${folder.path}.*` } })).forEach(async (d) => {
        const documentPath = d.path;

        await filesModel.findByIdAndUpdate(d.id, { path: newPath + documentPath?.replace(folder.path, "") }).orFail();
    });

    await filesModel.findByIdAndUpdate(folderID, { name: newName }).orFail();
}

export async function getNoteContent(id: string) {
    await connectToDatabase();

    return (await filesModel.findOne({ _id: id, type: "file" }).orFail()).content;
}

export async function saveNote(id: string, content: string) {
    await connectToDatabase();

    await filesModel.findOne({ _id: id, type: "file" }).updateOne({ content }).orFail();
}

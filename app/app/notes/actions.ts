"use server";

import connectToDatabase from "@/lib/db";
import fileModel from "@/models/file.model";
import { FileNode, IFile } from "@/types/file";

function buildFileTree(parent: IFile, entries: IFile[]): FileNode {
    const root: FileNode = {
        _id: parent.id,
        name: parent.name,
        type: parent.type,
        parent: parent.parent?.toString() || null,
        children: [],
    };

    const nodeMap = new Map<string, FileNode>();

    entries.forEach((entry) => {
        nodeMap.set(entry.id, {
            _id: entry.id,
            name: entry.name,
            type: entry.type,
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

export async function findChildrenByID(id: string): Promise<FileNode> {
    await connectToDatabase();

    const entry = await fileModel.findOne({ _id: id, type: "folder" }).orFail();

    if (entry.type !== "folder") {
        throw new Error("Path isn't a folder");
    }

    const allChildren = await fileModel.find({ parent: entry.id }).exec();

    return buildFileTree(entry, allChildren);
}

export async function getRootID() {
    await connectToDatabase();

    return (await fileModel.findOne({ name: "root", type: "folder" }).orFail()).id;
}

export async function createNote(name: string, parentID: string) {
    await connectToDatabase();

    const parent = await fileModel.findOne({ _id: parentID, type: "folder" }).orFail();

    return (await fileModel.create({ name, type: "file", parent: parent.id })).id;
}

export async function deleteNote(noteID: string) {
    await connectToDatabase();

    await fileModel.findOneAndDelete({ _id: noteID, type: "file" }).orFail();
}

export async function renameNote(noteID: string, newName: string) {
    await connectToDatabase();

    await fileModel.findOneAndUpdate({ _id: noteID, type: "file" }, { name: newName }).orFail();
}

export async function createFolder(name: string, parentID: string) {
    await connectToDatabase();

    if (name === "root") {
        throw new Error("Cannot create a folder of name 'root'!");
    }

    const parent = await fileModel.findOne({ _id: parentID, type: "folder" }).orFail();

    await fileModel.create({ name, type: "folder", parent: parent.id });
}

export async function deleteFolder(folderID: string) {
    await connectToDatabase();

    const documents = await fileModel.find({ parent: folderID });

    for (const d of documents) {
        if (d.type === "file") {
            await d.deleteOne().orFail();
            continue;
        }

        await deleteFolder(d.id);
    }

    await fileModel.findByIdAndDelete(folderID).orFail();
}

export async function renamefolder(folderID: string, newName: string) {
    await connectToDatabase();

    await fileModel.findOneAndUpdate({ _id: folderID, type: "folder" }, { name: newName }).orFail();
}

export async function getNoteContent(id: string) {
    await connectToDatabase();

    return (await fileModel.findOne({ _id: id, type: "file" }).orFail()).content;
}

export async function saveNote(id: string, content: string) {
    await connectToDatabase();

    await fileModel.findOne({ _id: id, type: "file" }).updateOne({ content }).orFail();
}

export async function hasNote(id: string): Promise<boolean> {
    await connectToDatabase();

    return await fileModel
        .findOne({ _id: id, type: "file" })
        .orFail()
        .then(() => true)
        .catch(() => false);
}

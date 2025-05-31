"use server";

import connectToDatabase from "@/lib/db";
import filesModel, { IFile } from "@/model/files.model";

export type FileNode = {
    _id: string;
    name: string;
    type: "file" | "folder";
    path?: string;
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
                parentNode.children ? parentNode.children.push(node) : (parentNode.children = [node]);
            }
        } else {
            root.children?.push(node);
        }
    });

    return root;
}

export async function findChildrenByPath(path: string): Promise<FileNode> {
    await connectToDatabase();

    const entry = await filesModel.findOne({ path, type: "folder" }).orFail();

    if (entry.type !== "folder") {
        throw new Error("Path isn't a folder");
    }

    const allChildren = await filesModel.find({ parent: entry.id }).orFail();

    return buildFileTree(entry, allChildren);
}

export async function findChildrenByID(id: string): Promise<FileNode> {
    await connectToDatabase();

    const entry = await filesModel.findOne({ _id: id, type: "folder" }).orFail();

    if (entry.type !== "folder") {
        throw new Error("Path isn't a folder");
    }

    const allChildren = await filesModel.find({ parent: entry.id }).orFail();

    return buildFileTree(entry, allChildren);
}

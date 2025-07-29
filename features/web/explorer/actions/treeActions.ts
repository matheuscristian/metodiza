"use server";

import db from "@/libs/db";
import { entry } from "@prisma/client";

export async function getRoot() {
    const prisma = db.connect();

    const root = await prisma.entry.findFirst({
        where: { name: "root", type: "folder", parent: null },
    });

    if (!root)
        return await prisma.entry.create({
            data: {
                name: "root",
                type: "folder",
                parent: null,
                content: null,
            },
        });

    return root;
}

export async function getRootId(): Promise<string> {
    const root = await getRoot();

    return root.id;
}

export async function getChildrenOf(id: string): Promise<entry[]> {
    const prisma = db.connect();

    const folder = await prisma.entry.findUnique({
        where: { id, type: "folder" },
    });

    if (!folder) throw new Error("Couldn't find any folder with ID");

    return await prisma.entry.findMany({ where: { parent: folder.id } });
}

export async function moveEntry(id: string, dest: string) {
    const prisma = db.connect();

    const destFolder = await prisma.entry.findUnique({
        where: { id: dest, type: "folder" },
    });

    if (!destFolder) throw new Error("Couldn't find any folder with ID (dest)");

    const entry = await prisma.entry.findUnique({
        where: { id },
    });

    if (!entry) throw new Error("Couldn't find any entry with ID");

    await prisma.entry.update({ where: { id }, data: { parent: dest } });
}

export async function searchFiles(search: string) {
    const prisma = db.connect();

    return await prisma.entry.findMany({
        where: {
            name: { contains: search, mode: "insensitive" },
            type: "file",
        },
    });
}

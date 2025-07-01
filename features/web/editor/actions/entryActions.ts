"use server";

import db from "@/libs/db";

export async function createEntry(name: string, parent: string, type: string) {
    if (!name) throw new Error("Name is required");
    if (!parent) throw new Error("Parent is required");

    const prisma = db.connect();

    await prisma.entry.create({ data: { name, type, parent } });
}

export async function renameEntry(id: string, name: string) {
    if (!name) throw new Error("Name is required");

    const prisma = db.connect();

    const file = await prisma.entry.findUnique({ where: { id } });

    if (!file) throw new Error("Entry not found");

    await prisma.entry.update({ where: { id }, data: { name } });
}

export async function deleteFile(id: string) {
    const prisma = db.connect();

    const file = await prisma.entry.findUnique({ where: { id } });

    if (!file) throw new Error("File not found");

    await prisma.entry.delete({ where: { id, type: "file" } });
}

export async function deleteFolder(id: string) {
    const prisma = db.connect();

    const folder = await prisma.entry.findUnique({
        where: { id, type: "folder" },
    });

    if (!folder) throw new Error("Couldn't find folder");

    const children = await prisma.entry.findMany({ where: { parent: id } });

    children.forEach((entry) => {
        if (entry.type === "file") {
            deleteFile(entry.id);
        } else {
            deleteFolder(entry.id);
        }
    });

    await prisma.entry.delete({ where: { id } });
}

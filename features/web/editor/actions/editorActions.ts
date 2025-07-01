"use server";

import db from "@/libs/db";

export async function getFileContent(id: string) {
    const prisma = db.connect();

    const file = await prisma.entry.findUnique({ where: { id, type: "file" } });

    if (!file) throw new Error("Couldn't find file");

    return file.content ?? "";
}

export async function saveFile(id: string, content: string) {
    const prisma = db.connect();

    const file = await prisma.entry.findUnique({ where: { id, type: "file" } });

    if (!file) throw new Error("Couldn't find file");

    await prisma.entry.update({ where: { id }, data: { content } });
}

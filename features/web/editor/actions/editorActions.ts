"use server";

import { getVerifiedSession, getUserID } from "@/libs/auth/session";
import db from "@/libs/db";

export async function getFileContent(id: string) {
    const token = await getVerifiedSession();
    if (!token) throw new Error("User not logged in");

    const userId = await getUserID(token);
    if (!userId) throw new Error("Invalid token");

    const prisma = db.connect();

    const file = await prisma.entry.findUnique({
        where: { id, type: "file", user: { id: userId } },
    });

    if (!file) throw new Error("Couldn't find file");

    return file.content ?? "";
}

export async function saveFile(id: string, content: string) {
    const prisma = db.connect();

    const token = await getVerifiedSession();
    if (!token) throw new Error("User not logged in");

    const userId = await getUserID(token);
    if (!userId) throw new Error("Invalid token");

    const file = await prisma.entry.findUnique({
        where: { id, type: "file", user: { id: userId } },
    });

    if (!file) throw new Error("Couldn't find file");

    await prisma.entry.update({ where: { id }, data: { content } });
}

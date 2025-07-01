"use server";

import db from "@/libs/db";
import { entry } from "@/libs/db/prisma";

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

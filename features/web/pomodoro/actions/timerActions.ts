"use server";

import { getUserID, getVerifiedSession } from "@/libs/auth/session";
import db from "@/libs/db";

export async function updateTask(
    name: string,
    data: { cicles: number; completedCicles: number; completed: boolean },
) {
    const token = await getVerifiedSession();
    if (!token) throw new Error("User not logged in");

    const userId = await getUserID(token);
    if (!userId) throw new Error("Invalid token");

    const prisma = db.connect();

    const task = await prisma.task.findFirst({ where: { name } });

    if (!task) {
        await prisma.task.create({
            data: { ...data, name, userId },
            select: {
                cicles: true,
                completed: true,
                completedCicles: true,
                name: true,
            },
        });
    } else {
        await prisma.task.update({
            where: { name },
            data,
            select: {
                cicles: true,
                completed: true,
                completedCicles: true,
                name: true,
            },
        });
    }
}

export async function getTasks() {
    const token = await getVerifiedSession();
    if (!token) throw new Error("User not logged in");

    const userId = await getUserID(token);
    if (!userId) throw new Error("Invalid token");

    const prisma = db.connect();

    return await prisma.task.findMany({
        where: { userId },
        select: {
            cicles: true,
            completed: true,
            completedCicles: true,
            name: true,
        },
    });
}

export async function clearTasks() {
    const token = await getVerifiedSession();
    if (!token) throw new Error("User not logged in");

    const userId = await getUserID(token);
    if (!userId) throw new Error("Invalid token");

    const prisma = db.connect();

    return await prisma.task.deleteMany({ where: { userId } });
}

export async function deleteTask(name: string) {
    const token = await getVerifiedSession();
    if (!token) throw new Error("User not logged in");

    const userId = await getUserID(token);
    if (!userId) throw new Error("Invalid token");

    const prisma = db.connect();

    return await prisma.task.delete({ where: { name, userId } });
}

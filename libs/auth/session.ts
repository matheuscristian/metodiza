"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getVerifiedSession() {
    const cookieStore = await cookies();

    const token = cookieStore.get("__session")?.value;

    if (!token || !jwt.verify(token, process.env.JWT_SECRET)) return undefined;

    return cookieStore.get("__session")?.value;
}

export async function getUserID(token: string) {
    return (jwt.decode(token) as { id?: string })?.id;
}

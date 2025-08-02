"use server";

import db from "@/libs/db";
import { user } from "@prisma/client";
import { z } from "zod";
import { compareSync, hashSync } from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const registerSchema = z
    .object({
        name: z.string().min(1, "Nome é obrigatório"),
        email: z.email("E-mail inválido"),
        password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
        confirmPassword: z.string().default(""),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Senhas diferentes",
    });

const loginSchema = z.object({
    email: z.email("E-mail inválido"),
    password: z.string().min(1, "Senha é obrigatória"),
    remember: z.coerce.boolean().default(false),
});

export async function register(formData: FormData) {
    const raw = Object.fromEntries(formData.entries());

    const result = registerSchema.safeParse(raw);

    if (!result.success) {
        const errors = z.treeifyError(result.error);
        return { success: false, errors };
    }

    const data = result.data;

    const createResult = await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
    });

    if (createResult !== true) {
        return {
            success: false,
            errors: {
                errors: [...createResult.email.errors],
                properties: {
                    email: createResult.email,
                },
            },
        };
    }

    return { success: true };
}

export async function login(formData: FormData) {
    const raw = Object.fromEntries(formData.entries());

    const result = loginSchema.safeParse(raw);

    if (!result.success) {
        const errors = z.treeifyError(result.error);
        return { success: false, errors };
    }

    const data = result.data;

    const userId = await validateUser(data.email, data.password);

    if (!userId) {
        return {
            success: false,
            errors: { errors: ["E-mail ou senha inválidos"] },
        };
    }

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1y",
    });

    const cookieOptions: Partial<ResponseCookie> = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    };

    if (data.remember) {
        cookieOptions.maxAge = 60 * 60 * 24 * 365;
    }

    (await cookies()).set("__session", token, cookieOptions);

    return { success: true };
}

async function createUser(user: Omit<user, "id">) {
    const client = db.connect();

    const newUser = {
        ...user,
        email: user.email.toLowerCase(),
        password: hashSync(user.password, 12),
    };

    if (await client.user.findFirst({ where: { email: newUser.email } })) {
        return { email: { errors: ["Já existe uma conta com este e-mail"] } };
    }

    await client.user.create({ data: newUser });

    return true;
}

async function validateUser(email: string, password: string) {
    const client = db.connect();

    const user = await client.user.findFirst({
        where: { email: email.toLowerCase() },
    });

    if (!user) return false;
    if (!compareSync(password, user.password)) return false;

    return user.id;
}

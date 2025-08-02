"use client";

import { register } from "@/features/auth/actions/authActions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

export default function JoinForm() {
    const [state, setState] = useState<Awaited<ReturnType<typeof register>>>({
        success: true,
    });

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = await register(
            new FormData(e.target as HTMLFormElement),
        );

        setState(result);

        if (result.success) {
            redirect("/login");
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-5 [&>*]:block">
                <label htmlFor="name" className="text-text-muted mb-1">
                    Nome
                </label>
                <input
                    type="text"
                    name="name"
                    className="bg-text-primary outline-accent-focus mb-1 w-full rounded-md px-3 py-2 text-sm text-gray-950 focus-visible:outline-2"
                />
                {state.errors?.properties?.name &&
                    state.errors.properties.name.errors.map((err, i) => (
                        <span key={i} className="text-sm text-red-300">
                            {err}
                        </span>
                    ))}
            </div>
            <div className="mb-5 [&>*]:block">
                <label htmlFor="email" className="text-text-muted mb-1">
                    E-mail
                </label>
                <input
                    type="email"
                    name="email"
                    className="bg-text-primary outline-accent-focus mb-1 w-full rounded-md px-3 py-2 text-sm text-gray-950 focus-visible:outline-2"
                />
                {state.errors?.properties?.email &&
                    state.errors.properties.email.errors.map((err, i) => (
                        <span key={i} className="text-sm text-red-300">
                            {err}
                        </span>
                    ))}
            </div>
            <div className="mb-5 [&>*]:block">
                <label htmlFor="password" className="text-text-muted mb-1">
                    Senha
                </label>
                <input
                    type="password"
                    name="password"
                    className="bg-text-primary outline-accent-focus mb-1 w-full rounded-md px-3 py-2 text-sm text-gray-950 focus-visible:outline-2"
                />
                {state.errors?.properties?.password &&
                    state.errors.properties.password.errors.map((err, i) => (
                        <span key={i} className="text-sm text-red-300">
                            {err}
                        </span>
                    ))}
            </div>
            <div className="mb-5 [&>*]:block">
                <label
                    htmlFor="confirmPassword"
                    className="text-text-muted mb-1"
                >
                    Confirmar senha
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    className="bg-text-primary outline-accent-focus mb-1 w-full rounded-md px-3 py-2 text-sm text-gray-950 focus-visible:outline-2"
                />
                {state.errors?.properties?.confirmPassword &&
                    state.errors.properties.confirmPassword.errors.map(
                        (err, i) => (
                            <span key={i} className="text-sm text-red-300">
                                {err}
                            </span>
                        ),
                    )}
            </div>
            <div className="mb-5 flex justify-end">
                <div>
                    <Link
                        href="/login"
                        className="text-accent-primary underline"
                    >
                        Já tem uma conta?
                    </Link>
                </div>
            </div>
            <div className="[&>*]:block">
                <button
                    type="submit"
                    className="bg-accent-secondary outline-accent-tertiary w-full cursor-pointer rounded-sm px-3 py-2 text-sm shadow-sm hover:outline-1 active:brightness-90"
                >
                    Juntar-se
                </button>
            </div>
        </form>
    );
}

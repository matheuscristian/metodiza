"use client";

import { login } from "@/features/auth/actions/authActions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginForm() {
    const [state, setState] = useState<Awaited<ReturnType<typeof login>>>({
        success: true,
    });

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = await login(new FormData(e.target as HTMLFormElement));

        setState(result);

        if (result.success) {
            redirect("/web/editor");
        }
    }

    return (
        <form onSubmit={onSubmit}>
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
                {state.errors?.errors &&
                    state.errors.errors.map((err, i) => (
                        <span key={i} className="text-sm text-red-300">
                            {err}
                        </span>
                    ))}
            </div>

            <div className="mb-5 flex justify-between">
                <div className="space-x-2">
                    <input
                        type="checkbox"
                        name="remember"
                        className="checked:accent-accent-focus cursor-pointer"
                    />
                    <label htmlFor="remember">Lembrar de mim</label>
                </div>
                <div>
                    <Link href="#" className="text-accent-primary underline">
                        Esqueceu sua senha?
                    </Link>
                </div>
            </div>
            <div className="mb-5 [&>*]:block">
                <button
                    type="submit"
                    className="bg-accent-secondary outline-accent-tertiary w-full cursor-pointer rounded-sm px-3 py-2 text-sm shadow-sm hover:outline-1 active:brightness-90"
                >
                    Acessar
                </button>
            </div>
            <div className="mb-5 flex items-center justify-start gap-3">
                <div className="border-text-muted h-[1px] grow border-b" />
                <span className="text-text-muted text-sm">
                    Ainda não tem uma conta?
                </span>
                <div className="border-text-muted h-[1px] grow border-b" />
            </div>
            <div className="[&>*]:block">
                <button
                    onClick={() => redirect("/join")}
                    className="outline-accent-tertiary border-text-muted text-text-muted hover:text-text-primary w-full cursor-pointer rounded-sm border px-3 py-2 text-sm shadow-sm hover:outline-1 active:brightness-90"
                >
                    Cadastro
                </button>
            </div>
        </form>
    );
}

"use client";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="sm:-translate-y-[50px] py-10 px-14 space-y-6 size-full sm:w-[550px] sm:h-fit flex flex-col justify-center bg-surface sm:rounded-xl shadow-2xl">
                <div className="flex flex-col items-center space-y-3">
                    <Image
                        src="/svg/metodiza.svg"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                    <h1 className="text-accent-secondary text-3xl">METODIZA</h1>
                </div>

                <div className="space-y-4 w-full">
                    <div>
                        <label className="block mb-1">Usuário ou e-mail</label>
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            className="w-full bg-white text-black px-4 py-2 rounded focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 ">Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            className="w-full bg-white text-black px-4 py-2 rounded focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-end text-sm text-text-muted w-full">
                    <Link href="#" className="hover:underline cursor-pointer">
                        Esqueci minha senha
                    </Link>
                    <Link
                        href="/auth/register"
                        className="hover:underline cursor-pointer"
                    >
                        Criar conta
                    </Link>
                </div>

                <div>
                    <button className="bg-accent-primary hover:bg-accent-focus cursor-pointer py-2 px-8 text-base rounded-lg mx-auto block">
                        ENTRAR
                    </button>
                </div>
            </div>
        </div>
    );
}

"use client";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
    return (
        <div className="flex min-h-screen bg-[#37373A] pt-10">
            <div className="p-7 pl-10 space-y-6  w-[550px]">
                <div className="flex flex-col items-center space-y-3">
                    <Image src="/svg/metodiza.svg" alt="Logo" width={100} height={100} />
                    <h1 className="text-cyan-400 text-2xl">METODIZA</h1>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 text-white">Usuário ou e-mail</label>
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            className="w-full bg-white text-black px-4 py-2 rounded focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            className="w-full bg-white text-black px-4 py-2 rounded focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-end text-sm text-gray-300">
                    <h1 className="hover:underline cursor-pointer"> Esqueci minha senha </h1>
                    <Link href="/auth/cadastro">
                        <h1 className="hover:underline cursor-pointer"> Criar conta </h1>
                    </Link>
                </div>

                <div>
                    <Link href="/web/editor">
                    <button className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer text-white py-2 px-8 text-base rounded-lg mx-auto block">
                        ENTRAR
                    </button>
                    </Link>
                </div>
            </div>

            <div className="flex justify-center flex-grow">
                <Image src="/svg/metodiza.svg" alt="Imagem" width={500} height={500} />
            </div>
        </div>
    );
}
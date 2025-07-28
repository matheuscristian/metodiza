"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
    const [dataNascimento, setDataNascimento] = useState("");
    const handleDataNascimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Para formatar a data de nascimento
        let value = e.target.value;
        value = value.replace(/\D/g, ""); // Remove tudo que não for número

        if (value.length > 8) {
            value = value.slice(0, 8); // Limita a 8 dígitos (DDMMAAAA)
        }

        if (value.length > 4) {
            value = value.replace(/(\d{2})(\d{2})(\d{1,4})/, "$1/$2/$3"); // Adiciona as barras no formato DD/MM/AAAA
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
        }

        setDataNascimento(value);
    };

    return (
        <div className="flex min-h-screen bg-[#37373A] pt-10">
            <div className="p-5 pl-10 space-y-6 w-[550px]">
                <div className="flex flex-col items-center space-y-3">
                    <Image src="/svg/metodiza.svg" alt="Logo" width={100} height={100} />
                    <h1 className="text-cyan-400 text-2xl">METODIZA</h1>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block mb-1 text-white">Nome completo</label>
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            className="w-full bg-white text-black px-4 py-2 rounded focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Email</label>
                        <input
                            type="email"
                            placeholder="Digite seu e-mail"
                            className="w-full bg-white text-black px-4 py-2 rounded focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-white">Nascimento</label>
                        <input
                            type="text"
                            placeholder="DD/MM/AAAA"
                            maxLength={10}
                            value={dataNascimento}
                            onChange={handleDataNascimentoChange}
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

                    <div>
                        <label className="block mb-1 text-white">Confirmar senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            className="w-full bg-white text-black px-4 py-2 rounded focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-end text-sm text-gray-300">
                    <Link href="/auth/login">
                        <h1 className="hover:underline cursor-pointer">Fazer Login</h1>
                    </Link>
                </div>

                <div className="pb-10">
                    <button className="bg-cyan-500 hover:bg-cyan-600 cursor-pointer text-white py-2 px-8 text-base rounded-lg mx-auto block">
                        ENTRAR
                    </button>
                </div>
            </div>

            <div className="flex justify-center flex-grow">
                <Image src="/svg/metodiza.svg" alt="Imagem" width={500} height={500} />
            </div>
        </div>
    );
}
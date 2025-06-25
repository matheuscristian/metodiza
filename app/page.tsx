import { Button } from "@/components/ui/button";
import { Book, Clock, PenSquare } from "lucide-react";
import Image from "next/image";
export default function Home() {
    const logoSize = 300;
    const cardIconSize = 25;
    return (
        <div className="h-screen">
            <div className="grid grid-cols-2 h-full border-b">
                <div className="flex flex-col justify-center items-center">
                    <div>
                        <span>Bem-vindo a Metodiza!</span>
                        <h1 className="text-2xl font-bold mt-3">Turbine seus Estudos</h1>
                        <p className="text-white/60">O sistema perfeito para periodizar seus estudos</p>

                        <div className="ml-11 mt-10">
                            <div className="mb-8">
                                <h2 className="text-[#35C0D2] font-bold text-xl mb-2"> O que é a Metodiza?</h2>
                                <p>
                                    Somos uma plataforma de gerenciamento de estudos online,<br></br> gratuito e
                                    flexível para seus conhecimentos!
                                </p>
                            </div>
                            <div>
                                <h2 className="text-[#35C0D2] font-bold text-xl mb-2"> Tire suas ideias do papel</h2>
                                <p>
                                    Dê resumo de estudos à criação de mapas-mentais e <br></br>projetos, com ferramentas
                                    essenciais da nossa plataforma.
                                </p>
                            </div>

                            <Button className="py-5 px-25 mt-10 rounded-[5px] text-white bg-[#35C0D2] hover:bg-[#4d8991]">
                                Cadastrar
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center bg-black/30">
                    <div>
                        <Image src={"/logo.svg"} alt="logo" width={logoSize} height={logoSize} />
                        <p className="text-center text-[#D23579] font-bold text-4xl mt-5 text-shadow-[4px_4px] text-shadow-black">
                            Metodiza
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-10">
                <div className="w-full px-52 flex justify-around">
                    <div className="grid grid-cols-[auto_1fr] max-w-[280px] gap-4 bg-black/15 p-5 rounded-md">
                        <PenSquare size={cardIconSize} className="my-auto" />
                        <p className="text-xl">Faça sua anotações Escreva suas dúvidas Organize suas ideias</p>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] max-w-[280px] gap-4 bg-black/15 p-5 rounded-md">
                        <Clock size={cardIconSize} className="my-auto" />
                        <p className="text-xl">Organize seu tempo Faça a sua rotina Planeje seus estudos</p>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] max-w-[280px] gap-4 bg-black/15 p-5 rounded-md">
                        <Book size={cardIconSize} className="my-auto" />
                        <p className="text-xl">Decida a forma na qual você irá aplicar seus conhecimentos</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

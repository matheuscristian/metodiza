import { Book, Clock, PenSquare } from "lucide-react";
import Image from "next/image";
import "@/features/home/styles/home.css";

const logoSize = 300;
const cardIconSize = 25;

export default function Home() {
    return (
        <div className="min-h-screen text-text-primary">
            <div className="grid grid-cols-2 h-screen border-b border-text-muted/25">
                <div className="flex flex-col justify-center items-center bg-surface">
                    <div>
                        <span>Bem-vindo a Metodiza!</span>
                        <h1 className="text-2xl font-bold mt-3">
                            Turbine seus Estudos
                        </h1>
                        <p className="text-text-muted">
                            O sistema perfeito para periodizar seus estudos
                        </p>

                        <div className="ml-11 mt-10">
                            <div className="mb-8">
                                <h2 className="text-[#35C0D2] font-bold text-xl mb-2">
                                    O que é a Metodiza?
                                </h2>
                                <p>
                                    Somos uma plataforma de gerenciamento de
                                    estudos online,<br></br> gratuito e flexível
                                    para seus conhecimentos!
                                </p>
                            </div>
                            <div>
                                <h2 className="text-[#35C0D2] font-bold text-xl mb-2">
                                    Tire suas ideias do papel
                                </h2>
                                <p>
                                    Dê resumo de estudos à criação de
                                    mapas-mentais e <br></br>projetos, com
                                    ferramentas essenciais da nossa plataforma.
                                </p>
                            </div>

                            <button className="py-5 px-25 mt-10 rounded-[5px] cursor-pointer text-white bg-[#35C0D2] hover:bg-[#4d8991] active:scale-[99%] will-change-transform duration-100">
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div>
                        <Image
                            src={"/svg/metodiza.svg"}
                            alt="logo"
                            width={logoSize}
                            height={logoSize}
                        />
                        <p className="text-center text-[#D23579] font-bold text-4xl mt-5 text-shadow-[4px_4px] text-shadow-black">
                            Metodiza
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-10 bg-surface">
                <div className="w-full px-52 flex justify-around">
                    <div className="overview-card">
                        <PenSquare size={cardIconSize} className="my-auto" />
                        <p className="text-xl leading-8">
                            Faça sua anotações Escreva suas dúvidas Organize
                            suas ideias
                        </p>
                    </div>
                    <div className="overview-card">
                        <Clock size={cardIconSize} className="my-auto" />
                        <p className="text-xl leading-8">
                            Organize seu tempo Faça a sua rotina Planeje seus
                            estudos
                        </p>
                    </div>
                    <div className="overview-card">
                        <Book size={cardIconSize} className="my-auto" />
                        <p className="text-xl leading-8">
                            Decida a forma na qual você irá aplicar seus
                            conhecimentos
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

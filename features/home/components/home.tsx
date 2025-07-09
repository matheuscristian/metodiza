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
                <div className="flex justify-center items-center ">
                    <div>
                        <Image
                            src={"/svg/metodiza.svg"}
                            alt="logo"
                            width={logoSize}
                            height={logoSize}
                            className="transition-transform duration-250 hover:scale-110 cursor-pointer"
                        />
                        <p className="text-center text-[#D23579] font-bold text-4xl mt-5 text-shadow-[4px_4px] text-shadow-black">
                            Metodiza
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-10 bg-surface">
                <div className="w-full px-52 flex justify-around space-x-6" >
                    <div className="overview-card">
                        <PenSquare size={cardIconSize} className="my-auto" />
                        <p className="text-xl leading-8">
                            Faça sua anotações Escreva suas dúvidas Organize
                            suas ideias
                        </p>
                    </div>
                    <div className="overview-card">
                        <Clock size={cardIconSize} className="my-auto" />
                        <p className="text-xl leading-8 " >
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
            <div className="py-10 bg-surface">
                <div className="ml-23 mt-10">
                    <div className="flex">
                        <div className="mb-2">
                            <h2 className="text-[#35C0D2] font-bold text-5xl mb-2 ">Pomodiza  </h2>
                            <p className="text-2xl mb-2">
                                Dê resumo de estudos à criação de mapas<br></br>
                                mentais e projetos, com ferramentas <br></br>
                                essenciais da nossa plataforma.
                            </p>
                            <p className="text-2xl  " >
                                A técnica Pomodoro é uma estratégia <br></br>
                                simples para melhorar seu foco e sua<br></br>
                                produtividade. Ela divide seu tempo em <br></br>
                                blocos de trabalho focado, intercalados <br></br>
                                com pequenas pausas, ajudando você a,<br></br>
                                manter a concentração por mais tempo.
                            </p>

                        </div>
                        <div className="ml-30 mt-1">
                            <Image
                                src="/svg/pomodoro.jpg"
                                alt="po"
                                width={500}
                                height={500}
                                className="transition-transform duration-300 hover:scale-110 cursor-pointer bg-right"
                            />
                        </div>

                    </div>
                </div>
            </div>
            <div className="py-10 bg-surface">
                <div className="flex ml-17">
                    <div className="mt-5 " >
                        <Image
                            src="/svg/dicionario.jpg"
                            alt="po"
                            width={500}
                            height={500}
                            className="transition-transform duration-300 hover:scale-110 cursor-pointer bg-right"
                        />
                    </div>
                    <div className="mb-2 ml-32" >
                        <h2 className="text-[#35C0D2] font-bold text-5xl mb-2 ">Dicionário</h2>
                        <p className="text-2xl ">
                            Um dicionário é uma ferramenta que reúne<br></br>
                            palavras e seus significados, organizadas <br></br>
                            de forma clara e acessível. Ele serve para <br></br>
                            esclarecer dúvidas sobre termos, ortografia,<br></br>
                            pronúncia ou usos corretos. É essencial para<br></br>
                            ampliar o vocabulário e melhorar a<br></br>
                            compreensão de textos.
                        </p>
                    </div>
                </div>
            </div>
            <div className="py-10 bg-surface">
                <div className="flex ml-17 ">
                    <div className="mb-2 mt-6" >
                        <h2 className="text-[#35C0D2] font-bold text-5xl mb-2 ">Grafo</h2>
                        <p className="text-2xl mb-2">
                            O grafo é um abiente onde todos os temas<br></br>
                            estudados estão prensentes, organizados<br></br>
                            de forma única e encorajadora.
                        </p>
                        <p className="text-2xl  " >
                            Motivando o úsuario a cada vez mais estudar<br></br>
                            para completar e aumentar seu grafo.
                        </p>

                    </div>
                    <div className="ml-29 mt-1">
                        <Image
                            src="/svg/grafo.jpg"
                            alt="po"
                            width={500}
                            height={500}
                            className="transition-transform duration-300 hover:scale-110 cursor-pointer bg-right"
                        />
                    </div>
                </div>
            </div>
            <div className="py-10 bg-surface">
                <div className="flex ml-17">
                    <div className="" >
                        <Image
                            src="/svg/calendario.jpg"
                            alt="po"
                            width={500}
                            height={500}
                            className="transition-transform duration-300 hover:scale-110 cursor-pointer bg-right"
                        />
                    </div>
                    <div className="mb-2 ml-32" >
                        <h2 className="text-[#35C0D2] font-bold text-5xl mb-2 ">Calendário</h2>
                        <p className="text-2xl ">
                            Um calendário é um sistema de organização<br></br>
                            do tempo,dividido em dias, semanas, meses<br></br>
                            e anos.Ele serve para planejar e registrar<br></br>
                            eventos, compromissos e datas importantes.<br></br>
                            Facilita o controle de prazos, rotinas<br></br>
                            e atividades pessoais
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Book, Clock, PenSquare } from "lucide-react";
import Image from "next/image";
import "@/features/home/styles/home.css";

const logoSize = 300;
const cardIconSize = 25;

export default function Home() {
    return (
        <div className="text-text-primary min-h-screen">
            <div className="border-text-muted/25 grid h-screen grid-cols-2 border-b">
                <div className="bg-surface flex flex-col items-center justify-center">
                    <div>
                        <span>Bem-vindo a Metodiza!</span>
                        <h1 className="mt-3 text-2xl font-bold">
                            Turbine seus Estudos
                        </h1>
                        <p className="text-text-muted">
                            O sistema perfeito para periodizar seus estudos
                        </p>

                        <div className="mt-10 ml-11">
                            <div className="mb-8">
                                <h2 className="mb-2 text-xl font-bold text-[#35C0D2]">
                                    O que é a Metodiza?
                                </h2>
                                <p>
                                    Somos uma plataforma de gerenciamento de
                                    estudos online,<br></br> gratuito e flexível
                                    para seus conhecimentos!
                                </p>
                            </div>
                            <div>
                                <h2 className="mb-2 text-xl font-bold text-[#35C0D2]">
                                    Tire suas ideias do papel
                                </h2>
                                <p>
                                    Dê resumo de estudos à criação de
                                    mapas-mentais e <br></br>projetos, com
                                    ferramentas essenciais da nossa plataforma.
                                </p>
                            </div>

                            <button className="mt-10 cursor-pointer rounded-[5px] bg-[#35C0D2] px-25 py-5 text-white duration-100 will-change-transform hover:bg-[#4d8991] active:scale-[99%]">
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <div>
                        <Image
                            src={"/svg/metodiza.svg"}
                            alt="logo"
                            width={logoSize}
                            height={logoSize}
                            className="cursor-pointer transition-transform duration-250 hover:scale-110"
                        />
                        <p className="mt-5 text-center text-4xl font-bold text-[#D23579] text-shadow-[4px_4px] text-shadow-black">
                            Metodiza
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-surface py-10">
                <div className="flex w-full justify-around space-x-6 px-52">
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
            <div className="bg-surface space-y-24 p-10">
                <div className="mx-auto grid max-w-[1300px] grid-cols-2 gap-12">
                    <div className="mx-auto">
                        <h2 className="mb-2 text-3xl font-bold text-[#35C0D2]">
                            Pomodiza
                        </h2>
                        <p className="text-md leading-6">
                            Dê resumo de estudos à criação de mapas mentais e
                            projetos, com ferramentas essenciais da nossa
                            plataforma. A técnica Pomodoro é uma estratégia
                            simples para melhorar seu foco e sua produtividade.
                            Ela divide seu tempo em blocos de trabalho focado,
                            intercalados com pequenas pausas, ajudando você a,
                            manter a concentração por mais tempo.
                        </p>
                    </div>
                    <div className="mx-auto">
                        <Image
                            src="/jpg/pomodoro.jpg"
                            alt="Pomodoro"
                            width={500}
                            height={500}
                        />
                    </div>
                </div>

                <div className="mx-auto grid max-w-[1300px] grid-cols-2 gap-12">
                    <div className="mx-auto">
                        <Image
                            src="/jpg/dicionario.jpg"
                            alt="Dicionário"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="mx-auto">
                        <h2 className="mb-2 text-3xl font-bold text-[#35C0D2]">
                            Dicionário
                        </h2>
                        <p className="text-md leading-6">
                            Um dicionário é uma ferramenta que reúne palavras e
                            seus significados, organizadas de forma clara e
                            acessível. Ele serve para esclarecer dúvidas sobre
                            termos, ortografia, pronúncia ou usos corretos. É
                            essencial para ampliar o vocabulário e melhorar a
                            compreensão de textos.
                        </p>
                    </div>
                </div>

                <div className="mx-auto grid max-w-[1300px] grid-cols-2 gap-12">
                    <div className="mx-auto">
                        <h2 className="mb-2 text-3xl font-bold text-[#35C0D2]">
                            Grafo
                        </h2>
                        <p className="text-md leading-6">
                            O grafo é um abiente onde todos os temas estudados
                            estão prensentes, organizados de forma única e
                            encorajadora. Motivando o úsuario a cada vez mais
                            estudar para completar e aumentar seu grafo.
                        </p>
                    </div>
                    <div className="mx-auto">
                        <Image
                            src="/jpg/grafo.jpg"
                            alt="Grafo"
                            width={500}
                            height={500}
                        />
                    </div>
                </div>

                <div className="mx-auto grid max-w-[1300px] grid-cols-2 gap-12">
                    <div className="mx-auto">
                        <Image
                            src="/jpg/calendario.jpg"
                            alt="Calendário"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="mx-auto">
                        <h2 className="mb-2 text-3xl font-bold text-[#35C0D2]">
                            Calendário
                        </h2>
                        <p className="text-md leading-6">
                            Um calendário é um sistema de organização do
                            tempo,dividido em dias, semanas, meses e anos. Ele
                            serve para planejar e registrar eventos,
                            compromissos e datas importantes. Facilita o
                            controle de prazos, rotinas e atividades pessoais
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

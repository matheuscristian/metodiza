"use client";

import { useState } from "react";
import { Book, Calendar, File, Timer, Triangle, ArrowUp, ArrowDown } from "lucide-react";

export default function Home() {
  const tabs = [
    {
      title: "Bloco de notas",
      description:
        "O Bloco de Notas permite criar e visualizar anotações rápidas de forma prática e imediata, sem precisar trocar de tela.",
      image: "jpg/anotacao.png",
    },
    {
      title: "Calendário",
      description:
        "Visualize e planeje suas tarefas diárias e semanais com o nosso calendário integrado.",
      image: "jpg/calendario.jpg",
    },
    {
      title: "Dicionário",
      description:
        "Pesquise termos e conceitos importantes sem sair da página. Nosso dicionário é atualizado constantemente com novos conteúdos.",
      image: "jpg/dicionario.jpg",
    },
    {
      title: "Gráfo",
      description:
        "Veja conexões entre ideias e conteúdos com mapas visuais. Ideal para estudos, projetos e planejamento de tarefas complexas.",
      image: "jpg/grafo.jpg",
    },
    {
      title: "Pomodoro",
      description:
        "Use a técnica Pomodoro para manter o foco e a produtividade. Configure o tempo, acompanhe suas sessões e visualize seu histórico.",
      image: "jpg/pomodoro.jpg",
    },
  ];

  // Guarda qual item está aberto (índice)
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-[#15161a] text-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-15 py-10">
        <div className="flex items-center space-x-3">
          <div className="">
            <img
              src="svg/metodiza.svg"
              alt="Logo Metodiza"
              className="w-12 h-12"
            />
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <span className="text-gray-300 hover:text-white cursor-pointer">Início</span>
          <button className="px-5 py-2 border border-gray-500 rounded hover:bg-cyan-500">
            Entrar
          </button>
        </div>
      </nav>

      {/* Conteudos - Pagina*/}
      <section className="mt-10 max-w-2xl mx-auto px-4 text-left">
        <h1 className="text-5xl font-bold text-white text-center">
          Turbine seus estudos
        </h1>
        <p className="mt-2 text-gray-400 text-center text-lg font-light">
          O sistema perfeito para periodizar seus estudos
        </p>

        <div className="mt-6">
          <p className="text-cyan-400 font-semibold text-xl">
            O que é a Metodiza?
          </p>
          <p className="text-gray-300 leading-relaxed text-lg">
            Somos uma plataforma de gerenciamento de estudos online, gratuita e flexível para seus conhecimentos!
          </p>
        </div>

        <div className="mt-4">
          <p className="text-cyan-400 font-semibold text-xl">
            Tire suas ideias do papel
          </p>
          <p className="text-gray-300 leading-relaxed text-lg">
            De resumo de estudos à criação de mapas mentais e projetos, com ferramentas essenciais da nossa plataforma.
          </p>
        </div>

        <div className="mt-6 flex justify-center pb-15">
          <button className="px-8 py-2 bg-cyan-500 text-white font-medium rounded hover:bg-cyan-700 transition">
            Começar grátis
          </button>
        </div>
      </section>


      {/*bloco de 3 informações*/}
      <section className="max-w-5xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[500px]">
      <div className="bg-[#3C3F46] rounded-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-white text-3xl uppercase pl-4">
            Comece na <br /> Metodiza
          </h2>
          <p className="text-gray-300 text-lg mt-1 font-light pl-4">
            O Metodiza está sempre em casa, no  <br /> seu navegador
          </p>

           <ul className="mt-9 space-y-6 pl-4">
              <li className="flex items-center space-x-3">
                  <img src="png/chrome.png" alt="Chrome" className="w-9 h-9" />
                  <span className="text-white font-light pl-2">Chrome</span>
              </li>
              <li className="flex items-center space-x-3">
                  <img src="png/firefox.png" alt="Firefox" className="w-9 h-9" />
                  <span className="text-white font-light pl-2">Firefox</span>
              </li>
              <li className="flex items-center space-x-3">
                  <img src="png/edge.png" alt="Microsoft Edge" className="w-9 h-9" />
                  <span className="text-white font-light pl-2">Microsoft Edge</span>
              </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-rows-2 gap-4">
        <div className="bg-[#3C3F46] rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-white text-3xl uppercase pl-4">
              Simplifique suas <br /> Anotações
            </h2>
            <p className="text-gray-300 text-lg mt-1 font-light pl-4">
              Mais produtividade, menos ferramentas
            </p>
          </div>
          <div className="mt-4 flex space-x-5 text-gray-400 text-lg justify-end mb-3">
            <File size={25} />
            <Calendar size={25} />
            <Triangle size={25} />
            <Book size={25} />
            <Timer size={25} />
          </div>
        </div>

        <div className="bg-[#3C3F46] rounded-lg p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-white text-3xl uppercase pl-4">
              Crie sua conta <br /> Grátis
            </h2>
            <p className="text-gray-300 text-lg mt-1 font-light pl-4">
              Aproveite ferramentas poderosas gratuitamente
            </p>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="bg-[#00C2FF] text-white px-6 py-2 rounded-md text-mt font-medium hover:bg-cyan-700">
              Criar conta
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="mt-25 text-center max-w-4xl mx-auto px-4 mb-25">
      <p className="text-white-300 text-4xl leading-relaxed">
        Metodiza é uma ferramenta poderosa para gerenciar suas tarefas ao lado de todas as informações com as quais você trabalha diariamente.
      </p>
      <p className="mt-5 text-gray-400 text-2xl">Inc. Teixeiras</p>
    </section>


    {/* Informações das paginas */}
    <section className="grid grid-cols-2 gap-6 mt-12 max-w-6xl mx-auto px-9">
      <div className="p-4">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <div key={tab.title} className="mb-2">
              <button
                onClick={() =>
                  setActiveIndex(isActive ? -1 : index) // se já está aberto, fecha; se não, abre
                }
                className={`w-full text-left px-3 py-2 rounded flex items-center justify-between hover:bg-gray-700 transition ${
                  isActive ? "" : ""
                }`}
              >
                <span className="text-lg">{tab.title}</span>
                  {isActive ? (
                    <ArrowUp size={24} className="w-3 h-3" />
                  ) : (
                    <ArrowDown size={24} className="w-3 h-3" />
                  )}
              </button>
              {isActive && (
                <p className="text-md text-gray-400 mt-2 px-3 pb-2">{tab.description}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded min-h-[300px]">
        {activeIndex >= 0 ? (
          <>
            <img
              src={tabs[activeIndex].image}
              alt={tabs[activeIndex].title}
              className="w-full h-full object-cover rounded"
            />
          </>
        ) : (
          <p className="text-gray-500 text-sm"></p>
        )}
      </div>
    </section>
      
    {/* Footer */}

    <footer className="text-gray-400 py-15 mt-15">
      <div className="max-w-6xl mx-auto px-4">
        <hr className="border-gray-700 mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <img src="svg/metodiza.svg" alt="Metodiza" className="w-8 h-8" />
              <span className="text-white font-medium">Metodiza</span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-y-1 text-sm">
              <span>Discord</span>
              <span>Twitter</span>
              <span>Threads</span>
              <span>YouTube</span>
              <span>GitHub</span>
              <span>LinkedIn</span>
            </div>

            <p className="text-xs mt-3">© 2025 Metodiza</p>
          </div>

          <div className="">
            <h3 className="text-white font-medium mb-2">Empresa</h3>
            <ul className="space-y-1 text-sm">
              <li>Sobre nós</li>
              <li>Segurança</li>
              <li>Termos e privacidade</li>
              <li>Seus direitos de privacidade</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-2">Recursos</h3>
            <ul className="space-y-1 text-sm">
              <li>Central de ajuda</li>
              <li>Comunidade</li>
              <li>Fale conosco</li>
              <li>Ajuda</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    </div>
  );
}
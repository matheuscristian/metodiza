"use client";
import { useState } from "react";
import Timer from "./timer";
import Image from "next/image";
import Task from "./task";
import TaskItem from "./taskItem";
import ResumoFinal from "./resumo";

export default function Page() {
    const [mode, setMode] = useState<"pomodoro" | "short" | "long">("pomodoro");
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutos
    const [shortBreakTime, setShortBreakTime] = useState(10 * 60);
    const [longBreakTime, setLongBreakTime] = useState(15 * 60);
    // const [tasks, setTasks] = useState<{ name: string; done: number; total: number }[]>([]);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    const [selecionaTarefa, setSelecionaTarefa] = useState<number | null>(null);

    type Cycle = { duration: number; completedAt: Date };

    type Task = {
        name: string;
        cycles: Cycle[];
        total: number;
    };
    const [tasks, setTasks] = useState<Task[]>([]);

    const getSetting = () => {
        switch (mode) {
            case "short":
                return { duration: shortBreakTime, color: "text-blue-400" };
            case "long":
                return { duration: longBreakTime, color: "text-blue-400" };
            default:
                return { duration: pomodoroTime, color: "text-white" };
        }
    };

    const { duration, color } = getSetting();

    return (
        <div className="mx-auto w-full overflow-y-auto px-4">
            {/*Tempo dos pomos */}
            <div className="flex justify-center space-x-10 pt-10">
                <h1
                    onClick={() => setMode("pomodoro")}
                    className={`cursor-pointer underline underline-offset-7 hover:text-cyan-400 ${mode === "pomodoro" ? "text-cyan-300" : ""}`}
                >
                    Pomodoro
                </h1>
                <h1
                    onClick={() => setMode("short")}
                    className={`cursor-pointer underline underline-offset-7 hover:text-cyan-400 ${mode === "short" ? "text-cyan-400" : ""}`}
                >
                    Pausa curta
                </h1>
                <h1
                    onClick={() => setMode("long")}
                    className={`cursor-pointer underline underline-offset-7 hover:text-cyan-400 ${mode === "long" ? "text-cyan-400" : ""}`}
                >
                    Pausa Longa
                </h1>
            </div>

            <Timer
                key={mode}
                DURATION={duration}
                colorClass={color}
                onComplete={() => {
                    if (mode === "pomodoro" && selecionaTarefa !== null) {
                        const updated = [...tasks];
                        if (
                            updated[selecionaTarefa].cycles.length <
                            updated[selecionaTarefa].total
                        ) {
                            updated[selecionaTarefa].cycles.push({
                                duration: pomodoroTime,
                                completedAt: new Date(),
                            });
                            setTasks(updated);
                        }
                    }
                }}
            />

            {/* Parte pra adiconar tarefas*/}
            <div className="mt-8 flex w-full flex-col items-center">
                <div className="flex w-full max-w-md items-center justify-between px-4">
                    <h1>TAREFAS</h1>
                    <Image
                        src="/svg/editarPomodoro.svg"
                        alt="Ícone"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={() => setShowTaskModal(true)}
                        title="Adicionar tarefas"
                    />
                </div>
                <hr className="mt-2 w-full max-w-lg border-t border-cyan-400" />
            </div>
            <Task
                isOpen={showTaskModal}
                onClose={() => setShowTaskModal(false)}
                pomodoro={pomodoroTime / 60}
                short={shortBreakTime / 60}
                long={longBreakTime / 60}
                setPomodoro={(min: number) => setPomodoroTime(min * 60)}
                setShort={(min: number) => setShortBreakTime(min * 60)}
                setLong={(min: number) => setLongBreakTime(min * 60)}
                tasks={tasks}
                setTasks={setTasks}
            />

            <div className="mt-4 flex w-full flex-col items-center">
                {tasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        name={task.name}
                        cycles={task.cycles}
                        total={task.total}
                        onIncrement={() => {
                            const updated = [...tasks];
                            if (
                                updated[index].cycles.length <
                                updated[index].total
                            ) {
                                updated[index].cycles.push({
                                    duration: pomodoroTime,
                                    completedAt: new Date(),
                                });
                                setTasks(updated);
                            }
                        }}
                        onDelete={() => setTaskToDelete(index)}
                        onEdit={({ name, total }) => {
                            const updated = [...tasks];
                            updated[index] = { ...updated[index], name, total };
                            setTasks(updated);
                        }}
                        onSelect={() => setSelecionaTarefa(index)}
                        isSelected={selecionaTarefa === index}
                    />
                ))}

                {/**Resumo dos tempos */}
                <section className="mt-10">
                    <ResumoFinal tasks={tasks} tempoPomodoro={pomodoroTime} />
                </section>

                {/*Pra confirmar o delete */}
                {taskToDelete !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="w-full max-w-xs rounded-xl bg-[#1f2127] p-6 text-center shadow-xl">
                            <h2 className="mb-4 text-lg font-bold text-white">
                                Tem certeza que deseja apagar{" "}
                                <span className="text-cyan-300">
                                    "{tasks[taskToDelete!]?.name}"
                                </span>
                                ?
                            </h2>
                            <div className="flex justify-center space-x-4">
                                <button
                                    className="rounded bg-cyan-500 px-4 py-2 text-black hover:bg-cyan-600"
                                    onClick={() => setTaskToDelete(null)}
                                >
                                    Cancelar{" "}
                                </button>
                                <button
                                    className="rounded bg-red-500 px-5 py-2 text-white hover:bg-red-600"
                                    onClick={() => {
                                        const updated = tasks.filter(
                                            (_, i) => i !== taskToDelete,
                                        );
                                        setTasks(updated);
                                        setTaskToDelete(null);
                                    }}
                                >
                                    {" "}
                                    Apagar{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <section className="mt-16 w-full bg-[#37373A] px-6 py-10">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-6 text-center text-xl sm:text-2xl">
                        Aumente sua Produtividade com a Técnica Pomodoro
                    </h2>
                    <p className="mb-4 text-justify text-sm sm:text-base">
                        A Técnica Pomodoro é uma estratégia simples para
                        melhorar seu foco e sua produtividade. Ela divide seu
                        tempo em blocos de trabalho focado, intercalados com
                        pequenos pausas, ajudando você a manter a concentração
                        por mais tempo.
                    </p>
                    <p className="mb-4 text-justify text-sm sm:text-base">
                        Nosso cérebro tem um limite natural de atenção; em
                        média, conseguimos focar plenamente por cerca de 20
                        minutos. Ao repetir esse ciclo, fica muito mais fácil se
                        concentrar, ser produtivo e evitar o cansaço mental.
                    </p>
                    <div className="mb-4 text-justify text-sm sm:text-base">
                        <p className="font-semibold">Como usar:</p>
                        <ol className="mt-2 list-inside list-decimal space-y-1">
                            <li>Liste suas tarefas.</li>
                            <li>Defina quantos pomodoros cada uma precisa.</li>
                            <li>Inicie o cronômetro e foque por 25 minutos.</li>
                            <li>Faça uma pausa curta e repita.</li>
                        </ol>
                    </div>
                    <p className="text-justify text-sm sm:text-base">
                        Use o Pomodoro e transforme tempo em produtividade,
                        melhorando sua concentração, sua organização e seus
                        resultados.
                    </p>
                </div>
            </section>
        </div>
    );
}

{
    /**
    ?imprimir relatorio?
*/
}

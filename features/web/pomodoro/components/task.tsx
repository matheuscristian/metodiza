"use client";
import { useEffect, useState } from "react";

type Cycle = {
    duration: number;
    completedAt: Date;
};

type Task = {
    name: string;
    cycles: Cycle[];
    total: number;
};

export default function Task({
    isOpen,
    onClose,
    pomodoro,
    short,
    long,
    setPomodoro,
    setShort,
    setLong,
    tasks,
    setTasks,
}: {
    isOpen: boolean;
    onClose: () => void;
    pomodoro: number;
    short: number;
    long: number;
    setPomodoro: (min: number) => void;
    setShort: (min: number) => void;
    setLong: (min: number) => void;
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}) {
    const [localPomodoro, setLocalPomodoro] = useState(pomodoro);
    const [localShort, setLocalShort] = useState(short);
    const [localLong, setLocalLong] = useState(long);

    const [novaTask, setnovaTask] = useState(false);
    const [novoNomeTask, setnovoNomeTask] = useState("");
    const [cicloTask, setcicloTask] = useState(1);

    useEffect(() => {
        if (isOpen) {
            setLocalPomodoro(pomodoro);
            setLocalShort(short);
            setLocalLong(long);
        }
    }, [isOpen, pomodoro, short, long]);

    const salvarConfiguracoes = () => {
        if (localPomodoro > 0 && localShort > 0 && localLong > 0) {
            setPomodoro(localPomodoro);
            setShort(localShort);
            setLong(localLong);
            onClose();
        } else {
            alert("ERRO! Não é possivel tempos negativos ");
        }
    };

    const handleAddTask = () => {
        if (!novoNomeTask.trim()) return;
        const newTask = {
            name: novoNomeTask.trim(),
            total: cicloTask,
            cycles: [],
        };

        setTasks([...tasks, newTask]);
        setnovoNomeTask("");
        setcicloTask(1);
        setnovaTask(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative w-[400px] rounded-xl bg-[#1f2127] p-7 text-white">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl text-gray-400 hover:text-white"
                >
                    ×
                </button>
                <h2 className="mb-2 text-sm text-gray-400">Editar Pomodoro</h2>

                {/* Tempos */}
                <div className="mb-4 border-t border-gray-500 pt-2">
                    <div className="mb-2 text-xs text-gray-300 uppercase">
                        Tempo
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div>
                            <div>Pomodoro</div>
                            <input
                                type="number"
                                min={1}
                                value={localPomodoro}
                                onChange={(e) =>
                                    setLocalPomodoro(Number(e.target.value))
                                }
                                className="w-full border-none bg-transparent text-center text-white"
                            />
                        </div>
                        <div>
                            <div>Pausa curta</div>
                            <input
                                type="number"
                                min={1}
                                value={localShort}
                                onChange={(e) =>
                                    setLocalShort(Number(e.target.value))
                                }
                                className="w-full border-none bg-transparent text-center text-white"
                            />
                        </div>
                        <div>
                            <div>Pausa longa</div>
                            <input
                                type="number"
                                min={1}
                                value={localLong}
                                onChange={(e) =>
                                    setLocalLong(Number(e.target.value))
                                }
                                className="w-full border-none bg-transparent text-center text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* ----------- Tarefas */}
                <div className="border-t border-gray-500 pt-2">
                    <div className="mb-2 text-xs text-gray-300 uppercase">
                        Tarefas
                    </div>
                    <ul className="space-y-1 text-sm">
                        {tasks.map((task, index) => (
                            <li key={index} className="flex justify-between">
                                <span>{task.name}</span>
                                <span>
                                    {task.cycles.length}/{task.total}
                                </span>
                            </li>
                        ))}

                        {/* ----------- Formulário de nova tarefa */}
                        {novaTask ? (
                            <li className="flex flex-col space-y-2">
                                <input
                                    type="text"
                                    placeholder="Nome da tarefa"
                                    value={novoNomeTask}
                                    onChange={(e) =>
                                        setnovoNomeTask(e.target.value)
                                    }
                                    className="rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm text-white"
                                />
                                <input
                                    type="number"
                                    min={1}
                                    value={cicloTask}
                                    onChange={(e) =>
                                        setcicloTask(Number(e.target.value))
                                    }
                                    className="rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm text-white"
                                    placeholder="Pomodoros"
                                />
                                <div className="flex justify-end gap-2 text-sm">
                                    <button
                                        onClick={() => setnovaTask(false)}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleAddTask}
                                        className="text-cyan-400 hover:text-cyan-200"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <li
                                className="cursor-pointer pt-2 text-gray-400 italic hover:text-white"
                                onClick={() => setnovaTask(true)}
                            >
                                Adicionar tarefa
                            </li>
                        )}
                    </ul>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={salvarConfiguracoes}
                        className="mt-6 w-40 rounded-lg border border-cyan-400 py-2 text-white transition hover:bg-cyan-500"
                    >
                        SALVAR
                    </button>
                </div>
            </div>
        </div>
    );
}

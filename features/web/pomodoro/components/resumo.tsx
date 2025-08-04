"use client";
import { useMemo } from "react";

function formatTempo(segundos: number) {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min}m ${seg}s`;
}

type Cycle = {
    duration: number;
    completedAt: Date;
};

type Task = {
    name: string;
    cycles: Cycle[];
    total: number;
};

export default function Resumo({
    tasks,
    tempoPomodoro,
}: {
    tasks: Task[];
    tempoPomodoro: number;
}) {
    const data = useMemo(() => {
        const feitos = tasks.reduce((acc, task) => acc + task.cycles.length, 0);
        const total = tasks.reduce((acc, task) => acc + task.total, 0);
        const concluido = tasks.reduce(
            (acc, task) =>
                acc +
                task.cycles.reduce((soma, ciclo) => soma + ciclo.duration, 0),
            0,
        );

        const restante = (total - feitos) * tempoPomodoro;

        return {
            feitos,
            total,
            concluido,
            restante,
        };
    }, [tasks, tempoPomodoro]);

    return (
        <div className="mx-auto flex flex-col items-center gap-5 rounded-xl border border-cyan-500 px-8 py-4 text-white sm:flex-row">
            <div>
                Pomodoros: {data.feitos}/{data.total}
            </div>
            <div>
                Tempo concluído: {formatTempo(data.concluido)} <br />
                Tempo restante: {formatTempo(data.restante)}
            </div>
        </div>
    );
}

"use client";

import useTimerStore from "@/features/web/pomodoro/stores/timerStore";
import { Plus } from "lucide-react";
import { renderToString } from "react-dom/server";
import Swal from "sweetalert2";

export default function AddTaskTrigger() {
    const addTask = useTimerStore((s) => s.addTask);
    const selectTask = useTimerStore((s) => s.setSelectedTask);

    async function showDialog() {
        const res = await Swal.fire<{ name: string; cicles: number }>({
            title: "Nova tarefa",
            html: renderToString(
                <>
                    <div className="mb-5 flex flex-col gap-2">
                        <input
                            name="task-name"
                            id="task-name-input"
                            type="text"
                            className="swal2-input !m-0 !w-full !text-sm"
                            placeholder="Nome da tarefa"
                        />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="task-cicles-input" className="text-sm">
                            Ciclos
                        </label>
                        <input
                            name="task-cicles"
                            id="task-cicles-input"
                            type="number"
                            className="swal2-input !m-0 !w-[50%] !text-sm"
                        />
                    </div>
                </>,
            ),
            focusConfirm: false,
            showCancelButton: true,
            preConfirm() {
                const name = (
                    document.getElementById(
                        "task-name-input",
                    ) as HTMLInputElement
                ).value;

                let cicles = Number.parseInt(
                    (
                        document.getElementById(
                            "task-cicles-input",
                        ) as HTMLInputElement
                    ).value,
                );

                if (Number.isNaN(cicles) || cicles < 1) cicles = 1;

                return { name, cicles };
            },
        });

        if (!res.isConfirmed || !res.value) return;

        const { name, cicles } = res.value;

        if (!name || !cicles) return;

        addTask(name, {
            cicles,
            completed: false,
            completedCicles: 0,
        });

        selectTask(name);
    }

    return (
        <button
            className="text-text-muted hover:text-text-primary cursor-pointer"
            onClick={showDialog}
        >
            <Plus size={15} />
        </button>
    );
}

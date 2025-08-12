"use client";

import { getTasks } from "@/features/web/pomodoro/actions/timerActions";
import useTimerStore from "@/features/web/pomodoro/stores/timerStore";
import cn from "@/libs/utils/cn";
import { CircleCheck, Trash } from "lucide-react";
import { useEffect } from "react";

function Task({
    name,
    completedCicles,
    cicles,
    selected,
    completed,
}: {
    name: string;
    completedCicles: number;
    cicles: number;
    selected?: boolean;
    completed?: boolean;
}) {
    const selectTask = useTimerStore((s) => s.setSelectedTask);
    const deleteTask = useTimerStore((s) => s.deleteTask);

    return (
        <div
            className={cn(
                "bg-border flex cursor-pointer rounded-md brightness-75",
                selected && "brightness-100",
            )}
            onClick={() => selectTask(!selected ? name : null)}
        >
            <div
                className={cn(
                    "w-[5px] rounded-l-md",
                    selected && "bg-accent-focus",
                )}
            />
            <div className="flex w-full items-center justify-between p-3">
                <CircleCheck
                    size={15}
                    className={cn("mr-2", completed && "fill-green-700")}
                />
                <span className="text-sm">{name}</span>
                <div className="ml-auto flex items-center justify-between gap-2">
                    <span className="text-text-muted text-sm">
                        {completedCicles}/{cicles}
                    </span>
                    <Trash
                        className="text-text-muted hover:text-text-primary cursor-pointer"
                        size={15}
                        onClick={() => deleteTask(name)}
                    />
                </div>
            </div>
        </div>
    );
}

export default function TaskList() {
    const tasks = useTimerStore((s) => s.tasks);
    const selectedTask = useTimerStore((s) => s.selectedTask);
    const setTask = useTimerStore((s) => s.setTask);

    useEffect(() => {
        getTasks().then((tasks) =>
            tasks.forEach((task) => setTask(task.name, task)),
        );
    }, [setTask]);

    return (
        <div className="h-full space-y-3 overflow-y-auto">
            {Object.keys(tasks)
                .sort((a) => (a === selectedTask ? -1 : 1))
                .map((taskName, i) => (
                    <Task
                        key={i}
                        name={taskName}
                        completedCicles={tasks[taskName].completedCicles}
                        cicles={tasks[taskName].cicles}
                        selected={taskName === selectedTask}
                        completed={tasks[taskName].completed}
                    />
                ))}
        </div>
    );
}

"use client";

import useTimerStore from "@/features/web/pomodoro/stores/timerStore";
import cn from "@/libs/utils/cn";

export default function StateSelector() {
    const currentState = useTimerStore((s) => s.currentState);
    const setTimerState = useTimerStore((s) => s.setCurrentState);

    return (
        <div className="flex w-full justify-between gap-5">
            <span
                className={cn(
                    "cursor-pointer rounded-sm px-3 py-1",
                    currentState === "task" && "bg-accent-focus/25",
                )}
                onClick={() => setTimerState("task")}
            >
                Pomodoro
            </span>
            <span
                className={cn(
                    "cursor-pointer rounded-sm px-3 py-1",
                    currentState === "short break" && "bg-accent-focus/25",
                )}
                onClick={() => setTimerState("short break")}
            >
                Pausa curta
            </span>
            <span
                className={cn(
                    "cursor-pointer rounded-sm px-3 py-1",
                    currentState === "long break" && "bg-accent-focus/25",
                )}
                onClick={() => setTimerState("long break")}
            >
                Pausa longa
            </span>
        </div>
    );
}

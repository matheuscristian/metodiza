"use client";

import useTimerStore from "@/features/web/pomodoro/stores/timerStore";
import cn from "@/libs/utils/cn";
import { Pause, Play, SkipForward, TimerReset } from "lucide-react";

export default function TimerControls() {
    const isRunning = useTimerStore((s) => s.running);
    const toggleRunning = useTimerStore((s) => s.toggleRunning);
    const resetTimer = useTimerStore((s) => s.resetTimer);
    const skipPhase = useTimerStore((s) => s.skipPhase);

    return (
        <div className="flex w-full justify-around">
            <button
                onClick={resetTimer}
                className="text-text-muted hover:text-text-primary cursor-pointer"
            >
                <TimerReset width={20} />
            </button>
            <button
                className={cn(
                    "w-[150px] cursor-pointer rounded-sm px-10 py-2 shadow-2xl hover:brightness-85",
                    isRunning ? "bg-accent-tertiary" : "bg-accent-secondary",
                )}
                onClick={toggleRunning}
            >
                {isRunning ? (
                    <Pause width={20} className="mx-auto" />
                ) : (
                    <Play width={20} className="mx-auto" />
                )}
            </button>
            <button
                onClick={skipPhase}
                className="text-text-muted hover:text-text-primary cursor-pointer"
            >
                <SkipForward width={20} />
            </button>
        </div>
    );
}

"use client";

import useTimerStore from "@/features/web/pomodoro/stores/timerStore";
import { useEffect, useRef } from "react";

export default function Timer() {
    const time = useTimerStore((s) => s.time);
    const updateTime = useTimerStore((s) => s.updateTime);
    const running = useTimerStore((s) => s.running);
    const finishCycle = useTimerStore((s) => s.finishCycle);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        if (!running) return;

        intervalRef.current = setTimeout(() => {
            const newTime = { min: time.min, sec: time.sec };

            newTime.sec--;

            if (newTime.sec === -1) {
                newTime.min--;
                newTime.sec = 59;
            }

            // Completed cicle
            if (newTime.min === -1) {
                finishCycle();
                return;
            }

            updateTime(newTime);
        }, 1000);
    }, [running, time, finishCycle, updateTime]);

    return (
        <div className="border-accent-primary flex aspect-square w-[200px] items-center justify-center rounded-full border-2">
            <span className="text-5xl">
                {time?.min.toString().padStart(2, "0")}:
                {time?.sec.toString().padStart(2, "0")}
            </span>
        </div>
    );
}

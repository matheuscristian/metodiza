"use client";

import useTimerStore from "@/features/web/pomodoro/stores/timerStore";

export default function Timer() {
    const time = useTimerStore((s) => s.time);

    return (
        <div className="border-accent-primary flex aspect-square w-[200px] items-center justify-center rounded-full border-2">
            <span className="text-5xl">
                {time?.min.toString().padStart(2, "0")}:
                {time?.sec.toString().padStart(2, "0")}
            </span>
        </div>
    );
}

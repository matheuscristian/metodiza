import cn from "@/libs/utils/cn";
import React from "react";

export default function MonthGrid({
    days,
    className,
}: {
    days: number[];
    className?: string;
}) {
    return (
        <div
            className={cn("grid size-full grid-cols-7 grid-rows-5", className)}
        >
            {days.map((day, i) => (
                <div
                    key={i}
                    className={cn(
                        "bg-border border-accent-primary/50 border-1 relative aspect-square",
                        day >= 0 ? "text-text-primary" : "text-text-muted",
                        i == 0 && "rounded-tl-xl",
                        i == 6 && "rounded-tr-xl",
                        i == 28 && "rounded-bl-xl",
                        i == days.length - 1 && "rounded-br-xl",
                    )}
                >
                    <span className="absolute top-1 right-2">
                        {Math.abs(day)}
                    </span>
                </div>
            ))}
        </div>
    );
}

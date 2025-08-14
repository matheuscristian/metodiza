import cn from "@/libs/utils/cn";
import React from "react";

export default function MonthGrid({
    days,
    className,
    onDayClick, // Nova prop para lidar com cliques
}: {
    days: number[];
    className?: string;
    onDayClick?: (day: number) => void;
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
                        day > 0 && "cursor-pointer" // Adiciona cursor pointer para dias clicáveis
                    )}
                    onClick={() => {
                        // Chama o handler apenas para dias válidos
                        if (day > 0 && onDayClick) {
                            onDayClick(day);
                        }
                    }}
                >
                    <span className="absolute top-1 right-2">
                        {Math.abs(day)}
                    </span>
                </div>
            ))}
        </div>
    );
}
"use client";
import { useState, useEffect, useRef } from "react";

export default function Timer({ DURATION, colorClass, onComplete }: TimeProps) {
    const [seconds, setSeconds] = useState(DURATION);
    const [executando, setExecutando] = useState(false);
    const [pausado, setPausado] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        setSeconds(DURATION);
    }, [DURATION]);

    useEffect(() => {
        if (executando && seconds > 0) {
            intervalRef.current = window.setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [executando]);

    useEffect(() => {
        //chama onComplete uma única vez
        if (seconds === 0 && executando) {
            setExecutando(false);
            setSeconds(DURATION);
            onComplete?.();
        }
    }, [seconds, executando, onComplete]);

    const formatTime = (s: number) => {
        const min = Math.floor(s / 60);
        const sec = s % 60;
        return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    };

    const handlePause = () => {
        setExecutando(false);
        setPausado(true);
    };

    const handleStart = () => {
        setExecutando(true);
        setPausado(false);
    };

    const handleReset = () => {
        setSeconds(DURATION);
        setExecutando(false);
        setPausado(false);
    };

    return (
        <div className="flex flex-col items-center space-y-6 pt-15">
            {/* TEMPO */}
            <div className="flex h-50 w-50 items-center justify-center rounded-full border-2 border-cyan-400">
                <div className={`text-6xl ${colorClass}`}>
                    {formatTime(seconds)}
                </div>
            </div>

            {/* BOTÕES*/}
            <div className="space-y-4 text-center">
                {!executando && !pausado && (
                    <button
                        onClick={handleStart}
                        className="rounded-2xl bg-cyan-500 px-8 py-2 text-white hover:bg-cyan-300"
                    >
                        COMEÇAR
                    </button>
                )}

                {executando && (
                    <button
                        onClick={handlePause}
                        className="rounded-2xl bg-pink-500 px-12 py-2 text-white hover:bg-pink-300"
                    >
                        Pausar
                    </button>
                )}

                {!executando && pausado && (
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={handleStart}
                            className="rounded-2xl bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600"
                        >
                            Voltar
                        </button>
                        <button
                            onClick={handleReset}
                            className="rounded-2xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        >
                            Reiniciar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

interface TimeProps {
    DURATION: number;
    colorClass: string;
    onComplete?: () => void;
}

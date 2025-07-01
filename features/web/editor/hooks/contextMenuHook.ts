"use client";

import { Position } from "@/types/features/web/editor/hooks/contextMenu";
import { MouseEvent, useEffect, useState } from "react";

export default function useContextMenu(): [
    Position | null,
    HTMLElement | null,
    (e: MouseEvent) => void,
    () => void,
] {
    const [pos, setPos] = useState<Position | null>(null);
    const [target, setTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        function handleClick() {
            hide();
        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    function show(e: MouseEvent) {
        setPos({ x: e.pageX, y: e.pageY });
        setTarget(e.target as HTMLElement);
    }

    function hide() {
        setPos(null);
    }

    return [pos, target, show, hide];
}

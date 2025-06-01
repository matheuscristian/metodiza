"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
    const navDestinations = [
        { icon: "/notes.svg", path: "/app/notes", label: "Notas" },
        { icon: "/agenda.svg", path: "/app/agenda", label: "Agenda" },
        { icon: "/graph.svg", path: "/app/graph", label: "Grafo" },
        { icon: "/dictionary.svg", path: "/app/dictionary", label: "Dicionário" },
        { icon: "/pomodoro.svg", path: "/app/pomodoro", label: "Pomodoro Timer" },
    ];

    const pathName = usePathname();

    return (
        <nav className="flex h-screen w-16 flex-col items-center border-r border-black/25 bg-[var(--bg-2)] py-4">
            <Link href="/" className="mb-4">
                <Button variant="ghost" size="icon" className="hover:bg-[var(--bg-2)]">
                    <Image src="/logo.svg" alt="Logo" width={36} height={36} />
                </Button>
            </Link>

            <ul className="flex flex-col space-y-2">
                {navDestinations.map((item) => {
                    const isActive = pathName.includes(item.path);
                    return (
                        <li key={item.path}>
                            <Tooltip disableHoverableContent delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                            "h-12 w-12 transition-all hover:bg-[var(--bg-2)] hover:opacity-100",
                                            isActive ? "scale-110 opacity-100" : "scale-100 opacity-50"
                                        )}
                                    >
                                        <Link href={item.path}>
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                width={28}
                                                height={28}
                                                className={cn(
                                                    "opacity-80 transition-opacity",
                                                    isActive && "opacity-100"
                                                )}
                                            />
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={10}>
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

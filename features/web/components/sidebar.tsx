"use client";

import Image from "next/image";
import { AlarmClock, BookA, Calendar, Notebook, Waypoints } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "@/libs/utils/cn";
import { useEffect } from "react";
import useContextMenuStore from "@/libs/contextMenu/stores/contextMenuStore";
import LogoMenu from "@/features/web/components/logoMenu";
import useTimerStore from "@/features/web/pomodoro/stores/timerStore";
import { TimerState } from "@/types/features/web/pomodoro/stores/timerStore";

const logoSize = 35;

const iconSize = 27;
const iconStrokeWidth = 1.5;

const navigation = {
    editor: "/web/editor",
    graph: "/web/graph",
    calendar: "/web/calendar",
    dictionary: "/web/dictionary",
    pomodoro: "/web/pomodoro",
};

const stateNames: Record<TimerState, string> = {
    task: "P",
    "short break": "PC",
    "long break": "PL",
};

export default function SideBar() {
    const pathName = usePathname();
    const registerContextMenu = useContextMenuStore((s) => s.register);

    const time = useTimerStore((s) => s.time);
    const task = useTimerStore((s) =>
        s.selectedTask ? s.tasks[s.selectedTask] : null,
    );
    const timerState = useTimerStore((s) => s.currentState);

    useEffect(() => {
        registerContextMenu("logo", LogoMenu);
    }, [registerContextMenu]);

    return (
        <div className="bg-surface border-border flex h-screen w-[55px] flex-col items-center border-r">
            <div className="mb-3 cursor-pointer py-3 transition-transform transform-3d hover:scale-105">
                <Image
                    src="/svg/metodiza.svg"
                    alt="Logo"
                    width={logoSize}
                    height={logoSize}
                    className="mx-auto"
                    data-menu-name="logo"
                />
            </div>
            <div className="[&_svg]:text-text-muted [&_svg]:hover:text-text-primary flex flex-col items-center gap-7 [&_svg]:cursor-pointer">
                <Link href={navigation.editor}>
                    <Notebook
                        size={iconSize}
                        strokeWidth={iconStrokeWidth}
                        className={checkSelected(pathName, navigation.editor)}
                    />
                </Link>
                <Link href={navigation.graph}>
                    <Waypoints
                        size={iconSize}
                        strokeWidth={iconStrokeWidth}
                        className={checkSelected(pathName, navigation.graph)}
                    />
                </Link>
                <Link href={navigation.calendar}>
                    <Calendar
                        size={iconSize}
                        strokeWidth={iconStrokeWidth}
                        className={checkSelected(pathName, navigation.calendar)}
                    />
                </Link>
                <Link href={navigation.dictionary}>
                    <BookA
                        size={iconSize}
                        strokeWidth={iconStrokeWidth}
                        className={checkSelected(
                            pathName,
                            navigation.dictionary,
                        )}
                    />
                </Link>
                <Link href={navigation.pomodoro}>
                    <AlarmClock
                        size={iconSize}
                        strokeWidth={iconStrokeWidth}
                        className={checkSelected(pathName, navigation.pomodoro)}
                    />
                </Link>
            </div>
            <div className="mt-auto mb-5 w-full text-center text-sm">
                <div>
                    {time.min.toString().padStart(2, "0")}:
                    {time.sec.toString().padStart(2, "0")}
                </div>

                <div className="text-text-muted text-[12px] font-light">
                    {stateNames[timerState]}
                    {task ? ` ${task.completedCicles}/${task.cicles}` : null}
                </div>
            </div>
        </div>
    );
}
function checkSelected(pathName: string, navigationPath: string): string {
    return cn(
        pathName.startsWith(navigationPath) &&
            "!text-accent-focus drop-shadow-[0px_5px_4px] drop-shadow-accent-focus/40",
    );
}

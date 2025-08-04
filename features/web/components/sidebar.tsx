"use client";

import Image from "next/image";
import { Book, Calendar, File, Timer, Triangle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "@/libs/utils/cn";

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

export default function SideBar() {
    const pathName = usePathname();

    return (
        <div className="bg-surface border-border h-screen w-[55px] border-r">
            <div className="mb-3 py-3">
                <Link href="/">
                    <Image
                        src="/svg/metodiza.svg"
                        alt="Logo"
                        width={logoSize}
                        height={logoSize}
                        className="mx-auto"
                    />
                </Link>
            </div>
            <div className="[&_svg]:text-text-muted [&_svg]:hover:text-text-primary flex flex-col items-center gap-7 [&_svg]:cursor-pointer">
                <Link href={navigation.editor}>
                    <File
                        size={iconSize}
                        strokeWidth={iconStrokeWidth}
                        className={checkSelected(pathName, navigation.editor)}
                    />
                </Link>
                <Link href={navigation.graph}>
                    <Triangle
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
                    <Book
                        size={iconSize}
                        strokeWidth={iconStrokeWidth}
                        className={checkSelected(
                            pathName,
                            navigation.dictionary,
                        )}
                    />
                </Link>
                <Link href={navigation.pomodoro}>
                    <Timer
                        size={iconSize}
                        strokeWidth={iconStrokeWidth}
                        className={checkSelected(pathName, navigation.pomodoro)}
                    />
                </Link>
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

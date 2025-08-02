import { entry } from "@prisma/client";
import cn from "@/libs/utils/cn";
import { ChevronRight, File } from "lucide-react";
import { MouseEvent, Ref } from "react";

export function Entry({
    entry,
    level,
    isOpen,
    isSelected,
    handleClick,
    ref,
}: {
    entry: entry;
    level: number;
    isOpen?: boolean;
    isSelected?: boolean;
    ref?: Ref<HTMLDivElement>;
    handleClick?: (e: MouseEvent) => void;
}) {
    return (
        <div
            onClick={handleClick}
            data-context-menu-name={entry.type}
            data-entry-id={entry.id}
            data-entry-type={entry.type}
            data-entry-parent={entry.parent}
            className={cn(
                "hover:bg-accent-primary/5 flex w-full cursor-pointer items-center px-3 py-1 select-none [&_svg]:transition-transform [&_svg]:duration-100",
                isSelected && "!bg-accent-primary/5",
            )}
            ref={ref}
        >
            <EntryPadding px={level * 16} />
            <EntryIcon type={entry.type} isOpen={isOpen} />
            <div className="ml-2 text-sm font-light">{entry.name}</div>
        </div>
    );
}

function EntryIcon({ type, isOpen }: { type: string; isOpen?: boolean }) {
    const iconSize = 14;

    if (type === "file") {
        return <File size={iconSize} />;
    } else {
        return (
            <ChevronRight
                size={iconSize}
                className={cn(isOpen && "rotate-90")}
            />
        );
    }
}

function EntryPadding({ px }: { px: number }) {
    return <div style={{ paddingLeft: px }} />;
}

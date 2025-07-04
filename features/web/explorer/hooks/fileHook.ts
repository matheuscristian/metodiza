"use client";

import { entry } from "@/libs/db/prisma/client";
import { redirect, usePathname } from "next/navigation";

export default function useFile(entry: entry): [() => void, boolean] {
    const pathName = usePathname();

    function handleClick() {
        redirect(`/web/editor/${entry.id}`);
    }

    return [handleClick, pathName.includes(entry.id)];
}

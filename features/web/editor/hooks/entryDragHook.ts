"use client";

import { constants } from "@/features/web/editor/utils/helpers";
import { entry } from "@/libs/db/prisma";
import { DnDItemType } from "@/types/features/web/editor/dnd";
import { useDrag } from "react-dnd";

export default function useEntryDrag(entry: entry) {
    return useDrag(() => ({
        type: constants.dragType,
        item: {
            id: entry.id,
            parent: entry.parent,
        } satisfies DnDItemType,
    }));
}

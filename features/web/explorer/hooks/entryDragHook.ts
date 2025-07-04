"use client";

import { constants } from "@/features/web/explorer/utils/helpers";
import { entry } from "@prisma/client";
import { DnDItemType } from "@/types/features/web/explorer/dnd";
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

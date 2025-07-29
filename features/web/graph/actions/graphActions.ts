"use server";

import {
    constants,
    createCircleStepper,
} from "@/features/web/graph/utils/helper";
import db from "@/libs/db";
import { Node } from "@xyflow/react";

export default async function getGraphNodes() {
    const prisma = db.connect();

    const entries = await prisma.entry.findMany({
        where: { NOT: { name: "root" } },
    });

    const nodes: Node[] = [];

    const gap = 25;
    const nextPosition = createCircleStepper(gap, entries.length);

    for (const entry of entries) {
        const pos = nextPosition();

        nodes.push({
            id: entry.id,
            type: constants.nodeType,
            position: { x: pos[0], y: pos[1] },
            data: {
                name: entry.name,
            },
        });
    }

    return nodes;
}

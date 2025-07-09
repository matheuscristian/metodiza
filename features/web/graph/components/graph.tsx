"use client";

import {
    Background,
    Controls,
    Handle,
    Position,
    ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes = [
    {
        id: "n1",
        position: { x: 0, y: 0 },
        data: { label: "Node 1" },
        type: "NoteNode",
    },
    {
        id: "n2",
        position: { x: 100, y: 100 },
        data: { label: "Node 2" },
        type: "NoteNode",
    },
];

const initialEdges = [
    {
        id: "n1-n2",
        source: "n1",
        target: "n2",
        type: "straight",
    },
];

export default function Graph() {
    return (
        <div className="w-full h-screen overflow-hidden">
            <ReactFlow
                nodes={initialNodes}
                edges={initialEdges}
                nodeTypes={{ NoteNode }}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

function NoteNode() {
    return (
        <div className="note-node rounded-full bg-text-primary size-[30px]">
            <Handle
                type="source"
                position={Position.Top}
                className="invisible !top-1/2"
            />
            <Handle
                type="target"
                position={Position.Top}
                className="invisible !top-1/2"
            />
        </div>
    );
}

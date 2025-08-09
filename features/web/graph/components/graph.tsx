"use client";

import useGraph from "@/features/web/graph/hooks/graphHook";
import { constants } from "@/features/web/graph/utils/helper";
import {
    Background,
    Controls,
    Handle,
    NodeProps,
    Position,
    ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useRef } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

const nodesType = {
    [constants.nodeType]: NoteNode,
};

export default function Graph() {
    const [nodes, edges, onNodesChange] = useGraph();

    return (
        <div className="h-screen w-full overflow-hidden">
            <ReactFlow
                colorMode="dark"
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                nodeTypes={nodesType}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

function NoteNode(node: NodeProps) {
    const n = useRef(0);

    useEffect(() => {
        if (n.current > 0) return;

        tippy(document.getElementById(`node__${node.id}`)!, {
            content: node.data.name as string,
        });

        n.current++;
    }, [node.data.name, node.id]);

    return (
        <div
            id={`node__${node.id}`}
            className="note-node bg-text-primary size-[30px] rounded-full"
        >
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

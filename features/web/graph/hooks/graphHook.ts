"use client";

import getGraphNodes from "@/features/web/graph/actions/graphActions";
import { applyNodeChanges, Edge, Node, OnNodesChange } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";

export default function useGraph(): [Node[], Edge[], OnNodesChange] {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges] = useState<Edge[]>([]);

    useEffect(() => {
        getGraphNodes().then(setNodes);
    }, []);

    const onNodesChange = useCallback<OnNodesChange<Node>>(
        (changes) =>
            setNodes((nodesSnapshot) =>
                applyNodeChanges(changes, nodesSnapshot),
            ),
        [],
    );

    return [nodes, edges, onNodesChange];
}

"use client"
import React, { useEffect, useState } from "react";

interface Node {
    id: string;
    position: {
        x: number;
        y: number;
    };
    type: "spore" | "substrate";
}

interface Edge {
    source: { x: number, y: number };
    target: { x: number, y: number };
}

interface GraphData {
    nodes: Node[];
    edges: Edge[];
}

const GraphPlotter: React.FC = () => {
    const [graphData, setGraphData] = useState<GraphData | null>(null);

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const response = await fetch("http://localhost:8000/graph");
                const data: GraphData = await response.json();
                setGraphData(data);
                console.log("Graph data:", data);
            } catch (error) {
                console.error("Error fetching graph data:", error);
            }
        };

        fetchGraphData();
    }, []);
    console.log(graphData?.edges?.[0])
    return (
        <div >
            Paha
            <svg width={800} height={600}>
                {graphData?.edges.map((edge, index) => (
                    <line
                        key={index}
                        x1={edge.source.x * 20}
                        y1={edge.source.y * 20}
                        x2={edge.target.x * 20}
                        y2={edge.target.y * 20}
                        className="text-gray-400 stroke-current stroke-opacity-60"
                    />
                ))}
                {graphData?.nodes.map((node, index) => (
                    <circle
                        key={index}
                        cx={node.position.x * 20}
                        cy={node.position.y * 20}
                        r={node.type === "spore" ? 10 : 15}
                        fill={node.type === "spore" ? "#1f77b4" : "#ff7f0e"}
                        className="text-gray-700"
                    />
                ))}
            </svg>
        </div>
    )
};

export default GraphPlotter;
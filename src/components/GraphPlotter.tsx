"use client"
import { Button } from "@/components/Button";
import { ItemTooltip } from "@/components/ItemTooltip";
import React, { useEffect, useState } from "react";
import { DefaultService } from "@/client";

export type Node = {
    id: string;
    position: {
        x: number;
        y: number;
    };
    type: "spore" | "substrate";
    energy: number
}

type Edge = {
    source: { x: number, y: number };
    target: { x: number, y: number };
}

interface GraphData {
    nodes: Node[];
    edges: Edge[];
}
const maxSpores = 5
const GraphPlotter: React.FC = () => {
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [hoveredItem, setHoveredItem] = useState<Node>()
    const [markers, setMarkers] = useState<Node[]>([])

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

    const handleStartPhase = async () => {
        try {
            const response = await fetch("http://localhost:8000/start_phase");
            const data: GraphData = await response.json();
            setGraphData(data);
            console.log("Graph data:", data);
        } catch (error) {
            console.error("Error fetching graph data:", error);
        }
    }

    const handleRunPhase = async () => {
        DefaultService.runPhaseApiRunPhasePost({
            requestBody: [...(graphData?.nodes || []), ...markers]
        }).then(data => {
            console.log('data', data)
            setMarkers([])
            setGraphData(data);
        }
        )

    }
    console.log("graphData", graphData)


    const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (hoveredItem && markers.includes(hoveredItem)) {
            setMarkers([...markers.filter(marker => marker.id !== hoveredItem.id)])
        } else {
            const clickedPositions = {
                x: (event.clientX - 130) / 20,
                y: (event.clientY - 150) / 20,
            }

            const newMarker: Node = {
                id: "marker-" + markers.length + Math.random(),
                position: clickedPositions,
                type: "spore",
                energy: 50,
            };
            if (markers.length < maxSpores) {
                setMarkers([...markers, newMarker]);
            }
        }


        console.log("Clicked on- :", event.clientX, event.clientY);
        console.log('markers', markers)
    }

    return (
        <div >
            <div className="flex gap-4">
                <Button onClick={handleStartPhase}>
                    Start Phase
                </Button>
                <Button onClick={handleRunPhase}>
                    Run Phase
                </Button>
            </div>
            <div>Spores left: {maxSpores - markers.length}</div>
            <svg className="overflow-visible" width={800} height={600} onClick={handleClick}>
                {
                    graphData?.edges.map((edge, index) => (
                        <line
                            key={index}
                            x1={5 + edge.source.x * 20}
                            y1={5 + edge.source.y * 20}
                            x2={5 + edge.target.x * 20}
                            y2={5 + edge.target.y * 20}
                            className="text-gray-400 stroke-current stroke-opacity-60"
                        />
                    ))
                }
                {
                    graphData?.nodes.map((node, index) => (
                        <circle
                            key={index}
                            cx={5 + node.position.x * 20}
                            cy={5 + node.position.y * 20}
                            r={node.type === "spore" ? node.energy / 5 : node.energy / 30}
                            fill={node.type === "spore" ? "#1f77b4" : "#ff7f0e"}
                            className="text-gray-700"
                            onMouseMove={() => setHoveredItem(node)}
                            onMouseOut={() => setHoveredItem(undefined)}
                        />
                    ))
                }
                {
                    markers?.map((node, index) => (
                        <>
                            Paha
                            <circle
                                key={index}
                                cx={5 + node.position.x * 20}
                                cy={5 + node.position.y * 20}
                                r={node.energy / 5}
                                fill={"#4c0099"}
                                className="text-gray-700"
                                onMouseMove={() => setHoveredItem(node)}
                                onMouseOut={() => setHoveredItem(undefined)}
                            />
                        </>
                    ))
                }
            </svg >

            <ItemTooltip item={hoveredItem} />
        </div >
    )
};

export default GraphPlotter;
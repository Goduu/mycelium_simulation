"use client"
import React, { FC, useRef, useState } from 'react'
import { GraphData, Node, Stage } from './types'
import { ItemTooltip } from '../ItemTooltip'
import { useFieldSize } from './useFieldSize'
import { SporeNode } from './Spore'


export type MyceliumFieldProps = {
    maxSpores: number;
    markers: Node[];
    setMarkers: (markers: Node[]) => void;
    graphData: GraphData | null;
    stage: Stage
}

export const MyceliumField: FC<MyceliumFieldProps> = ({ markers, setMarkers, maxSpores, stage, graphData }) => {
    const [hoveredItem, setHoveredItem] = useState<Node>()
    const svgRef = useRef<SVGSVGElement>(null);
    const { fieldSize } = useFieldSize()

    const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        if (stage !== "place") {
            return
        }

        const svgRect = svgRef.current?.getBoundingClientRect();
        const svgLeft = svgRect?.left ?? 0;
        const svgTop = svgRect?.top ?? 0;

        if (hoveredItem && markers.includes(hoveredItem)) {
            setMarkers([...markers.filter(marker => marker.id !== hoveredItem.id)])
        } else {
            const clickedPositions = {
                x: (event.clientX - svgLeft),
                y: (event.clientY - svgTop),
            }

            const newMarker: Node = {
                id: "marker-" + markers.length + Math.random(),
                position: clickedPositions,
                type: "spore",
                energy: 120,
            };
            if (markers.length < maxSpores) {
                setMarkers([...markers, newMarker]);
            }
        }

    }

    return (
        <div className="border border-teal-100 rounded-md p-2 w-fit align-middle">

            <svg ref={svgRef} className="overflow-visible bg-slate-800" width={fieldSize.width} height={fieldSize.height} onClick={handleClick}>
                {
                    graphData?.edges.map((edge, index) => (
                        <line
                            key={index}
                            x1={5 + edge.source.x}
                            y1={5 + edge.source.y}
                            x2={5 + edge.target.x}
                            y2={5 + edge.target.y}
                            className="text-gray-400 stroke-current stroke-opacity-60"
                        />
                    ))
                }
                {
                    graphData?.nodes.map((node, index) => (
                        <circle
                            key={index}
                            cx={5 + node.position.x}
                            cy={5 + node.position.y}
                            r={node.type === "spore" ? node.energy / 5 : node.energy / 5}
                            fill={node.type === "spore" ? "#1f77b4" : "#ff7f0e"}
                            className="text-gray-700"
                            onMouseMove={() => setHoveredItem(node)}
                            onMouseOut={() => setHoveredItem(undefined)}
                        />
                    ))
                }
                {
                    markers?.map((node, index) => (
                        <SporeNode key={index} node={node} setHoveredItem={setHoveredItem} />
                    ))
                }
            </svg >
            <ItemTooltip item={hoveredItem} />
        </div>
    )
}

"use client"
import React, { FC, useRef, useState } from 'react'
import { GraphData, Node } from './types'
import { ItemTooltip } from '../ItemTooltip'
import { useFieldSize } from './useFieldSize'

const multiplicationConstant = 1


export type MyceliumFieldProps = {
    maxSpores: number;
    markers: Node[];
    setMarkers: (markers: Node[]) => void;
    graphData: GraphData | null;
    setGraphData: (markers: GraphData | null) => void;
}

export const MyceliumField: FC<MyceliumFieldProps> = ({ markers, setMarkers, maxSpores, graphData, setGraphData }) => {
    const [hoveredItem, setHoveredItem] = useState<Node>()
    const svgRef = useRef<SVGSVGElement>(null);
    const { fieldSize } = useFieldSize()

    const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const svgRect = svgRef.current?.getBoundingClientRect();
        const svgLeft = svgRect?.left ?? 0;
        const svgTop = svgRect?.top ?? 0;

        if (hoveredItem && markers.includes(hoveredItem)) {
            setMarkers([...markers.filter(marker => marker.id !== hoveredItem.id)])
        } else {
            const clickedPositions = {
                x: (event.clientX - svgLeft) / multiplicationConstant,
                y: (event.clientY - svgTop) / multiplicationConstant,
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

    }

    return (
        <div className="border border-teal-100 rounded-md p-2 w-fit align-middle">

            <svg ref={svgRef} className="overflow-visible bg-slate-800" width={fieldSize.width} height={fieldSize.height} onClick={handleClick}>
                {
                    graphData?.edges.map((edge, index) => (
                        <line
                            key={index}
                            x1={5 + edge.source.x * multiplicationConstant}
                            y1={5 + edge.source.y * multiplicationConstant}
                            x2={5 + edge.target.x * multiplicationConstant}
                            y2={5 + edge.target.y * multiplicationConstant}
                            className="text-gray-400 stroke-current stroke-opacity-60"
                        />
                    ))
                }
                {
                    graphData?.nodes.map((node, index) => (
                        <circle
                            key={index}
                            cx={5 + node.position.x * multiplicationConstant}
                            cy={5 + node.position.y * multiplicationConstant}
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
                                cx={5 + node.position.x * multiplicationConstant}
                                cy={5 + node.position.y * multiplicationConstant}
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

        </div>
    )
}

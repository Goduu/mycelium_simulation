"use client"
import { Button } from "@/components/Button";
import { FC, useState } from "react";
import { DefaultService } from "@/client";
import { GraphData, Node } from "./types";
import { MyceliumField } from "./MyceliumField";
import { useFieldSize } from "./useFieldSize";
import { error } from "console";
import { AiOutlineLoading3Quarters } from "../Icons";


const maxSpores = 5

const GraphPlotter: FC = () => {
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [markers, setMarkers] = useState<Node[]>([])
    const { fieldSize } = useFieldSize()
    const [loading, setLoading] = useState(false)

    const handleStartPhase = async () => {
        setLoading(true)
        DefaultService.startPhaseApiStartPhasePost({
            requestBody: { ...fieldSize }
        }).then(data => {
            setGraphData(data)
            console.log("Graph data:", data);
            setLoading(false)
        }).catch(error => {
            console.error("Error fetching graph data:", error);
            setLoading(false)
        })
    }

    const handleRunPhase = async () => {
        setLoading(true)
        DefaultService.runPhaseApiRunPhasePost({
            requestBody: {
                nodes: [...(graphData?.nodes || []), ...markers],
                field_size: fieldSize
            }
        }).then(data => {
            console.log('data', data)
            setMarkers([])
            setGraphData(data);
            setLoading(false)
        }
        ).catch(error => {
            console.error("Error fetching graph data:", error);
            setLoading(false)

        })
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
            <MyceliumField markers={markers} setMarkers={setMarkers} maxSpores={maxSpores} graphData={graphData} setGraphData={setGraphData} />
            {loading && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-slate-100 bg-opacity-20">
                    <div className="animate-spin w-16"><AiOutlineLoading3Quarters className='fill-current' /></div>
                </div>
            )}

        </div >
    )
};

export default GraphPlotter;
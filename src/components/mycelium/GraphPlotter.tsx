"use client"
import { Button } from "@/components/Button";
import { FC, useState } from "react";
import { DefaultService } from "@/client";
import { BagItem, GraphData, Node, Stage } from "./types";
import { MyceliumField } from "./MyceliumField";
import { useFieldSize } from "./useFieldSize";
import { AiOutlineLoading3Quarters } from "../Icons";
import { Bag } from "./Bag";
import { StageButtons } from "./PhaseButtons";


const maxSpores = 5

const GraphPlotter: FC = () => {
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [markers, setMarkers] = useState<Node[]>([])
    const { fieldSize } = useFieldSize()
    const [loading, setLoading] = useState(false)
    const [phase, setPhase] = useState(1)
    const [bagItems, setBagItems] = useState<BagItem[]>([])
    const [reward, setReward] = useState(0)
    const [stage, setStage] = useState<Stage>("buy")

    const handleStartPhase = async () => {
        setLoading(true)
        DefaultService.startPhaseApiStartPhasePost({
            requestBody: { field_size: { ...fieldSize }, phase: phase }
        }).then(data => {
            setGraphData(data)
            setReward(data.reward || 0)
            console.log("Graph data:", data);
            setLoading(false)
            setPhase(phase + 1)
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
                {(graphData?.reward || 0).toFixed(2)}
            </div>
            <StageButtons stage={stage} setStage={setStage} />
            <Bag bagItems={bagItems} reward={reward + 1} stage={stage} />
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
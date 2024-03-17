import { FC } from "react"
import { Button } from "./Button"

type SporePlacerProps = {
    markers: Node[]
    setMarkers: (node: Node[] | undefined) => void
    maxSpores: number
}

export const SporePlacer: FC<SporePlacerProps> = ({ markers, maxSpores }) => {
    return (
        <div>Spores left: {maxSpores - markers.length}</div>
    )
}

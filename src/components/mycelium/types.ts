export type Node = {
    id: string;
    position: {
        x: number;
        y: number;
    };
    type: "spore" | "substrate";
    energy: number
}

export type Edge = {
    source: { x: number, y: number };
    target: { x: number, y: number };
}

export type GraphData = {
    nodes: Node[];
    edges: Edge[];
}
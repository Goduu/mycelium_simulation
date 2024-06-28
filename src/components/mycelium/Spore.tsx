


import React, { FC } from 'react'
import { Node, SporeShopItem } from './types';
import { TbCircleFilled } from '../Icons';

export type SporeNodeProps = {
    node: Node;
    setHoveredItem: (node: Node | undefined) => void;
}

export const SporeNode: FC<SporeNodeProps> = ({ node, setHoveredItem }) => {
    return (
        <circle
            cx={5 + node.position.x}
            cy={5 + node.position.y}
            r={node.energy / 5}
            fill={getSporeColorByEnergy(node.energy)}
            onMouseMove={() => setHoveredItem(node)}
            onMouseOut={() => setHoveredItem(undefined)}
        />
    )
}

export type SporeProps = {
    energy: number;
    className?: string
}

export const Spore: FC<SporeProps> = ({ energy, className }) => {
    return (
        <TbCircleFilled className={`${getSporeColorByEnergy(energy)} ${getSporeWidth(energy)} ${className}`}
        />
    )

}

const getSporeWidth = (energy: number) => {
    if (energy < 50) {
        return "w-5"
    }
    if (energy < 75) {
        return "w-7"
    }
    if (energy < 100) {
        return "w-8"
    }
    return "w-10"
}

const getSporeColorByEnergy = (energy: number) => {
    if (energy < 50) {
        return "text-[#ff7f0e]"
    }
    if (energy < 75) {
        return "text-[#117f0e]"
    }
    if (energy < 100) {
        return "text-[#1f77b4]"
    }
    return "text-[#4c0099]"
}

export const sporeShop: SporeShopItem[] = [
    {
        id: "sporeSmall",
        name: "Small Spore",
        value: 2.5,
        energy: 25,
        class: "text-[#ff7f0e]"
    },
    {
        id: "sporeMid",
        name: "Mid Spore",
        value: 4.5,
        energy: 50,
        class: "text-[#117f0e]"
    },
    {
        id: "sporeBig",
        name: "Big Spore",
        value: 6.5,
        energy: 80,
        class: "text-[#1f77b4]"
    },
    {
        id: "sporeGreat",
        name: "Great Spore",
        value: 11,
        energy: 120,
        class: "text-[#4c0099]"
    },
]
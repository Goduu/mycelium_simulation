import { FC, ReactNode, useEffect, useState } from "react"
import { IoPlayOutline, TbPlayerPause, PiSkipBackBold, PiSkipForwardBold, GrMoney, FaUsers, Close, GiWeight } from "../Icons"
import { Item } from "@/client"

type PlayResultsControlProps = {
    algorithmResults: Item[][] | undefined
    setSelectedItems: (items: Item[]) => void
    close: () => void
}

export const PlayResultsControl: FC<PlayResultsControlProps> = ({ algorithmResults, setSelectedItems, close }) => {
    const [currentResultIndex, setCurrentResultIndex] = useState(0)
    const [generation, setGeneration] = useState(0)

    const value = algorithmResults?.[currentResultIndex]?.reduce((acc, current) => acc + current.price, 0).toFixed(2)
    const weight = algorithmResults?.[currentResultIndex]?.reduce((acc, current) => acc + current.weight, 0).toFixed(2)

    const handleForward = () => {
        if (currentResultIndex < algorithmResults!.length - 1) {
            setCurrentResultIndex(currentResultIndex + 1)
            setSelectedItems(algorithmResults![currentResultIndex + 1])
            setGeneration(generation + 2)
        }
    }
    const handleBack = () => {
        if (currentResultIndex > 0) {
            setCurrentResultIndex(currentResultIndex - 1)
            setSelectedItems(algorithmResults![currentResultIndex - 1])
            setGeneration(generation - 2)
        }
    }

    return (

        <div className="fixed top-0 min-w-16 sm:top-4 flex justify-center left-1/2 transform -translate-x-1/2 z-50">
            <div className="absolute top-0 right-0 mt-2 mr-9 sm:mt-4 sm:mr-4 cursor-pointer z-50">
                <Close width={40} onClick={close} />
            </div>
            <div className="relative flex flex-col rounded-xl border dark:backdrop-blur-xl gap-10">
                <div className="px-10 pt-10 pb-4 flex items-center z-50">
                    <div className="cursor-pointer">
                        <PiSkipBackBold width={35} onClick={handleBack} />
                    </div>
                    <ValueBadge value={generation} title="Generation">
                        <FaUsers className="absolute mt-[-40px]" width={50} />
                    </ValueBadge>
                    <ValueBadge value={value} title="Value">
                        <GrMoney className="absolute mt-[-45px]" width={49} />
                    </ValueBadge>
                    <ValueBadge value={weight} title="Weight">
                        <GiWeight className="absolute mt-[-40px]" width={45} />
                    </ValueBadge>
                    <div className="cursor-pointer">
                        <PiSkipForwardBold width={35} onClick={handleForward} />
                    </div>
                </div>

            </div>
        </div>
    )
}

type ValueBadgeProps = {
    value: string | number | undefined,
    title: string,
    children: ReactNode
}

const ValueBadge: FC<ValueBadgeProps> = ({ value, title, children }) => {
    return (
        <div className="w-26 m-1 sm:m-4 p-2 sm:p-4 rounded-md border" >
            <div className="flex justify-center items-center">
                {children}
            </div>
            <div className="flex flex-col sm:gap-2 items-center">
                <div className="text-xl sm:text-3xl">
                    {value || 0}
                </div>
                {title}
            </div>
        </div>
    )
}
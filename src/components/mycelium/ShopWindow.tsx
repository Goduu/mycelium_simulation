import { FC, ReactNode } from "react"
import { GrMoney, Close } from "../Icons"
import { Spore, sporeShop } from "./Spore"
import { BagItem } from "./types"

type ShopWindowProps = {
    reward: number
    visible: boolean
    bagItems: BagItem[]
    setBagItems: (items: BagItem[]) => void
    setVisible: (status: boolean) => void
}

export const ShopWindow: FC<ShopWindowProps> = ({ reward, visible, bagItems, setBagItems, setVisible }) => {

    const handleBuyItem = (newItem: BagItem) => {
        let bagItem = bagItems.find<BagItem>(item => item.id === newItem.id)
        if (bagItem) {
            bagItem.quantity += newItem.quantity
        } else {
            bagItem = newItem
        }
        setBagItems(items => [...items, bagItem])
    }

    return (
        <div className={`${visible ? "block" : "hidden"} fixed top-0 min-w-16 sm:top-4 flex justify-center left-1/2 transform -translate-x-1/2 z-50`}>
            <div className="absolute top-0 right-0 mt-2 mr-9 sm:mt-4 sm:mr-4 cursor-pointer z-50">
                <Close width={40} onClick={() => setVisible(false)} />
            </div>
            <div className="relative flex flex-col rounded-xl border dark:backdrop-blur-xl gap-10 p-4">
                <div className="p-4 flex gap-2 items-center z-50">
                    <div className="p-3 flex gap-2 border rounded-lg h-12 w-20 items-center">
                        <GrMoney className="w-15" />
                        {reward}
                    </div>
                    {sporeShop.map(spore => (
                        <div key={spore.name} className="p-3 flex gap-2 border rounded-lg h-12 w-24 items-center">
                            <Spore energy={spore.energy} />
                            {bagItems.find(item => item.id === spore.id)?.quantity || 0}
                        </div>
                    )
                    )}

                </div>
                <div className="pb-4 flex items-center z-50">
                    {sporeShop.map(spore => (
                        <ValueBadge key={spore.energy} value={spore.value} title={spore.name}>
                            <Spore className="absolute mt-[-45px]" energy={spore.energy} />
                        </ValueBadge>
                    ))}
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
        <div className="w-26 m-1 sm:m-4 p-2 sm:p-4 rounded-md border cursor-pointer" >
            <div className="flex justify-center items-center">
                {children}
            </div>
            <div className="flex flex-col sm:gap-2 items-center">
                <div className="text-xl sm:text-3xl flex gap-1 items-center">
                    {value || 0} <GrMoney className="w-5" />
                </div>
                {title}
            </div>
        </div>
    )
}
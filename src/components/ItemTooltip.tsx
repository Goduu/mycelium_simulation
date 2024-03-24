import { FC } from 'react'
import { Node } from './mycelium/types'
import { MdOutlineEnergySavingsLeaf, MdOutlineLocationOn } from './Icons'

type ItemTooltipProps = {
    item: Node | undefined
}

export const ItemTooltip: FC<ItemTooltipProps> = ({ item }) => {
    return (
        <div className={`${!item ? "hidden " : "block"}`}>

            <div className={`fixed top-0 sm:top-4 flex justify-center left-1/2 transform -translate-x-1/2  `}>
                <div
                    className="flex justify-between relative flex-col rounded-xl border dark:backdrop-blur-xl p-4"
                >
                    <div className='w-full truncate justify-center flex flex-col'>
                        {item &&
                            <>
                                <p className='truncate w-40 flex gap-2 text-lg'>
                                    Type: {item.type}
                                </p>
                                <p className='truncate w-40 flex gap-2 text-lg'>
                                    <MdOutlineEnergySavingsLeaf className="w-5" /> {item.energy.toFixed(2)}
                                </p>
                                <p className='truncate w-40 flex gap-2 text-lg'>
                                    <MdOutlineLocationOn className='w-5' /> {item.position.x.toFixed(2)}, {item.position.y.toFixed(2)}
                                </p>
                            </>
                        }
                    </div>

                </div>

            </div >
        </div>
    )
}

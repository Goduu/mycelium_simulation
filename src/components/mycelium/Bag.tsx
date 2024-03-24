import React, { FC } from 'react'
import { GrMoney, MdOutlineEnergySavingsLeaf } from '../Icons'
import { Spore, sporeShop } from './Spore'
import { BagItem, Stage } from './types'

export type BagProps = {
    bagItems: BagItem[]
    reward: number
    stage: Stage
}

export const Bag: FC<BagProps> = ({ bagItems, reward, stage }) => {
    return (
        <div className=" py-4 flex gap-2 items-center z-50">
            <div className="p-3 flex gap-2 border rounded-lg h-12 w-24 items-center">
                <GrMoney className="w-7" />
                {reward}
            </div>
            {sporeShop.map(spore => (
                <div key={spore.name} className='group'>
                    <div className={`p-3 flex gap-2 border rounded-lg h-12 w-24 items-center  ${stage === "buy" ? "cursor-copy" : stage === "place" ? "cursor-pointer" : "cursor-auto"}`}>
                        <Spore energy={spore.energy} />
                        {bagItems.find(item => item.id === spore.id)?.quantity || 0}
                    </div>
                    <div className='hidden group-hover:block absolute backdrop-blur-xl p-2 w-fit border rounded-lg mt-1'>
                        <div className='flex flex-col'>
                            <p>
                                {spore.name}
                            </p>
                            <div className=''>
                                <p className='flex gap-1'>
                                    <MdOutlineEnergySavingsLeaf className="w-5" />{spore.energy}
                                </p>
                                <p className='flex gap-1'>
                                    <GrMoney className="w-5" />
                                    {spore.value}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
            )}

        </div>
    )
}

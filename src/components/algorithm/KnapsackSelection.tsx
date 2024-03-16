import classNames from 'classnames';
import React, { FC } from 'react'
import { CiBag1 } from '../Icons';

const bags = [
    { weight: 6, className: "h-8 w-8" },
    { weight: 8, className: "h-10 w-10" },
    { weight: 10, className: "h-14 w-14" },
]

type KnapsackSelectionProps = {
    selectedBag: number | undefined
    setSelectedBag: (bag: number) => void
}
export const KnapsackSelection: FC<KnapsackSelectionProps> = ({ selectedBag: chosenBag, setSelectedBag: setChosenBag }) => {

    return (
        <div className='flex flex-col gap-2 '>
            <p className='text-2xl'>Knapsack capacity selection</p>

            <div className='flex gap-2 justify-center'>
                {bags.map((bag) => (
                    <div key={bag.weight} className={classNames({
                        'flex flex-col rounded-xl border p-8 justify-center items-center w-28 cursor-pointer': true,
                        'bg-teal-600': chosenBag === bag.weight
                    })}
                        onClick={() => setChosenBag(bag.weight)}>
                        <CiBag1 className={`${bag.className} fill-current`} />
                        <p>{bag.weight}kg</p>
                    </div>)
                )}

            </div>
        </div >
    )
}

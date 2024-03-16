import { Item } from '@/client'
import { FC } from 'react'

type ItemTooltipProps = {
    item: Item | undefined
}

export const ItemTooltip: FC<ItemTooltipProps> = ({ item }) => {
    return (
        <div className="fixed top-0 sm:top-4 flex justify-center left-1/2 transform -translate-x-1/2">
            <div
                className="flex justify-between px-8 relative flex-col rounded-xl border dark:backdrop-blur-xl p-4"
            >
                <div className='w-full truncate justify-center flex flex-col'>
                    {item &&
                        <>
                            <p className='truncate w-48 flex gap-2 text-lg'>
                                {item.name}
                            </p>
                            <p className='truncate w-48 flex gap-2 text-lg'>
                                $ {item.price}</p>
                            <p className='truncate w-48 flex gap-2 text-lg'>
                                {item.weight} kg</p>
                        </>
                    }
                </div>

            </div>

        </div >
    )
}

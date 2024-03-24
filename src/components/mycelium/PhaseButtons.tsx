import React, { FC } from 'react'
import { Button } from '../Button'
import { LuArrowBigRight } from '../Icons'
import { ConfirmationDialog } from './ConfirmationDialog'
import { Stage } from './types'

export type StageButtonsProps = {
    stage: Stage
    setStage: (stage: Stage) => void
}

export const StageButtons: FC<StageButtonsProps> = ({ stage, setStage }) => {
    const [dialogOpen, setDialogOpen] = React.useState(false)

    const isDisabled = (buttonStage: string) => {
        return buttonStage !== stage
    }

    const handleEndPhase = () => {
        setDialogOpen(false)
        setStage(nextStage[stage])
    }

    return (
        <>
            <div className='flex gap-4'>
                <Button disabled={isDisabled("buy")} onClick={() => setDialogOpen(true)}>Buy Stage</Button>
                <LuArrowBigRight className='w-7' />
                <Button disabled={isDisabled("place")} onClick={() => setDialogOpen(true)}>Place Stage</Button>
                <LuArrowBigRight className='w-7' />
                <Button disabled={isDisabled("result")} onClick={() => setDialogOpen(true)}>Results</Button>
                <LuArrowBigRight className='w-7' />
                <Button disabled={isDisabled("new")} onClick={() => setDialogOpen(true)}>New Phase</Button>
            </div>
            <ConfirmationDialog message={dialogMessage[stage]} dialogOpen={dialogOpen} handleConfirm={handleEndPhase} handleCancel={() => setDialogOpen(false)} />
        </>

    )
}


const nextStage: Record<Stage, Stage> = {
    buy: "place",
    place: "result",
    result: "new",
    new: "buy"
}

const dialogMessage: Record<Stage, string> = {
    buy: "Are you sure you want to end the buy stage?",
    place: "Are you sure you want to end the place stage?",
    result: "Are you sure you want to end the results stage?",
    new: "Are you sure you want to start a new phase?"
}



import React, { FC } from 'react'

export type ConfirmationDialogProps = {
    message: string;
    dialogOpen: boolean;
    handleConfirm: () => void;
    handleCancel: () => void;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({ message, dialogOpen, handleCancel, handleConfirm }) => {
    return (
        <div className={`top-0 sm:top-4 flex justify-center left-1/2 transform -translate-x-1/2 z-50 fixed`}>
            {dialogOpen &&
                <div className={`relative flex flex-col text-xl rounded-xl border dark:backdrop-blur-xl  p-10 gap-10`}>
                    {message}
                    <div className="flex justify-center gap-4">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={handleConfirm}>Confirm</button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            }
        </div>
    )
}

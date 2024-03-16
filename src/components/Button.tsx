import { FC, ReactNode } from 'react'

type ButtonProps = {
    onClick?: () => void,
    children: ReactNode,
    disabled?: boolean
}

export const Button: FC<ButtonProps> = ({ onClick, children, disabled }) => {

    return (
        <button onClick={onClick} disabled={disabled} className={`flex items-center gap-1 bg-transparent hover:bg-cyan-500 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {children}
        </button>
    )
}

import { FC } from "react"

export type NumberInputProps = {
    value: number
    title: string
    onChange: (value: number) => void
    step?: number
    min?: number
    max?: number
    helpText: string
}

export const NumberInput: FC<NumberInputProps> = ({ value, onChange, step = 1, min = 0, max = 99999, title = "", helpText = "" }) => {

    const handleClick = (type: "plus" | "minus") => {
        if (type === "plus") {
            const newValue = Math.min((value + (step)), max)
            onChange(parseFloat(newValue.toFixed(2)))
        } else {
            const newValue = Math.max((value - (step)), min)
            onChange(parseFloat(newValue.toFixed(2)))
        }
    }

    return (
        <form className="max-w-s mx-auto w-full">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white truncate">{title}</label>
            <div className="relative flex items-center max-w-[8rem]">
                <button type="button" id="decrement-button" onClick={() => handleClick("minus")} data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                    </svg>
                </button>
                <input type="text" id="quantity-input" disabled data-input-counter data-input-counter-min={min} data-input-counter-max={max} aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" value={value} required />
                <button type="button" id="increment-button" onClick={() => handleClick("plus")} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                    </svg>
                </button>
            </div>
            <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">{`${helpText} From: ${min} To: ${max}`}</p>
        </form>
    )
}
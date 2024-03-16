import { FC, useState } from "react";
import { NumberInput } from "../NumberInput";
import { IoMdArrowDropdown, IoMdArrowDropup } from "../Icons";

export type AdvancedParameters = {
    populationSize: number,
    mutationRate: number,
    elitism: number,
    generations: number,
    maxItemsFromEach: number
    tournamentSize: number
}

type AdvancedParametersSelectionProps = {
    advancedParameters: AdvancedParameters
    setAdvancedParameters: (advancedParameters: AdvancedParameters) => void
}
export const AdvancedParametersSelection: FC<AdvancedParametersSelectionProps> = ({ advancedParameters, setAdvancedParameters }) => {
    const [minimized, setMinimized] = useState(true); // State variable to track whether the component is minimized or not

    const handleOnChange = (value: number, field: keyof AdvancedParameters) => {
        setAdvancedParameters({ ...advancedParameters, [field]: value })
    }

    return (
        <div className='flex flex-col gap-4 min-h-30'>
            <div className="flex gap-4 items-center">
                <p className="text-2xl">Advanced Parameters</p>
                <button onClick={() => setMinimized(!minimized)}>{minimized ? <IoMdArrowDropdown width={20} /> : <IoMdArrowDropup width={20} />}</button>
            </div>
            <div className={`flex-wrap sm:flex-nowrap gap-4 justify-start md:justify-center ${minimized ? 'h-0 overflow-hidden' : 'flex'}`}>
                {parameters.map(parameter => (
                    <NumberInput
                        key={parameter.id}
                        title={parameter.title}
                        value={advancedParameters[parameter.id] || parameter.value}
                        onChange={(value) => handleOnChange(value, parameter.id)}
                        min={parameter.min}
                        max={parameter.max}
                        step={parameter.step}
                        helpText={parameter.helpText}
                    />

                ))}
            </div>
        </div>
    )
}

type Parameter = {
    id: keyof AdvancedParameters
    title: string
    value: number
    min: number
    max: number
    step: number
    helpText: string
}

const parameters: Parameter[] = [
    {
        id: "populationSize",
        title: "Population Size:",
        value: 100,
        min: 50,
        max: 500,
        step: 25,
        helpText: "The number of individuals in the population."
    },
    {
        id: "mutationRate",
        title: "Mutation Rate:",
        value: 0.01,
        min: 0,
        max: 1,
        step: 0.1,
        helpText: "The probability of an individual to mutate."
    },
    {
        id: "elitism",
        title: "Elitism:",
        value: 1,
        min: 0,
        max: 5,
        step: 1,
        helpText: "The number of best individuals to be passed to the next generation."
    },
    {
        id: "generations",
        title: "Generations:",
        value: 20,
        min: 4,
        max: 100,
        step: 4,
        helpText: "The number of generations to run the algorithm."
    },
    {
        id: "tournamentSize",
        title: "Tournament Size:",
        value: 3,
        min: 2,
        max: 10,
        step: 1,
        helpText: "The number of individuals to be selected for the tournament."
    },
    {
        id: "maxItemsFromEach",
        title: "Max Items From Each:",
        value: 3,
        min: 1,
        max: 10,
        step: 1,
        helpText: "The maximum number of items that can be on the knapsack from each type."
    },
]
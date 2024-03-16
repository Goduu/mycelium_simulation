"use client"
import { useState } from 'react'
import { KnapsackSelection } from './KnapsackSelection'
import { ItemsSelection } from './ItemsSelection'
import { DefaultService, Item } from '@/client'
import { Button } from '../Button'
import { AiOutlineLoading3Quarters, BiDna, CiPlay1 } from '../Icons'
import { AdvancedParameters, AdvancedParametersSelection } from './AdvancedParametersSelection'
import { PlayResultsControl } from './PlayResultsControl'

export const Algorithm = () => {
    const [algorithmRunning, setAlgorithmRunning] = useState(false)
    const [selectedItems, setSelectedItems] = useState<Item[]>([])
    const [selectedKnapsack, setSelectedKnapsack] = useState<number>()
    const [algorithmResults, setAlgorithmResults] = useState<Item[][]>()
    const [playingResults, setPlayingResults] = useState<boolean>(false)
    const [advancedParameters, setAdvancedParameters] = useState<AdvancedParameters>({
        populationSize: 100,
        mutationRate: 0.01,
        elitism: 3,
        generations: 20,
        maxItemsFromEach: 3,
        tournamentSize: 3
    })

    const handleRunAlgorithm = async () => {
        setAlgorithmResults([])
        setAlgorithmRunning(true)
        if (selectedKnapsack && selectedItems.length > 0) {
            DefaultService.startTaskApiStartTaskPost({
                requestBody: {
                    items: selectedItems,
                    max_weight: selectedKnapsack,
                    elitism: advancedParameters.elitism,
                    mutation_rate: advancedParameters.mutationRate,
                    population_size: advancedParameters.populationSize,
                    generations: advancedParameters.generations,
                    max_items_from_each: advancedParameters.maxItemsFromEach,
                    tournament_size: advancedParameters.tournamentSize
                }
            })
                .then(data => {
                    setAlgorithmResults(data)
                    setAlgorithmRunning(false)
                }).catch((error) => {
                    console.error('Error:', error)
                    setAlgorithmRunning(false)
                })
        }
    }

    return (
        <div className=" flex flex-col gap-10 pb-28">
            <p className='text-xl'>
                The objective is to determine the optimal combination of items to pack into your knapsack,
                maximizing its value while adhering to a chosen size constraint. You have the flexibility
                to specify both the capacity of the knapsack and the set of items for which the algorithm
                will seek the best combination. Additionally, there are advanced parameters available for
                experimentation, allowing you to observe their impact on the final result.
            </p>
            <KnapsackSelection selectedBag={selectedKnapsack} setSelectedBag={setSelectedKnapsack} />
            <ItemsSelection selectedItems={selectedItems} setSelectedItems={setSelectedItems} selectedKnapsack={selectedKnapsack} />
            <AdvancedParametersSelection advancedParameters={advancedParameters} setAdvancedParameters={setAdvancedParameters} />
            <div className='flex items-center justify-center py-10 gap-4'>
                <Button onClick={() => setPlayingResults(true)} disabled={!algorithmResults}><CiPlay1 width={20} className='fill-current' /> Show Results</Button>
                <Button onClick={handleRunAlgorithm} disabled={!selectedItems.length || !selectedKnapsack}><BiDna width={20} className='fill-current' /> Run Algorithm</Button>
            </div>
            {algorithmRunning && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-slate-100 bg-opacity-20">
                    <div className="animate-spin w-16"><AiOutlineLoading3Quarters className='fill-current' /></div>
                </div>
            )}

            {playingResults && (
                <PlayResultsControl algorithmResults={algorithmResults} setSelectedItems={setSelectedItems} close={() => setPlayingResults(false)} />
            )
            }

        </div >
    )
}

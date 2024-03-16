from typing import List
import random
from api.types import EvolutionaryInput, Item
from fastapi.websockets import WebSocketDisconnect

def initialize_population(items: List[Item], max_weight: int, population_size: int, max_items_from_each: int) -> List[List[Item]]:
    population = []
    for _ in range(population_size):
        individual = []
        items_added = {}
        while True:
            item = random.choice(items)
            if items_added.get(item.id, 0) < max_items_from_each and sum(item.weight for item in individual) + item.weight <= max_weight:
                individual.append(item)
                items_added[item.id] = items_added.get(item.id, 0) + 1
            if len(individual) == len(items) or random.random() > 0.8:
                break
        population.append(individual)
    return population

def calculate_fitness(individual: List[Item]) -> float:
    return sum(item.price for item in individual)

def selection(population: List[List[Item]], tournament_size: int) -> List[Item]:
    selected = []
    for _ in range(tournament_size):
        individual = random.choice(population)
        selected.append(individual)
    selected.sort(key=lambda x: calculate_fitness(x), reverse=True)
    return selected[0]

def crossover(parent1: List[Item], parent2: List[Item], max_weight: int,max_items_from_each: int) -> List[List[Item]]:
    child1, child2 = [], []
    # Simple one-point crossover
    cut = random.randint(0, min(len(parent1), len(parent2)))
    child1_candidates = parent1[:cut] + parent2[cut:]
    child2_candidates = parent2[:cut] + parent1[cut:]
    items_added_1, items_added_2 = {}, {}
    
    for item in child1_candidates:
        if items_added_1.get(item.id, 0) < max_items_from_each and sum(item.weight for item in child1) + item.weight <= max_weight:
            child1.append(item)
            items_added_1[item.id] = items_added_1.get(item.id, 0) + 1
    for item in child2_candidates:
        if items_added_2.get(item.id, 0) < max_items_from_each and sum(item.weight for item in child2) + item.weight <= max_weight:
            child2.append(item)
            items_added_2[item.id] = items_added_2.get(item.id, 0) + 1
    return [child1, child2]


def mutate(individual: List[Item], items: List[Item], max_weight: int, mutation_rate: float, max_items_from_each: int):
    if random.random() < mutation_rate:
        item_to_add = random.choice(items)
        current_weight = sum(item.weight for item in individual)
        items_added = {item.id: individual.count(item) for item in individual}
        if individual and random.random() > 0.5:  # Adding randomness to mutation
            item_to_remove = random.choice(individual)
            individual.remove(item_to_remove)
        if items_added.get(item_to_add.id, 0) < max_items_from_each and current_weight + item_to_add.weight <= max_weight:
            individual.append(item_to_add)

def selectElite(population: List[List[Item]] ) -> List[Item]:
    # Select the best individual
    best_individual = max(population, key=lambda x: calculate_fitness(x))
    return best_individual
    

async def run_evolutionary_algorithm(ev_input: EvolutionaryInput) -> List[List[Item]]:
    items = ev_input.items
    max_weight = ev_input.max_weight
    population_size = ev_input.population_size
    max_generations = ev_input.generations
    elitism = ev_input.elitism
    mutation_rate = ev_input.mutation_rate
    max_items_from_each = ev_input.max_items_from_each
    tournament_size = ev_input.tournament_size

    population = initialize_population(items, max_weight, population_size, max_items_from_each)
    best_individual_array = []
    
    try:
        for generation in range(max_generations):
            print("generation: ", generation)
            new_population = []
            population_copy = population.copy()
            for _ in range(elitism):
                best_individual = selectElite(population_copy)
                new_population.append(best_individual)
                population_copy.remove(best_individual)
                
            for _ in range(int(population_size / 2) - elitism):
                parent1 = selection(population, tournament_size)
                parent2 = selection(population, tournament_size)
                for child in crossover(parent1, parent2, max_weight, max_items_from_each):
                    mutate(child, items, max_weight, mutation_rate, max_items_from_each)
                    new_population.append(child)
            population = new_population
            if generation % 2 == 0:
                best_individual = max(population, key=lambda x: calculate_fitness(x))
                best_individual_json = [item.to_json() for item in best_individual]
                best_individual_array.append(best_individual_json)
        
        best_individual = max(population, key=lambda x: calculate_fitness(x))
        best_individual_json = [item.to_json() for item in best_individual]
        best_individual_array.append(best_individual_json)
        return best_individual_array
    except Exception as e:
        print("An error occurred during algorithm execution:", e)
        # Handle other exceptions gracefully
        return None

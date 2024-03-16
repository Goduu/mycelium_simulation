from pydantic import BaseModel
from typing import List

class Item(BaseModel):
    id: int
    name: str
    price: float
    weight: float
    
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "weight": self.weight
        }

class EvolutionaryInput(BaseModel):
    items: List[Item]
    max_weight: int
    population_size: int
    mutation_rate: float
    elitism: int
    tournament_size: int
    generations: int
    max_items_from_each: int
    
import math
import random
import uuid
import matplotlib.pyplot as plt
from collections import namedtuple
from typing import Set,List
import copy
import networkx as nx

Position = namedtuple("Position", ["x", "y"])
steps = 40
max_dist_to_link = 1.5
initial_temperature = 20  # Initial temperature (in Celsius)
initial_humidity = 70     # Initial humidity (in percentage)

class DecayingSignal:
    def __init__(self, target: uuid, priority: int, max_range: int) -> None:
        self.id = str(uuid.uuid4())
        self.target = target
        self.priority = priority # prioritize the spores with more connections
        self.max_range = max_range
        self.passing_through: List[str] = [target]
    
    def get_priority(self):
        return self.priority

class EnergySignal:
     def __init__(self, target: uuid, energy: int, passing_through: List[str], decaying_signal_ref: str) -> None:
        self.target  = target
        self.energy = energy
        self.passing_through = passing_through
        self.decaying_signal_ref = decaying_signal_ref
        self.max_range = len(passing_through)
        self.passed = 0

            
class Spore:
    def __init__(self, x: int, y: int, energy: int = random.randint(100, 150)):
        self.id = str(uuid.uuid4())
        self.type = "spore"
        self.position = Position(x, y)
        self.energy = energy
        self.energy_decomposition_rate = random.randint(15, 50)
        self.energy_cost_to_multiply = 6
        self.state = "alive"
        self.passing_signals: List[DecayingSignal] = []
    
    def init_from_dict(d=None):
        spore = Spore(0,0)
        if d is not None:
            for key, value in d.items():
                setattr(spore, key, value)
        return spore
    
    def remove_decaying_signal(self, signal_id: str):
        self.passing_signals = [signal for signal in self.passing_signals if signal.id != signal_id]
    
    def get_signal_max_range(self):
        return 6 - self.energy + 2

    def __eq__(self, other: object) -> bool:
        return self.id == other.id

    def __hash__(self) -> int:
        return hash(self.id)
    
    def enter_in_decay_state(self):
        self.state = "decaying"

class Substrate:
    def __init__(self, x: int, y: int):
        self.id = str(uuid.uuid4())
        self.type = "substrate"
        self.position = Position(x, y)
        self.energy = random.randint(24, 258)
    
    def init_from_dict(d=None):
        substrate = Substrate(0,0)
        if d is not None:
            for key, value in d.items():
                setattr(substrate, key, value)
        return substrate

    def __eq__(self, other: object) -> bool:
        return self.id == other.id

    def __hash__(self) -> int:
        return hash(self.id)

class Environment:
    def __init__(self, temperature, humidity):
        self.temperature = temperature
        self.humidity = humidity
        
class Mycelium:
    def __init__(self,initial_environment):
        self.graph = nx.Graph()
        self.environment = initial_environment
        self.growth_rate = 0.4
        
    def update_environment(self, temperature_change, humidity_change):
        self.environment.temperature += temperature_change
        self.environment.humidity += humidity_change
    
    def simulate_growth(self):
        # Simulate mycelium growth based on environmental conditions
        if self.environment.temperature > 25 and self.environment.humidity > 60:
            # Favorable conditions for growth
            growth_rate = 0.5
        else:
            # Unfavorable conditions
            growth_rate = 0.2
        
        self.growth_rate = growth_rate
        
        
    def initialize(self):
        self.substrates = self.create_initial_substrates(20)
        for substrate in self.substrates:
            self.graph.add_node(substrate.id, **vars(substrate))
        self.spores =  self.create_initial_spores(5)
        for spore in self.spores:
            self.graph.add_node(spore.id, **vars(spore))
        for spore in self.spores:
            self.link_close_spores(spore)
            
            
    def decide_multiply_direction(self, spore: Spore):
        # Get the positions of all linked spores
        linked_spores = self.get_linked_spores(spore)
        if not linked_spores or random.random() > 0.7:
            new_x = spore.position.x + random.uniform(-2.5, 2.5)
            new_y = spore.position.y + random.uniform(-2.5, 2.5)
        else: 
            new_x = sum([spore.position.x for spore in linked_spores]) // len(linked_spores)
            new_y = sum([spore.position.y for spore in linked_spores]) // len(linked_spores)
        # Return the new position as a Position object
        return Position(new_x, new_y)
    
    def get_spore_by_id(self, id: str) -> Spore:
        for spore in self.spores:
            if spore.id == id:
                return spore
        return None
    
    def get_substrate_by_id(self, id: str) -> Substrate:
        for substrate in self.substrates:
            if substrate.id == id:
                return substrate
        return None
        
    def get_spores(self) -> List[Spore]:
        return [self.get_spore_by_id(data["id"]) for node, data in self.graph.nodes(data=True) if data["type"] == "spore"]
    
    def get_substrates(self) -> List[Substrate]:
        return [self.get_substrate_by_id(data["id"]) for node, data in self.graph.nodes(data=True) if data["type"] == "substrate"]

    def get_linked_substrates(self, spore: Spore) -> List[Substrate]:
        return [self.get_substrate_by_id(neighbor) for neighbor in self.graph.neighbors(spore.id) if self.graph.nodes[neighbor]["type"] == "substrate"]
    
    def get_linked_spores(self, spore: Spore):
        return [ self.get_spore_by_id(neighbor) for neighbor in self.graph.neighbors(spore.id) if  self.graph.nodes[neighbor]["type"] == "spore" ]

    def create_initial_spores(self, n: int):
        return [Spore(random.randint(0, 19), random.randint(0, 19)) for _ in range(n)]

    def create_initial_substrates(self, n: int):
        return [Substrate(random.randint(0, 19), random.randint(0, 19)) for _ in range(n)]

    def consume_spore_energy(self, spore: Spore):
        spore.energy -= 1
        for substrate in self.get_linked_substrates(spore):
            if substrate.energy > 0:
                print("draining energy",substrate.energy)
                energy_drained = min(spore.energy_decomposition_rate, substrate.energy)
                substrate.energy -= energy_drained
                spore.energy += energy_drained
                
    def pass_decaying_signal(self, spore: Spore, signal: DecayingSignal):
        spore.passing_signals.append(signal)
        signal_copy = copy.copy(signal)
        visited_spores: Set[str] = set()

        def propagate_signal(current_spore):
            visited_spores.add(current_spore.id)
            for linked_spore in self.get_linked_spores(current_spore):
                if linked_spore.id not in visited_spores:
                    signal_copy.passing_through.append(linked_spore.id)
                    if len(signal_copy.passing_through) < signal_copy.max_range:
                        propagate_signal(linked_spore)

        propagate_signal(spore)
            
    def pass_energy(self, spore: Spore, energy_signal: EnergySignal):
        energy_signal.passed += 1
        print("in pass energy")
        if energy_signal.target == spore.id:
            if spore.state == "decaying":
                print("got energy")
                spore.energy += energy_signal.energy
                spore.state = "alive"
            spore.remove_decaying_signal(energy_signal.decaying_signal_ref)
        elif len(energy_signal.passing_through) > 0:
            print("passing through")
            next_in_line = self.get_spore_by_id(energy_signal.passing_through[-1])
            spore.remove_decaying_signal(energy_signal.decaying_signal_ref)
            if next_in_line is not None:
                energy_signal.passing_through.pop()
                if(energy_signal.passed < energy_signal.max_range):
                    self.pass_energy(next_in_line, energy_signal)
            
                    
    def kill_spore(self, spore: Spore):
        spore.state = "dead"
        for linked in self.get_linked_spores(spore):
            if spore in self.get_linked_spores(linked):
                self.graph.remove_edge(spore.id, linked.id)
            for substrate in self.get_linked_substrates(linked):
                if spore in self.get_linked_spores(substrate):
                    self.graph.remove_edge(spore.id, substrate.id)
        self.graph.remove_node(spore.id) 
        
    def multiply_spores(self):
        for spore in self.get_spores():
            if spore.energy >= spore.energy_cost_to_multiply and random.random() < self.growth_rate:
                new_spore_positions = self.decide_multiply_direction(spore)
                new_spore = Spore(new_spore_positions.x,new_spore_positions.y,
                                  spore.energy / 2
                                  )
                spore.energy = spore.energy / 2
                self.spores.append(new_spore)
                self.graph.add_node(new_spore.id, **vars(new_spore))
                self.graph.add_edge(spore.id, new_spore.id)
                self.link_close_spores(new_spore)
    
    def link_close_spores(self, new_spore: Spore):
        for node, data in self.graph.nodes(data=True):
            if node != new_spore.id:
                distance = math.sqrt((new_spore.position.x - data['position'].x) ** 2 +
                                    (new_spore.position.y - data['position'].y) ** 2)
                if distance <= max_dist_to_link:
                    self.graph.add_edge(node, new_spore.id)

    class Spore:
        def __init__(self, x: int, y: int):
            self.id = str(uuid.uuid4())
            self.position = Position(x, y)
            self.energy = random.randint(6, 20)
            self.energy_decomposition_rate = random.randint(2, 7)
            self.energy_cost_to_multiply = 3
            self.state = "alive"

        def __eq__(self, other: object) -> bool:
            return self.id == other.id

        def __hash__(self) -> int:
            return hash(self.id)

    
    def plot_mycelium(self):

        # Set node positions based on spore and substrate positions
        pos = {node: data['position'] for node, data in self.graph.nodes(data=True)}

        # Set node colors based on spore and substrate state
        node_colors = ['green' if 'state' in data and data['state'] == 'alive' else 'red' for _, data in self.graph.nodes(data=True)]

        # Set node sizes based on spore and substrate energy
        node_sizes = [data['energy'] for _, data in self.graph.nodes(data=True)]

        # Draw the graph
        nx.draw(self.graph, pos, node_color=node_colors, node_size=node_sizes, with_labels=False)

        # Show the plot
        plt.show()

def manhattan_distance(pos1, pos2):
    return abs(pos1[0] - pos2[0]) + abs(pos1[1] - pos2[1])

def check_decaying_state(spore: Spore, mycelium: Mycelium):
    if spore.state == "decaying":
        signal = DecayingSignal(spore.id, len(mycelium.get_linked_spores(spore)), spore.get_signal_max_range())
        mycelium.pass_decaying_signal(spore, signal)
    elif spore.energy < spore.energy_cost_to_multiply:
        spore.enter_in_decay_state()
        
        
def decide_donate_energy(spore: Spore, mycelium: Mycelium):
    if spore.energy > 4:
        print("in decide donate energy")
        higher_priority_signal = max(spore.passing_signals, key=DecayingSignal.get_priority)
        if random.random() < higher_priority_signal.get_priority() * 0.25:
            signal = higher_priority_signal
            energy_signal = EnergySignal(signal.target, spore.energy_cost_to_multiply, signal.passing_through, higher_priority_signal.id)
            mycelium.pass_energy(spore, energy_signal)    

initial_environment = Environment(initial_temperature, initial_humidity)
mycelium = Mycelium(initial_environment)                 
mycelium.initialize()


for _ in range(steps):
    for spore in mycelium.get_spores():
        mycelium.consume_spore_energy(spore)
        check_decaying_state(spore, mycelium)
        if spore.energy <= 0:
            mycelium.kill_spore(spore)
        if len(spore.passing_signals) > 0:
            decide_donate_energy(spore, mycelium)
    mycelium.multiply_spores()
    print(sum([spore.energy for spore in mycelium.get_substrates()]))
    mycelium.plot_mycelium()

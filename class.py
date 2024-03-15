import random
import uuid
import matplotlib.pyplot as plt
from collections import namedtuple
from typing import Set,List
import copy
import networkx as nx

Position = namedtuple("Position", ["x", "y"])

class DecayingSignal:
    def __init__(self, target: uuid, priority: int) -> None:
        self.id = str(uuid.uuid4())
        self.target = target
        self.priority = priority # prioritize the spores with more connections
        self.passing_through: List[str] = [target]
    
    def get_priority(self):
        return self.priority

class EnergySignal:
     def __init__(self, target: uuid, energy: int, passing_through: List[str]) -> None:
        self.target  = target
        self.energy = energy
        self.passing_through = passing_through

            
class Spore:
    def __init__(self, x: int, y: int, energy: int = random.randint(100, 150)):
        self.id = str(uuid.uuid4())
        self.position = Position(x, y)
        self.energy = energy
        self.energy_decomposition_rate = random.randint(6, 24)
        self.linked_to: Set[Substrate | Spore] = set()
        self.energy_cost_to_multiply = 6
        self.state = "alive"
        self.passing_signals: List[DecayingSignal] = []
        
    def get_linked_substrates(self):
        return [ linked for linked in self.linked_to if isinstance(linked, Substrate) ]
    
    def get_linked_spores(self):
        return [ linked for linked in self.linked_to if isinstance(linked, Spore) ]

    def __eq__(self, other: object) -> bool:
        return self.id == other.id

    def __hash__(self) -> int:
        return hash(self.id)
    
   
    def check_decaying_state(self):
         if self.state == "decaying":
            signal = DecayingSignal(self.id, len(self.linked_to))
            pass_decaying_signal(self, signal)
            
            
    def decide_donate_energy(self):
        if self.energy > self.energy_cost_to_multiply * 2:
            higher_priority_signal = max(self.passing_signals, key=DecayingSignal.get_priority)
            if random.random() < higher_priority_signal.get_priority() * 0.25:
                signal = higher_priority_signal
                energy_signal = EnergySignal(signal.target, self.energy_cost_to_multiply, signal.passing_through)
                pass_energy(spore, energy_signal)
                   
    
    def consume_energy(self):
        self.energy -= 1
        for substrate in self.get_linked_substrates():
            if substrate.energy > 0:
                energy_drained = min(self.energy_decomposition_rate, substrate.energy)
                substrate.energy -= energy_drained
                self.energy += energy_drained

    def enter_in_decay_state(self):
        self.state = "decaying"

    # def die(self):
    #     self.state = "dead"
    #     for linked in self.linked_to:
    #         if isinstance(linked, Spore):
    #             if self in linked.linked_to:
    #                 linked.linked_to.remove(self)
    #             for network in linked.networks:
    #                 if self in network.spores:
    #                     network.spores.remove(self)


class Substrate:
    def __init__(self, x: int, y: int):
        self.id = str(uuid.uuid4())
        self.position = Position(x, y)
        self.energy = random.randint(24, 258)

    def __eq__(self, other: object) -> bool:
        return self.id == other.id

    def __hash__(self) -> int:
        return hash(self.id)

class Mycelium:
    def __init__(self):
        self.spores = self.create_initial_spores(1)
        self.substrates = self.create_initial_substrates(20)

    def create_initial_spores(self, n: int):
        return [Spore(random.randint(0, 19), random.randint(0, 19)) for _ in range(n)]

    def create_initial_substrates(self, n: int):
        return [Substrate(random.randint(0, 19), random.randint(0, 19)) for _ in range(n)]

    def multiply_spores(self):
        new_spores = []
        for spore in self.spores:
            if spore.energy >= spore.energy_cost_to_multiply and random.random() > 0.6:
                new_spore = Spore(spore.position.x + random.uniform(-1.5, 1.5),
                                  spore.position.y + random.uniform(-1.5, 1.5),
                                  spore.energy_cost_to_multiply
                                  )
                new_spores.append(new_spore)
                spore.energy -= spore.energy_cost_to_multiply
                self.link_close_spores(new_spore)
        self.spores.extend(new_spores)

    class Spore:
        def __init__(self, x: int, y: int):
            self.id = str(uuid.uuid4())
            self.position = Position(x, y)
            self.energy = random.randint(6, 20)
            self.energy_decomposition_rate = random.randint(2, 7)
            self.linked_to: Set[Spore | Substrate ]= set()
            self.energy_cost_to_multiply = 3
            self.state = "alive"

        def __eq__(self, other: object) -> bool:
            return self.id == other.id

        def __hash__(self) -> int:
            return hash(self.id)

    def link_close_spores(self, new_spore: Spore):
        for spore in self.spores:
            if spore != new_spore:
                if manhattan_distance(spore.position, new_spore.position) <= 1.5:
                    if spore not in new_spore.linked_to:
                        new_spore.linked_to.add(spore)
                                
        for substrate in self.substrates:
            if substrate != new_spore:
                if manhattan_distance(substrate.position, new_spore.position) <= 1:
                    if substrate not in new_spore.linked_to:
                        new_spore.linked_to.add(substrate)

    def plot_mycelium(self):
        x = [spore.position.x for spore in self.spores]
        y = [spore.position.y for spore in self.spores]
        sizes = [spore.energy for spore in self.spores]
        colors = ['green' if spore.state == 'xongas' else 'red' for spore in self.spores]
        plt.scatter(x, y, s=sizes, c=colors)
        
        x = [substrate.position.x for substrate in self.substrates]
        y = [substrate.position.y for substrate in self.substrates]
        sizes = [substrate.energy for substrate in self.substrates]
        colors = ['yellow' for _ in self.substrates]

        plt.scatter(x, y, s=sizes, c=colors)
        plt.xlabel('X')
        plt.ylabel('Y')
        plt.title('Mycelium')
        plt.show()
    
    def plot_mycelium_as_graph(self):
        G = nx.Graph()

        # Add spores as nodes
        for spore in self.spores:
            G.add_node(spore.id, energy=spore.energy, position=spore.position, state=spore.state)

        # Add substrates as nodes
        for substrate in self.substrates:
            G.add_node(substrate.id, energy=substrate.energy, position=substrate.position)

        # Add edges between linked spores and substrates
        for spore in self.spores:
            for linked in spore.linked_to:
                G.add_edge(spore.id, linked.id)

        # Set node positions based on spore positions
        pos = {node: data['position'] for node, data in G.nodes(data=True)}
        # Set node colors based on spore state
        node_colors = ['green' if 'state' in data and data['state'] == 'alive' else 'red' for _, data in G.nodes(data=True)]

        # Set node sizes based on spore energy
        node_sizes = [data['energy'] for _, data in G.nodes(data=True)]

        # Draw the graph
        nx.draw(G, pos, node_color=node_colors, node_size=node_sizes, with_labels=False)

        # Show the plot
        plt.show()
        


def manhattan_distance(pos1, pos2):
    return abs(pos1[0] - pos2[0]) + abs(pos1[1] - pos2[1])

def pass_decaying_signal(spore: Spore, signal: DecayingSignal):
    spore.passing_signals.append(signal)
    signal_copy = copy.deepcopy(signal)
    signal_copy.passing_through.append(spore.id)
    for linked_spore in spore.get_linked_spores():
        pass_decaying_signal(linked_spore, signal_copy)
        
def pass_energy(spore: Spore, energy_signal: EnergySignal):
    if energy_signal.target == spore.id:
        spore.energy += energy_signal.energy
        spore.state = "xongas"
    else:
        for linked_spore in spore.get_linked_spores():
            if linked_spore.id == energy_signal.passing_through[-1]:
                energy_signal.passing_through.pop()
                pass_energy(linked_spore, energy_signal)
                
mycelium = Mycelium()
steps = 25
for _ in range(steps):
    for spore in mycelium.spores:
        spore.consume_energy()
        spore.check_decaying_state()
        if spore.energy < spore.energy_cost_to_multiply and spore.state != "decaying":
            spore.enter_in_decay_state()
        if(_ > 20):
            if len(spore.passing_signals) > 0:
                spore.decide_donate_energy()
    mycelium.multiply_spores()
    # make a plot visualization of the mycelium
    print(len(mycelium.spores))
    mycelium.plot_mycelium_as_graph()

# for spore in mycelium.spores:
#     signal = [signal.target for signal in spore.passing_signals]
#     print(signal)

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
from api.graph import process_mycelium_simulation, process_phase, process_start_phase
from api.run_evolutionary_algorithm import run_evolutionary_algorithm
from api.types import EvolutionaryInput, FieldSize, Item, Node, RunPhaseInput
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://evolutionary-algorithm.vercel.app", "http://localhost:3000", "http://127.0.0.1"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResponseMessage(BaseModel):
    message: str

# Asynchronous task endpoint
@app.post("/api/start_task", response_model=List[List[Item]])
async def start_task(input: EvolutionaryInput):
    print("Task started")
    try:
        best_individual_array = await run_evolutionary_algorithm(input)
        if(best_individual_array is not None):
            return best_individual_array
    
    except Exception as e:
        print("Exception:", str(e))
        return {"message": f"Error occurred: {str(e)}"}



@app.get("/graph")
async def get_graph():
    mycelium = process_mycelium_simulation()
    graph = mycelium.graph
    nodes = list(graph.nodes(data=True))
    edges = list(graph.edges())
    edges_list = []
    for edge in edges:
        edges_obj = {}
        source_pos = graph.nodes[edge[0]]['position']
        target_pos = graph.nodes[edge[1]]['position']
        edges_obj["source"] = {'x': source_pos[0], 'y': source_pos[1]}
        edges_obj["target"] = {'x': target_pos[0], 'y': target_pos[1]}
        edges_list.append(edges_obj)
    
    return {
        "nodes": [{
            "id": node[1]["id"],
            "position": {"x": node[1]["position"][0], "y": node[1]["position"][1]},
            "type": node[1]["type"],
            "energy": node[1]["energy"],
            } for node in nodes],
        "edges": edges_list,
        "data": {
            # "edge_attributes": {(str(edge[0]), str(edge[1])): dict(graph[edge[0]][edge[1]]) for edge in graph.edges}
        }
    }
    
@app.post("/api/start_phase")
async def start_phase(fieldSize: FieldSize):
    mycelium = process_start_phase(fieldSize)
    graph = mycelium.graph
    nodes = list(graph.nodes(data=True))
    
        
    return {
        "nodes": [{
            "id": node[1]["id"],
            "position": {"x": node[1]["position"][0], "y": node[1]["position"][1]},
            "type": node[1]["type"],
            "energy": node[1]["energy"],
            } for node in nodes],
       "edges": [],
    }

@app.post("/api/run_phase")
async def run_phase(input: RunPhaseInput):
    mycelium = process_phase(input.field_size, input.nodes)
    graph = mycelium.graph
    nodes = list(graph.nodes(data=True))
    edges = list(graph.edges())
    edges_list = []
    for edge in edges:
        edges_obj = {}
        source_pos = graph.nodes[edge[0]]['position']
        target_pos = graph.nodes[edge[1]]['position']
        edges_obj["source"] = {'x': source_pos[0], 'y': source_pos[1]}
        edges_obj["target"] = {'x': target_pos[0], 'y': target_pos[1]}
        edges_list.append(edges_obj)
    return {
        "nodes": [{
            "id": node[1]["id"],
            "position": {"x": node[1]["position"][0], "y": node[1]["position"][1]},
            "type": node[1]["type"],
            "energy": node[1]["energy"],
            } for node in nodes],
        "edges": edges_list,
    }
    

def format_nodes(mycelium):
    graph = mycelium.graph
    nodes = list(graph.nodes(data=True))

    return [{
            "id": node[1]["id"],
            "position": {"x": node[1]["position"][0], "y": node[1]["position"][1]},
            "type": node[1]["type"],
            "energy": node[1]["energy"],
            } for node in nodes],
    
def format_edges(mycelium):
    graph = mycelium.graph
    edges = list(graph.edges())
    edges_list = []
    
    for edge in edges:
        edges_obj = {}
        source_pos = graph.nodes[edge[0]]['position']
        target_pos = graph.nodes[edge[1]]['position']
        edges_obj["source"] = {'x': source_pos[0], 'y': source_pos[1]}
        edges_obj["target"] = {'x': target_pos[0], 'y': target_pos[1]}
        edges_list.append(edges_obj)
    
    return edges_list,
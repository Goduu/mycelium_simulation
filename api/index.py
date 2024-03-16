from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
import asyncio
from api.graph import run_mycelium_simulation
from api.run_evolutionary_algorithm import run_evolutionary_algorithm
from api.types import EvolutionaryInput, Item
import json
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
    mycelium = run_mycelium_simulation()
    graph = mycelium.graph
    nodes = list(graph.nodes(data=True))
    edges = list(graph.edges())
    edges_list = []
    print("edges:", edges)
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
            } for node in nodes],
        "edges": edges_list,
        "data": {
            # "edge_attributes": {(str(edge[0]), str(edge[1])): dict(graph[edge[0]][edge[1]]) for edge in graph.edges}
        }
    }
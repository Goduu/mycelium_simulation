from fastapi import FastAPI
import networkx as nx
import json
import uvicorn

app = FastAPI()

# Define your graph here (replace this with your actual graph creation logic)
graph = nx.Graph()
graph.add_nodes_from([1, 2, 3])
graph.add_edges_from([(1, 2), (2, 3)])

@app.get("/graph")
async def get_graph():
    nodes = list(graph.nodes(data=True))
    edges = list(graph.edges())
    return {
        "nodes": nodes,
        "edges": edges,
        "data": {
            "graph_attributes": dict(graph.graph),
            "node_attributes": {node: dict(graph.nodes[node]) for node in graph.nodes},
            "edge_attributes": {edge: dict(graph[edge[0]][edge[1]]) for edge in graph.edges}
        }
    }

if __name__ == "__main__":
    
    uvicorn.run(app, host="0.0.0.0", port=8000)
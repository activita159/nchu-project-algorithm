from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from data.algorithms import ALGORITHMS
import math
import random
from typing import Optional

app = FastAPI(
    title="ML Algorithm Learning Platform API",
    description="Interactive learning platform for 10 key machine learning algorithms",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "ML Algorithm Learning API", "algorithms_count": len(ALGORITHMS)}


@app.get("/api/algorithms")
def get_all_algorithms():
    """Return list of all algorithms (summary level)."""
    return [
        {
            "id": a["id"],
            "name": a["name"],
            "name_zh": a["name_zh"],
            "category": a["category"],
            "difficulty": a["difficulty"],
            "tags": a["tags"],
            "summary": a["summary"],
        }
        for a in ALGORITHMS
    ]


@app.get("/api/algorithms/{algo_id}")
def get_algorithm_detail(algo_id: str):
    """Return full detail of a specific algorithm."""
    for algo in ALGORITHMS:
        if algo["id"] == algo_id:
            return algo
    return {"error": "Algorithm not found"}


@app.get("/api/algorithms/{algo_id}/code")
def get_algorithm_code(algo_id: str):
    """Return code example for a specific algorithm."""
    for algo in ALGORITHMS:
        if algo["id"] == algo_id:
            return {"id": algo_id, "name": algo["name"], "code_example": algo["code_example"]}
    return {"error": "Algorithm not found"}


@app.get("/api/algorithms/{algo_id}/visualization")
def get_algorithm_visualization(algo_id: str):
    """Return visualization data for a specific algorithm."""
    for algo in ALGORITHMS:
        if algo["id"] == algo_id:
            return {"id": algo_id, "name": algo["name"], "visualization": algo["visualization"]}
    return {"error": "Algorithm not found"}


@app.get("/api/generate-regression")
def generate_regression_data(
    slope: float = Query(2.0, description="Slope of regression line"),
    intercept: float = Query(0.0, description="Intercept of regression line"),
    noise: float = Query(2.0, description="Noise standard deviation"),
    n_points: int = Query(50, description="Number of data points", ge=10, le=200),
):
    """Generate interactive regression data for visualization."""
    step = 10.0 / (n_points - 1) if n_points > 1 else 0
    x = [i * step for i in range(n_points)]
    y_true = [slope * xi + intercept for xi in x]
    y_noisy = [yi + random.gauss(0, noise) for yi in y_true]
    return {"x": x, "y_noisy": y_noisy, "y_true": y_true, "params": {"slope": slope, "intercept": intercept, "noise": noise}}


@app.get("/api/generate-sigmoid")
def generate_sigmoid_data(
    slope: float = Query(1.0, description="Sigmoid steepness"),
    intercept: float = Query(0.0, description="Sigmoid horizontal shift"),
):
    """Generate sigmoid curve data for logistic regression visualization."""
    step = 12.0 / 49.0
    x = [-6.0 + i * step for i in range(50)]
    y = [1 / (1 + math.exp(-(slope * xi + intercept))) for xi in x]
    return {"x": x, "y": y, "params": {"slope": slope, "intercept": intercept}}


@app.get("/api/generate-clusters")
def generate_cluster_data(
    n_clusters: int = Query(3, ge=2, le=8),
    cluster_std: float = Query(0.6, ge=0.1, le=2.0),
    n_points: int = Query(100, ge=20, le=500),
):
    """Generate cluster data for K-Means visualization."""
    centers = [[math.cos(2 * math.pi * i / n_clusters) * 5, math.sin(2 * math.pi * i / n_clusters) * 5] for i in range(n_clusters)]
    points = []
    labels = []
    for i, center in enumerate(centers):
        cluster_x = [random.gauss(center[0], cluster_std) for _ in range(n_points)]
        cluster_y = [random.gauss(center[1], cluster_std) for _ in range(n_points)]
        for x, y_val in zip(cluster_x, cluster_y):
            points.append([x, y_val])
            labels.append(i)
    return {"points": points, "labels": labels, "centroids": [list(c) for c in centers], "params": {"n_clusters": n_clusters, "cluster_std": cluster_std}}


@app.get("/api/generate-pca")
def generate_pca_data(
    n_components: int = Query(2, ge=1, le=3),
):
    """Generate PCA visualization data (simulated)."""
    points = []
    for _ in range(80):
        pc1 = random.gauss(0, 3)
        pc2 = random.gauss(0, 1.5)
        points.append([pc1, pc2])
    variance_ratio = [0.55, 0.25, 0.10, 0.06, 0.04][:n_components]
    vectors = [[variance_ratio[i] * 4, 0] if i == 0 else [0, variance_ratio[i] * 4] for i in range(n_components)]
    return {"points": points, "vectors": vectors[:2], "explained_variance": variance_ratio, "params": {"n_components": n_components}}

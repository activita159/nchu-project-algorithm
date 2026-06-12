import math
import random


def generate_regression_data(slope=2.0, intercept=0.0, noise=2.0, n_points=50):
    step = 10.0 / (n_points - 1) if n_points > 1 else 0
    x = [i * step for i in range(n_points)]
    y_true = [slope * xi + intercept for xi in x]
    y_noisy = [yi + random.gauss(0, noise) for yi in y_true]
    return {"x": x, "y_noisy": y_noisy, "y_true": y_true}


def generate_sigmoid_data(slope=1.0, intercept=0.0):
    step = 12.0 / 49.0
    x = [-6.0 + i * step for i in range(50)]
    y = [1 / (1 + math.exp(-(slope * xi + intercept))) for xi in x]
    return {"x": x, "y": y}


def generate_cluster_data(n_clusters=3, cluster_std=0.6, n_points=100):
    centers = [
        [math.cos(2 * math.pi * i / n_clusters) * 5,
         math.sin(2 * math.pi * i / n_clusters) * 5]
        for i in range(n_clusters)
    ]
    points = []
    labels = []
    for i, center in enumerate(centers):
        cluster_x = [random.gauss(center[0], cluster_std) for _ in range(n_points)]
        cluster_y = [random.gauss(center[1], cluster_std) for _ in range(n_points)]
        for x, y_val in zip(cluster_x, cluster_y):
            points.append([x, y_val])
            labels.append(i)
    centroids = [list(c) for c in centers]
    return {"points": points, "labels": labels, "centroids": centroids}


def generate_pca_data(n_components=2):
    points = []
    for _ in range(80):
        pc1 = random.gauss(0, 3)
        pc2 = random.gauss(0, 1.5)
        points.append([pc1, pc2])
    variance_ratio = [0.55, 0.25, 0.10, 0.06, 0.04][:n_components]
    vectors = [
        [variance_ratio[i] * 4, 0] if i == 0 else [0, variance_ratio[i] * 4]
        for i in range(n_components)
    ]
    return {"points": points, "vectors": vectors[:2], "explained_variance": variance_ratio}
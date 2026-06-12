import math
import plotly.graph_objects as go
import plotly.express as px
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.lines import Line2D

from utils.viz_data import (
    generate_regression_data,
    generate_sigmoid_data,
    generate_cluster_data,
    generate_pca_data,
)

CLUSTER_COLORS = [
    "#3b82f6", "#f59e0b", "#10b981", "#ef4444",
    "#8b5cf6", "#ec4899", "#06b6d4", "#f97316",
]

PLOTLY_LAYOUT = dict(
    paper_bgcolor="rgba(0,0,0,0)",
    plot_bgcolor="rgba(0,0,0,0)",
    font_color="#94a3b8",
    margin=dict(l=40, r=20, t=30, b=40),
)


def _style_axes(fig):
    fig.update_xaxes(gridcolor="#334155", zerolinecolor="#334155")
    fig.update_yaxes(gridcolor="#334155", zerolinecolor="#334155")


def render_linear_regression(slope, intercept, noise):
    data = generate_regression_data(slope, intercept, noise)
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=data["x"], y=data["y_noisy"],
        mode="markers", marker=dict(color="#3b82f6", opacity=0.6, size=7),
        name="Data",
    ))
    fig.add_trace(go.Scatter(
        x=data["x"], y=data["y_true"],
        mode="lines", line=dict(color="#f59e0b", width=2),
        name="True Line",
    ))
    fig.update_layout(**PLOTLY_LAYOUT, height=400)
    _style_axes(fig)
    return fig


def render_sigmoid_curve(slope, intercept):
    data = generate_sigmoid_data(slope, intercept)
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=data["x"], y=data["y"],
        mode="lines", line=dict(color="#3b82f6", width=2),
        name="Sigmoid",
    ))
    fig.add_hline(y=0.5, line_dash="dash", line_color="#f59e0b",
                  annotation_text="Threshold 0.5", annotation_font_color="#f59e0b")
    fig.update_layout(**PLOTLY_LAYOUT, height=400, yaxis=dict(range=[0, 1]))
    _style_axes(fig)
    return fig


def render_cluster_viz(n_clusters, cluster_std):
    data = generate_cluster_data(n_clusters, cluster_std)
    fig = go.Figure()
    for i in range(n_clusters):
        mask = [l == i for l in data["labels"]]
        px_vals = [p[0] for p, m in zip(data["points"], mask) if m]
        py_vals = [p[1] for p, m in zip(data["points"], mask) if m]
        fig.add_trace(go.Scatter(
            x=px_vals, y=py_vals,
            mode="markers",
            marker=dict(color=CLUSTER_COLORS[i % len(CLUSTER_COLORS)], opacity=0.7, size=6),
            name=f"Cluster {i + 1}",
        ))
    cx = [c[0] for c in data["centroids"]]
    cy = [c[1] for c in data["centroids"]]
    fig.add_trace(go.Scatter(
        x=cx, y=cy, mode="markers",
        marker=dict(color="white", size=12, symbol="x", line=dict(width=2, color="white")),
        name="Centroids",
    ))
    fig.update_layout(**PLOTLY_LAYOUT, height=400)
    _style_axes(fig)
    return fig


def render_pca_scatter(n_components):
    data = generate_pca_data(n_components)
    px_vals = [p[0] for p in data["points"]]
    py_vals = [p[1] for p in data["points"]]
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=px_vals, y=py_vals,
        mode="markers", marker=dict(color="#8b5cf6", opacity=0.6, size=6),
        name="Points",
    ))
    for v in data["vectors"]:
        fig.add_annotation(
            x=v[0], y=v[1], ax=0, ay=0,
            xref="x", yref="y", axref="x", ayref="y",
            showarrow=True, arrowhead=2, arrowcolor="#ef4444",
            arrowwidth=2, arrowsize=1.5,
        )
    var_text = "<br>".join(
        f"PC{i+1}: {v*100:.1f}%" for i, v in enumerate(data["explained_variance"][:n_components])
    )
    fig.update_layout(**PLOTLY_LAYOUT, height=400)
    _style_axes(fig)
    fig.update_xaxes(title_text="PC1")
    fig.update_yaxes(title_text="PC2")
    return fig, data["explained_variance"][:n_components]


def render_feature_importance():
    features = [f"Feat {i+1}" for i in range(10)]
    values = [0.25, 0.18, 0.15, 0.12, 0.10, 0.06, 0.05, 0.04, 0.03, 0.02]
    colors = ["#3b82f6"] * 3 + ["#60a5fa"] * 3 + ["#93c5fd"] * 4
    fig = go.Figure(go.Bar(
        x=values, y=features, orientation="h",
        marker_color=colors,
        text=[f"{v*100:.0f}%" for v in values],
        textposition="outside", textfont=dict(color="#94a3b8", size=11),
    ))
    fig.update_layout(**PLOTLY_LAYOUT, height=350, yaxis=dict(autorange="reversed"))
    _style_axes(fig)
    return fig


def render_bar_chart():
    categories = ["XGBoost", "Random Forest", "LightGBM", "CatBoost", "Gradient Boosting"]
    values = [0.942, 0.935, 0.940, 0.938, 0.932]
    fig = go.Figure(go.Bar(
        x=categories, y=values,
        marker_color=["#3b82f6", "#60a5fa", "#10b981", "#8b5cf6", "#f59e0b"],
        text=[f"{v:.3f}" for v in values],
        textposition="outside", textfont=dict(color="#94a3b8", size=11),
    ))
    fig.update_layout(**PLOTLY_LAYOUT, height=350, yaxis=dict(range=[0.92, 0.95]))
    _style_axes(fig)
    return fig


def render_network_diagram(hidden_neurons=100, layers=2, learning_rate=0.001):
    layer_sizes = [4]
    for i in range(layers):
        n = max(2, min(8, round(hidden_neurons / (100 / (4 + 2 * (i + 1))))))
        layer_sizes.append(n)
    layer_sizes.append(2)

    layer_names = ["Input"] + [f"Hidden {i+1}" for i in range(layers)] + ["Output"]

    fig, ax = plt.subplots(figsize=(10, 5))
    ax.set_facecolor("#0f172a")
    fig.patch.set_facecolor("#0f172a")

    n_layers = len(layer_sizes)
    layer_x = np.linspace(0.5, n_layers - 0.5, n_layers)
    max_nodes = max(layer_sizes)
    fig_height = max(4, max_nodes * 0.7 + 1)
    fig.set_size_inches(10, fig_height)

    positions = {}
    for li, size in enumerate(layer_sizes):
        y_start = (max_nodes - size) / 2
        for ni in range(size):
            positions[(li, ni)] = (layer_x[li], y_start + ni)

    for li in range(n_layers - 1):
        for ni in range(layer_sizes[li]):
            for nj in range(layer_sizes[li + 1]):
                x1, y1 = positions[(li, ni)]
                x2, y2 = positions[(li + 1, nj)]
                ax.plot([x1, x2], [y1, y2], color="#475569", linewidth=0.3, alpha=0.5)

    for (li, ni), (x, y) in positions.items():
        if li == 0:
            color = "#475569"
        elif li == n_layers - 1:
            color = "#ef4444"
        else:
            color = "#3b82f6"
        circle = plt.Circle((x, y), 0.18, color=color, ec="#1e293b", lw=1.5, zorder=5)
        ax.add_patch(circle)

    for li in range(n_layers):
        ax.text(layer_x[li], -0.8, f"{layer_names[li]}\n({layer_sizes[li]})",
                ha="center", va="top", color="#94a3b8", fontsize=9)

    ax.set_xlim(-0.5, n_layers + 0.5)
    ax.set_ylim(-1.5, max_nodes + 0.5)
    ax.set_aspect("equal")
    ax.axis("off")
    plt.tight_layout()
    return fig


def render_attention_map(d_model=128, nhead=8, num_layers=3):
    tokens = ["The", "cat", "sat", "on", "the", "mat"]
    n = len(tokens)
    np.random.seed(42)
    matrix = np.zeros((n, n))
    for i in range(n):
        vals = np.random.dirichlet(np.ones(n) * (1 + i * 0.5))
        matrix[i] = vals
    for i in range(n):
        matrix[i, i] = max(matrix[i, i], 0.3)
        matrix[i] /= matrix[i].sum()

    fig = go.Figure(data=go.Heatmap(
        z=matrix,
        x=tokens, y=tokens,
        colorscale=[[0, "#1e293b"], [0.5, "#3b82f6"], [1, "#60a5fa"]],
        text=np.round(matrix, 2),
        texttemplate="%{text:.2f}",
        textfont=dict(size=11),
        hovertemplate="Query: %{y}<br>Key: %{x}<br>Attention: %{z:.3f}<extra></extra>",
        showscale=False,
    ))
    fig.update_layout(
        **PLOTLY_LAYOUT, height=420, width=480,
        xaxis=dict(title="Key", side="top"),
        yaxis=dict(title="Query", autorange="reversed"),
    )
    return fig


def render_tree_diagram(max_depth=3, min_samples_split=2):
    nodes = [
        {"name": "petal length <= 2.45", "samples": 150, "x": 350, "y": 30, "color": "#3b82f6"},
        {"name": "setosa (50)", "x": 140, "y": 120, "color": "#10b981", "leaf": True},
        {"name": "petal width <= 1.75 (100)", "x": 525, "y": 120, "color": "#f59e0b"},
        {"name": "petal length <= 4.95 (54)", "x": 440, "y": 220, "color": "#f59e0b"},
        {"name": "versicolor (48)", "x": 340, "y": 310, "color": "#10b981", "leaf": True},
        {"name": "virginica (6)", "x": 540, "y": 310, "color": "#10b981", "leaf": True},
        {"name": "petal length <= 4.85 (46)", "x": 620, "y": 220, "color": "#f59e0b"},
        {"name": "virginica (3)", "x": 560, "y": 310, "color": "#10b981", "leaf": True},
        {"name": "virginica (43)", "x": 690, "y": 310, "color": "#10b981", "leaf": True},
    ]
    edges = [(0, 1), (0, 2), (2, 3), (2, 6), (3, 4), (3, 5), (6, 7), (6, 8)]

    fig, ax = plt.subplots(figsize=(10, 5))
    ax.set_facecolor("#0f172a")
    fig.patch.set_facecolor("#0f172a")

    for src, dst in edges:
        ax.plot(
            [nodes[src]["x"], nodes[dst]["x"]],
            [nodes[src]["y"] + 18, nodes[dst]["y"] - 18],
            color="#475569", linewidth=1.5, zorder=1,
        )

    for node in nodes:
        w, h = 170, 36
        rect = mpatches.FancyBboxPatch(
            (node["x"] - w/2, node["y"] - h/2), w, h,
            boxstyle="round,pad=0.1",
            facecolor="#1e293b", edgecolor=node["color"], linewidth=1.5, zorder=3,
        )
        ax.add_patch(rect)
        ax.text(node["x"], node["y"], node["name"],
                ha="center", va="center", color=node.get("color", "#e2e8f0"),
                fontsize=8, zorder=4, fontfamily="monospace")

    ax.set_xlim(0, 780)
    ax.set_ylim(0, 360)
    ax.invert_yaxis()
    ax.axis("off")
    plt.tight_layout()
    return fig


def render_decision_boundary(c=1.0, gamma=1.0):
    np.random.seed(42)
    n = 60
    X0_x = np.random.randn(n) * 0.8 + 2
    X0_y = np.random.randn(n) * 0.8 + 2
    X1_x = np.random.randn(n) * 0.8 + 7
    X1_y = np.random.randn(n) * 0.8 + 1.5

    xx, yy = np.meshgrid(np.linspace(-1, 10, 100), np.linspace(-1, 5, 100))
    mid_x = 4.5
    boundary_offset = 0.3 * np.sin(gamma * (xx - mid_x))
    Z = (yy - 1.75 - boundary_offset) * c * 0.5
    Z = 1 / (1 + np.exp(-np.clip(Z, -10, 10)))

    fig = go.Figure()
    fig.add_trace(go.Contour(
        x=xx[0], y=yy[:, 0], z=Z,
        colorscale=[[0, "#1e3a5f"], [0.5, "#0f172a"], [1, "#3a1e5f"]],
        showscale=False, opacity=0.5,
    ))
    fig.add_trace(go.Scatter(
        x=X0_x, y=X0_y, mode="markers",
        marker=dict(color="#3b82f6", size=6, opacity=0.7), name="Class 0",
    ))
    fig.add_trace(go.Scatter(
        x=X1_x, y=X1_y, mode="markers",
        marker=dict(color="#f59e0b", size=6, opacity=0.7), name="Class 1",
    ))
    sv_x = [3.5, 5.5, 3.8, 5.2]
    sv_y = [1.8, 1.4, 2.5, 0.8]
    fig.add_trace(go.Scatter(
        x=sv_x, y=sv_y, mode="markers",
        marker=dict(size=12, symbol="circle-open", color="#ef4444", line=dict(width=2)),
        name="Support Vectors",
    ))
    fig.update_layout(**PLOTLY_LAYOUT, height=400)
    _style_axes(fig)
    return fig
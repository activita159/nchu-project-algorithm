import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import streamlit as st
import math

from data.algorithms import ALGORITHMS
from utils.charts import (
    render_linear_regression,
    render_sigmoid_curve,
    render_cluster_viz,
    render_pca_scatter,
    render_feature_importance,
    render_bar_chart,
    render_network_diagram,
    render_attention_map,
    render_tree_diagram,
    render_decision_boundary,
)

st.set_page_config(
    page_title="ML Algorithm Learning Platform",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.markdown("""
<style>
    .stApp { background-color: #0f172a; }
    [data-testid="stSidebar"] { background-color: #1e293b; }
    .algo-card {
        border: 1px solid #334155;
        border-radius: 12px;
        padding: 16px;
        background: #1e293b;
        margin-bottom: 8px;
    }
    .difficulty-Beginner { color: #10b981; }
    .difficulty-Intermediate { color: #f59e0b; }
    .difficulty-Advanced { color: #ef4444; }
    .tag {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 12px;
        margin: 2px;
        background: #334155;
        color: #94a3b8;
    }
</style>
""", unsafe_allow_html=True)


@st.cache_data
def get_algorithms():
    return ALGORITHMS


def show_home():
    st.title("Machine Learning Algorithm Learning Platform")
    st.markdown(
        "Interactively explore 10 fundamental machine learning algorithms. "
        "Each algorithm includes theory, code examples, and interactive visualizations."
    )

    algorithms = get_algorithms()
    categories = ["All", "Regression", "Classification", "Clustering",
                  "Dimensionality Reduction", "Deep Learning"]
    selected_cat = st.radio("Filter by category", categories, horizontal=True, label_visibility="collapsed")

    filtered = algorithms
    if selected_cat != "All":
        if selected_cat == "Classification":
            filtered = [a for a in algorithms if "Classification" in a["category"]]
        elif selected_cat == "Regression":
            filtered = [a for a in algorithms if "Regression" in a["category"] and "Classification" not in a["category"]]
        else:
            filtered = [a for a in algorithms if a["category"] == selected_cat]

    cols = st.columns(3)
    for i, algo in enumerate(filtered):
        with cols[i % 3]:
            st.markdown(f"""
<div class="algo-card">
    <h3 style="margin:0; color:#e2e8f0;">{algo['name']}</h3>
    <p style="margin:2px 0; color:#64748b; font-size:14px;">{algo['name_zh']}</p>
    <span class="difficulty-{algo['difficulty']}" style="font-size:13px; font-weight:600;">{algo['difficulty']}</span>
    <span style="color:#64748b; font-size:13px; margin-left:8px;">{algo['category']}</span>
    <p style="color:#94a3b8; font-size:13px; margin-top:8px;">{algo['summary']}</p>
    <div>{"".join(f'<span class="tag">{t}</span>' for t in algo['tags'])}</div>
</div>
""", unsafe_allow_html=True)

    st.markdown("---")
    st.subheader("How to Use")
    c1, c2, c3 = st.columns(3)
    with c1:
        st.markdown("### 📖 Learn Theory")
        st.caption("Read detailed explanations, key concepts, and mathematical foundations.")
    with c2:
        st.markdown("### 💻 Study Code")
        st.caption("Examine real Python code examples using scikit-learn, XGBoost, and PyTorch.")
    with c3:
        st.markdown("### 🎮 Interact")
        st.caption("Adjust parameters and see how they affect the algorithm in real-time.")


def show_theory(algo):
    theory = algo.get("theory", {})

    if "overview" in theory:
        st.markdown("#### Overview")
        st.markdown(theory["overview"])

    for field, label in [
        ("model", "Model"),
        ("loss_function", "Loss Function"),
        ("objective_function", "Objective Function"),
    ]:
        if field in theory:
            st.markdown(f"#### {label}")
            st.code(theory[field], language=None)

    if "optimization" in theory:
        st.markdown("#### Optimization")
        st.markdown(theory["optimization"])

    list_fields = [
        ("assumptions", "Assumptions"),
        ("algorithm_steps", "Algorithm Steps"),
        ("splitting_criteria", "Splitting Criteria"),
        ("key_concepts", "Key Concepts"),
        ("key_techniques", "Key Techniques"),
        ("key_innovations", "Key Innovations"),
        ("hyperparameters", "Hyperparameters"),
        ("architecture", "Architecture"),
        ("attention_mechanism", "Attention Mechanism"),
        ("key_components", "Key Components"),
        ("advantages", "Advantages"),
        ("applications", "Applications"),
    ]
    for field, label in list_fields:
        if field in theory:
            st.markdown(f"#### {label}")
            for item in theory[field]:
                st.markdown(f"- {item}")

    special_list_fields = [
        ("kernels", "Kernels"),
        ("activation_functions", "Activation Functions"),
    ]
    for field, label in special_list_fields:
        if field in theory:
            st.markdown(f"#### {label}")
            for item in theory[field]:
                st.markdown(f"- **{item}**")


def show_code(algo):
    code_example = algo.get("code_example", {})
    if "python" in code_example:
        st.code(code_example["python"], language="python")
    if "explanation" in code_example:
        st.markdown(f"**Explanation:** {code_example['explanation']}")


def show_visualization(algo):
    viz_type = algo.get("visualization", {}).get("type", "")
    params = algo.get("interactive_params", [])

    slider_values = {}
    if params:
        st.markdown("#### Parameters")
        cols = st.columns(min(len(params), 3))
        for i, p in enumerate(params):
            with cols[i % 3]:
                key = f"viz_{algo['id']}_{p['name']}"
                if p.get("log"):
                    log_min = math.log10(p["min"])
                    log_max = math.log10(p["max"])
                    log_val = st.slider(
                        p["label"],
                        min_value=log_min,
                        max_value=log_max,
                        value=math.log10(p["default"]),
                        step=(log_max - log_min) / 100,
                        key=key,
                    )
                    slider_values[p["name"]] = round(10 ** log_val, 6)
                else:
                    slider_values[p["name"]] = st.slider(
                        p["label"],
                        min_value=float(p["min"]),
                        max_value=float(p["max"]),
                        value=float(p["default"]),
                        step=float(p["step"]),
                        key=key,
                    )

    st.markdown("---")

    if viz_type == "scatter_with_line":
        fig = render_linear_regression(
            slider_values.get("slope", 2),
            slider_values.get("intercept", 0),
            slider_values.get("noise", 2),
        )
        st.plotly_chart(fig, use_container_width=True)
        s = slider_values.get("slope", 2)
        b = slider_values.get("intercept", 0)
        st.markdown(f"`y = {s:.1f}x + {b:.1f}`")

    elif viz_type == "sigmoid_curve":
        fig = render_sigmoid_curve(
            slider_values.get("slope", 1),
            slider_values.get("intercept", 0),
        )
        st.plotly_chart(fig, use_container_width=True)
        s = slider_values.get("slope", 1)
        b = slider_values.get("intercept", 0)
        st.markdown(f"Decision boundary at x = {-b/s:.2f}")

    elif viz_type == "scatter_clusters":
        fig = render_cluster_viz(
            int(slider_values.get("n_clusters", 3)),
            slider_values.get("cluster_std", 0.6),
        )
        st.plotly_chart(fig, use_container_width=True)

    elif viz_type == "scatter_with_vectors":
        fig, variance = render_pca_scatter(
            int(slider_values.get("n_components", 2)),
        )
        st.plotly_chart(fig, use_container_width=True)
        var_text = " | ".join(f"PC{i+1}: {v*100:.1f}%" for i, v in enumerate(variance))
        st.markdown(f"**Explained Variance:** {var_text}")

    elif viz_type == "feature_importance":
        fig = render_feature_importance()
        st.plotly_chart(fig, use_container_width=True)

    elif viz_type == "bar_chart":
        fig = render_bar_chart()
        st.plotly_chart(fig, use_container_width=True)

    elif viz_type == "network_diagram":
        fig = render_network_diagram(
            slider_values.get("hidden_neurons", 100),
            int(slider_values.get("layers", 2)),
            slider_values.get("learning_rate", 0.001),
        )
        st.pyplot(fig)

    elif viz_type == "attention_map":
        fig = render_attention_map(
            slider_values.get("d_model", 128),
            int(slider_values.get("nhead", 8)),
            int(slider_values.get("num_layers", 3)),
        )
        st.plotly_chart(fig, use_container_width=True)

    elif viz_type == "tree_structure":
        fig = render_tree_diagram(
            int(slider_values.get("max_depth", 3)),
            int(slider_values.get("min_samples_split", 2)),
        )
        st.pyplot(fig)

    elif viz_type == "decision_boundary":
        fig = render_decision_boundary(
            slider_values.get("c", 1.0),
            slider_values.get("gamma", 1.0),
        )
        st.plotly_chart(fig, use_container_width=True)

    else:
        st.info(f"Visualization type: {viz_type}")


def show_algorithm(algo_id):
    algorithms = get_algorithms()
    algo = next((a for a in algorithms if a["id"] == algo_id), None)
    if not algo:
        st.error("Algorithm not found")
        return

    st.markdown(f"""
<div style="border:1px solid #334155; border-radius:12px; padding:20px; background:#1e293b; margin-bottom:16px;">
    <h1 style="margin:0; color:#e2e8f0;">{algo['name']}</h1>
    <p style="margin:4px 0; color:#64748b; font-size:16px;">{algo['name_zh']}</p>
    <span class="difficulty-{algo['difficulty']}" style="font-size:14px; font-weight:600;">{algo['difficulty']}</span>
    <span style="color:#64748b; font-size:14px; margin-left:8px;">{algo['category']}</span>
    <p style="color:#94a3b8; font-size:14px; margin-top:8px;">{algo['summary']}</p>
    <div>{"".join(f'<span class="tag">{t}</span>' for t in algo['tags'])}</div>
</div>
""", unsafe_allow_html=True)

    tab1, tab2, tab3 = st.tabs(["📖 Theory", "💻 Code", "🎮 Visualization"])
    with tab1:
        show_theory(algo)
    with tab2:
        show_code(algo)
    with tab3:
        show_visualization(algo)

    all_ids = [a["id"] for a in algorithms]
    idx = all_ids.index(algo_id)
    prev_col, next_col = st.columns(2)
    with prev_col:
        if idx > 0:
            prev_algo = algorithms[idx - 1]
            if st.button(f"← {prev_algo['name']}", key=f"prev_{algo_id}"):
                st.session_state["selected_algo"] = prev_algo["id"]
                st.rerun()
    with next_col:
        if idx < len(all_ids) - 1:
            next_algo = algorithms[idx + 1]
            if st.button(f"{next_algo['name']} →", key=f"next_{algo_id}"):
                st.session_state["selected_algo"] = next_algo["id"]
                st.rerun()


def main():
    algorithms = get_algorithms()

    if "selected_algo" not in st.session_state:
        st.session_state["selected_algo"] = None

    with st.sidebar:
        st.markdown("### 🧠 ML Learn")
        st.markdown("---")
        if st.button("🏠 Home", use_container_width=True, key="nav_home"):
            st.session_state["selected_algo"] = None
            st.rerun()

        st.markdown("#### Algorithms")
        categories_map = {}
        for a in algorithms:
            cat = a["category"].split(" / ")[0]
            if cat not in categories_map:
                categories_map[cat] = []
            categories_map[cat].append(a)

        for cat, algos in categories_map.items():
            st.markdown(f"**{cat}**")
            for a in algos:
                btn_type = "primary" if st.session_state["selected_algo"] == a["id"] else "secondary"
                if st.button(
                    f"{a['name_zh']}",
                    use_container_width=True,
                    key=f"nav_{a['id']}",
                    type=btn_type,
                ):
                    st.session_state["selected_algo"] = a["id"]
                    st.rerun()

    if st.session_state["selected_algo"] is None:
        show_home()
    else:
        show_algorithm(st.session_state["selected_algo"])


if __name__ == "__main__":
    main()
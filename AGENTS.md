# AGENTS.md

## Project

ML Algorithm Interactive Learning Platform — Streamlit app displaying 10 ML algorithms with theory, code examples, and interactive visualizations (Plotly/Matplotlib).

## Commands

```bash
pip install -r requirements.txt
streamlit run app.py --server.port 3000
```

No test suite or linter configured.

## Architecture

- **Single app** (`app.py`): Streamlit entry point. Sidebar navigation selects algorithms; main area shows Theory/Code/Visualization tabs via `st.tabs()`.
- **Data** (`data/algorithms.py`): Static Python list of 10 dicts. Each contains theory, code_example, visualization config, and interactive_params. Imported directly — no API layer.
- **Charts** (`utils/charts.py`): 10 render functions. Interactive charts use Plotly (`st.plotly_chart`); structural diagrams (neural network, decision tree) use Matplotlib (`st.pyplot`).
- **Viz data** (`utils/viz_data.py`): 4 data-generation functions (regression, sigmoid, clusters, PCA) using stdlib `math`/`random`. Called directly by chart functions.
- **Theme** (`.streamlit/config.toml`): Dark theme with slate palette, port 3000.

## Conventions

- Pure Python — no frontend framework, no build step.
- All algorithm data is static; no database or API server needed.
- Chart functions return Plotly figures or Matplotlib figures — never call `st.*` directly.
- No `.env` files; all config is hardcoded.

## Deployment

Deploys to Streamlit Community Cloud. Entry file: `app.py`. Requires `requirements.txt` with streamlit, plotly, matplotlib, numpy, pandas.
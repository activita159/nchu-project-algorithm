# Work Log - 2025-06-08

## Project: ML Algorithm Interactive Learning Platform

### Overview
Built a full-stack dynamic learning platform for 10 machine learning algorithms using Next.js (frontend) + FastAPI (backend).

---

### Backend (FastAPI)

**Files created:**
- `backend/main.py` — FastAPI application with 7 API endpoints
- `backend/data/algorithms.py` — Complete dataset for all 10 algorithms (theory, code, visualization data)
- `backend/data/__init__.py` — Python package init (fix)
- `backend/requirements.txt` — Dependencies (fastapi, uvicorn, pydantic)

**API Endpoints:**
| Endpoint | Description |
|---|---|
| `GET /` | Health check |
| `GET /api/algorithms` | List all 10 algorithms (summary) |
| `GET /api/algorithms/{id}` | Full detail for one algorithm |
| `GET /api/algorithms/{id}/code` | Code example only |
| `GET /api/algorithms/{id}/visualization` | Visualization data only |
| `GET /api/generate-regression?slope=&intercept=&noise=` | Interactive regression data |
| `GET /api/generate-sigmoid?slope=&intercept=` | Sigmoid curve data |
| `GET /api/generate-clusters?n_clusters=&cluster_std=` | Cluster data |
| `GET /api/generate-pca?n_components=` | PCA data |

**Supported algorithms (10 total):**
1. Linear Regression (Beginner)
2. Logistic Regression (Beginner)
3. Decision Tree (Intermediate)
4. Random Forest (Intermediate)
5. K-Means (Beginner)
6. SVM (Advanced)
7. PCA (Intermediate)
8. XGBoost (Advanced)
9. Neural Network (Advanced)
10. Transformer (Advanced)

---

### Frontend (Next.js 14)

**Files created:**
- `frontend/package.json` — Dependencies (next, react, recharts, tailwindcss)
- `frontend/next.config.js` — API proxy rewrite to localhost:8000
- `frontend/tsconfig.json` — TypeScript config
- `frontend/tailwind.config.js` — Custom color theme (slate dark)
- `frontend/postcss.config.js` — PostCSS config
- `frontend/src/app/globals.css` — Global styles (dark theme)
- `frontend/src/app/layout.tsx` — Root layout with Navbar
- `frontend/src/app/page.tsx` — Homepage with algorithm cards + category filter
- `frontend/src/app/algorithms/[id]/page.tsx` — Dynamic algorithm detail page (3 tabs: Theory/Code/Visualization)
- `frontend/src/lib/api.ts` — API client with typed interfaces
- `frontend/src/components/Navbar.tsx` — Sticky nav with quick links to all algorithms
- `frontend/src/components/AlgorithmCard.tsx` — Card component with difficulty badge, tags, icons
- `frontend/src/components/TheorySection.tsx` — Renders all theory fields (overview, model, loss, steps, etc.)
- `frontend/src/components/CodeBlock.tsx` — Code display with copy button
- `frontend/src/components/InteractiveSlider.tsx` — Reusable range slider with log scale support
- `frontend/src/components/Visualization.tsx` — 6 visualization types:
  - `LinearRegressionViz` — Scatter + regression line (interactive: slope, intercept, noise)
  - `SigmoidCurve` — Sigmoid function plot (interactive: steepness, intercept)
  - `ClusterViz` — K-Means scatter clusters (interactive: K, spread)
  - `PCAScatter` — PCA 2D projection (interactive: n_components)
  - `FeatureImportance` — Horizontal bar chart (Random Forest importance)
  - `NetworkDiagram` — SVG neural network architecture diagram
  - `AttentionMap` — Self-attention heatmap matrix
  - `TreeDiagram` — SVG decision tree structure

**Startup script:**
- `start.bat` — One-click launcher for both backend (:8000) and frontend (:3000)

---

### Key Features
- Dark theme UI with Tailwind CSS
- Category filtering on homepage (All/Regression/Classification/Clustering/Dimensionality Reduction/Deep Learning)
- Three-tab layout per algorithm: Theory / Code / Visualization
- Interactive parameter sliders with real-time chart updates
- Built-in fallback data — frontend works offline without backend
- Copy-to-clipboard for code examples
- Responsive design (mobile-friendly grid)

---

### Fixes Applied
1. Replaced `numpy` with `math` + `random` standard library (avoid C compiler dependency on Windows)
2. Removed outdated version pins from `requirements.txt` (use latest compatible versions)
3. Added missing `backend/data/__init__.py` for Python package import
4. Fixed sigma character `σ` rendering in JSX (escape curly braces)

---

### Git
- Repository: `https://github.com/activita159/nchu-project-algorithm.git`
- Branch: `master`
- Commits:
  - `bcf5ea6` — Initial commit: full project
  - `203f960` — Fix: add `__init__.py`

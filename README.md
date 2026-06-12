# ML Algorithm Interactive Learning Platform

機器學習演算法互動學習平台 — 收錄 10 種經典 ML 演算法，每個演算法皆提供完整的理論說明、Python 程式碼範例，以及可即時調整參數的互動式視覺化圖表。

## 功能特色

- **理論學習**：每個演算法包含完整的數學模型、損失函數、最佳化方法與核心概念說明
- **程式碼範例**：以 scikit-learn、XGBoost、PyTorch 等框架撰寫的 Python 實作範例
- **互動視覺化**：使用 Recharts 繪製圖表，可透過滑桿即時調整參數並觀察結果變化
- **分類篩選**：首頁支援依類別篩選（迴歸 / 分類 / 聚類 / 降維 / 深度學習）
- **離線可用**：前端內建備援資料，即使後端未啟動仍可正常瀏覽

## 收錄演算法

| # | 演算法 | 英文名稱 | 難度 | 類別 |
|---|--------|---------|------|------|
| 1 | 線性回歸 | Linear Regression | Beginner | Regression |
| 2 | 邏輯回歸 | Logistic Regression | Beginner | Classification |
| 3 | 決策樹 | Decision Tree | Intermediate | Classification / Regression |
| 4 | 隨機森林 | Random Forest | Intermediate | Classification / Regression |
| 5 | K-均值聚類 | K-Means | Beginner | Clustering |
| 6 | 支持向量機 | SVM | Advanced | Classification / Regression |
| 7 | 主成分分析 | PCA | Intermediate | Dimensionality Reduction |
| 8 | 極限梯度提升 | XGBoost | Advanced | Classification / Regression |
| 9 | 神經網路 | Neural Network | Advanced | Deep Learning |
| 10 | 變換器 | Transformer | Advanced | Deep Learning |

## 技術棧

| 層 | 技術 |
|----|------|
| **Frontend** | Next.js 14 (App Router)、React 18、TypeScript、Tailwind CSS、Recharts |
| **Backend** | Python、FastAPI、Uvicorn |
| **Styling** | Tailwind CSS 深色主題（slate palette） |

## 專案結構

```
nchu-project-algorithm/
├── backend/
│   ├── main.py                  # FastAPI 應用程式進入點
│   ├── requirements.txt         # Python 依賴套件
│   └── data/
│       └── algorithms.py        # 10 個演算法的完整資料（理論、程式碼、視覺化）
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx         # 首頁（演算法卡片列表 + 分類篩選）
│   │   │   ├── layout.tsx       # 根佈局（導航列）
│   │   │   ├── globals.css      # 全域樣式
│   │   │   └── algorithms/
│   │   │       └── [id]/
│   │   │           └── page.tsx # 演算法詳情頁（理論 / 程式碼 / 視覺化 分頁）
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # 頂部導航列
│   │   │   ├── AlgorithmCard.tsx    # 演算法卡片
│   │   │   ├── TheorySection.tsx    # 理論內容區塊
│   │   │   ├── CodeBlock.tsx        # 程式碼展示（含複製功能）
│   │   │   ├── InteractiveSlider.tsx # 互動式參數滑桿
│   │   │   └── Visualization.tsx    # 視覺化圖表元件集合
│   │   └── lib/
│   │       └── api.ts          # API 客戶端
│   ├── next.config.js          # Next.js 設定（API 代理）
│   ├── tailwind.config.js      # Tailwind 設定
│   ├── tsconfig.json           # TypeScript 設定
│   └── package.json
├── start.bat                   # 一鍵啟動腳本（Windows）
└── AGENTS.md
```

## 快速開始

### 環境需求

- **Node.js** 18+
- **Python** 3.9+
- **npm** 9+

### 安裝與啟動

#### 方式一：一鍵啟動（Windows）

```bash
start.bat
```

會同時啟動後端（port 8000）與前端（port 3000）。

#### 方式二：手動啟動

**後端：**

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**前端：**

```bash
cd frontend
npm install
npm run dev
```

啟動後開啟瀏覽器前往 [http://localhost:3000](http://localhost:3000)。

## API 端點

| 方法 | 路徑 | 說明 |
|------|------|------|
| `GET` | `/api/algorithms` | 取得所有演算法摘要列表 |
| `GET` | `/api/algorithms/{id}` | 取得單一演算法完整資料 |
| `GET` | `/api/algorithms/{id}/code` | 取得演算法程式碼範例 |
| `GET` | `/api/algorithms/{id}/visualization` | 取得視覺化資料 |
| `GET` | `/api/generate-regression?slope=&intercept=&noise=` | 產生迴歸互動資料 |
| `GET` | `/api/generate-sigmoid?slope=&intercept=` | 產生 Sigmoid 曲線資料 |
| `GET` | `/api/generate-clusters?n_clusters=&cluster_std=` | 產生聚類互動資料 |
| `GET` | `/api/generate-pca?n_components=` | 產生 PCA 互動資料 |

前端透過 `next.config.js` 的 rewrite 規則將 `/api/*` 代理至後端 `http://localhost:8000`。

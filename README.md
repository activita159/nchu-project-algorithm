# ML Algorithm Interactive Learning Platform

機器學習演算法互動學習平台 — 收錄 10 種經典 ML 演算法，每個演算法皆提供完整的理論說明、Python 程式碼範例，以及可即時調整參數的互動式視覺化圖表。

## 功能特色

- **理論學習**：每個演算法包含完整的數學模型、損失函數、最佳化方法與核心概念說明
- **程式碼範例**：以 scikit-learn、XGBoost、PyTorch 等框架撰寫的 Python 實作範例
- **互動視覺化**：使用 Plotly / Matplotlib 繪製圖表，可透過滑桿即時調整參數並觀察結果變化
- **分類篩選**：首頁支援依類別篩選（迴歸 / 分類 / 聚類 / 降維 / 深度學習）
- **一鍵部署**：純 Python 架構，可直接部署至 Streamlit Community Cloud

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

| 項目 | 技術 |
|------|------|
| **Framework** | Streamlit |
| **視覺化** | Plotly（互動圖表）、Matplotlib（結構圖） |
| **資料處理** | NumPy、Pandas |
| **主題** | Streamlit 深色主題（slate 色系） |

## 專案結構

```
nchu-project-algorithm/
├── app.py                       # Streamlit 主進入點
├── requirements.txt             # Python 依賴套件
├── data/
│   └── algorithms.py            # 10 個演算法的完整資料（理論、程式碼、視覺化）
├── utils/
│   ├── viz_data.py              # 互動資料生成函數
│   └── charts.py                # Plotly / Matplotlib 圖表元件
├── .streamlit/
│   └── config.toml              # Streamlit 深色主題設定
└── start.bat                    # 一鍵啟動腳本（Windows）
```

## 快速開始

### 環境需求

- **Python** 3.9+

### 安裝與啟動

```bash
pip install -r requirements.txt
streamlit run app.py
```

或直接執行 `start.bat`（Windows）。

啟動後開啟瀏覽器前往 [http://localhost:3000](http://localhost:3000)。

## 部署至 Streamlit Community Cloud

1. 將此專案推送至 GitHub
2. 前往 [share.streamlit.io](https://share.streamlit.io)
3. 選擇此 repo，設定入口檔案為 `app.py`
4. 點擊 Deploy
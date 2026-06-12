ALGORITHMS = [
    {
        "id": "linear-regression",
        "name": "Linear Regression",
        "name_zh": "線性回歸",
        "category": "Regression",
        "difficulty": "Beginner",
        "tags": ["Supervised Learning", "Regression", "Statistical"],
        "summary": "A linear approach to modeling the relationship between a dependent variable and one or more independent variables.",
        "theory": {
            "overview": "Linear regression is one of the most fundamental algorithms in machine learning. It models the relationship between a scalar dependent variable y and one or more explanatory variables X using a linear function.",
            "model": "y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ + ε",
            "loss_function": "Mean Squared Error (MSE): L = (1/n) Σ(yᵢ - ŷᵢ)²",
            "optimization": "Ordinary Least Squares (OLS) or Gradient Descent to minimize MSE.",
            "assumptions": [
                "Linearity: The relationship between X and y is linear",
                "Independence: Observations are independent of each other",
                "Homoscedasticity: Constant variance of errors",
                "Normality: Errors are normally distributed",
                "No multicollinearity: Independent variables are not highly correlated"
            ],
            "key_concepts": [
                "R² Score: Proportion of variance explained by the model (0 to 1)",
                "Coefficients: β values indicate the impact of each feature",
                "Intercept (β₀): The predicted value when all features are zero",
                "Residuals: The difference between observed and predicted values"
            ]
        },
        "code_example": {
            "python": "from sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import mean_squared_error, r2_score\nimport numpy as np\n\n# Generate sample data\nnp.random.seed(42)\nX = np.random.rand(100, 1) * 10\ny = 3 * X.squeeze() + 5 + np.random.randn(100) * 2\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Train model\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\n# Predict\ny_pred = model.predict(X_test)\n\nprint(f\"Coefficient: {model.coef_[0]:.2f}\")\nprint(f\"Intercept: {model.intercept_:.2f}\")\nprint(f\"MSE: {mean_squared_error(y_test, y_pred):.2f}\")\nprint(f\"R²: {r2_score(y_test, y_pred):.2f}\")",
            "explanation": "This example demonstrates simple linear regression with one feature. The model learns a coefficient and intercept from the training data and evaluates on test data using MSE and R²."
        },
        "visualization": {
            "type": "scatter_with_line",
            "data": {
                "x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                "y": [3.2, 5.1, 7.3, 9.2, 11.5, 13.8, 15.9, 18.1, 20.5, 22.8],
                "line_x": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                "line_y": [3.1, 5.2, 7.3, 9.4, 11.5, 13.6, 15.7, 17.8, 19.9, 22.0]
            }
        },
        "interactive_params": [
            {"name": "slope", "label": "斜率 (Slope)", "type": "range", "min": 0.1, "max": 5, "step": 0.1, "default": 2},
            {"name": "intercept", "label": "截距 (Intercept)", "type": "range", "min": -5, "max": 5, "step": 0.1, "default": 0},
            {"name": "noise", "label": "噪聲 (Noise)", "type": "range", "min": 0, "max": 10, "step": 0.1, "default": 2}
        ]
    },
    {
        "id": "logistic-regression",
        "name": "Logistic Regression",
        "name_zh": "邏輯回歸",
        "category": "Classification",
        "difficulty": "Beginner",
        "tags": ["Supervised Learning", "Classification", "Binary Classification"],
        "summary": "A statistical model that uses a logistic function to model a binary dependent variable, despite its name it is used for classification.",
        "theory": {
            "overview": "Logistic regression predicts the probability that an instance belongs to a particular class. It applies the sigmoid function to a linear combination of features to produce outputs between 0 and 1.",
            "model": "P(y=1|x) = σ(β₀ + β₁x₁ + ... + βₙxₙ) where σ(z) = 1/(1 + e^(-z))",
            "loss_function": "Binary Cross-Entropy / Log Loss: L = -[y log(p) + (1-y) log(1-p)]",
            "optimization": "Maximum Likelihood Estimation (MLE) via Gradient Descent or Newton's method.",
            "key_concepts": [
                "Sigmoid Function: Maps any real value to (0,1), creating an S-shaped curve",
                "Decision Boundary: The threshold (typically 0.5) that separates classes",
                "Odds Ratio: e^β represents the multiplicative change in odds per unit increase in x",
                "Log-Odds: The left side of the equation represents log-odds, making the model interpretable",
                "Multiclass Extension: Softmax regression (multinomial logistic regression)"
            ]
        },
        "code_example": {
            "python": "from sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score, confusion_matrix\nfrom sklearn.datasets import make_classification\nimport numpy as np\n\n# Generate binary classification data\nX, y = make_classification(n_samples=500, n_features=2, n_redundant=0,\n                           n_clusters_per_class=1, random_state=42)\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Train model\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\n\n# Predict\ny_pred = model.predict(X_test)\ny_prob = model.predict_proba(X_test)\n\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.3f}\")\nprint(f\"Coefficients: {model.coef_}\")\nprint(f\"Intercept: {model.intercept_}\")\nprint(f\"Confusion Matrix:\\n{confusion_matrix(y_test, y_pred)}\")",
            "explanation": "This demonstrates binary classification using logistic regression. The model learns a decision boundary separating two classes, with predict_proba returning class probabilities."
        },
        "visualization": {
            "type": "sigmoid_curve",
            "data": {
                "x": [-6, -5.5, -5, -4.5, -4, -3.5, -3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
                "y": [0.0025, 0.0041, 0.0067, 0.011, 0.018, 0.0293, 0.0474, 0.0759, 0.1192, 0.1824, 0.2689, 0.3775, 0.5, 0.6225, 0.7311, 0.8176, 0.8808, 0.9241, 0.9526, 0.9707, 0.982, 0.989, 0.9933, 0.9959, 0.9975]
            }
        },
        "interactive_params": [
            {"name": "slope", "label": "斜率 (Slope)", "type": "range", "min": 0.5, "max": 5, "step": 0.1, "default": 1},
            {"name": "intercept", "label": "截距 (Intercept)", "type": "range", "min": -3, "max": 3, "step": 0.1, "default": 0}
        ]
    },
    {
        "id": "decision-tree",
        "name": "Decision Tree",
        "name_zh": "決策樹",
        "category": "Classification / Regression",
        "difficulty": "Intermediate",
        "tags": ["Supervised Learning", "Tree-Based", "Classification", "Regression"],
        "summary": "A tree-structured classifier where internal nodes represent features, branches represent decision rules, and leaves represent outcomes.",
        "theory": {
            "overview": "Decision trees recursively split the data based on feature values to create a tree structure. Each split aims to maximize the purity of the resulting subsets.",
            "model": "A hierarchical structure of if-then-else decision rules that partition the feature space.",
            "splitting_criteria": [
                "Gini Impurity (CART): Gini = 1 - Σ pᵢ², measures class mixture",
                "Entropy / Information Gain: Info Gain = Entropy(parent) - Σ weight × Entropy(child)",
                "Variance Reduction (Regression): Split to minimize variance in child nodes"
            ],
            "hyperparameters": [
                "max_depth: Maximum tree depth to prevent overfitting",
                "min_samples_split: Minimum samples required to split a node",
                "min_samples_leaf: Minimum samples required at a leaf node",
                "max_features: Number of features to consider for best split",
                "criterion: Splitting criterion (gini, entropy, log_loss)"
            ],
            "key_concepts": [
                "Root Node: The top node containing all data",
                "Internal Nodes: Decision points that split data based on a feature",
                "Leaf Nodes: Terminal nodes that output predictions",
                "Pruning: Removing branches to reduce overfitting",
                "Feature Importance: Normalized total reduction of criterion brought by each feature"
            ]
        },
        "code_example": {
            "python": "from sklearn.tree import DecisionTreeClassifier, plot_tree\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.datasets import load_iris\nfrom sklearn.metrics import accuracy_score, classification_report\nimport matplotlib.pyplot as plt\n\n# Load iris dataset\niris = load_iris()\nX, y = iris.data, iris.target\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Train model\nmodel = DecisionTreeClassifier(max_depth=3, criterion='gini', random_state=42)\nmodel.fit(X_train, y_train)\n\n# Predict\ny_pred = model.predict(X_test)\n\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.3f}\")\nprint(f\"Tree Depth: {model.get_depth()}\")\nprint(f\"Num Leaves: {model.get_n_leaves()}\")\nprint(f\"Feature Importances: {model.feature_importances_}\")\n\n# Visualize tree\nplt.figure(figsize=(15, 10))\nplot_tree(model, feature_names=iris.feature_names,\n          class_names=iris.target_names, filled=True)\nplt.show()",
            "explanation": "This example trains a decision tree on the Iris dataset with max_depth=3 to prevent overfitting. The tree makes splits based on feature thresholds to classify flower species."
        },
        "visualization": {
            "type": "tree_structure",
            "data": {
                "nodes": [
                    {"id": 0, "name": "petal length ≤ 2.45", "samples": 150},
                    {"id": 1, "name": "class: setosa", "samples": 50, "leaf": True},
                    {"id": 2, "name": "petal width ≤ 1.75", "samples": 100},
                    {"id": 3, "name": "petal length ≤ 4.95", "samples": 54},
                    {"id": 4, "name": "class: versicolor", "samples": 48, "leaf": True},
                    {"id": 5, "name": "class: virginica", "samples": 6, "leaf": True},
                    {"id": 6, "name": "petal length ≤ 4.85", "samples": 46},
                    {"id": 7, "name": "class: virginica", "samples": 3, "leaf": True},
                    {"id": 8, "name": "class: virginica", "samples": 43, "leaf": True}
                ],
                "edges": [[0, 1], [0, 2], [2, 3], [2, 6], [3, 4], [3, 5], [6, 7], [6, 8]]
            }
        },
        "interactive_params": [
            {"name": "max_depth", "label": "最大深度 (Max Depth)", "type": "range", "min": 1, "max": 10, "step": 1, "default": 3},
            {"name": "min_samples_split", "label": "最小分割樣本數 (Min Samples Split)", "type": "range", "min": 2, "max": 20, "step": 1, "default": 2}
        ]
    },
    {
        "id": "random-forest",
        "name": "Random Forest",
        "name_zh": "隨機森林",
        "category": "Classification / Regression",
        "difficulty": "Intermediate",
        "tags": ["Supervised Learning", "Ensemble", "Tree-Based", "Bagging"],
        "summary": "An ensemble learning method that combines multiple decision trees through bagging and random feature selection to improve accuracy and control overfitting.",
        "theory": {
            "overview": "Random Forest trains multiple decision trees on different random subsets of the data and features, then aggregates their predictions (majority vote for classification, average for regression).",
            "model": "Ensemble of N decision trees, each trained on a bootstrap sample with random feature subsets.",
            "key_techniques": [
                "Bootstrap Aggregating (Bagging): Each tree is trained on a random sample of data with replacement",
                "Feature Randomness: Each split considers only a random subset of features (typically √n_features for classification)",
                "Out-of-Bag (OOB) Error: Error estimated using samples not included in each tree's bootstrap sample",
                "Majority Voting: Final prediction is the most common class among all trees",
                "Mean Prediction: For regression, average individual tree predictions"
            ],
            "hyperparameters": [
                "n_estimators: Number of trees (more = better but slower)",
                "max_depth: Maximum depth of each tree",
                "min_samples_split: Minimum samples to split a node",
                "max_features: Number of features for best split selection",
                "bootstrap: Whether to use bootstrap samples"
            ],
            "advantages": [
                "Handles high-dimensional data well",
                "Provides feature importance estimates",
                "Robust to outliers and noise",
                "Less prone to overfitting than single decision trees",
                "Can handle missing values well"
            ]
        },
        "code_example": {
            "python": "from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split, cross_val_score\nfrom sklearn.datasets import make_classification\nfrom sklearn.metrics import accuracy_score, classification_report\nimport numpy as np\n\n# Generate data\nX, y = make_classification(n_samples=500, n_features=10, n_informative=5,\n                           n_redundant=2, random_state=42)\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Train model\nmodel = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)\nmodel.fit(X_train, y_train)\n\n# Predict\ny_pred = model.predict(X_test)\n\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.3f}\")\nprint(f\"Number of Trees: {len(model.estimators_)}\")\nprint(f\"Feature Importances: {model.feature_importances_}\")\n\n# Cross-validation\nscores = cross_val_score(model, X, y, cv=5)\nprint(f\"CV Mean Accuracy: {scores.mean():.3f} (+/- {scores.std() * 2:.3f})\")",
            "explanation": "Random forest with 100 trees, each trained on a bootstrap sample with random feature selection. The ensemble aggregates votes for robust classification."
        },
        "visualization": {
            "type": "feature_importance",
            "data": {
                "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6", "Feature 7", "Feature 8", "Feature 9", "Feature 10"],
                "importance": [0.25, 0.18, 0.15, 0.12, 0.10, 0.06, 0.05, 0.04, 0.03, 0.02]
            }
        },
        "interactive_params": [
            {"name": "n_estimators", "label": "樹的數量 (N Estimators)", "type": "range", "min": 10, "max": 200, "step": 10, "default": 100},
            {"name": "max_depth", "label": "最大深度 (Max Depth)", "type": "range", "min": 1, "max": 20, "step": 1, "default": 5}
        ]
    },
    {
        "id": "kmeans",
        "name": "K-Means",
        "name_zh": "K-均值聚類",
        "category": "Clustering",
        "difficulty": "Beginner",
        "tags": ["Unsupervised Learning", "Clustering", "Centroid-Based"],
        "summary": "A partitioning clustering algorithm that divides n observations into K clusters, where each observation belongs to the cluster with the nearest mean (centroid).",
        "theory": {
            "overview": "K-Means is an iterative algorithm that partitions data into K distinct clusters. It alternates between assigning points to the nearest centroid and recalculating centroids until convergence.",
            "algorithm_steps": [
                "Initialize: Randomly choose K data points as initial centroids (or use K-Means++)",
                "Assignment Step: Assign each data point to the nearest centroid (usually Euclidean distance)",
                "Update Step: Recalculate centroids as the mean of all points assigned to that cluster",
                "Repeat: Continue steps 2-3 until centroids no longer change significantly or max iterations reached"
            ],
            "objective_function": "SSE (Sum of Squared Errors): Σ Σ ||x - μᵢ||², over all clusters i and points x in cluster i.",
            "key_concepts": [
                "Elbow Method: Plot SSE vs K to find optimal K (where adding more clusters yields diminishing returns)",
                "Silhouette Score: Measures how similar a point is to its own cluster vs other clusters (-1 to 1)",
                "K-Means++: Smart centroid initialization that spreads out initial centroids for better convergence",
                "Curse of Dimensionality: Euclidean distance loses meaning in high dimensions",
                "Local Optima: Algorithm may converge to different solutions depending on initialization"
            ]
        },
        "code_example": {
            "python": "from sklearn.cluster import KMeans\nfrom sklearn.datasets import make_blobs\nfrom sklearn.metrics import silhouette_score\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# Generate sample data with 3 natural clusters\nX, y_true = make_blobs(n_samples=300, centers=3, cluster_std=0.60, random_state=0)\n\n# Train K-Means\nmodel = KMeans(n_clusters=3, init='k-means++', n_init=10, random_state=42)\nmodel.fit(X)\n\n# Predict clusters\nlabels = model.labels_\ncentroids = model.cluster_centers_\n\nprint(f\"Inertia (SSE): {model.inertia_:.2f}\")\nprint(f\"Silhouette Score: {silhouette_score(X, labels):.3f}\")\nprint(f\"Cluster Centers:\\n{centroids}\")\nprint(f\"Iterations: {model.n_iter_}\")\n\n# Find optimal K using Elbow method\ninertias = []\nfor k in range(1, 10):\n    km = KMeans(n_clusters=k, random_state=42)\n    km.fit(X)\n    inertias.append(km.inertia_)\nprint(f\"Inertias for K=1..9: {[f'{i:.0f}' for i in inertias]}\")",
            "explanation": "K-Means finds 3 natural clusters in the data. The elbow method helps determine the optimal K, and silhouette score evaluates cluster quality."
        },
        "visualization": {
            "type": "scatter_clusters",
            "data": {
                "clusters": [
                    {"x": [1.0, 1.5, 1.2, 1.8, 1.3, 2.1, 1.6], "y": [2.1, 2.5, 2.3, 2.8, 2.2, 2.7, 2.4], "label": 0},
                    {"x": [5.0, 5.5, 4.8, 5.2, 5.8, 4.5, 5.3], "y": [0.5, 0.8, 0.3, 0.6, 1.0, 0.4, 0.7], "label": 1},
                    {"x": [8.0, 8.5, 7.8, 8.2, 8.8, 7.5, 8.3], "y": [3.0, 3.5, 2.8, 3.2, 3.8, 2.5, 3.3], "label": 2}
                ],
                "centroids": [[1.5, 2.43], [5.16, 0.61], [8.16, 3.16]]
            }
        },
        "interactive_params": [
            {"name": "n_clusters", "label": "分群數量 (K)", "type": "range", "min": 2, "max": 8, "step": 1, "default": 3},
            {"name": "cluster_std", "label": "群集標準差", "type": "range", "min": 0.1, "max": 1.5, "step": 0.1, "default": 0.6}
        ]
    },
    {
        "id": "svm",
        "name": "Support Vector Machine (SVM)",
        "name_zh": "支持向量機",
        "category": "Classification / Regression",
        "difficulty": "Advanced",
        "tags": ["Supervised Learning", "Kernel Method", "Margin Maximization"],
        "summary": "A powerful classifier that finds the optimal hyperplane maximizing the margin between different classes, using kernel tricks for non-linear separable data.",
        "theory": {
            "overview": "SVM finds the hyperplane that best separates classes by maximizing the margin between the closest data points (support vectors) of each class. For non-linearly separable data, kernel functions map data to higher-dimensional spaces.",
            "model": "f(x) = sign(w·φ(x) + b), where φ is a kernel transformation and w,b define the hyperplane.",
            "key_concepts": [
                "Maximum Margin: The distance between the hyperplane and the nearest data points from each class",
                "Support Vectors: Data points that lie closest to the decision boundary and define the margin",
                "Soft Margin: Allows some misclassifications with penalty C (regularization parameter)",
                "Kernel Trick: Computes dot products in high-dimensional space without explicit transformation",
                "Dual Form: Optimization problem solved in terms of Lagrange multipliers αᵢ"
            ],
            "kernels": [
                "Linear: K(x,y) = x·y (no transformation, simple dot product)",
                "Polynomial: K(x,y) = (γx·y + r)^d (captures polynomial relationships)",
                "RBF/Gaussian: K(x,y) = exp(-γ||x-y||²) (most popular, infinite-dimensional mapping)",
                "Sigmoid: K(x,y) = tanh(γx·y + r) (similar to neural network activation)"
            ],
            "hyperparameters": [
                "C: Regularization parameter - trade-off between margin width and misclassification",
                "γ (gamma): Kernel coefficient - determines influence of a single training example",
                "kernel: Type of kernel function to use"
            ]
        },
        "code_example": {
            "python": "from sklearn.svm import SVC\nfrom sklearn.model_selection import train_test_split, GridSearchCV\nfrom sklearn.datasets import make_moons\nfrom sklearn.metrics import accuracy_score, classification_report\nimport numpy as np\n\n# Generate non-linear data (moon shapes)\nX, y = make_moons(n_samples=200, noise=0.15, random_state=42)\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Train SVM with RBF kernel\nmodel = SVC(kernel='rbf', C=1.0, gamma='scale', random_state=42)\nmodel.fit(X_train, y_train)\n\n# Predict\ny_pred = model.predict(X_test)\n\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.3f}\")\nprint(f\"Number of Support Vectors: {len(model.support_vectors_)}\")\nprint(f\"Support Vector Indices: {model.support_[:10]}...\")\n\n# Hyperparameter tuning with Grid Search\nparam_grid = {'C': [0.1, 1, 10], 'gamma': ['scale', 0.1, 1]}\ngrid = GridSearchCV(SVC(kernel='rbf'), param_grid, cv=3)\ngrid.fit(X_train, y_train)\nprint(f\"Best params: {grid.best_params_}\")\nprint(f\"Best CV score: {grid.best_score_:.3f}\")",
            "explanation": "SVM with RBF kernel classifies non-linear moon-shaped data. The support vectors are the critical boundary-defining samples. Grid search finds optimal C and gamma."
        },
        "visualization": {
            "type": "decision_boundary",
            "data": {
                "class_0": {"x": [1, 1.5, 2, 2.5, 3, 1.2, 2.2, 2.8], "y": [2, 1.8, 1.5, 1.2, 1, 2.2, 2.5, 2.8]},
                "class_1": {"x": [6, 6.5, 7, 7.5, 8, 6.2, 7.2, 7.8], "y": [1, 1.2, 1.5, 1.8, 2, 0.8, 0.5, 1.3]},
                "support_vectors": [{"x": 3.2, "y": 1.8}, {"x": 5.8, "y": 1.4}, {"x": 3.5, "y": 0.5}, {"x": 5.5, "y": 2.5}],
                "margin_lines": [{"x1": 3, "y1": 1, "x2": 6, "y2": 2}]
            }
        },
        "interactive_params": [
            {"name": "c", "label": "正則化參數 (C)", "type": "range", "min": 0.1, "max": 100, "step": 0.1, "default": 1.0, "log": True},
            {"name": "gamma", "label": "核係數 (Gamma)", "type": "range", "min": 0.01, "max": 5, "step": 0.01, "default": 1.0}
        ]
    },
    {
        "id": "pca",
        "name": "Principal Component Analysis (PCA)",
        "name_zh": "主成分分析",
        "category": "Dimensionality Reduction",
        "difficulty": "Intermediate",
        "tags": ["Unsupervised Learning", "Dimensionality Reduction", "Feature Extraction"],
        "summary": "A dimensionality reduction technique that transforms high-dimensional data into a lower-dimensional space while preserving as much variance as possible.",
        "theory": {
            "overview": "PCA identifies the principal components (directions of maximum variance) in the data and projects the data onto these components. It's widely used for visualization, noise filtering, and feature extraction.",
            "algorithm_steps": [
                "Standardize the data (mean = 0, variance = 1 for each feature)",
                "Compute the covariance matrix of the standardized data",
                "Calculate eigenvalues and eigenvectors of the covariance matrix",
                "Sort eigenvectors by decreasing eigenvalues",
                "Choose top k eigenvectors as principal components",
                "Transform original data: X_pca = X · W_k"
            ],
            "key_concepts": [
                "Explained Variance Ratio: Proportion of total variance captured by each principal component",
                "Eigenvalues: Amount of variance explained by each component",
                "Eigenvectors (Loadings): Weights defining each principal component's direction",
                "Scree Plot: Plot of eigenvalues to visualize contribution of each component",
                "Biplot: Visualize both samples and feature contributions in 2D/3D"
            ],
            "applications": [
                "Data visualization (2D/3D plots of high-dimensional data)",
                "Noise reduction and data compression",
                "Feature extraction and engineering",
                "Preprocessing for other ML algorithms",
                "Anomaly detection via reconstruction error"
            ]
        },
        "code_example": {
            "python": "from sklearn.decomposition import PCA\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.datasets import load_digits\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# Load digit dataset\nX, y = load_digits(return_X_y=True)\n\n# Standardize features\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)\n\n# Apply PCA\npca = PCA(n_components=2)\nX_pca = pca.fit_transform(X_scaled)\n\nprint(f\"Original shape: {X.shape}\")\nprint(f\"Reduced shape: {X_pca.shape}\")\nprint(f\"Explained variance ratio: {pca.explained_variance_ratio_}\")\nprint(f\"Total variance explained: {sum(pca.explained_variance_ratio_):.3f}\")\n\n# Find optimal components for 95% variance\npca_full = PCA().fit(X_scaled)\ncumsum = np.cumsum(pca_full.explained_variance_ratio_)\nn_95 = np.argmax(cumsum >= 0.95) + 1\nprint(f\"Components needed for 95% variance: {n_95}\")\n\n# Visualize\nplt.scatter(X_pca[:, 0], X_pca[:, 1], c=y, cmap='tab10', alpha=0.7)\nplt.colorbar(label='Digit')\nplt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.2%})')\nplt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.2%})')\nplt.show()",
            "explanation": "PCA reduces the 64-dimensional digit dataset to 2D while preserving key structures. Digits cluster by class even in 2D, showing PCA's effectiveness."
        },
        "visualization": {
            "type": "scatter_with_vectors",
            "data": {
                "points_2d": {"x": [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, -1.8, -1, 0, 1, 1.8, -0.5, 0.5, -2.2, 2.2, -1.2, 1.2], "y": [-1.5, -0.8, 0, 0.5, 0.2, -0.5, 0.8, 1.5, -0.2, 1, 1.8, -1.5, -2, -0.5, 1.2, -1, 0.5, 0.8, -1.8, 2]},
                "vectors": [{"dx": 0.8, "dy": 0.2}, {"dx": -0.3, "dy": 0.7}],
                "explained_variance": [0.45, 0.25]
            }
        },
        "interactive_params": [
            {"name": "n_components", "label": "主成分數量 (N Components)", "type": "range", "min": 1, "max": 10, "step": 1, "default": 2}
        ]
    },
    {
        "id": "xgboost",
        "name": "XGBoost",
        "name_zh": "極限梯度提升",
        "category": "Classification / Regression",
        "difficulty": "Advanced",
        "tags": ["Supervised Learning", "Ensemble", "Gradient Boosting", "Tree-Based"],
        "summary": "An optimized distributed gradient boosting library designed for speed and performance. It dominates Kaggle competitions for structured/tabular data.",
        "theory": {
            "overview": "XGBoost (eXtreme Gradient Boosting) is an ensemble of weak learners (typically decision trees) built sequentially, where each new tree corrects errors made by previous trees. It uses second-order Taylor approximation for faster optimization.",
            "model": "ŷᵢ = Σ fₖ(xᵢ), where fₖ are decision trees added sequentially to minimize the loss function.",
            "key_innovations": [
                "Regularization: L1 and L2 regularization on leaf weights to prevent overfitting",
                "Second-Order Approximation: Uses both gradient and Hessian for faster convergence",
                "Weighted Quantile Sketch: Efficient handling of weighted data for split finding",
                "Sparsity-Aware Split Finding: Automatic handling of missing values",
                "Cache-Aware Access: Optimized memory usage for faster computation",
                "Block Structure: Parallelized tree construction using column blocks"
            ],
            "hyperparameters": [
                "n_estimators: Number of boosting rounds",
                "learning_rate (eta): Step size shrinkage to prevent overfitting",
                "max_depth: Maximum depth of each tree",
                "subsample: Fraction of samples used for each tree",
                "colsample_bytree: Fraction of features used for each tree",
                "λ (lambda): L2 regularization on leaf weights",
                "α (alpha): L1 regularization on leaf weights",
                "γ (gamma): Minimum loss reduction required to make a further partition"
            ]
        },
        "code_example": {
            "python": "from xgboost import XGBClassifier\nfrom sklearn.model_selection import train_test_split, cross_val_score\nfrom sklearn.datasets import make_classification\nfrom sklearn.metrics import accuracy_score, roc_auc_score\nimport numpy as np\n\n# Generate data\nX, y = make_classification(n_samples=1000, n_features=20, n_informative=10,\n                           n_redundant=5, random_state=42)\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Train XGBoost\nmodel = XGBClassifier(\n    n_estimators=100, learning_rate=0.1, max_depth=5,\n    subsample=0.8, colsample_bytree=0.8, reg_lambda=1, random_state=42\n)\nmodel.fit(X_train, y_train, eval_set=[(X_test, y_test)], verbose=False)\n\n# Predict\ny_pred = model.predict(X_test)\ny_prob = model.predict_proba(X_test)[:, 1]\n\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.3f}\")\nprint(f\"ROC-AUC: {roc_auc_score(y_test, y_prob):.3f}\")\nprint(f\"Top 5 Features: {np.argsort(model.feature_importances_)[-5:][::-1]}\")\n\n# Cross-validation\nscores = cross_val_score(model, X, y, cv=5, scoring='accuracy')\nprint(f\"CV Mean Accuracy: {scores.mean():.3f} (+/- {scores.std() * 2:.3f})\")",
            "explanation": "XGBoost trains 100 trees sequentially, each correcting the previous errors. Regularization, subsampling, and column sampling prevent overfitting."
        },
        "visualization": {
            "type": "bar_chart",
            "data": {
                "categories": ["XGBoost", "Random Forest", "LightGBM", "CatBoost", "Gradient Boosting"],
                "values": [0.942, 0.935, 0.940, 0.938, 0.932]
            }
        },
        "interactive_params": [
            {"name": "n_estimators", "label": "決策樹數量 (N Estimators)", "type": "range", "min": 10, "max": 300, "step": 10, "default": 100},
            {"name": "learning_rate", "label": "學習率 (Learning Rate)", "type": "range", "min": 0.01, "max": 0.5, "step": 0.01, "default": 0.1},
            {"name": "max_depth", "label": "最大深度 (Max Depth)", "type": "range", "min": 1, "max": 15, "step": 1, "default": 5}
        ]
    },
    {
        "id": "neural-network",
        "name": "Neural Network",
        "name_zh": "神經網路",
        "category": "Deep Learning",
        "difficulty": "Advanced",
        "tags": ["Supervised Learning", "Deep Learning", "MLP", "Backpropagation"],
        "summary": "A computational model inspired by biological neural networks, consisting of interconnected layers of neurons that learn hierarchical representations of data.",
        "theory": {
            "overview": "Neural networks transform input through multiple layers of neurons, each applying a linear transformation followed by a non-linear activation function. The network learns by backpropagating errors through the layers.",
            "architecture": [
                "Input Layer: Receives the raw features (e.g., pixel values, numerical data)",
                "Hidden Layers: One or more layers that learn intermediate representations",
                "Output Layer: Produces final predictions (regression, classification probabilities)",
                "Neuron: Computational unit computing weighted sum + bias + activation",
                "Weights & Biases: Learnable parameters adjusted during training"
            ],
            "key_concepts": [
                "Forward Propagation: Input flows through network to produce predictions",
                "Backpropagation: Gradients of loss flow backward to update weights via chain rule",
                "Activation Functions: Non-linear transformations (ReLU, sigmoid, tanh, etc.)",
                "Gradient Descent: Iterative optimization to minimize loss function",
                "Batch Training: Update weights after processing a batch of samples",
                "Epochs: One complete pass through the entire training dataset"
            ],
            "activation_functions": [
                "ReLU: f(x) = max(0, x) — Most common, helps with vanishing gradient",
                "Sigmoid: f(x) = 1/(1+e^(-x)) — Output in (0,1), good for binary classification",
                "Tanh: f(x) = (e^x - e^(-x))/(e^x + e^(-x)) — Output in (-1,1), zero-centered",
                "Softmax: Converts logits to probability distribution for multi-class output"
            ]
        },
        "code_example": {
            "python": "from sklearn.neural_network import MLPClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.datasets import load_digits\nfrom sklearn.metrics import accuracy_score, classification_report\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# Load digit dataset\nX, y = load_digits(return_X_y=True)\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Train Neural Network (MLP)\nmodel = MLPClassifier(\n    hidden_layer_sizes=(100, 50), activation='relu',\n    solver='adam', alpha=0.0001, batch_size=32,\n    learning_rate_init=0.001, max_iter=500, random_state=42\n)\nmodel.fit(X_train, y_train)\n\n# Predict\ny_pred = model.predict(X_test)\n\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.3f}\")\nprint(f\"Iterations: {model.n_iter_}\")\nprint(f\"Layers: {model.hidden_layer_sizes}\")\nprint(f\"Output Classes: {model.n_outputs_}\")\n\n# Loss curve\nplt.plot(model.loss_curve_)\nplt.xlabel('Iteration')\nplt.ylabel('Loss')\nplt.title('Training Loss Curve')\nplt.show()",
            "explanation": "An MLP with two hidden layers (100, 50) uses ReLU activation and Adam optimizer. The loss curve shows convergence over training iterations."
        },
        "visualization": {
            "type": "network_diagram",
            "data": {
                "layers": [
                    {"name": "Input", "nodes": 4},
                    {"name": "Hidden 1", "nodes": 5},
                    {"name": "Hidden 2", "nodes": 3},
                    {"name": "Output", "nodes": 2}
                ]
            }
        },
        "interactive_params": [
            {"name": "hidden_neurons", "label": "隱藏層神經元數", "type": "range", "min": 10, "max": 200, "step": 10, "default": 100},
            {"name": "learning_rate", "label": "學習率 (Learning Rate)", "type": "range", "min": 0.0001, "max": 0.1, "step": 0.0001, "default": 0.001, "log": True},
            {"name": "layers", "label": "隱藏層數量", "type": "range", "min": 1, "max": 5, "step": 1, "default": 2}
        ]
    },
    {
        "id": "transformer",
        "name": "Transformer",
        "name_zh": "變換器",
        "category": "Deep Learning",
        "difficulty": "Advanced",
        "tags": ["Deep Learning", "NLP", "Attention Mechanism", "Sequence-to-Sequence"],
        "summary": "A revolutionary architecture that uses self-attention mechanisms to process sequential data in parallel, forming the foundation of modern LLMs like GPT, BERT, and others.",
        "theory": {
            "overview": "Introduced in 'Attention Is All You Need' (2017), the Transformer replaces recurrence with self-attention, enabling parallel processing of sequences. It's the backbone of modern NLP and is expanding into computer vision (ViT), audio, and multimodal domains.",
            "architecture": [
                "Encoder: Processes input sequence through multi-head self-attention and feed-forward layers",
                "Decoder: Generates output sequence using masked self-attention and cross-attention to encoder",
                "Self-Attention: Each position attends to all positions in the sequence",
                "Multi-Head Attention: Multiple attention heads learn different relationship patterns",
                "Positional Encoding: Injects position information since the model has no recurrence"
            ],
            "attention_mechanism": [
                "Query (Q): What the current position is looking for",
                "Key (K): What each position can offer as context",
                "Value (V): The actual information each position provides",
                "Attention Formula: Attention(Q,K,V) = softmax(QK^T/√d_k)V",
                "Scaled Dot-Product: Scaling by √d_k prevents gradients from becoming too small"
            ],
            "key_components": [
                "Feed-Forward Networks: Position-wise fully connected layers after attention",
                "Layer Normalization: Stabilizes training by normalizing across features",
                "Residual Connections: Add input to output of each sub-layer (skip connections)",
                "Dropout: Regularization to prevent overfitting",
                "Masked Attention: Prevents decoder from looking at future tokens during training"
            ],
            "applications": [
                "GPT (Generative Pre-trained Transformer): Autoregressive language model",
                "BERT (Bidirectional Encoder Representations): Bidirectional understanding",
                "T5 (Text-to-Text Transfer Transformer): Unified text-to-text framework",
                "Vision Transformer (ViT): Images as sequences of patches",
                "CLIP: Joint image-text representation learning"
            ]
        },
        "code_example": {
            "python": "import torch\nimport torch.nn as nn\nimport torch.optim as optim\n\n# Simple Transformer for sequence classification\nclass SimpleTransformer(nn.Module):\n    def __init__(self, vocab_size=1000, d_model=128, nhead=8,\n                 num_layers=3, num_classes=2, max_len=50):\n        super().__init__()\n        self.embedding = nn.Embedding(vocab_size, d_model)\n        self.pos_encoding = nn.Parameter(torch.randn(1, max_len, d_model))\n\n        encoder_layer = nn.TransformerEncoderLayer(\n            d_model=d_model, nhead=nhead, dim_feedforward=256,\n            dropout=0.1, batch_first=True\n        )\n        self.transformer = nn.TransformerEncoder(encoder_layer, num_layers)\n        self.fc = nn.Linear(d_model, num_classes)\n\n    def forward(self, x):\n        seq_len = x.size(1)\n        x = self.embedding(x)  # (B, L, d_model)\n        x = x + self.pos_encoding[:, :seq_len, :]\n        x = self.transformer(x)\n        x = x.mean(dim=1)  # Global average pooling\n        return self.fc(x)\n\n# Initialize model\nmodel = SimpleTransformer(vocab_size=1000, num_classes=2)\nprint(f\"Parameters: {sum(p.numel() for p in model.parameters()):,}\")\n\n# Example forward pass\nx = torch.randint(0, 1000, (4, 30))  # batch=4, seq_len=30\noutput = model(x)\nprint(f\"Input shape: {x.shape}\")\nprint(f\"Output shape: {output.shape}\")\nprint(f\"Output: {output}\")\n\n# The attention computation (conceptual)\nprint(\"\\nAttention(Q,K,V) = softmax(QK^T/√d_k)V\")\nprint(f\"d_k = 128 / 8 = {128 // 8}\")",
            "explanation": "A simplified Transformer for sequence classification. The model uses token embeddings, positional encoding, multi-head self-attention, and global pooling. This architecture is the foundation of BERT-like models."
        },
        "visualization": {
            "type": "attention_map",
            "data": {
                "tokens": ["The", "cat", "sat", "on", "the", "mat", "[SEP]"],
                "attention_matrix": [
                    [0.50, 0.30, 0.05, 0.03, 0.05, 0.05, 0.02],
                    [0.15, 0.40, 0.20, 0.08, 0.07, 0.05, 0.05],
                    [0.05, 0.15, 0.45, 0.15, 0.05, 0.10, 0.05],
                    [0.02, 0.05, 0.15, 0.50, 0.15, 0.08, 0.05],
                    [0.05, 0.05, 0.05, 0.15, 0.45, 0.20, 0.05],
                    [0.05, 0.05, 0.10, 0.08, 0.20, 0.40, 0.12],
                    [0.05, 0.10, 0.10, 0.10, 0.10, 0.15, 0.40]
                ]
            }
        },
        "interactive_params": [
            {"name": "d_model", "label": "模型維度 (d_model)", "type": "range", "min": 32, "max": 512, "step": 32, "default": 128},
            {"name": "nhead", "label": "注意力頭數 (N Heads)", "type": "range", "min": 2, "max": 16, "step": 2, "default": 8},
            {"name": "num_layers", "label": "層數 (Layers)", "type": "range", "min": 1, "max": 12, "step": 1, "default": 3}
        ]
    }
]

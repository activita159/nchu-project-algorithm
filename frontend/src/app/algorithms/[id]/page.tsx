'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { fetchAlgorithm, AlgorithmDetail } from '@/lib/api'
import TheorySection from '@/components/TheorySection'
import CodeBlock from '@/components/CodeBlock'
import Visualization from '@/components/Visualization'

const DIFFICULTY_CLASS: Record<string, string> = {
  Beginner: 'tag-beginner',
  Intermediate: 'tag-intermediate',
  Advanced: 'tag-advanced',
}

// Fallback data for all algorithms when backend is not available
const FALLBACK_DATA: Record<string, any> = {
  'linear-regression': {
    id: 'linear-regression', name: 'Linear Regression', name_zh: '線性回歸', category: 'Regression', difficulty: 'Beginner',
    tags: ['Supervised Learning', 'Regression', 'Statistical'],
    summary: 'A linear approach to modeling the relationship between a dependent variable and one or more independent variables.',
    theory: {
      overview: 'Linear regression models the relationship between a scalar dependent variable y and one or more explanatory variables X using a linear function. It is the foundation of many advanced ML techniques.',
      model: 'y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ + ε',
      loss_function: 'Mean Squared Error (MSE): L = (1/n) Σ(yᵢ - ŷᵢ)²',
      optimization: 'Ordinary Least Squares (OLS) or Gradient Descent to minimize MSE.',
      assumptions: ['Linearity', 'Independence', 'Homoscedasticity', 'Normality of errors', 'No multicollinearity'],
      key_concepts: ['R² Score: Proportion of variance explained', 'Coefficients: Impact of each feature', 'Intercept: Baseline prediction', 'Residuals: Prediction errors'],
    },
    code_example: {
      python: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

np.random.seed(42)
X = np.random.rand(100, 1) * 10
y = 3 * X.squeeze() + 5 + np.random.randn(100) * 2

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print(f"Coefficient: {model.coef_[0]:.2f}")
print(f"Intercept: {model.intercept_:.2f}")
print(f"MSE: {mean_squared_error(y_test, y_pred):.2f}")
print(f"R²: {r2_score(y_test, y_pred):.2f}")`,
      explanation: 'Simple linear regression with one feature. The model learns coefficient and intercept from training data.',
    },
    visualization: { type: 'scatter_with_line' },
    interactive_params: [
      { name: 'slope', label: 'Slope', type: 'range', min: 0.1, max: 5, step: 0.1, default: 2 },
      { name: 'intercept', label: 'Intercept', type: 'range', min: -5, max: 5, step: 0.1, default: 0 },
      { name: 'noise', label: 'Noise', type: 'range', min: 0, max: 10, step: 0.1, default: 2 },
    ],
  },
  'logistic-regression': {
    id: 'logistic-regression', name: 'Logistic Regression', name_zh: '邏輯回歸', category: 'Classification', difficulty: 'Beginner',
    tags: ['Supervised Learning', 'Classification', 'Binary Classification'],
    summary: 'A statistical model that uses a logistic function to model a binary dependent variable.',
    theory: {
      overview: 'Logistic regression predicts the probability that an instance belongs to a particular class using the sigmoid function.',
      model: 'P(y=1|x) = σ(β₀ + β₁x₁ + ... + βₙxₙ) where σ(z) = 1/(1 + e^(-z))',
      loss_function: 'Binary Cross-Entropy: L = -[y log(p) + (1-y) log(1-p)]',
      optimization: 'Maximum Likelihood Estimation via Gradient Descent or Newton\'s method.',
      key_concepts: ['Sigmoid function maps to (0,1)', 'Decision boundary at threshold 0.5', 'Odds ratio: e^β', 'Multiclass via Softmax regression'],
    },
    code_example: {
      python: `from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=500, n_features=2, n_redundant=0,
                           n_clusters_per_class=1, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LogisticRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)

print(f"Accuracy: {accuracy_score(y_test, y_pred):.3f}")
print(f"Coefficients: {model.coef_}")`,
      explanation: 'Binary classification using logistic regression with sigmoid activation. predict_proba returns class probabilities.',
    },
    visualization: { type: 'sigmoid_curve' },
    interactive_params: [
      { name: 'slope', label: 'Steepness', type: 'range', min: 0.5, max: 5, step: 0.1, default: 1 },
      { name: 'intercept', label: 'Intercept', type: 'range', min: -3, max: 3, step: 0.1, default: 0 },
    ],
  },
  'decision-tree': {
    id: 'decision-tree', name: 'Decision Tree', name_zh: '決策樹', category: 'Classification / Regression', difficulty: 'Intermediate',
    tags: ['Supervised Learning', 'Tree-Based', 'Classification', 'Regression'],
    summary: 'A tree-structured classifier where internal nodes represent features and leaves represent outcomes.',
    theory: {
      overview: 'Decision trees recursively split data based on feature values to create a tree structure, maximizing subset purity at each split.',
      splitting_criteria: ['Gini Impurity: 1 - Σ pᵢ²', 'Entropy / Information Gain', 'Variance Reduction (regression)'],
      hyperparameters: ['max_depth: Maximum tree depth', 'min_samples_split: Min samples to split', 'min_samples_leaf: Min samples at leaf', 'max_features: Features per split'],
      key_concepts: ['Root node, internal nodes, leaf nodes', 'Pruning to reduce overfitting', 'Feature importance from reduction in criterion'],
    },
    code_example: {
      python: `from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris

iris = load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = DecisionTreeClassifier(max_depth=3, criterion='gini', random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

print(f"Accuracy: {model.score(X_test, y_test):.3f}")
print(f"Tree Depth: {model.get_depth()}")
print(f"Num Leaves: {model.get_n_leaves()}")`,
      explanation: 'Decision tree on Iris dataset with max_depth=3 to prevent overfitting.',
    },
    visualization: { type: 'tree_structure' },
    interactive_params: [
      { name: 'max_depth', label: 'Max Depth', type: 'range', min: 1, max: 10, step: 1, default: 3 },
    ],
  },
  'random-forest': {
    id: 'random-forest', name: 'Random Forest', name_zh: '隨機森林', category: 'Classification / Regression', difficulty: 'Intermediate',
    tags: ['Supervised Learning', 'Ensemble', 'Tree-Based', 'Bagging'],
    summary: 'An ensemble of multiple decision trees through bagging and random feature selection.',
    theory: {
      overview: 'Random Forest trains multiple decision trees on different bootstrap samples of data and features, then aggregates predictions via majority voting.',
      key_techniques: ['Bootstrap Aggregating (Bagging)', 'Feature randomness per split', 'Out-of-Bag error estimation', 'Majority voting for classification', 'Mean prediction for regression'],
      hyperparameters: ['n_estimators: Number of trees', 'max_depth: Tree depth', 'max_features: Features per split'],
      advantages: ['Handles high-dimensional data', 'Feature importance', 'Robust to outliers', 'Less overfitting than single trees'],
    },
    code_example: {
      python: `from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=500, n_features=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
model.fit(X_train, y_train)

print(f"Accuracy: {model.score(X_test, y_test):.3f}")
print(f"Trees: {len(model.estimators_)}")
print(f"Features: {model.feature_importances_}")

scores = cross_val_score(model, X, y, cv=5)
print(f"CV: {scores.mean():.3f} (±{scores.std():.3f})")`,
      explanation: '100 trees with bootstrap and random feature selection for robust ensemble classification.',
    },
    visualization: { type: 'feature_importance' },
    interactive_params: [
      { name: 'n_estimators', label: 'N Estimators', type: 'range', min: 10, max: 200, step: 10, default: 100 },
      { name: 'max_depth', label: 'Max Depth', type: 'range', min: 1, max: 20, step: 1, default: 5 },
    ],
  },
  'kmeans': {
    id: 'kmeans', name: 'K-Means', name_zh: 'K-均值聚類', category: 'Clustering', difficulty: 'Beginner',
    tags: ['Unsupervised Learning', 'Clustering', 'Centroid-Based'],
    summary: 'Partitions n observations into K clusters based on nearest mean centroid.',
    theory: {
      overview: 'K-Means iteratively assigns points to nearest centroids and updates centroids until convergence.',
      algorithm_steps: ['Initialize K centroids (random or K-Means++)', 'Assign each point to nearest centroid', 'Recalculate centroids as mean of assigned points', 'Repeat until convergence'],
      objective_function: 'SSE: Σ Σ ||x - μᵢ||² over all clusters i and points x in cluster i.',
      key_concepts: ['Elbow method for optimal K', 'Silhouette score for cluster quality', 'K-Means++ initialization', 'Local optima sensitivity'],
    },
    code_example: {
      python: `from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
from sklearn.metrics import silhouette_score

X, _ = make_blobs(n_samples=300, centers=3, cluster_std=0.60, random_state=0)

model = KMeans(n_clusters=3, init='k-means++', n_init=10, random_state=42)
model.fit(X)
labels = model.labels_

print(f"Inertia (SSE): {model.inertia_:.2f}")
print(f"Silhouette: {silhouette_score(X, labels):.3f}")
print(f"Centroids: {model.cluster_centers_}")`,
      explanation: 'K-Means with K=3 on blob data. K-Means++ ensures better initialization.',
    },
    visualization: { type: 'scatter_clusters' },
    interactive_params: [
      { name: 'n_clusters', label: 'K (Clusters)', type: 'range', min: 2, max: 8, step: 1, default: 3 },
      { name: 'cluster_std', label: 'Cluster Spread', type: 'range', min: 0.1, max: 1.5, step: 0.1, default: 0.6 },
    ],
  },
  'svm': {
    id: 'svm', name: 'Support Vector Machine (SVM)', name_zh: '支持向量機', category: 'Classification / Regression', difficulty: 'Advanced',
    tags: ['Supervised Learning', 'Kernel Method', 'Margin Maximization'],
    summary: 'Finds the optimal hyperplane maximizing margin between classes using kernel tricks.',
    theory: {
      overview: 'SVM finds the hyperplane that best separates classes by maximizing the margin. Kernels handle non-linear data.',
      model: 'f(x) = sign(w·φ(x) + b), where φ is a kernel transformation.',
      key_concepts: ['Maximum margin between classes', 'Support vectors define boundary', 'Soft margin with penalty C', 'Kernel trick for non-linear data'],
      kernels: ['Linear: K(x,y) = x·y', 'Polynomial: K(x,y) = (γx·y + r)^d', 'RBF: K(x,y) = exp(-γ||x-y||²)', 'Sigmoid: K(x,y) = tanh(γx·y + r)'],
      hyperparameters: ['C: Regularization (margin vs error trade-off)', 'γ: Kernel coefficient', 'kernel: Kernel type'],
    },
    code_example: {
      python: `from sklearn.svm import SVC
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.datasets import make_moons

X, y = make_moons(n_samples=200, noise=0.15, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = SVC(kernel='rbf', C=1.0, gamma='scale', random_state=42)
model.fit(X_train, y_train)

print(f"Accuracy: {model.score(X_test, y_test):.3f}")
print(f"Support Vectors: {len(model.support_vectors_)}")

param_grid = {'C': [0.1, 1, 10], 'gamma': ['scale', 0.1, 1]}
grid = GridSearchCV(SVC(kernel='rbf'), param_grid, cv=3)
grid.fit(X_train, y_train)
print(f"Best: {grid.best_params_}")`,
      explanation: 'SVM with RBF kernel on moon-shaped data. Support vectors define the decision boundary.',
    },
    visualization: { type: 'decision_boundary' },
    interactive_params: [
      { name: 'c', label: 'C (Regularization)', type: 'range', min: 0.1, max: 100, step: 0.1, default: 1, log: true },
      { name: 'gamma', label: 'Gamma', type: 'range', min: 0.01, max: 5, step: 0.01, default: 1 },
    ],
  },
  'pca': {
    id: 'pca', name: 'Principal Component Analysis (PCA)', name_zh: '主成分分析', category: 'Dimensionality Reduction', difficulty: 'Intermediate',
    tags: ['Unsupervised Learning', 'Dimensionality Reduction', 'Feature Extraction'],
    summary: 'Transforms high-dimensional data into lower dimensions while preserving maximum variance.',
    theory: {
      overview: 'PCA identifies directions of maximum variance (principal components) and projects data onto them.',
      algorithm_steps: ['Standardize the data', 'Compute covariance matrix', 'Calculate eigenvalues and eigenvectors', 'Sort by decreasing eigenvalues', 'Project onto top k eigenvectors'],
      key_concepts: ['Explained variance ratio per component', 'Eigenvalues = variance captured', 'Scree plot for component selection', 'Biplot for joint visualization'],
      applications: ['Data visualization in 2D/3D', 'Noise reduction', 'Feature extraction', 'Anomaly detection'],
    },
    code_example: {
      python: `from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import load_digits
import numpy as np

X, y = load_digits(return_X_y=True)
X_scaled = StandardScaler().fit_transform(X)

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

print(f"Original: {X.shape} → Reduced: {X_pca.shape}")
print(f"Variance: {pca.explained_variance_ratio_}")

pca_full = PCA().fit(X_scaled)
cumsum = np.cumsum(pca_full.explained_variance_ratio_)
n_95 = np.argmax(cumsum >= 0.95) + 1
print(f"Components for 95%: {n_95}")`,
      explanation: 'PCA reduces 64-dim digit data to 2D while preserving structure for visualization.',
    },
    visualization: { type: 'scatter_with_vectors' },
    interactive_params: [
      { name: 'n_components', label: 'N Components', type: 'range', min: 1, max: 3, step: 1, default: 2 },
    ],
  },
  'xgboost': {
    id: 'xgboost', name: 'XGBoost', name_zh: '極限梯度提升', category: 'Classification / Regression', difficulty: 'Advanced',
    tags: ['Supervised Learning', 'Ensemble', 'Gradient Boosting', 'Tree-Based'],
    summary: 'Optimized distributed gradient boosting library designed for speed and performance.',
    theory: {
      overview: 'XGBoost builds trees sequentially, each correcting errors of previous trees, with regularization and second-order optimization.',
      model: 'ŷᵢ = Σ fₖ(xᵢ), where fₖ are decision trees added sequentially.',
      key_innovations: ['L1/L2 regularization on leaf weights', 'Second-order Taylor approximation', 'Weighted quantile sketch', 'Sparsity-aware split finding', 'Cache-aware block structure'],
      hyperparameters: ['n_estimators: Boosting rounds', 'learning_rate: Step size', 'max_depth: Tree depth', 'subsample: Sample fraction', 'λ (lambda): L2 regularization'],
    },
    code_example: {
      python: `from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=1000, n_features=20, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = XGBClassifier(n_estimators=100, learning_rate=0.1, max_depth=5,
                       subsample=0.8, colsample_bytree=0.8, random_state=42)
model.fit(X_train, y_train)

print(f"Accuracy: {model.score(X_test, y_test):.3f}")
print(f"Top features: {model.feature_importances_.argsort()[-3:][::-1]}")

scores = cross_val_score(model, X, y, cv=5)
print(f"CV: {scores.mean():.3f} (±{scores.std():.3f})")`,
      explanation: 'XGBoost with 100 boosting rounds, regularization, subsampling, and column sampling.',
    },
    visualization: { type: 'bar_chart' },
    interactive_params: [
      { name: 'n_estimators', label: 'N Estimators', type: 'range', min: 10, max: 300, step: 10, default: 100 },
      { name: 'learning_rate', label: 'Learning Rate', type: 'range', min: 0.01, max: 0.5, step: 0.01, default: 0.1 },
      { name: 'max_depth', label: 'Max Depth', type: 'range', min: 1, max: 15, step: 1, default: 5 },
    ],
  },
  'neural-network': {
    id: 'neural-network', name: 'Neural Network', name_zh: '神經網路', category: 'Deep Learning', difficulty: 'Advanced',
    tags: ['Supervised Learning', 'Deep Learning', 'MLP', 'Backpropagation'],
    summary: 'A computational model inspired by biological neural networks with interconnected layers of neurons.',
    theory: {
      overview: 'Neural networks transform input through hidden layers of neurons, each with weights, biases, and non-linear activations.',
      architecture: ['Input layer: Raw features', 'Hidden layers: Intermediate representations', 'Output layer: Predictions', 'Weights and biases: Learnable parameters'],
      key_concepts: ['Forward propagation for predictions', 'Backpropagation for gradients', 'Activation functions (ReLU, sigmoid, tanh)', 'Gradient descent optimization', 'Batch training'],
      activation_functions: ['ReLU: f(x) = max(0, x)', 'Sigmoid: f(x) = 1/(1+e^(-x))', 'Tanh: f(x) = tanh(x)', 'Softmax: Probability distribution'],
    },
    code_example: {
      python: `from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_digits

X, y = load_digits(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = MLPClassifier(hidden_layer_sizes=(100, 50), activation='relu',
                      solver='adam', max_iter=500, random_state=42)
model.fit(X_train, y_train)

print(f"Accuracy: {model.score(X_test, y_test):.3f}")
print(f"Iterations: {model.n_iter_}")
print(f"Layers: {model.hidden_layer_sizes}")`,
      explanation: 'MLP with two hidden layers (100, 50) using ReLU activation and Adam optimizer.',
    },
    visualization: { type: 'network_diagram' },
    interactive_params: [
      { name: 'hidden_neurons', label: 'Hidden Neurons', type: 'range', min: 10, max: 200, step: 10, default: 100 },
      { name: 'learning_rate', label: 'Learning Rate', type: 'range', min: 0.0001, max: 0.1, step: 0.0001, default: 0.001, log: true },
      { name: 'layers', label: 'Hidden Layers', type: 'range', min: 1, max: 5, step: 1, default: 2 },
    ],
  },
  'transformer': {
    id: 'transformer', name: 'Transformer', name_zh: '變換器', category: 'Deep Learning', difficulty: 'Advanced',
    tags: ['Deep Learning', 'NLP', 'Attention Mechanism', 'Sequence-to-Sequence'],
    summary: 'Revolutionary architecture using self-attention for parallel sequence processing, foundation of LLMs.',
    theory: {
      overview: 'Introduced in "Attention Is All You Need" (2017), the Transformer replaces recurrence with self-attention for parallel processing.',
      architecture: ['Encoder: Self-attention + FF layers', 'Decoder: Masked self-attention + cross-attention', 'Multi-Head Attention: Multiple attention patterns', 'Positional Encoding: Inject position info'],
      attention_mechanism: ['Query (Q): What to look for', 'Key (K): What to match', 'Value (V): Information to aggregate', 'Attention(Q,K,V) = softmax(QK^T/√d_k)V', 'Scaled dot-product prevents gradient issues'],
      key_components: ['Feed-Forward Networks', 'Layer Normalization', 'Residual Connections', 'Dropout regularization', 'Masked attention for autoregressive decoding'],
      applications: ['GPT: Generative language model', 'BERT: Bidirectional understanding', 'Vision Transformer (ViT)', 'CLIP: Image-text representation'],
    },
    code_example: {
      python: `import torch
import torch.nn as nn

class SimpleTransformer(nn.Module):
    def __init__(self, vocab_size=1000, d_model=128, nhead=8,
                 num_layers=3, num_classes=2, max_len=50):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, d_model)
        self.pos_encoding = nn.Parameter(torch.randn(1, max_len, d_model))
        
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_model, nhead=nhead, dim_feedforward=256,
            dropout=0.1, batch_first=True
        )
        self.transformer = nn.TransformerEncoder(encoder_layer, num_layers)
        self.fc = nn.Linear(d_model, num_classes)
    
    def forward(self, x):
        x = self.embedding(x)
        x = x + self.pos_encoding[:, :x.size(1), :]
        x = self.transformer(x)
        x = x.mean(dim=1)
        return self.fc(x)

model = SimpleTransformer()
print(f"Params: {sum(p.numel() for p in model.parameters()):,}")
x = torch.randint(0, 1000, (4, 30))
output = model(x)
print(f"Output: {output.shape}")`,
      explanation: 'A simplified Transformer for sequence classification with embeddings, positional encoding, and multi-head attention.',
    },
    visualization: { type: 'attention_map' },
    interactive_params: [
      { name: 'd_model', label: 'Model Dimension', type: 'range', min: 32, max: 512, step: 32, default: 128 },
      { name: 'nhead', label: 'Attention Heads', type: 'range', min: 2, max: 16, step: 2, default: 8 },
      { name: 'num_layers', label: 'Layers', type: 'range', min: 1, max: 12, step: 1, default: 3 },
    ],
  },
}

export default function AlgorithmPage() {
  const params = useParams()
  const id = params.id as string
  const [algo, setAlgo] = useState<AlgorithmDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'theory' | 'code' | 'viz'>('theory')

  useEffect(() => {
    setLoading(true)
    fetchAlgorithm(id)
      .then(setAlgo)
      .catch(() => {
        // Use fallback data
        const fallback = FALLBACK_DATA[id]
        if (fallback) setAlgo(fallback as AlgorithmDetail)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="text-center text-slate-400 py-20 text-lg">Loading algorithm...</div>
  }

  if (!algo) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Algorithm Not Found</h2>
        <p className="text-slate-400 mb-6">The algorithm {`"${id}"`} was not found.</p>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    )
  }

  const tabs = [
    { key: 'theory', label: 'Theory' },
    { key: 'code', label: 'Code' },
    { key: 'viz', label: 'Visualization' },
  ]

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-300">{algo.name}</span>
      </div>

      {/* Header */}
      <div className="card mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">{algo.name}</h1>
            <p className="text-slate-400 mt-1">{algo.name_zh} · <span className="text-blue-400">{algo.category}</span></p>
          </div>
          <span className={`tag text-sm ${DIFFICULTY_CLASS[algo.difficulty] || 'tag-beginner'}`}>
            {algo.difficulty}
          </span>
        </div>
        <p className="text-slate-300 mt-4 leading-relaxed">{algo.summary}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {algo.tags.map(tag => (
            <span key={tag} className="tag bg-slate-700/50 text-slate-300">{tag}</span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-5 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'theory' && <TheorySection theory={algo.theory} />}
      {activeTab === 'code' && (
        <CodeBlock
          code={algo.code_example.python}
          explanation={algo.code_example.explanation}
        />
      )}
      {activeTab === 'viz' && (
        <Visualization
          type={algo.visualization.type}
          data={algo.visualization.data}
          interactiveParams={algo.interactive_params}
        />
      )}

      {/* Navigation between algorithms */}
      <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
        <Link href="/" className="btn-outline text-sm">
          ← Back to All Algorithms
        </Link>
        <span className="text-slate-500 text-sm self-center">
          Algorithm {Object.keys(FALLBACK_DATA).indexOf(id) + 1} / {Object.keys(FALLBACK_DATA).length}
        </span>
      </div>
    </div>
  )
}

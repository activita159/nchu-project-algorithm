'use client'

import { useEffect, useState } from 'react'
import { fetchAlgorithms, AlgorithmSummary } from '@/lib/api'
import AlgorithmCard from '@/components/AlgorithmCard'

export default function HomePage() {
  const [algorithms, setAlgorithms] = useState<AlgorithmSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchAlgorithms()
      .then(setAlgorithms)
      .catch(() => {
        // Fallback data if backend is not running
        setAlgorithms([
          { id: 'linear-regression', name: 'Linear Regression', name_zh: '線性回歸', category: 'Regression', difficulty: 'Beginner', tags: ['Supervised Learning', 'Regression'], summary: 'A linear approach to modeling the relationship between a dependent variable and independent variables.' },
          { id: 'logistic-regression', name: 'Logistic Regression', name_zh: '邏輯回歸', category: 'Classification', difficulty: 'Beginner', tags: ['Supervised Learning', 'Classification'], summary: 'A statistical model using logistic function to model binary dependent variable.' },
          { id: 'decision-tree', name: 'Decision Tree', name_zh: '決策樹', category: 'Classification / Regression', difficulty: 'Intermediate', tags: ['Supervised Learning', 'Tree-Based'], summary: 'A tree-structured classifier with internal nodes representing features.' },
          { id: 'random-forest', name: 'Random Forest', name_zh: '隨機森林', category: 'Classification / Regression', difficulty: 'Intermediate', tags: ['Supervised Learning', 'Ensemble', 'Bagging'], summary: 'Ensemble of multiple decision trees through bagging and random feature selection.' },
          { id: 'kmeans', name: 'K-Means', name_zh: 'K-均值聚類', category: 'Clustering', difficulty: 'Beginner', tags: ['Unsupervised Learning', 'Clustering'], summary: 'Partitions n observations into K clusters based on nearest mean centroid.' },
          { id: 'svm', name: 'SVM', name_zh: '支持向量機', category: 'Classification / Regression', difficulty: 'Advanced', tags: ['Supervised Learning', 'Kernel Method'], summary: 'Finds optimal hyperplane maximizing margin between classes using kernel tricks.' },
          { id: 'pca', name: 'PCA', name_zh: '主成分分析', category: 'Dimensionality Reduction', difficulty: 'Intermediate', tags: ['Unsupervised Learning', 'Feature Extraction'], summary: 'Transforms high-dimensional data to lower dimensions preserving maximum variance.' },
          { id: 'xgboost', name: 'XGBoost', name_zh: '極限梯度提升', category: 'Classification / Regression', difficulty: 'Advanced', tags: ['Supervised Learning', 'Gradient Boosting'], summary: 'Optimized distributed gradient boosting library for speed and performance.' },
          { id: 'neural-network', name: 'Neural Network', name_zh: '神經網路', category: 'Deep Learning', difficulty: 'Advanced', tags: ['Supervised Learning', 'Deep Learning', 'Backpropagation'], summary: 'Computational model inspired by biological neural networks with interconnected layers.' },
          { id: 'transformer', name: 'Transformer', name_zh: '變換器', category: 'Deep Learning', difficulty: 'Advanced', tags: ['Deep Learning', 'NLP', 'Attention'], summary: 'Architecture using self-attention for parallel sequence processing, foundation of modern LLMs.' },
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', 'Regression', 'Classification', 'Clustering', 'Dimensionality Reduction', 'Deep Learning']
  const filtered = filter === 'All' ? algorithms : algorithms.filter(a => {
    if (filter === 'Classification') return a.category.includes('Classification')
    if (filter === 'Regression') return a.category.includes('Regression') && !a.category.includes('Classification')
    return a.category === filter
  })

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Machine Learning Algorithm
          <span className="text-blue-400"> Learning Platform</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Interactively explore 10 fundamental machine learning algorithms. Each algorithm includes theory, code examples, and interactive visualizations.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === cat ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-20">Loading algorithms...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(algo => (
            <AlgorithmCard key={algo.id} {...algo} />
          ))}
        </div>
      )}

      <div className="mt-16 card text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-2">How to Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto mt-6">
          <div>
            <div className="text-3xl mb-2">📖</div>
            <h3 className="font-semibold text-white mb-1">Learn Theory</h3>
            <p className="text-sm text-slate-400">Read detailed explanations, key concepts, and mathematical foundations.</p>
          </div>
          <div>
            <div className="text-3xl mb-2">💻</div>
            <h3 className="font-semibold text-white mb-1">Study Code</h3>
            <p className="text-sm text-slate-400">Examine real Python code examples using scikit-learn, XGBoost, and PyTorch.</p>
          </div>
          <div>
            <div className="text-3xl mb-2">🎮</div>
            <h3 className="font-semibold text-white mb-1">Interact</h3>
            <p className="text-sm text-slate-400">Adjust parameters and see how they affect the algorithm in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

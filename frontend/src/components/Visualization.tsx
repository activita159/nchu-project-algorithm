'use client'

import { useEffect, useState, useCallback } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, LineChart, Line, BarChart, Bar, ResponsiveContainer, ReferenceLine, Cell } from 'recharts'
import { fetchRegressionData, fetchSigmoidData, fetchClusterData, fetchPCAData } from '@/lib/api'
import InteractiveSlider from './InteractiveSlider'

// ─── Linear Regression Visualization ────────────────────────────────────
export function LinearRegressionViz({ params }: { params: any[] }) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const slopeParam = params.find(p => p.name === 'slope')
  const interceptParam = params.find(p => p.name === 'intercept')
  const noiseParam = params.find(p => p.name === 'noise')
  const [slope, setSlope] = useState(slopeParam?.default ?? 2)
  const [intercept, setIntercept] = useState(interceptParam?.default ?? 0)
  const [noise, setNoise] = useState(noiseParam?.default ?? 2)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const result = await fetchRegressionData({ slope: String(slope), intercept: String(intercept), noise: String(noise) })
      setData(result)
    } catch { setData(null) } finally { setLoading(false) }
  }, [slope, intercept, noise])

  useEffect(() => { loadData() }, [loadData])

  const chartData = data
    ? data.x.map((xi: number, i: number) => ({
        x: xi, y: data.y_noisy[i], yTrue: data.y_true[i],
      }))
    : Array.from({ length: 50 }, (_, i) => {
        const x = (i / 5)
        const yTrue = slope * x + intercept
        const y = yTrue + (Math.random() - 0.5) * noise * 2
        return { x, y, yTrue }
      })

  return (
    <div className="card">
      <h2 className="section-title">Interactive Linear Regression</h2>
      <p className="text-sm text-slate-400 mb-4">
        Adjust the parameters to see how slope, intercept, and noise affect the regression line.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-2">
          <InteractiveSlider name="slope" label={slopeParam?.label ?? 'Slope'} min={slopeParam?.min ?? 0.1} max={slopeParam?.max ?? 5} step={slopeParam?.step ?? 0.1} value={slope} onChange={setSlope} default={slopeParam?.default ?? 2} />
          <InteractiveSlider name="intercept" label={interceptParam?.label ?? 'Intercept'} min={interceptParam?.min ?? -5} max={interceptParam?.max ?? 5} step={interceptParam?.step ?? 0.1} value={intercept} onChange={setIntercept} default={interceptParam?.default ?? 0} />
          <InteractiveSlider name="noise" label={noiseParam?.label ?? 'Noise'} min={noiseParam?.min ?? 0} max={noiseParam?.max ?? 10} step={noiseParam?.step ?? 0.1} value={noise} onChange={setNoise} default={noiseParam?.default ?? 2} />
          <div className="bg-slate-900 rounded-lg p-3 mt-4 text-xs font-mono text-slate-400">
            <div>y = <span className="text-blue-400">{slope.toFixed(1)}x</span> + <span className="text-green-400">{intercept.toFixed(1)}</span></div>
            <div>MSE ≈ {
              chartData.reduce((sum: number, d: any) => sum + Math.pow(d.y - (slope * d.x + intercept), 2), 0) / chartData.length
            }</div>
          </div>
        </div>
        <div className="lg:col-span-3 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" dataKey="x" name="X" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis type="number" dataKey="y" name="Y" stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }}
              />
              <Scatter data={chartData} fill="#3b82f6" opacity={0.6} name="Data" />
              <Line type="linear" dataKey="yTrue" data={chartData} stroke="#f59e0b" strokeWidth={2} dot={false} name="True Line" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// ─── Sigmoid Curve (Logistic Regression) ────────────────────────────────
export function SigmoidCurve({ params }: { params: any[] }) {
  const [slope, setSlope] = useState(params.find(p => p.name === 'slope')?.default ?? 1)
  const [intercept, setIntercept] = useState(params.find(p => p.name === 'intercept')?.default ?? 0)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchSigmoidData({ slope: String(slope), intercept: String(intercept) })
      .then(setData).catch(() => {
        setData({
          x: Array.from({ length: 50 }, (_, i) => -6 + i * 0.24),
          y: Array.from({ length: 50 }, (_, i) => {
            const x = -6 + i * 0.24
            return 1 / (1 + Math.exp(-(slope * x + intercept)))
          }),
        })
      })
  }, [slope, intercept])

  const chartData = data
    ? data.x.map((xi: number, i: number) => ({ x: xi, y: data.y[i] }))
    : Array.from({ length: 50 }, (_, i) => {
        const x = -6 + i * 0.24
        return { x, y: 1 / (1 + Math.exp(-(slope * x + intercept))) }
      })

  const slopeParam = params.find(p => p.name === 'slope')

  return (
    <div className="card">
      <h2 className="section-title">Sigmoid Activation Function</h2>
      <p className="text-sm text-slate-400 mb-4">
        The sigmoid function maps any input to (0, 1), forming the decision boundary in logistic regression.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-2">
          <InteractiveSlider name="slope" label={slopeParam?.label ?? 'Steepness'} min={slopeParam?.min ?? 0.5} max={slopeParam?.max ?? 5} step={slopeParam?.step ?? 0.1} value={slope} onChange={setSlope} default={slopeParam?.default ?? 1} />
          <InteractiveSlider name="intercept" label="Intercept" min={-3} max={3} step={0.1} value={intercept} onChange={setIntercept} default={0} />
          <div className="bg-slate-900 rounded-lg p-3 mt-4 text-xs font-mono text-slate-400">
            <div>{'\u03C3'}(z) = 1 / (1 + e^{'{'}-z{'}'})</div>
            <div>z = <span className="text-blue-400">{slope.toFixed(1)}x</span> + <span className="text-green-400">{intercept.toFixed(1)}</span></div>
            <div className="mt-1">Decision boundary at x = <span className="text-yellow-400">{(-intercept / slope).toFixed(2)}</span></div>
          </div>
        </div>
        <div className="lg:col-span-3 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="x" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 1]} stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }} />
              <ReferenceLine y={0.5} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'Threshold 0.5', position: 'right', fill: '#f59e0b', fontSize: 11 }} />
              <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// ─── K-Means Clusters Visualization ─────────────────────────────────────
const CLUSTER_COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316']

export function ClusterViz({ params }: { params: any[] }) {
  const [nClusters, setNClusters] = useState(params.find(p => p.name === 'n_clusters')?.default ?? 3)
  const [clusterStd, setClusterStd] = useState(params.find(p => p.name === 'cluster_std')?.default ?? 0.6)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchClusterData({ n_clusters: String(nClusters), cluster_std: String(clusterStd) })
      .then(setData).catch(() => setData(null))
  }, [nClusters, clusterStd])

  const chartData: any[] = []
  if (data) {
    data.points.forEach((pt: number[], i: number) => {
      chartData.push({ x: pt[0], y: pt[1], cluster: data.labels[i] })
    })
  } else {
    for (let c = 0; c < nClusters; c++) {
      const angle = (2 * Math.PI * c) / nClusters
      const cx = Math.cos(angle) * 5
      const cy = Math.sin(angle) * 5
      for (let i = 0; i < 30; i++) {
        chartData.push({ x: cx + (Math.random() - 0.5) * clusterStd * 4, y: cy + (Math.random() - 0.5) * clusterStd * 4, cluster: c })
      }
    }
  }

  return (
    <div className="card">
      <h2 className="section-title">K-Means Interactive Clustering</h2>
      <p className="text-sm text-slate-400 mb-4">
        Adjust K and cluster spread to see how data points form natural groupings.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-2">
          <InteractiveSlider name="n_clusters" label="K (Number of Clusters)" min={2} max={8} step={1} value={nClusters} onChange={setNClusters} default={3} />
          <InteractiveSlider name="cluster_std" label="Cluster Spread" min={0.1} max={1.5} step={0.1} value={clusterStd} onChange={setClusterStd} default={0.6} />
          <div className="bg-slate-900 rounded-lg p-3 mt-4 text-xs font-mono text-slate-400">
            <div>K = {nClusters}</div>
            <div>Points per cluster ≈ {Math.round(data ? data.points.length / nClusters : 30)}</div>
            <div className="mt-1 text-yellow-400">Hint: Try K=3 then K=5</div>
          </div>
        </div>
        <div className="lg:col-span-3 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" dataKey="x" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis type="number" dataKey="y" stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }} />
              {Array.from({ length: nClusters }, (_, i) => (
                <Scatter key={i} data={chartData.filter((d: any) => d.cluster === i)} fill={CLUSTER_COLORS[i]} opacity={0.7} name={`Cluster ${i + 1}`} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// ─── PCA Scatter Visualization ──────────────────────────────────────────
export function PCAScatter({ params }: { params: any[] }) {
  const [nComponents, setNComponents] = useState(params.find(p => p.name === 'n_components')?.default ?? 2)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetchPCAData({ n_components: String(nComponents) })
      .then(setData).catch(() => setData(null))
  }, [nComponents])

  const chartData = data
    ? data.points.map((pt: number[]) => ({ x: pt[0], y: pt[1] }))
    : Array.from({ length: 80 }, () => ({ x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 }))

  return (
    <div className="card">
      <h2 className="section-title">PCA - Dimensionality Reduction</h2>
      <p className="text-sm text-slate-400 mb-4">
        PCA projects high-dimensional data onto principal components. Each PC captures a direction of maximum variance.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-2">
          <InteractiveSlider name="n_components" label="Principal Components" min={1} max={3} step={1} value={nComponents} onChange={setNComponents} default={2} />
          <div className="bg-slate-900 rounded-lg p-3 mt-4 text-xs font-mono">
            <div className="text-slate-400 mb-1">Explained Variance:</div>
            {(data?.explained_variance || [0.55, 0.25, 0.10]).slice(0, nComponents).map((v: number, i: number) => (
              <div key={i} className="text-slate-300">PC{i + 1}: {(v * 100).toFixed(1)}%</div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" dataKey="x" stroke="#64748b" tick={{ fontSize: 11 }} label={{ value: 'PC1', position: 'bottom', fill: '#64748b', fontSize: 12 }} />
              <YAxis type="number" dataKey="y" stroke="#64748b" tick={{ fontSize: 11 }} label={{ value: 'PC2', angle: -90, position: 'left', fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }} />
              <Scatter data={chartData} fill="#8b5cf6" opacity={0.6} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// ─── Feature Importance Bar Chart ────────────────────────────────────────
export function FeatureImportance() {
  const data = [
    { name: 'Feat 1', value: 0.25 }, { name: 'Feat 2', value: 0.18 }, { name: 'Feat 3', value: 0.15 },
    { name: 'Feat 4', value: 0.12 }, { name: 'Feat 5', value: 0.10 }, { name: 'Feat 6', value: 0.06 },
    { name: 'Feat 7', value: 0.05 }, { name: 'Feat 8', value: 0.04 }, { name: 'Feat 9', value: 0.03 }, { name: 'Feat 10', value: 0.02 },
  ]

  return (
    <div className="card">
      <h2 className="section-title">Feature Importance</h2>
      <p className="text-sm text-slate-400 mb-4">
        Random Forest provides feature importance scores based on how much each feature reduces impurity across all trees.
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
            <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fontSize: 11 }} width={45} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }} formatter={(v: number) => (v * 100).toFixed(0) + '%'} />
            <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill={i < 3 ? '#3b82f6' : i < 6 ? '#60a5fa' : '#93c5fd'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ─── Network Diagram (Neural Network) ────────────────────────────────────
export function NetworkDiagram() {
  const layers = [
    { name: 'Input', nodes: 4, x: 0 },
    { name: 'Hidden 1', nodes: 6, x: 1 },
    { name: 'Hidden 2', nodes: 4, x: 2 },
    { name: 'Output', nodes: 2, x: 3 },
  ]

  const layerSpacing = 140
  const nodeRadius = 16
  const totalWidth = (layers.length - 1) * layerSpacing + 120
  const maxNodes = Math.max(...layers.map(l => l.nodes))
  const totalHeight = maxNodes * 55 + 40

  const getNodeY = (layerIdx: number, nodeIdx: number) => {
    const layerNodes = layers[layerIdx].nodes
    const startY = (totalHeight - (layerNodes - 1) * 55) / 2
    return startY + nodeIdx * 55
  }

  const getNodeX = (layerIdx: number) => 60 + layerIdx * layerSpacing

  return (
    <div className="card overflow-x-auto">
      <h2 className="section-title">Neural Network Architecture</h2>
      <p className="text-sm text-slate-400 mb-4">
        Visualization of a multi-layer perceptron with connections between layers.
      </p>
      <div className="flex justify-center">
        <svg width={totalWidth} height={totalHeight} className="overflow-visible">
          {layers.map((layer, li) =>
            layer.nodes > 0 && li < layers.length - 1
              ? Array.from({ length: layer.nodes }, (_, ni) =>
                  Array.from({ length: layers[li + 1].nodes }, (_, nj) => (
                    <line
                      key={`e-${li}-${ni}-${nj}`}
                      x1={getNodeX(li)}
                      y1={getNodeY(li, ni)}
                      x2={getNodeX(li + 1)}
                      y2={getNodeY(li + 1, nj)}
                      stroke="#475569"
                      strokeWidth={0.5}
                      opacity={0.5}
                    />
                  ))
                ).flat()
            : null
          )}
          {layers.map((layer, li) =>
            Array.from({ length: layer.nodes }, (_, ni) => (
              <circle
                key={`n-${li}-${ni}`}
                cx={getNodeX(li)}
                cy={getNodeY(li, ni)}
                r={nodeRadius}
                fill={li === 0 ? '#475569' : li === layers.length - 1 ? '#ef4444' : '#3b82f6'}
                stroke="#1e293b"
                strokeWidth={2}
              />
            ))
          )}
          {layers.map((layer, li) => (
            <text key={`t-${li}`} x={getNodeX(li)} y={totalHeight - 5} textAnchor="middle" fill="#94a3b8" fontSize={11}>
              {layer.name} ({layer.nodes})
            </text>
          ))}
        </svg>
      </div>
      <div className="flex justify-center gap-6 mt-2 text-xs text-slate-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#475569] inline-block"></span> Input</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#3b82f6] inline-block"></span> Hidden</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block"></span> Output</span>
      </div>
    </div>
  )
}

// ─── Attention Map Heatmap (Transformer) ─────────────────────────────────
export function AttentionMap() {
  const tokens = ['The', 'cat', 'sat', 'on', 'the', 'mat']
  const matrix = [
    [0.50, 0.30, 0.05, 0.03, 0.05, 0.07],
    [0.15, 0.40, 0.20, 0.08, 0.07, 0.10],
    [0.05, 0.15, 0.45, 0.15, 0.05, 0.15],
    [0.02, 0.05, 0.15, 0.50, 0.15, 0.13],
    [0.05, 0.05, 0.05, 0.15, 0.45, 0.25],
    [0.10, 0.10, 0.10, 0.10, 0.20, 0.40],
  ]

  const cellSize = 52
  const labelWidth = 50
  const size = cellSize * tokens.length + labelWidth

  const getColor = (value: number) => {
    const r = Math.round(30 + value * 200)
    const g = Math.round(41 + value * 50)
    const b = Math.round(100 + value * 100)
    return `rgb(${r}, ${g}, ${b})`
  }

  return (
    <div className="card overflow-x-auto">
      <h2 className="section-title">Self-Attention Visualization</h2>
      <p className="text-sm text-slate-400 mb-4">
        Each cell shows how much attention token i (row) pays to token j (column). Darker = more attention.
      </p>
      <div className="flex justify-center">
        <svg width={size + 60} height={size + 40}>
          {matrix.map((row, i) =>
            row.map((val, j) => (
              <g key={`${i}-${j}`}>
                <rect x={labelWidth + j * cellSize} y={30 + i * cellSize} width={cellSize - 2} height={cellSize - 2} rx={4} fill={getColor(val)} />
                <text x={labelWidth + j * cellSize + cellSize / 2} y={30 + i * cellSize + cellSize / 2 + 4} textAnchor="middle" fill={val > 0.3 ? '#fff' : '#94a3b8'} fontSize={11} fontWeight={600}>
                  {val.toFixed(2)}
                </text>
              </g>
            ))
          )}
          {tokens.map((t, i) => (
            <text key={`row-${i}`} x={labelWidth - 8} y={30 + i * cellSize + cellSize / 2 + 4} textAnchor="end" fill="#94a3b8" fontSize={11}>
              {t}
            </text>
          ))}
          {tokens.map((t, i) => (
            <text key={`col-${i}`} x={labelWidth + i * cellSize + cellSize / 2} y={22} textAnchor="middle" fill="#94a3b8" fontSize={11}>
              {t}
            </text>
          ))}
          <text x={10} y={size + 35} fill="#64748b" fontSize={10}>Rows: Query · Columns: Key</text>
        </svg>
      </div>
    </div>
  )
}

// ─── Tree Diagram (Decision Tree) ────────────────────────────────────────
export function TreeDiagram() {
  const TreeSVG = () => {
    const w = 700, h = 300
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full max-w-2xl mx-auto">
        {/* Root */}
        <rect x={250} y={10} width={200} height={36} rx={6} fill="#1e293b" stroke="#3b82f6" strokeWidth={1.5} />
        <text x={350} y={33} textAnchor="middle" fill="#e2e8f0" fontSize={11}>petal length ≤ 2.45</text>

        {/* Left branch */}
        <line x1={275} y1={46} x2={140} y2={110} stroke="#475569" strokeWidth={1.5} />
        <rect x={40} y={110} width={200} height={36} rx={6} fill="#1e293b" stroke="#10b981" strokeWidth={1.5} />
        <text x={140} y={133} textAnchor="middle" fill="#10b981" fontSize={11}>setosa (50 samples)</text>

        {/* Right branch */}
        <line x1={425} y1={46} x2={525} y2={110} stroke="#475569" strokeWidth={1.5} />
        <rect x={380} y={110} width={200} height={36} rx={6} fill="#1e293b" stroke="#f59e0b" strokeWidth={1.5} />
        <text x={480} y={133} textAnchor="middle" fill="#e2e8f0" fontSize={11}>petal width ≤ 1.75 (100)</text>

        {/* Right-left branch */}
        <line x1={480} y1={146} x2={440} y2={210} stroke="#475569" strokeWidth={1.5} />
        <rect x={340} y={210} width={200} height={36} rx={6} fill="#1e293b" stroke="#f59e0b" strokeWidth={1.5} />
        <text x={440} y={233} textAnchor="middle" fill="#e2e8f0" fontSize={11}>petal length ≤ 4.95 (54)</text>

        {/* Right-right branch */}
        <line x1={480} y1={146} x2={525} y2={210} stroke="#475569" strokeWidth={1.5} />
        <rect x={430} y={210} width={200} height={36} rx={6} fill="#1e293b" stroke="#10b981" strokeWidth={1.5} />
        <text x={530} y={233} textAnchor="middle" fill="#10b981" fontSize={11}>versicolor (48)</text>

        <text x={140} y={300} textAnchor="middle" fill="#64748b" fontSize={10}>Leaf (class decision)</text>
        <text x={530} y={300} textAnchor="middle" fill="#64748b" fontSize={10}>Internal node (split)</text>
      </svg>
    )
  }

  return (
    <div className="card">
      <h2 className="section-title">Decision Tree Structure</h2>
      <p className="text-sm text-slate-400 mb-4">
        A visualization of how a decision tree splits data at each node based on feature thresholds.
      </p>
      <div className="flex justify-center overflow-x-auto">
        <TreeSVG />
      </div>
    </div>
  )
}

// ─── Main Visualization Router ──────────────────────────────────────────
interface VisualizationProps {
  type: string
  data?: any
  interactiveParams?: any[]
}

export default function Visualization({ type, data, interactiveParams = [] }: VisualizationProps) {
  switch (type) {
    case 'scatter_with_line':
      return <LinearRegressionViz params={interactiveParams} />
    case 'sigmoid_curve':
      return <SigmoidCurve params={interactiveParams} />
    case 'scatter_clusters':
      return <ClusterViz params={interactiveParams} />
    case 'scatter_with_vectors':
      return <PCAScatter params={interactiveParams} />
    case 'feature_importance':
    case 'bar_chart':
      return <FeatureImportance />
    case 'network_diagram':
      return <NetworkDiagram />
    case 'attention_map':
      return <AttentionMap />
    case 'tree_structure':
      return <TreeDiagram />
    default:
      return (
        <div className="card">
          <h2 className="section-title">Visualization</h2>
          <div className="h-64 bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-center text-slate-500">
            {type} visualization
          </div>
        </div>
      )
  }
}

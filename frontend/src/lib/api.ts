const API_BASE = '/api'

export interface AlgorithmSummary {
  id: string
  name: string
  name_zh: string
  category: string
  difficulty: string
  tags: string[]
  summary: string
}

export interface AlgorithmDetail {
  id: string
  name: string
  name_zh: string
  category: string
  difficulty: string
  tags: string[]
  summary: string
  theory: any
  code_example: { python: string; explanation: string }
  visualization: any
  interactive_params: any[]
}

export async function fetchAlgorithms(): Promise<AlgorithmSummary[]> {
  const res = await fetch(`${API_BASE}/algorithms`)
  if (!res.ok) throw new Error('Failed to fetch algorithms')
  return res.json()
}

export async function fetchAlgorithm(id: string): Promise<AlgorithmDetail> {
  const res = await fetch(`${API_BASE}/algorithms/${id}`)
  if (!res.ok) throw new Error('Failed to fetch algorithm')
  return res.json()
}

export async function fetchVisualization(id: string, params?: Record<string, string>) {
  const searchParams = new URLSearchParams(params)
  const res = await fetch(`${API_BASE}/generate-${id}?${searchParams}`)
  if (!res.ok) throw new Error('Failed to fetch visualization')
  return res.json()
}

export async function fetchRegressionData(params: Record<string, string>) {
  const sp = new URLSearchParams(params)
  const res = await fetch(`${API_BASE}/generate-regression?${sp}`)
  return res.json()
}

export async function fetchSigmoidData(params: Record<string, string>) {
  const sp = new URLSearchParams(params)
  const res = await fetch(`${API_BASE}/generate-sigmoid?${sp}`)
  return res.json()
}

export async function fetchClusterData(params: Record<string, string>) {
  const sp = new URLSearchParams(params)
  const res = await fetch(`${API_BASE}/generate-clusters?${sp}`)
  return res.json()
}

export async function fetchPCAData(params: Record<string, string>) {
  const sp = new URLSearchParams(params)
  const res = await fetch(`${API_BASE}/generate-pca?${sp}`)
  return res.json()
}

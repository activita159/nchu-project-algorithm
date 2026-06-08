'use client'

import Link from 'next/link'

interface AlgorithmCardProps {
  id: string
  name: string
  name_zh: string
  category: string
  difficulty: string
  tags: string[]
  summary: string
}

const DIFFICULTY_CLASS: Record<string, string> = {
  Beginner: 'tag-beginner',
  Intermediate: 'tag-intermediate',
  Advanced: 'tag-advanced',
}

const ICONS: Record<string, string> = {
  'linear-regression': '📈',
  'logistic-regression': '📊',
  'decision-tree': '🌳',
  'random-forest': '🌲',
  'kmeans': '🎯',
  'svm': '⚔️',
  'pca': '🔍',
  'xgboost': '🚀',
  'neural-network': '🧠',
  'transformer': '⚡',
}

const TAG_COLORS = [
  'bg-blue-900/40 text-blue-400 border border-blue-700/50',
  'bg-purple-900/40 text-purple-400 border border-purple-700/50',
  'bg-cyan-900/40 text-cyan-400 border border-cyan-700/50',
  'bg-pink-900/40 text-pink-400 border border-pink-700/50',
  'bg-teal-900/40 text-teal-400 border border-teal-700/50',
]

export default function AlgorithmCard({ id, name, name_zh, category, difficulty, tags, summary }: AlgorithmCardProps) {
  return (
    <Link href={`/algorithms/${id}`} className="card group block">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{ICONS[id] || '📐'}</span>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{name}</h3>
            <p className="text-sm text-slate-500">{name_zh} · {category}</p>
          </div>
        </div>
        <span className={`tag ${DIFFICULTY_CLASS[difficulty] || 'tag-beginner'}`}>{difficulty}</span>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed mb-3">{summary}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, i) => (
          <span key={tag} className={`tag ${TAG_COLORS[i % TAG_COLORS.length]}`}>{tag}</span>
        ))}
      </div>
    </Link>
  )
}

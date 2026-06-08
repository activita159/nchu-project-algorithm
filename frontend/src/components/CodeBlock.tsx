'use client'

import { useState } from 'react'

interface CodeBlockProps {
  code: string
  language?: string
  explanation?: string
}

export default function CodeBlock({ code, language = 'python', explanation }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="section-title mb-0 border-none pb-0">Code Example</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded">{language}</span>
          <button onClick={handleCopy} className="btn-outline text-xs py-1 px-2">
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      {explanation && <p className="text-sm text-slate-400 mb-4">{explanation}</p>}
      <div className="relative">
        <pre className="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto text-sm leading-relaxed">
          <code className="text-slate-300 font-mono" style={{ whiteSpace: 'pre' }}>{code}</code>
        </pre>
      </div>
    </div>
  )
}

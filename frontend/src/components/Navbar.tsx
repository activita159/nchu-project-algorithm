'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/algorithms/linear-regression', label: 'Linear Regression' },
  { href: '/algorithms/logistic-regression', label: 'Logistic Regression' },
  { href: '/algorithms/decision-tree', label: 'Decision Tree' },
  { href: '/algorithms/random-forest', label: 'Random Forest' },
  { href: '/algorithms/kmeans', label: 'K-Means' },
  { href: '/algorithms/svm', label: 'SVM' },
  { href: '/algorithms/pca', label: 'PCA' },
  { href: '/algorithms/xgboost', label: 'XGBoost' },
  { href: '/algorithms/neural-network', label: 'Neural Network' },
  { href: '/algorithms/transformer', label: 'Transformer' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white shrink-0">
            <span className="text-blue-400 text-xl">◈</span>
            <span>ML Learn</span>
          </Link>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide max-w-[70%]">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-600/20 text-blue-400 font-medium'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

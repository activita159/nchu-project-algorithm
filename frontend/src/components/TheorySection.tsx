'use client'

interface TheorySectionProps {
  theory: any
}

export default function TheorySection({ theory }: TheorySectionProps) {
  if (!theory) return null

  return (
    <div className="card">
      <h2 className="section-title">Theory & Concepts</h2>

      {theory.overview && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
          <p className="prose">{theory.overview}</p>
        </div>
      )}

      {theory.model && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Mathematical Model</h3>
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm text-blue-300 overflow-x-auto">
            {theory.model}
          </div>
        </div>
      )}

      {theory.loss_function && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Loss Function</h3>
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm text-orange-300 overflow-x-auto">
            {theory.loss_function}
          </div>
        </div>
      )}

      {theory.optimization && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Optimization Method</h3>
          <p className="prose">{theory.optimization}</p>
        </div>
      )}

      {theory.objective_function && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Objective Function</h3>
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm text-purple-300 overflow-x-auto">
            {theory.objective_function}
          </div>
        </div>
      )}

      {theory.assumptions && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Assumptions</h3>
          <ul className="space-y-1.5">
            {theory.assumptions.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-blue-400 mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {theory.algorithm_steps && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Algorithm Steps</h3>
          <ol className="space-y-2 list-decimal list-inside">
            {theory.algorithm_steps.map((step: string, i: number) => (
              <li key={i} className="text-slate-300 text-sm">{step}</li>
            ))}
          </ol>
        </div>
      )}

      {theory.splitting_criteria && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Splitting Criteria</h3>
          <ul className="space-y-1.5">
            {theory.splitting_criteria.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-green-400 mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {theory.key_innovations && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Key Innovations</h3>
          <ul className="space-y-1.5">
            {theory.key_innovations.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-yellow-400 mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {theory.key_techniques && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Key Techniques</h3>
          <ul className="space-y-1.5">
            {theory.key_techniques.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-cyan-400 mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {theory.key_concepts && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Key Concepts</h3>
          <ul className="space-y-1.5">
            {theory.key_concepts.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-purple-400 mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {theory.hyperparameters && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Hyperparameters</h3>
          <ul className="space-y-1.5">
            {theory.hyperparameters.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-pink-400 mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {theory.kernels && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Kernel Functions</h3>
          <ul className="space-y-2">
            {theory.kernels.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                <span className="text-pink-400 mt-0.5">◈</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {theory.architecture && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Architecture</h3>
          <ul className="space-y-1.5">
            {theory.architecture.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-indigo-400 mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {theory.attention_mechanism && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Attention Mechanism</h3>
          <ul className="space-y-1.5">
            {theory.attention_mechanism.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-amber-400 mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {theory.key_components && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Key Components</h3>
          <ul className="space-y-1.5">
            {theory.key_components.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-emerald-400 mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {theory.advantages && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Advantages</h3>
          <ul className="space-y-1.5">
            {theory.advantages.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-green-400 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {theory.applications && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Applications</h3>
          <ul className="space-y-1.5">
            {theory.applications.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                <span className="text-blue-400 mt-0.5">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {theory.activation_functions && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Activation Functions</h3>
          <ul className="space-y-2">
            {theory.activation_functions.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-300 text-sm bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                <span className="text-orange-400 mt-0.5">◈</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

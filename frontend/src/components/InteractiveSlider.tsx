'use client'

interface InteractiveSliderProps {
  name: string
  label: string
  min: number
  max: number
  step: number
  default: number
  value: number
  onChange: (value: number) => void
  log?: boolean
}

export default function InteractiveSlider({ name, label, min, max, step, value, onChange, log }: InteractiveSliderProps) {
  return (
    <div className="mb-3">
      <label className="flex items-center justify-between text-sm text-slate-400 mb-1">
        <span>{label}</span>
        <span className="text-white font-mono">{value}</span>
      </label>
      <input
        type="range"
        min={log ? Math.log10(min) : min}
        max={log ? Math.log10(max) : max}
        step={log ? 0.01 : step}
        value={log ? Math.log10(value) : value}
        onChange={(e) => {
          const v = parseFloat(e.target.value)
          onChange(log ? Math.pow(10, v) : v)
        }}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  )
}

import { CHART_TYPE_OPTIONS } from '../types/chart'
import type { ChartType } from '../types/chart'

interface ChartTypeSwitchProps {
  value: ChartType
  onChange: (type: ChartType) => void
}

function ChartTypeSwitch({ value, onChange }: ChartTypeSwitchProps) {
  return (
    <div className="chart-switch" role="group" aria-label="Тип графіка">
      {CHART_TYPE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default ChartTypeSwitch
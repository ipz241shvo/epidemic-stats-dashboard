interface CounterProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  resetValue?: number
  presets?: number[]
}

function Counter({ label, value, onChange, min, max, resetValue = min, presets = [] }: CounterProps) {
  const clamp = (next: number) => Math.min(max, Math.max(min, next))

  return (
    <div className="counter">
      <div className="counter__top">
        <span className="counter__label">{label}</span>
        <div className="counter__controls">
          <button
            type="button"
            aria-label="Зменшити"
            onClick={() => onChange(clamp(value - 1))}
            disabled={value <= min}
          >
            −
          </button>
          <strong className="counter__value">{value}</strong>
          <button
            type="button"
            aria-label="Збільшити"
            onClick={() => onChange(clamp(value + 1))}
            disabled={value >= max}
          >
            +
          </button>
        </div>
      </div>

      <input
        className="counter__slider"
        type="range"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(clamp(Number(event.target.value)))}
      />

      <div className="counter__footer">
        <div className="counter__presets" role="group" aria-label="Швидкий вибір">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              aria-pressed={value === preset}
              onClick={() => onChange(clamp(preset))}
            >
              {preset}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => onChange(clamp(resetValue))}>
          Скинути
        </button>
      </div>
    </div>
  )
}

export default Counter
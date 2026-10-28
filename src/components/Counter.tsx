import { useState } from 'react'

interface CounterProps {
  label: string
  initialValue?: number
  min?: number
  max?: number
}

function Counter({ label, initialValue = 0, min, max }: CounterProps) {
  const [count, setCount] = useState(initialValue)

  const canDecrement = min === undefined || count > min
  const canIncrement = max === undefined || count < max

  const handleIncrement = () => setCount((prev) => prev + 1)
  const handleDecrement = () => setCount((prev) => prev - 1)
  const handleReset = () => setCount(initialValue)

  return (
    <div className="counter">
      <span className="counter__label">{label}</span>
      <div className="counter__controls">
        <button type="button" onClick={handleDecrement} disabled={!canDecrement}>
          −
        </button>
        <strong className="counter__value">{count}</strong>
        <button type="button" onClick={handleIncrement} disabled={!canIncrement}>
          +
        </button>
      </div>
      <button type="button" onClick={handleReset}>Скинути</button>
    </div>
  )
}

export default Counter
import { useState } from 'react'
import type { ReactNode } from 'react'

interface ToggleProps {
  title: string
  children: ReactNode
}

function Toggle({ title, children }: ToggleProps) {
  const [isDark, setIsDark] = useState(false)

  const handleToggle = () => setIsDark((prev) => !prev)

  return (
    <div className={`toggle toggle--${isDark ? 'dark' : 'light'}`}>
      <div className="toggle__header">
        <h2>{title}</h2>
        <button type="button" onClick={handleToggle}>
          {isDark ? '☀️ Світла тема' : '🌙 Темна тема'}
        </button>
      </div>
      {children}
    </div>
  )
}

export default Toggle
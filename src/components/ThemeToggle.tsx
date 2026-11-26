import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button type="button" onClick={toggleTheme}>
      {theme === 'dark' ? '☀️ Світла тема' : '🌙 Темна тема'}
    </button>
  )
}

export default ThemeToggle
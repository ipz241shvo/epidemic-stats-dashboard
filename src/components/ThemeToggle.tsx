import { selectTheme, selectToggleTheme } from '../store/selectors'
import { useDashboardStore } from '../store/useDashboardStore'

function ThemeToggle() {
  const theme = useDashboardStore(selectTheme)
  const toggleTheme = useDashboardStore(selectToggleTheme)

  return (
    <button type="button" onClick={toggleTheme}>
      {theme === 'dark' ? '☀️ Світла тема' : '🌙 Темна тема'}
    </button>
  )
}

export default ThemeToggle
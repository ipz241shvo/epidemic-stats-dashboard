import { Link, Outlet } from 'react-router'
import ThemeToggle from './ThemeToggle'

function Layout() {
  return (
    <main>
      <header className="app-header">
        <h1>
          <Link to="/">Епідемстатистика</Link>
        </h1>
        <ThemeToggle />
      </header>
      <Outlet />
    </main>
  )
}

export default Layout
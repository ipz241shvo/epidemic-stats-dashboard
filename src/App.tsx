import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import CountryPage from './pages/CountryPage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="country/:code" element={<CountryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
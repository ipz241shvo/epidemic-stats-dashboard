import { useEffect, useState } from 'react'
import { fetchGlobal } from '../api/diseaseApi'
import KpiCard from '../components/KpiCard'
import StatusMessage from '../components/StatusMessage'
import type { GlobalStat } from '../types/country'
import { buildKpiItems } from '../utils/kpi'

function KpiContainer() {
  const [stat, setStat] = useState<GlobalStat | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchGlobal(controller.signal)
      .then((data) => setStat(data))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Невідома помилка')
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  if (loading) {
    return <StatusMessage variant="loading" message="Завантаження показників..." />
  }
  if (error) {
    return <StatusMessage variant="error" message={`Не вдалося завантажити дані: ${error}`} />
  }
  if (!stat) {
    return <StatusMessage variant="empty" message="Даних немає" />
  }

  return (
    <section className="kpi-grid">
      {buildKpiItems(stat).map((item) => (
        <KpiCard
          key={item.id}
          title={item.title}
          value={item.value}
          change={item.change}
        />
      ))}
    </section>
  )
}

export default KpiContainer
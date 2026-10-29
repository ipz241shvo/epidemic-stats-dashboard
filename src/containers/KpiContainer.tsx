import KpiCard from '../components/KpiCard'
import StatusMessage from '../components/StatusMessage'
import { useFetch } from '../hooks/useFetch'
import type { GlobalStat } from '../types/country'
import { buildKpiItems } from '../utils/kpi'

function KpiContainer() {
  const { data, loading, error } = useFetch<GlobalStat>('/all')

  if (loading) {
    return <StatusMessage variant="loading" message="Завантаження показників..." />
  }
  if (error) {
    return <StatusMessage variant="error" message={`Не вдалося завантажити дані: ${error}`} />
  }
  if (!data) {
    return <StatusMessage variant="empty" message="Даних немає" />
  }

  return (
    <section className="kpi-grid">
      {buildKpiItems(data).map((item) => (
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
import { useMemo } from 'react'
import MetricChart from '../components/MetricChart'
import StatusMessage from '../components/StatusMessage'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import { selectChartType, selectHistoryDays } from '../store/selectors'
import { useDashboardStore } from '../store/useDashboardStore'
import type { HistoricalStat } from '../types/history'
import { buildDailyChange } from '../utils/history'

function HistoryChartContainer() {
  const historyDays = useDashboardStore(selectHistoryDays)
  const chartType = useDashboardStore(selectChartType)

  const days = useDebounce(historyDays, 400)
  const { data, loading, error } = useFetch<HistoricalStat>(
    `/historical/all?lastdays=${days + 1}`,
  )

  const points = useMemo(() => (data ? buildDailyChange(data.cases) : []), [data])

  const renderBody = () => {
    if (loading) {
      return <StatusMessage variant="loading" message="Завантаження історії..." />
    }
    if (error) {
      return <StatusMessage variant="error" message={`Не вдалося завантажити дані: ${error}`} />
    }
    if (points.length === 0) {
      return <StatusMessage variant="empty" message="Немає даних за період" />
    }
    return <MetricChart type={chartType} data={points} label="Нові випадки" />
  }

  return (
    <section className="chart">
      <div className="chart__header">
        <h2>{`Нові випадки за ${days} днів`}</h2>
      </div>
      {renderBody()}
    </section>
  )
}

export default HistoryChartContainer
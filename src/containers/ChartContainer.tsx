import { useMemo } from 'react'
import ChartTypeSwitch from '../components/ChartTypeSwitch'
import MetricChart from '../components/MetricChart'
import { selectChartType, selectSetChartType } from '../store/selectors'
import { useDashboardStore } from '../store/useDashboardStore'
import type { CountryStat } from '../types/country'
import { SORT_OPTIONS } from '../types/filters'
import type { SortField } from '../types/filters'
import { buildChartData } from '../utils/chart'

const TOP_COUNT = 10

interface ChartContainerProps {
  countries: CountryStat[]
  metric: SortField
}

function ChartContainer({ countries, metric }: ChartContainerProps) {
  const chartType = useDashboardStore(selectChartType)
  const setChartType = useDashboardStore(selectSetChartType)

  const data = useMemo(() => buildChartData(countries, metric, TOP_COUNT), [countries, metric])
  const label = SORT_OPTIONS.find((option) => option.value === metric)?.label ?? metric

  return (
    <section className="chart">
      <div className="chart__header">
        <h2>{`Топ-${TOP_COUNT} країн ${label.toLowerCase()}`}</h2>
        <ChartTypeSwitch value={chartType} onChange={setChartType} />
      </div>
      <MetricChart type={chartType} data={data} label={label} />
    </section>
  )
}

export default ChartContainer
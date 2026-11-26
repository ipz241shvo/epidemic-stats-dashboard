import Counter from '../components/Counter'
import CountriesTable from '../components/CountriesTable'
import FilteredList from '../components/FilteredList'
import FiltersForm from '../components/FiltersForm'
import KpiGrid from '../components/KpiGrid'
import StatusMessage from '../components/StatusMessage'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import {
  selectFilters,
  selectHistoryDays,
  selectSetHistoryDays,
} from '../store/selectors'
import { DEFAULT_HISTORY_DAYS, useDashboardStore } from '../store/useDashboardStore'
import type { CountryStat } from '../types/country'
import { buildKpiItems, sumCountries } from '../utils/kpi'
import ChartContainer from './ChartContainer'
import HistoryChartContainer from './HistoryChartContainer'

function DashboardContainer() {
  const filters = useDashboardStore(selectFilters)
  const historyDays = useDashboardStore(selectHistoryDays)
  const setHistoryDays = useDashboardStore(selectSetHistoryDays)

  const search = useDebounce(filters.search, 400)
  const { continent, sort } = filters

  const path = useDebounce(`/countries?sort=${sort}`, 400)
  const { data, loading, error } = useFetch<CountryStat[]>(path)

  const loaded = [...new Set((data ?? []).map((item) => item.continent))]
    .filter(Boolean)
    .sort()
  const continents =
    continent && !loaded.includes(continent) ? [...loaded, continent] : loaded

  const visible = (data ?? []).filter(
    (item) =>
      item.country.toLowerCase().includes(search.trim().toLowerCase()) &&
      (continent === '' || item.continent === continent),
  )

  const renderKpi = () => {
    if (loading) {
      return <StatusMessage variant="loading" message="Завантаження показників..." />
    }
    if (error) {
      return <StatusMessage variant="error" message={`Не вдалося завантажити дані: ${error}`} />
    }
    return <KpiGrid items={buildKpiItems(sumCountries(visible))} />
  }

  const renderTable = () => {
    if (loading) {
      return <StatusMessage variant="loading" message="Завантаження країн..." />
    }
    if (error) {
      return <StatusMessage variant="error" message={`Не вдалося завантажити дані: ${error}`} />
    }
    if (visible.length === 0) {
      return <StatusMessage variant="empty" message="Нічого не знайдено" />
    }
    return (
      <>
        <ChartContainer countries={visible} metric={sort} />
        <CountriesTable key={sort} countries={visible} initialSortKey={sort} />
        <FilteredList
          title="Країни за континентами"
          items={visible}
          valueKey={sort}
        />
      </>
    )
  }

  return (
    <>
      <section>
        <h2>Загальна статистика</h2>
        {renderKpi()}
      </section>

      <section>
        <Counter
          label="Днів історії"
          value={historyDays}
          onChange={setHistoryDays}
          resetValue={DEFAULT_HISTORY_DAYS}
          min={7}
          max={90}
          presets={[7, 14, 30, 90]}
        />
        <HistoryChartContainer />
      </section>

      <section>
        <h2>Країни</h2>
        <FiltersForm continents={continents} />
        {renderTable()}
      </section>
    </>
  )
}

export default DashboardContainer
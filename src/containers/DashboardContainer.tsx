import { useForm, useWatch } from 'react-hook-form'
import Counter from '../components/Counter'
import CountriesTable from '../components/CountriesTable'
import FilteredList from '../components/FilteredList'
import FiltersForm from '../components/FiltersForm'
import KpiGrid from '../components/KpiGrid'
import StatusMessage from '../components/StatusMessage'
import Toggle from '../components/Toggle'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import type { CountryStat } from '../types/country'
import { DEFAULT_FILTERS } from '../types/filters'
import type { Filters } from '../types/filters'
import { buildKpiItems, sumCountries } from '../utils/kpi'

function DashboardContainer() {
  const { control, reset } = useForm<Filters>({ defaultValues: DEFAULT_FILTERS })
  const filters = useWatch({ control }) as Filters

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
      <Toggle title="Загальна статистика">{renderKpi()}</Toggle>

      <section>
        <Counter label="Днів історії" initialValue={30} min={7} max={90} />
      </section>

      <section>
        <h2>Таблиця країн</h2>
        <FiltersForm
          control={control}
          continents={continents}
          onReset={() => reset(DEFAULT_FILTERS)}
        />
        {renderTable()}
      </section>
    </>
  )
}

export default DashboardContainer
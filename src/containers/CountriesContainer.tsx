import { useForm, useWatch } from 'react-hook-form'
import CountriesTable from '../components/CountriesTable'
import FilteredList from '../components/FilteredList'
import FiltersForm from '../components/FiltersForm'
import StatusMessage from '../components/StatusMessage'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import type { CountryStat } from '../types/country'
import { DEFAULT_FILTERS } from '../types/filters'
import type { Filters } from '../types/filters'

function CountriesContainer() {
  const { control, reset } = useForm<Filters>({ defaultValues: DEFAULT_FILTERS })
  const filters = useWatch({ control }) as Filters

  const search = useDebounce(filters.search, 400)
  const { continent, sort } = filters

  const { data, loading, error } = useFetch<CountryStat[]>(`/countries?sort=${sort}`)

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

  const renderContent = () => {
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
        <CountriesTable countries={visible} />
        <FilteredList title="Країни за континентами" items={visible} />
      </>
    )
  }

  return (
    <>
      <FiltersForm
        control={control}
        continents={continents}
        onReset={() => reset(DEFAULT_FILTERS)}
      />
      {renderContent()}
    </>
  )
}

export default CountriesContainer
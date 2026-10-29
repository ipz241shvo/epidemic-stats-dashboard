import CountriesTable from '../components/CountriesTable'
import FilteredList from '../components/FilteredList'
import StatusMessage from '../components/StatusMessage'
import { useFetch } from '../hooks/useFetch'
import type { CountryStat } from '../types/country'

function CountriesContainer() {
  const { data, loading, error } = useFetch<CountryStat[]>('/countries')

  if (loading) {
    return <StatusMessage variant="loading" message="Завантаження країн..." />
  }
  if (error) {
    return <StatusMessage variant="error" message={`Не вдалося завантажити дані: ${error}`} />
  }
  if (!data || data.length === 0) {
    return <StatusMessage variant="empty" message="Даних немає" />
  }

  return (
    <>
      <CountriesTable countries={data} />
      <FilteredList title="Країни за континентами" items={data} />
    </>
  )
}

export default CountriesContainer
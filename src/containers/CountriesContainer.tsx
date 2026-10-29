import { useEffect, useState } from 'react'
import { fetchCountries } from '../api/diseaseApi'
import CountriesTable from '../components/CountriesTable'
import FilteredList from '../components/FilteredList'
import StatusMessage from '../components/StatusMessage'
import type { CountryStat } from '../types/country'

function CountriesContainer() {
  const [countries, setCountries] = useState<CountryStat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchCountries(controller.signal)
      .then((data) => setCountries(data))
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
    return <StatusMessage variant="loading" message="Завантаження країн..." />
  }
  if (error) {
    return <StatusMessage variant="error" message={`Не вдалося завантажити дані: ${error}`} />
  }
  if (countries.length === 0) {
    return <StatusMessage variant="empty" message="Даних немає" />
  }

  return (
    <>
      <CountriesTable countries={countries} />
      <FilteredList title="Країни за континентами" items={countries} />
    </>
  )
}

export default CountriesContainer
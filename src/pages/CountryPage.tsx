import { Link, useParams } from 'react-router'
import CountryDetailsView from '../components/CountryDetailsView'
import StatusMessage from '../components/StatusMessage'
import { useFetch } from '../hooks/useFetch'
import type { CountryDetails } from '../types/country'
import FavoriteButton from '../components/FavoriteButton'
import { getCountryCode } from '../utils/country'

function CountryPage() {
  const { code = '' } = useParams()
  const { data, loading, error } = useFetch<CountryDetails>(
    `/countries/${encodeURIComponent(code)}`,
  )

  const renderContent = () => {
    if (loading) {
      return <StatusMessage variant="loading" message="Завантаження країни..." />
    }
    if (error?.includes('404')) {
      return <StatusMessage variant="empty" message={`Країну «${code}» не знайдено`} />
    }
    if (error) {
      return <StatusMessage variant="error" message={`Не вдалося завантажити дані: ${error}`} />
    }
    if (!data) return null
    return (
      <CountryDetailsView
        country={data}
        actions={<FavoriteButton code={getCountryCode(data)} />}
      />
    )
  }

  return (
    <section>
      <Link to="/" className="back-link">← Назад</Link>
      {renderContent()}
    </section>
  )
}

export default CountryPage
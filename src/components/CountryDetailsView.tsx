import type { CountryDetails } from '../types/country'
import { formatNumber } from '../utils/format'
import type { ReactNode } from 'react'

interface CountryDetailsViewProps {
  country: CountryDetails
  actions?: ReactNode
}

function CountryDetailsView({ country, actions }: CountryDetailsViewProps) {
  const rows = [
    { label: 'Континент', value: country.continent || '—' },
    { label: 'Населення', value: formatNumber(country.population) },
    { label: 'Випадки', value: formatNumber(country.cases) },
    { label: 'Нові випадки', value: formatNumber(country.todayCases) },
    { label: 'Смерті', value: formatNumber(country.deaths) },
    { label: 'Нові смерті', value: formatNumber(country.todayDeaths) },
    { label: 'Одужання', value: formatNumber(country.recovered) },
    { label: 'Активні', value: formatNumber(country.active) },
    { label: 'Критичні', value: formatNumber(country.critical) },
    { label: 'Тести', value: formatNumber(country.tests) },
    { label: 'Випадків на 1 млн', value: formatNumber(country.casesPerOneMillion) },
    { label: 'Смертей на 1 млн', value: formatNumber(country.deathsPerOneMillion) },
    { label: 'Тестів на 1 млн', value: formatNumber(country.testsPerOneMillion) },
  ]

  return (
    <article className="details">
      <header className="details__header">
        <img src={country.countryInfo.flag} alt="" width={48} />
        <h2>{country.country}</h2>
        <div className="details__actions">{actions}</div>
      </header>

      <dl className="details__list">
        {rows.map((row) => (
          <div key={row.label} className="details__row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="details__updated">
        Оновлено: {new Date(country.updated).toLocaleString('uk-UA')}
      </p>
    </article>
  )
}

export default CountryDetailsView
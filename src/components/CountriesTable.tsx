import { useMemo, useState } from 'react'
import type { CountryStat } from '../types/country'

type SortKey = 'country' | 'cases' | 'deaths' | 'recovered' | 'active'
type SortDirection = 'asc' | 'desc'

interface CountriesTableProps {
  countries: CountryStat[]
}

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'country', label: 'Країна' },
  { key: 'cases', label: 'Випадки' },
  { key: 'deaths', label: 'Смерті' },
  { key: 'recovered', label: 'Одужання' },
  { key: 'active', label: 'Активні' },
]

function CountriesTable({ countries }: CountriesTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('cases')
  const [direction, setDirection] = useState<SortDirection>('desc')

  const sortedCountries = useMemo(() => {
    const factor = direction === 'asc' ? 1 : -1
    return [...countries].sort((a, b) =>
      sortKey === 'country'
        ? a.country.localeCompare(b.country, 'uk') * factor
        : (a[sortKey] - b[sortKey]) * factor,
    )
  }, [countries, sortKey, direction])

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setDirection(key === 'country' ? 'asc' : 'desc')
    }
  }

  return (
    <div className="table-wrapper">
      <table className="countries-table">
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column.key}>
                <button type="button" onClick={() => handleSort(column.key)}>
                  {column.label}
                  {sortKey === column.key && (direction === 'asc' ? ' ▲' : ' ▼')}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedCountries.map((item) => (
            <tr key={item.country}>
              <td>
                <img src={item.countryInfo.flag} alt="" width={20} />
                {item.country}
              </td>
              <td>{item.cases.toLocaleString('uk-UA')}</td>
              <td>{item.deaths.toLocaleString('uk-UA')}</td>
              <td>{item.recovered.toLocaleString('uk-UA')}</td>
              <td>{item.active.toLocaleString('uk-UA')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CountriesTable
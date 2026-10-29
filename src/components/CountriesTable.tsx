import { useMemo, useState } from 'react'
import type { CountryStat } from '../types/country'
import { formatNumber } from '../utils/format'

type SortKey = 'country' | 'cases' | 'deaths' | 'recovered' | 'active'
type SortDirection = 'asc' | 'desc'

interface CountriesTableProps {
  countries: CountryStat[]
  initialSortKey?: SortKey
}

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'country', label: 'Країна' },
  { key: 'cases', label: 'Випадки' },
  { key: 'deaths', label: 'Смерті' },
  { key: 'recovered', label: 'Одужання' },
  { key: 'active', label: 'Активні' },
]

function CountriesTable({ countries, initialSortKey = 'cases' }: CountriesTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>(initialSortKey)
  const [direction, setDirection] = useState<SortDirection>('desc')

  const sortedCountries = useMemo(() => {
    const factor = direction === 'asc' ? 1 : -1
    return [...countries].sort((a, b) =>
      sortKey === 'country'
        ? a.country.localeCompare(b.country, 'uk') * factor
        : ((a[sortKey] ?? 0) - (b[sortKey] ?? 0)) * factor,
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
              <td>{formatNumber(item.cases)}</td>
              <td>{formatNumber(item.deaths)}</td>
              <td>{formatNumber(item.recovered)}</td>
              <td>{formatNumber(item.active)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CountriesTable
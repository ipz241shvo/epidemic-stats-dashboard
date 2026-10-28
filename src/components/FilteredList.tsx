import { useState } from 'react'
import type { CountryStat } from '../types/country'

interface FilteredListProps {
  title: string
  items: CountryStat[]
}

const ALL = 'all'

function FilteredList({ title, items }: FilteredListProps) {
  const [continent, setContinent] = useState(ALL)

  const continents = [...new Set(items.map((item) => item.continent))].sort()

  const visibleItems =
    continent === ALL
      ? items
      : items.filter((item) => item.continent === continent)

  return (
    <div className="filtered-list">
      <div className="filtered-list__header">
        <h2>{title}</h2>
        <select
          value={continent}
          onChange={(event) => setContinent(event.target.value)}
        >
          <option value={ALL}>Усі континенти</option>
          {continents.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {visibleItems.length === 0 ? (
        <p className="filtered-list__empty">Немає країн для цього фільтра</p>
      ) : (
        <ul className="filtered-list__items">
          {visibleItems.map((item) => (
            <li key={item.countryInfo.iso3} className="filtered-list__item">
              <span>{item.country}</span>
              <span className="filtered-list__cases">
                {item.cases.toLocaleString('uk-UA')}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FilteredList
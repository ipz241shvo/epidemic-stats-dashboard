import { selectFilters, selectResetFilters, selectSetFilter } from '../store/selectors'
import { useDashboardStore } from '../store/useDashboardStore'
import { SORT_OPTIONS } from '../types/filters'
import type { SortField } from '../types/filters'

interface FiltersFormProps {
  continents: string[]
}

function FiltersForm({ continents }: FiltersFormProps) {
  const filters = useDashboardStore(selectFilters)
  const setFilter = useDashboardStore(selectSetFilter)
  const resetFilters = useDashboardStore(selectResetFilters)

  return (
    <form className="filters-form" onSubmit={(event) => event.preventDefault()}>
      <input
        type="search"
        placeholder="Пошук країни..."
        value={filters.search}
        onChange={(event) => setFilter('search', event.target.value)}
      />

      <select
        value={filters.continent}
        onChange={(event) => setFilter('continent', event.target.value)}
      >
        <option value="">Усі континенти</option>
        {continents.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(event) => setFilter('sort', event.target.value as SortField)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button type="button" onClick={resetFilters}>
        Скинути фільтри
      </button>
    </form>
  )
}

export default FiltersForm
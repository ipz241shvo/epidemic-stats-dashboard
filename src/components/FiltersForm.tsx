import { Controller } from 'react-hook-form'
import { useFilters } from '../context/FiltersContext'

interface FiltersFormProps {
  continents: string[]
}

function FiltersForm({ continents }: FiltersFormProps) {
  const { control, resetFilters } = useFilters()

  return (
    <form className="filters-form" onSubmit={(event) => event.preventDefault()}>
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <input
            type="search"
            placeholder="Пошук країни..."
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name="continent"
        control={control}
        render={({ field }) => (
          <select value={field.value} onChange={field.onChange}>
            <option value="">Усі континенти</option>
            {continents.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        )}
      />

      <Controller
        name="sort"
        control={control}
        render={({ field }) => (
          <select value={field.value} onChange={field.onChange}>
            <option value="cases">За випадками</option>
            <option value="deaths">За смертями</option>
            <option value="recovered">За одужаннями</option>
            <option value="active">За активними</option>
          </select>
        )}
      />

      <button type="button" onClick={resetFilters}>
        Скинути фільтри
      </button>
    </form>
  )
}

export default FiltersForm
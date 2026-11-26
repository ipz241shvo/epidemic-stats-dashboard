import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import { DEFAULT_FILTERS } from '../types/filters'
import type { Filters } from '../types/filters'

interface FiltersContextValue {
  control: Control<Filters>
  filters: Filters
  resetFilters: () => void
}

const FiltersContext = createContext<FiltersContextValue | null>(null)

export function FiltersProvider({ children }: { children: ReactNode }) {
  const { control, reset } = useForm<Filters>({ defaultValues: DEFAULT_FILTERS })
  const filters = useWatch({ control }) as Filters

  const value: FiltersContextValue = {
    control,
    filters,
    resetFilters: () => reset(DEFAULT_FILTERS),
  }

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFilters() {
  const context = useContext(FiltersContext)
  if (!context) throw new Error('useFilters має використовуватись всередині FiltersProvider')
  return context
}
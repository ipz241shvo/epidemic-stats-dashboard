export type SortField = 'cases' | 'deaths' | 'recovered' | 'active'

export interface Filters {
  search: string
  continent: string
  sort: SortField
}

export const DEFAULT_FILTERS: Filters = {
  search: '',
  continent: '',
  sort: 'cases',
}

export const SORT_OPTIONS: { value: SortField; label: string }[] = [
  { value: 'cases', label: 'За випадками' },
  { value: 'deaths', label: 'За смертями' },
  { value: 'recovered', label: 'За одужаннями' },
  { value: 'active', label: 'За активними' },
]
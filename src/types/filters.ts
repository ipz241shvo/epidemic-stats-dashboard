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
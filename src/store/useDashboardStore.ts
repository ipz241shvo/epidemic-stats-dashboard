import { create } from 'zustand'
import type { ChartType } from '../types/chart'
import { DEFAULT_FILTERS } from '../types/filters'
import type { Filters } from '../types/filters'

export type Theme = 'light' | 'dark'

export interface DashboardState {
  filters: Filters
  favorites: string[]
  theme: Theme
  chartType: ChartType

  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  resetFilters: () => void
  toggleFavorite: (code: string) => void
  toggleTheme: () => void
  setChartType: (type: ChartType) => void
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  filters: DEFAULT_FILTERS,
  favorites: [],
  theme: 'light',
  chartType: 'bar',

  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  toggleFavorite: (code) =>
    set((state) => ({
      favorites: state.favorites.includes(code)
        ? state.favorites.filter((item) => item !== code)
        : [...state.favorites, code],
    })),

  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  setChartType: (chartType) => set({ chartType }),
}))
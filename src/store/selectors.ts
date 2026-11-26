import type { DashboardState } from './useDashboardStore'

export const selectFilters = (state: DashboardState) => state.filters
export const selectSetFilter = (state: DashboardState) => state.setFilter
export const selectResetFilters = (state: DashboardState) => state.resetFilters

export const selectTheme = (state: DashboardState) => state.theme
export const selectToggleTheme = (state: DashboardState) => state.toggleTheme

export const selectChartType = (state: DashboardState) => state.chartType
export const selectSetChartType = (state: DashboardState) => state.setChartType

export const selectToggleFavorite = (state: DashboardState) => state.toggleFavorite
export const selectIsFavorite = (code: string) => (state: DashboardState) =>
  state.favorites.includes(code)
import type { ChartPoint } from '../types/chart'
import type { CountryStat } from '../types/country'
import type { SortField } from '../types/filters'

export function buildChartData(
  countries: CountryStat[],
  metric: SortField,
  limit = 10,
): ChartPoint[] {
  return [...countries]
    .sort((a, b) => (b[metric] ?? 0) - (a[metric] ?? 0))
    .slice(0, limit)
    .map((item) => ({ name: item.country, value: item[metric] ?? 0 }))
}
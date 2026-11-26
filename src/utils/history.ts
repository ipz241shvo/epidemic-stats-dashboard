import type { ChartPoint } from '../types/chart'

export function buildDailyChange(series: Record<string, number>): ChartPoint[] {
  const entries = Object.entries(series)
  return entries.slice(1).map(([date, total], index) => ({
    name: date,
    value: Math.max(total - entries[index][1], 0),
  }))
}
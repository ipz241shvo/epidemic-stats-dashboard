import type { GlobalStat, KpiItem } from '../types/country'

function percentOf(part: number, total: number): number {
  if (total === 0) return 0
  return Number(((part / total) * 100).toFixed(2))
}

export function buildKpiItems(stat: GlobalStat): KpiItem[] {
  return [
    {
      id: 'cases',
      title: 'Всього випадків',
      value: stat.cases,
      change: percentOf(stat.todayCases, stat.cases),
    },
    {
      id: 'recovered',
      title: 'Одужань',
      value: stat.recovered,
      change: percentOf(stat.todayRecovered, stat.recovered),
    },
    {
      id: 'deaths',
      title: 'Смертей',
      value: stat.deaths,
      change: percentOf(stat.todayDeaths, stat.deaths),
    },
  ]
}
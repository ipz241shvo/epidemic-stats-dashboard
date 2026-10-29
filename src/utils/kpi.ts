import type { CountryStat, KpiItem, KpiTotals } from '../types/country'

function percentOf(part: number, total: number): number {
  if (total === 0) return 0
  return Number(((part / total) * 100).toFixed(2))
}

export function sumCountries(countries: CountryStat[]): KpiTotals {
  return countries.reduce<KpiTotals>(
    (acc, item) => ({
      cases: acc.cases + (item.cases ?? 0),
      todayCases: acc.todayCases + (item.todayCases ?? 0),
      recovered: acc.recovered + (item.recovered ?? 0),
      todayRecovered: acc.todayRecovered + (item.todayRecovered ?? 0),
      deaths: acc.deaths + (item.deaths ?? 0),
      todayDeaths: acc.todayDeaths + (item.todayDeaths ?? 0),
    }),
    { cases: 0, todayCases: 0, recovered: 0, todayRecovered: 0, deaths: 0, todayDeaths: 0 },
  )
}

export function buildKpiItems(stat: KpiTotals): KpiItem[] {
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
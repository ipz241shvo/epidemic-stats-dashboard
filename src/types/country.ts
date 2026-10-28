export interface CountryInfo {
  iso2: string
  iso3: string
  flag: string
}

export interface CountryStat {
  country: string
  countryInfo: CountryInfo
  continent: string
  population: number
  cases: number
  todayCases: number
  deaths: number
  todayDeaths: number
  recovered: number
  active: number
  critical: number
  casesPerOneMillion: number
  tests: number
}

export interface KpiItem {
  id: string
  title: string
  value: number
  change: number
}
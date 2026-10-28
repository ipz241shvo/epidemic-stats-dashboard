export interface CountryInfo {
  iso2: string | null
  iso3: string | null
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

export interface GlobalStat {
  cases: number
  todayCases: number
  deaths: number
  todayDeaths: number
  recovered: number
  todayRecovered: number
  active: number
  critical: number
  tests: number
  population: number
  affectedCountries: number
}
import type { CountryStat, GlobalStat } from '../types/country'

const BASE_URL = 'https://disease.sh/v3/covid-19'

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal })

  if (!response.ok) {
    throw new Error(`Помилка запиту: ${response.status}`)
  }

  return (await response.json()) as T
}

export const fetchCountries = (signal?: AbortSignal) =>
  getJson<CountryStat[]>('/countries', signal)

export const fetchGlobal = (signal?: AbortSignal) =>
  getJson<GlobalStat>('/all', signal)
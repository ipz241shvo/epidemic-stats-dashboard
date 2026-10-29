const BASE_URL = 'https://disease.sh/v3/covid-19'

export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal })

  if (!response.ok) {
    throw new Error(`Помилка запиту: ${response.status}`)
  }

  return (await response.json()) as T
}
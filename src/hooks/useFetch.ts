import { useEffect, useState } from 'react'
import { getJson } from '../api/diseaseApi'

interface Result<T> {
  path: string
  data: T | null
  error: string | null
}

export function useFetch<T>(path: string) {
  const [result, setResult] = useState<Result<T> | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    getJson<T>(path, controller.signal)
      .then((data) => setResult({ path, data, error: null }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setResult({
          path,
          data: null,
          error: err instanceof Error ? err.message : 'Невідома помилка',
        })
      })

    return () => controller.abort()
  }, [path])

  const settled = result !== null && result.path === path

  return {
    data: settled ? result.data : null,
    loading: !settled,
    error: settled ? result.error : null,
  }
}
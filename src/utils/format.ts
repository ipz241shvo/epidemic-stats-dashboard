export function formatNumber(value: number | null | undefined): string {
  return typeof value === 'number' ? value.toLocaleString('uk-UA') : '—'
}

const compactFormatter = new Intl.NumberFormat('uk-UA', { notation: 'compact' })

export function formatCompact(value: number): string {
  return compactFormatter.format(value)
}
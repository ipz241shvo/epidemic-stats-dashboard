export function formatNumber(value: number | null | undefined): string {
  return typeof value === 'number' ? value.toLocaleString('uk-UA') : '—'
}
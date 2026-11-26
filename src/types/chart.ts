export type ChartType = 'bar' | 'line'

export interface ChartPoint {
  name: string
  value: number
}

export const CHART_TYPE_OPTIONS: { value: ChartType; label: string }[] = [
  { value: 'bar', label: 'Стовпчики' },
  { value: 'line', label: 'Лінія' },
]
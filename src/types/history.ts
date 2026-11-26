export interface HistoricalStat {
  cases: Record<string, number>
  deaths: Record<string, number>
  recovered: Record<string, number>
}
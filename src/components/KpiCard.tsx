interface KpiCardProps {
  title: string
  value: number
  change: number
}

function KpiCard({ title, value, change }: KpiCardProps) {
  const sign = change > 0 ? '+' : ''
  const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'flat'

  return (
    <div className="kpi-card">
      <span className="kpi-card__title">{title}</span>
      <strong className="kpi-card__value">{value.toLocaleString('uk-UA')}</strong>
      <span className={`kpi-card__change kpi-card__change--${trend}`}>
        {sign}{change}%
      </span>
    </div>
  )
}

export default KpiCard
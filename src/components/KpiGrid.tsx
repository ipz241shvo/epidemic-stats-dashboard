import type { KpiItem } from '../types/country'
import KpiCard from './KpiCard'

interface KpiGridProps {
  items: KpiItem[]
}

function KpiGrid({ items }: KpiGridProps) {
  return (
    <section className="kpi-grid">
      {items.map((item) => (
        <KpiCard
          key={item.id}
          title={item.title}
          value={item.value}
          change={item.change}
        />
      ))}
    </section>
  )
}

export default KpiGrid
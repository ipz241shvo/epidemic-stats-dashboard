import KpiCard from './components/KpiCard'
import { kpiItems } from './data/mockData'

function App() {
  return (
    <main>
      <h1>Епідемстатистика</h1>
      <section className="kpi-grid">
        {kpiItems.map((item) => (
          <KpiCard
            key={item.id}
            title={item.title}
            value={item.value}
            change={item.change}
          />
        ))}
      </section>
    </main>
  )
}

export default App
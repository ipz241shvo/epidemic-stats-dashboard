import KpiCard from './components/KpiCard'
import Counter from './components/Counter'
import Toggle from './components/Toggle'
import FilteredList from './components/FilteredList'
import { countries, kpiItems } from './data/mockData'

function App() {
  return (
    <main>
      <h1>Епідемстатистика</h1>

      <Toggle title="Загальна статистика">
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
      </Toggle>

      <section>
        <Counter label="Вибрані країни" min={0} max={countries.length} />
      </section>

      <section>
        <FilteredList title="Країни" items={countries} />
      </section>
    </main>
  )
}

export default App
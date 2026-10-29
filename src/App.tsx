import Counter from './components/Counter'
import Toggle from './components/Toggle'
import FilteredList from './components/FilteredList'
import CountriesContainer from './containers/CountriesContainer'
import KpiContainer from './containers/KpiContainer'
import { countries } from './data/mockData'

function App() {
  return (
    <main>
      <h1>Епідемстатистика</h1>

      <Toggle title="Загальна статистика">
        <KpiContainer />
      </Toggle>

      <section>
        <Counter label="Днів історії" initialValue={30} min={7} max={90} />
      </section>

      <section>
        <h2>Таблиця країн</h2>
        <CountriesContainer />
      </section>

      <section>
        <FilteredList title="Країни" items={countries} />
      </section>
    </main>
  )
}

export default App
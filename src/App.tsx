import Counter from './components/Counter'
import Toggle from './components/Toggle'
import CountriesContainer from './containers/CountriesContainer'
import KpiContainer from './containers/KpiContainer'

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
    </main>
  )
}

export default App
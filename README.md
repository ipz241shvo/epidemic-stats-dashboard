# Епідемстатистика (Epidemic Stats Dashboard)

Навчальний аналітичний дашборд на React + TypeScript. Варіант 8: статистика COVID-19 на основі API [disease.sh](https://disease.sh).

## Стек

- React + TypeScript
- Vite
- React Router v7
- Zustand (глобальний стан)
- Recharts (графіки)
- Звичайний CSS (CSS-змінні для тем)

## Запуск

```bash
npm install
npm run dev
```

Після запуску відкрийте адресу з термінала (зазвичай `http://localhost:5173`).

Інші команди:

```bash
npm run build   # production-збірка
npm run lint    # перевірка ESLint
```

## Лабораторна робота 1: прості віджети

- `KpiCard`: картка показника (заголовок, значення, зміна), використана тричі з різними props
- `Counter`: лічильник з кнопками «+», «−», скидання та обмеженнями `min`/`max`
- `Toggle`: перемикач світлої/темної теми секції, містить вкладений вміст через `children` (у ЛР4 замінений глобальним `ThemeToggle`)
- `FilteredList`: список країн з фільтром за континентом

## Лабораторна робота 2: дані з API

Mock-дані замінено на реальні з disease.sh. Запити виконуються лише через `useEffect` при монтуванні контейнерів, результат зберігається в `useState`.

- `api/diseaseApi.ts`: запити до API (`/countries`, `/all`), без залежності від React
- `containers/CountriesContainer`: завантаження країн і стани loading / error / empty, передає дані в таблицю й список
- `containers/KpiContainer`: завантаження глобальної статистики, стани loading / error / empty
- `components/CountriesTable`: таблиця з 5 полями та сортуванням за кожним, з перемиканням напрямку (derived state через `useMemo`, сортується копія масиву)
- `components/StatusMessage`: єдине повідомлення для станів loading / error / empty
- `utils/kpi.ts`: розрахунок KPI-карток з реальних даних
- `utils/format.ts`: форматування чисел із захистом від відсутніх значень

Примітка: disease.sh більше не оновлює щоденні лічильники, тому зміна за день у KPI-картках дорівнює 0%.

## Лабораторна робота 3: форма фільтрів і власні хуки

Панель фільтрів на `react-hook-form`: три контрольовані поля (пошук за країною, континент, сортування), значення беруться зі стану форми через `Controller` (`value` + `onChange`). Кнопка «Скинути фільтри» повертає форму до початкових значень. (У ЛР5 `react-hook-form` прибрано, поля працюють напряму зі store.)

- `hooks/useDebounce.ts`: затримує значення на 400 мс, щоб пошук і запит не спрацьовували на кожне натискання клавіші
- `hooks/useFetch.ts`: приймає шлях запиту, повертає `{ data, loading, error }`, скасовує застарілі запити через `AbortController`
- `components/FiltersForm`: презентаційна форма фільтрів
- `components/KpiGrid`: презентаційна сітка KPI-карток
- `containers/DashboardContainer`: форма → debounce → `useFetch` → відфільтрована вибірка → таблиця, список і KPI
- `types/filters.ts`: тип фільтрів і значення за замовчуванням

Потік даних: поле `sort` після debounce потрапляє в запит `/countries?sort=...`, а пошук і континент застосовуються до отриманих даних як derived state. KPI рахуються сумою по відфільтрованих країнах (`sumCountries` → `buildKpiItems`), тому оновлюються разом з таблицею. У контейнері немає прямих `fetch` і таймерів, лише виклики хуків.

Зміни відносно ЛР2: `useEffect` із запитом винесено в `useFetch`, контейнери `CountriesContainer` і `KpiContainer` замінено одним `DashboardContainer`, функції `fetchCountries` і `fetchGlobal` видалено, у `diseaseApi.ts` лишився `getJson`.

## Лабораторна робота 4: маршрутизація та Context

Дашборд став багатосторінковим. Маршрути описані в `App.tsx` через React Router v7, спільна шапка рендериться в `Layout` з `<Outlet />`.

| Маршрут | Сторінка |
| --- | --- |
| `/` | `DashboardPage`: KPI, лічильник, фільтри, графік, таблиця й список |
| `/country/:code` | `CountryPage`: розширена інформація про країну |
| `*` | `NotFoundPage`: повідомлення «Сторінку не знайдено» |

**Дрілдаун.** Назва країни в `CountriesTable` є посиланням (`Link`) на `/country/:code`. Код береться з `countryInfo.iso2`, а якщо його немає (наприклад, круїзні лайнери), використовується назва країни. `CountryPage` читає код через `useParams` і завантажує деталі з `/countries/:code` через той самий `useFetch`. Ідентифікатор живе лише в URL, тому сторінку можна відкрити за посиланням і оновити без втрати стану.

**Сторінка деталей.** `CountryDetailsView` (презентаційний компонент) показує поля, яких немає в таблиці: населення, критичні випадки, тести, показники на 1 млн населення, дату оновлення. Є посилання «Назад» на головну.

**Неіснуючий код.** Якщо API повертає 404, `CountryPage` показує «Країну не знайдено». Невідомий URL (наприклад, `/qwerty`) обробляє маршрут `*`.

**Тема й фільтри через Context.** У ЛР4 тема жила в `ThemeContext`, а фільтри в `FiltersContext`, провайдери стояли вище за маршрути, щоб стан не губився при переході між сторінками. Усі кольори в `index.css` задані CSS-змінними, тому тема діє на всіх сторінках. У ЛР5 обидва контексти замінено Zustand-store (див. нижче), а локальний `Toggle` з ЛР1 видалено ще в ЛР4.

## Лабораторна робота 5: Zustand та графіки

Глобальний стан винесено в єдиний store на Zustand (`store/useDashboardStore.ts`): активні фільтри, список «обране», тема та тип графіка. `FiltersContext`, `ThemeContext` і `react-hook-form` прибрано, щоб один і той самий стан не жив у двох місцях. Кеш завантажених даних у store не переносився: `useFetch` достатньо.

- `store/useDashboardStore.ts`: стан і дії (`setFilter`, `resetFilters`, `toggleFavorite`, `toggleTheme`, `setChartType`), усі оновлення імутабельні (через `set` з новими об'єктами й масивами)
- `store/selectors.ts`: селектори, компоненти читають стан лише через них, а змінюють через дії store
- `components/FiltersForm`: контрольовані поля (`value` + `onChange`) напряму зі store
- `components/ThemeToggle`: перемикач теми, читає й змінює тему через store; клас `data-theme` на `<html>` виставляє `App.tsx`
- `components/FavoriteButton`: додає/прибирає країну з обраного, використана в таблиці й на сторінці деталей
- `components/MetricChart`: презентаційний графік на Recharts, тип (`bar` / `line`) і дані задаються через props
- `components/ChartTypeSwitch`: перемикач типу графіка
- `containers/ChartContainer`: бере відфільтрований список і метрику сортування, будує топ-10 країн, тип графіка читає зі store
- `utils/chart.ts`: `buildChartData`, чиста функція підготовки даних для графіка
- `utils/country.ts`: `getCountryCode`, єдине місце, де визначається код країни (для посилань і «обраного»)
- `types/chart.ts`: тип графіка й опції перемикача

Графік реагує на пошук, континент і сортування, бо будується з тієї ж відфільтрованої вибірки, що й таблиця та KPI. Обране відображається в таблиці та на сторінці деталей через один і той самий store. Локальні стани `Counter` і `FilteredList` залишено в компонентах: вони потрібні лише їм.

Потік даних: компонент викликає дію (`setFilter`) → store оновлюється через `set` → селектори віддають нове значення → підписані компоненти перемальовуються.

## Структура

```
src/
  api/          запити до API
  components/   презентаційні компоненти (Layout, ThemeToggle, MetricChart, FavoriteButton, ...)
  containers/   зв'язує хуки, store й компоненти (DashboardContainer, ChartContainer)
  hooks/        власні хуки (useDebounce, useFetch)
  pages/        сторінки-маршрути (DashboardPage, CountryPage, NotFoundPage)
  store/        глобальний стан (Zustand) і селектори
  types/        інтерфейси TypeScript
  utils/        чисті допоміжні функції
  App.tsx       опис маршрутів і застосування теми
  main.tsx      роутер
```
# Епідемстатистика (Epidemic Stats Dashboard)

Навчальний аналітичний дашборд на React + TypeScript. Варіант 8: статистика COVID-19 на основі API [disease.sh](https://disease.sh).

## Стек

- React + TypeScript
- Vite
- react-hook-form
- React Router v7
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

Панель фільтрів на `react-hook-form`: три контрольовані поля (пошук за країною, континент, сортування), значення беруться зі стану форми через `Controller` (`value` + `onChange`). Кнопка «Скинути фільтри» повертає форму до початкових значень.

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
| `/` | `DashboardPage`: KPI, лічильник, фільтри, таблиця й список |
| `/country/:code` | `CountryPage`: розширена інформація про країну |
| `*` | `NotFoundPage`: повідомлення «Сторінку не знайдено» |

**Дрілдаун.** Назва країни в `CountriesTable` є посиланням (`Link`) на `/country/:code`. Код береться з `countryInfo.iso2`, а якщо його немає (наприклад, круїзні лайнери), використовується назва країни. `CountryPage` читає код через `useParams` і завантажує деталі з `/countries/:code` через той самий `useFetch`. Ідентифікатор живе лише в URL, тому сторінку можна відкрити за посиланням і оновити без втрати стану.

**Сторінка деталей.** `CountryDetailsView` (презентаційний компонент) показує поля, яких немає в таблиці: населення, критичні випадки, тести, показники на 1 млн населення, дату оновлення. Є посилання «Назад» на головну.

**Неіснуючий код.** Якщо API повертає 404, `CountryPage` показує «Країну не знайдено». Невідомий URL (наприклад, `/qwerty`) обробляє маршрут `*`.

**Тема через Context.** `ThemeContext` зберігає поточну тему (`light` / `dark`) і функцію `toggleTheme`. `ThemeProvider` записує тему в `data-theme` на `<html>`, а всі кольори в `index.css` задані CSS-змінними, тому тема діє на всіх сторінках. Перемикач `ThemeToggle` стоїть у `Layout` і читає контекст через `useTheme`. Локальний `Toggle` з ЛР1 видалено.

**Фільтри через Context.** `FiltersContext` тримає `useForm` з ЛР3 і віддає `control`, `filters` та `resetFilters` через `useFilters`. Провайдер стоїть вище за маршрути, тому фільтри не скидаються при переході на деталі й назад, а `FiltersForm` і `DashboardContainer` більше не отримують їх через props.

Дерево провайдерів у `main.tsx`: `BrowserRouter` → `ThemeProvider` → `FiltersProvider` → `App`.

## Структура

```
src/
  api/          запити до API
  components/   презентаційні компоненти (Layout, ThemeToggle, CountryDetailsView, ...)
  containers/   зв'язує хуки, фільтри й компоненти
  context/      ThemeContext, FiltersContext (провайдер + хук)
  hooks/        власні хуки (useDebounce, useFetch)
  pages/        сторінки-маршрути (DashboardPage, CountryPage, NotFoundPage)
  types/        інтерфейси TypeScript
  utils/        чисті допоміжні функції
  App.tsx       опис маршрутів
  main.tsx      провайдери й роутер
```
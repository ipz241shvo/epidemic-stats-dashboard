# Епідемстатистика (Epidemic Stats Dashboard)

Навчальний аналітичний дашборд на React + TypeScript. Варіант 8: статистика COVID-19 на основі API [disease.sh](https://disease.sh).

## Стек

- React + TypeScript
- Vite
- react-hook-form
- Звичайний CSS

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
- `Toggle`: перемикач світлої/темної теми секції, містить вкладений вміст через `children`
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

## Структура

```
src/
  api/          запити до API
  components/   презентаційні компоненти
  containers/   зв'язує хуки, фільтри й компоненти
  hooks/        власні хуки (useDebounce, useFetch)
  types/        інтерфейси TypeScript
  utils/        чисті допоміжні функції
  App.tsx
  main.tsx
```
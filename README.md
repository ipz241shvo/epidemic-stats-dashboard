# Епідемстатистика (Epidemic Stats Dashboard)

Навчальний аналітичний дашборд на React + TypeScript. Варіант 8: статистика COVID-19 на основі API [disease.sh](https://disease.sh).

## Стек

- React + TypeScript
- Vite
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

Дані поки mock (`src/data/mockData.ts`), їхня структура повторює відповіді disease.sh.

- `KpiCard`: картка показника (заголовок, значення, зміна), використана тричі з різними props
- `Counter`: лічильник з кнопками «+», «−», скидання та обмеженнями `min`/`max`
- `Toggle`: перемикач світлої/темної теми секції, містить вкладений вміст через `children`
- `FilteredList`: список країн з фільтром за континентом

## Структура

```
src/
  components/   презентаційні компоненти
  data/         mock-дані
  types/        інтерфейси TypeScript
  App.tsx
  main.tsx
```
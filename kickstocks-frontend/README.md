# KickStocks — Frontend

AI-powered stock analysis platform frontend. React + Vite + Tailwind, talking to a FastAPI backend.

## Run it

```bash
npm install
npm run dev
```

Make sure the backend is running at the URL set in `.env` (defaults to `http://127.0.0.1:8000`).

## Status

This is the **foundation layer** only:
- Design tokens / theme (`tailwind.config.js`, `src/index.css`)
- Routing (`/`, `/analysis/:ticker?`, `/watchlist`)
- Layout shell (Navbar, Footer, PageContainer, ErrorBoundary)

Dashboard, Stock Analysis, and Watchlist pages are placeholder shells — built next.

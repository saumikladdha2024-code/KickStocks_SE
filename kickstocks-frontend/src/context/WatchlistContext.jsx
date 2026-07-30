import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { WATCHLIST_STORAGE_KEY } from "../utils/constants";

const WatchlistContext = createContext(null);

// Persists the watchlist (an ordered array of uppercase ticker strings) to
// localStorage. Tickers are the only thing stored here — enriched data
// (price, score, recommendation) is fetched live via useWatchlistData so the
// panel always reflects the current backend state, not stale cached values.
export function WatchlistProvider({ children }) {
  const [tickers, setTickers] = useState(() => {
    try {
      const raw = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(tickers));
    } catch {
      // localStorage unavailable (private browsing quota, etc.) — silently continue.
    }
  }, [tickers]);

  const add = useCallback((rawTicker) => {
    const ticker = rawTicker.trim().toUpperCase();
    if (!ticker) return;
    setTickers((prev) => (prev.includes(ticker) ? prev : [...prev, ticker]));
  }, []);

  const remove = useCallback((ticker) => {
    setTickers((prev) => prev.filter((t) => t !== ticker));
  }, []);

  const has = useCallback((ticker) => tickers.includes(ticker.toUpperCase()), [tickers]);

  return (
    <WatchlistContext.Provider value={{ tickers, add, remove, has }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlistContext() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlistContext must be used inside WatchlistProvider");
  return ctx;
}

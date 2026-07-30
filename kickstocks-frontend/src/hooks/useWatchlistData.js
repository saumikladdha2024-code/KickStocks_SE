import { useCallback, useEffect, useRef, useState } from "react";
import { getAnalysis } from "../api/analyze";

// Fetches live /analyze data for every ticker in the watchlist in parallel,
// then re-fetches whenever the ticker list changes (add/remove) or the caller
// requests a manual refresh. Each ticker tracks its own loading/error state
// independently so one failed request doesn't blank the whole panel.
export function useWatchlistData(tickers) {
  const [rows, setRows] = useState({});     // { [ticker]: { data, isLoading, error } }
  const fetchedRef = useRef(new Set());     // tracks which tickers have been fetched

  const fetchTicker = useCallback(async (ticker) => {
    setRows((prev) => ({
      ...prev,
      [ticker]: { data: prev[ticker]?.data ?? null, isLoading: true, error: null },
    }));
    try {
      const result = await getAnalysis(ticker);
      setRows((prev) => ({ ...prev, [ticker]: { data: result, isLoading: false, error: null } }));
    } catch (err) {
      setRows((prev) => ({
        ...prev,
        [ticker]: {
          data: null,
          isLoading: false,
          error: err.friendlyMessage || `Couldn't load ${ticker}.`,
        },
      }));
    }
  }, []);

  // When tickers array changes, fetch any that haven't been loaded yet.
  // Already-fetched tickers keep their existing data without a spinner.
  useEffect(() => {
    tickers.forEach((ticker) => {
    if (!fetchedRef.current.has(ticker)) {
        fetchTicker(ticker).then(() => {
        fetchedRef.current.add(ticker);
    });
  }
  });
    // Prune stale rows for tickers that were removed from the watchlist.
    setRows((prev) => {
      const next = {};
      tickers.forEach((t) => { if (prev[t]) next[t] = prev[t]; });
      return next;
    });
  }, [tickers, fetchTicker]);

  // Manual refresh — re-fetches all current tickers regardless of cache.
  const refresh = useCallback(() => {
    fetchedRef.current.clear();
    tickers.forEach((ticker) => {
      fetchedRef.current.add(ticker);
      fetchTicker(ticker);
    });
  }, [tickers, fetchTicker]);

  return { rows, refresh };
}

import { useCallback, useState } from "react";
import { getForecast } from "../api/forecast";

// Mirrors useAnalyze: imperative fetch so the user controls when it runs.
// Tracks activeTicker so a stale result never flashes between searches.
export function useForecast() {
  const [data, setData] = useState(null);       // { ticker, forecast: [{day, predicted_close}] }
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTicker, setActiveTicker] = useState(null);

  const forecast = useCallback(async (rawTicker) => {
    const ticker = rawTicker?.trim().toUpperCase();
    if (!ticker) return;

    setActiveTicker(ticker);
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await getForecast(ticker);
      setData(result);
    } catch (err) {
      setError(err.friendlyMessage || `Couldn't fetch forecast for ${ticker}.`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const retry = useCallback(() => {
    if (activeTicker) forecast(activeTicker);
  }, [activeTicker, forecast]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setActiveTicker(null);
  }, []);

  return { data, error, isLoading, activeTicker, forecast, retry, reset };
}

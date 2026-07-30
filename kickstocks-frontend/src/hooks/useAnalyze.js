import { useCallback, useState } from "react";
import { getAnalysis } from "../api/analyze";

export function useAnalyze() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTicker, setActiveTicker] = useState(null);

  const analyze = useCallback(async (rawTicker) => {
    const ticker = rawTicker?.trim().toUpperCase();
    if (!ticker) return;
    setActiveTicker(ticker);
    setIsLoading(true);
    setError(null);
    try {
      const result = await getAnalysis(ticker);
      setData(result);
    } catch (err) {
      setError(err.friendlyMessage || `Couldn't analyze ${ticker}.`);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const retry = useCallback(() => {
    if (activeTicker) analyze(activeTicker);
  }, [activeTicker, analyze]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setActiveTicker(null);
  }, []);

  return { data, error, isLoading, activeTicker, analyze, retry, reset };
}
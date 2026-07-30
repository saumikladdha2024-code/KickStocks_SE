import { useCallback, useEffect, useState } from "react";
import { getHistory } from "../api/history";

// Drives PriceChart. Refetches whenever ticker or period changes — switching
// timeframe (1D/5D/1M/3M/6M/1Y) always pulls fresh data from the backend,
// never reslices a previously-fetched range on the client.
export function useHistory(ticker, period) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    if (!ticker) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getHistory(ticker, period);
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(
        err.friendlyMessage || `Couldn't load price history for ${ticker}.`
      );
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [ticker, period]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchHistory,
  };
}
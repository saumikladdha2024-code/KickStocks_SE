import { useCallback, useEffect, useState } from "react";
import { getScanner } from "../api/scanner";

// Fetches GET /scanner and exposes loading/error/data + a refetch() for the
// dashboard's retry button. Every dashboard section reads from this single hook
// so they all stay in sync on one request.
export function useScanner() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScanner = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getScanner();
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(err.friendlyMessage || "Something went wrong fetching the scanner.");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScanner();
  }, [fetchScanner]);

  return { data, isLoading, error, refetch: fetchScanner };
}
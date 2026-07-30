import { apiClient } from "./client";

// GET /history/{ticker}?period=1d|5d|1mo|3mo|6mo|1y
export async function getHistory(ticker, period = "1mo") {
  const { data } = await apiClient.get(`/history/${ticker}`, {
    params: { period },
  });

  return data;
}
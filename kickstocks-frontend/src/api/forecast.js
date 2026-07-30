import { apiClient } from "./client";

// GET /forecast/{ticker}
// Response: { ticker, forecast: [{ day, predicted_close }] }
export async function getForecast(ticker) {
  const { data } = await apiClient.get(`/forecast/${ticker}`);
  return data;
}

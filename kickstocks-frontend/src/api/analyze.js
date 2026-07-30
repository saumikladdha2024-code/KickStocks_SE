import { apiClient } from "./client";

// GET /analyze/{ticker} — single-ticker deep analysis.
export async function getAnalysis(ticker) {
  const { data } = await apiClient.get(`/analyze/${ticker}`);
  return data;
}
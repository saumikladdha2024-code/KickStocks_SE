import { apiClient } from "./client";

// GET /scanner — full ranked list of scanned tickers.
// Returns the raw array exactly as the backend sends it; shape is:
// [{ ticker, technical_score, news_sentiment, ml_prediction, up_probability, final_score, recommendation }]
export async function getScanner() {
  const { data } = await apiClient.get("/scanner");
  return data;
}
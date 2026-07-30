// UI-only display names — the backend only returns tickers.
// Falls back to the raw ticker if it isn't in this map.
const TICKER_NAMES = {
  AAPL: "Apple Inc.",
  MSFT: "Microsoft Corp.",
  GOOGL: "Alphabet Inc.",
  AMZN: "Amazon.com Inc.",
  TSLA: "Tesla Inc.",
  NVDA: "NVIDIA Corp.",
  META: "Meta Platforms",
  NFLX: "Netflix Inc.",
  AMD: "Advanced Micro Devices",
  INTC: "Intel Corp.",
  JPM: "JPMorgan Chase",
  V: "Visa Inc.",
};

export function getCompanyName(ticker) {
  return TICKER_NAMES[ticker] || ticker;
}
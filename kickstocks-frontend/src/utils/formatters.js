// Small, focused formatting helpers used across score cards, tables, and charts.

export function formatScore(value, decimals = 0) {
  if (value === null || value === undefined) return "—";
  return Number(value).toFixed(decimals);
}

export function formatPercent(value, decimals = 0) {
  if (value === null || value === undefined) return "—";
  return `${Number(value).toFixed(decimals)}%`;
}

// News sentiment is a small signed float (e.g. -0.028, 0.41) — show the sign explicitly,
// since "+0.12" vs "0.12" is the difference between bullish and ambiguous at a glance.
export function formatSentiment(value, decimals = 2) {
  if (value === null || value === undefined) return "—";
  const num = Number(value);
  const sign = num > 0 ? "+" : "";
  return `${sign}${num.toFixed(decimals)}`;
}

export function isValidTicker(value) {
  return /^[A-Za-z.^]{1,12}$/.test(value.trim());
}

export function formatCurrency(value, currency = "USD", decimals = 2) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(value));
}

export function getCurrencyForTicker(ticker) {
  if (!ticker) return "USD";

  if (
    ticker.endsWith(".NS") ||
    ticker === "^NSEI" ||
    ticker === "^BSESN" ||
    ticker === "^NSEBANK"
  ) {
    return "INR";
  }

  return "USD";
}

export function formatLargeNumber(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value));
}

export function formatChangePercent(value, decimals = 2) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "—";
  }

  const num = Number(value);
  const sign = num >= 0 ? "+" : "";

  return `${sign}${num.toFixed(decimals)}%`;
}
// Central app constants — pulled from env so prod deploys just swap the API URL.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const RECOMMENDATION = {
  BUY: "BUY",
  HOLD: "HOLD",
  SELL: "SELL",
};

export const NAV_LINKS = [
  { label: "Dashboard", to: "/" },
  { label: "Analysis", to: "/analysis" },
  { label: "Forecast", to: "/forecast" },
  { label: "Watchlist", to: "/watchlist" },
];

export const WATCHLIST_STORAGE_KEY = "kickstocks_watchlist"; 
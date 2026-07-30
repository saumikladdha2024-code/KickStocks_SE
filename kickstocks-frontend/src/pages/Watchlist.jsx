import { AnimatePresence } from "framer-motion";
import AddTickerInput from "../components/watchlist/AddTickerInput";
import EmptyWatchlist from "../components/watchlist/EmptyWatchlist";
import WatchlistTable from "../components/watchlist/WatchlistTable";
import WatchlistCard from "../components/watchlist/WatchlistCard";
import { useWatchlist } from "../hooks/useWatchlist";
import { useWatchlistData } from "../hooks/useWatchlistData";

export default function Watchlist() {
  const { tickers, add, remove } = useWatchlist();
  const { rows, refresh } = useWatchlistData(tickers);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-2xl font-semibold text-ink-primary">Watchlist</h1>
        <p className="text-sm text-ink-secondary">
          Track tickers and get live AI scores, prices, and recommendations at a glance.
        </p>
      </div>

      <div className="panel p-4 sm:p-5">
        <AddTickerInput onAdd={add} existingTickers={tickers} />
      </div>

      {tickers.length > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-ink-muted">{tickers.length} {tickers.length === 1 ? "stock" : "stocks"} tracked</span>
          <button
            onClick={refresh}
            className="flex items-center gap-1.5 rounded-sm border border-base-border bg-base-panel px-3 py-1.5 text-xs font-medium text-ink-secondary transition-colors duration-250 hover:border-accent/40 hover:text-accent"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 12a9 9 0 0 1-15 6.7L3 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Refresh all
          </button>
        </div>
      )}

      <AnimatePresence initial={false} mode="wait">
        {tickers.length === 0 ? (
          <EmptyWatchlist key="empty" />
        ) : (
          <div key="populated" className="flex flex-col gap-4">
            {/* Table on md+, cards on mobile */}
            <div className="hidden md:block">
              <WatchlistTable tickers={tickers} rows={rows} onRemove={remove} />
            </div>
            <div className="flex flex-col gap-3 md:hidden">
              {tickers.map((ticker) => (
                <WatchlistCard
                  key={ticker}
                  ticker={ticker}
                  row={rows[ticker] ?? { data: null, isLoading: true, error: null }}
                  onRemove={remove}
                />
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
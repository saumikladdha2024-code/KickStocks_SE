import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import RecommendationBadge from "../common/RecommendationBadge";
import { SkeletonBlock } from "../common/Skeleton";
import { getScoreTextClass } from "../../utils/scoreColors";
import { formatCurrency, formatChangePercent } from "../../utils/formatters";

function SkeletonRow({ ticker }) {
  return (
    <tr className="border-b border-base-border/60">
      <td className="px-4 py-3.5">
        <div className="flex flex-col gap-1.5">
          <SkeletonBlock className="h-4 w-12" />
          <SkeletonBlock className="h-3 w-24" />
        </div>
      </td>
      <td className="px-4 py-3.5"><SkeletonBlock className="h-6 w-14 rounded-full" /></td>
      <td className="px-4 py-3.5"><SkeletonBlock className="h-4 w-16" /></td>
      <td className="px-4 py-3.5"><SkeletonBlock className="h-4 w-16" /></td>
      <td className="px-4 py-3.5"><SkeletonBlock className="h-4 w-14" /></td>
      <td className="px-4 py-3.5"><SkeletonBlock className="h-7 w-16 rounded-sm" /></td>
    </tr>
  );
}

function DataRow({ ticker, row, onRemove }) {
  const { data, isLoading, error } = row;

  if (isLoading) return <SkeletonRow ticker={ticker} />;

  const changePositive = (data?.daily_change_percent ?? 0) >= 0;
  const changeClass = changePositive ? "text-bull-text" : "text-bear-text";

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="border-b border-base-border/60 transition-colors duration-250 last:border-0 hover:bg-base-raised/50"
    >
      <td className="px-4 py-3.5">
        <Link to={`/analysis/${ticker}`} className="group flex flex-col">
          <span className="font-tabular text-sm font-semibold text-ink-primary transition-colors duration-250 group-hover:text-accent">
            {ticker}
          </span>
          <span className="text-2xs text-ink-muted">
            {data?.company_name ?? ticker}
          </span>
        </Link>
      </td>

      <td className="px-4 py-3.5">
        {error ? (
          <span className="text-xs text-bear-text">Error</span>
        ) : data?.recommendation ? (
          <RecommendationBadge recommendation={data.recommendation} size="sm" />
        ) : (
          <span className="text-xs text-ink-muted">—</span>
        )}
      </td>

      <td className="px-4 py-3.5">
        <span className={`font-tabular text-sm font-semibold ${data?.final_score != null ? getScoreTextClass(data.final_score) : "text-ink-muted"}`}>
          {data?.final_score != null ? `${Math.round(data.final_score)}/100` : "—"}
        </span>
      </td>

      <td className="px-4 py-3.5">
        <span className="font-tabular text-sm text-ink-primary">
          {data?.current_price != null ? formatCurrency(data.current_price) : "—"}
        </span>
      </td>

      <td className="px-4 py-3.5">
        <span className={`font-tabular text-sm font-semibold ${changeClass}`}>
          {data?.daily_change_percent != null
            ? formatChangePercent(data.daily_change_percent)
            : "—"}
        </span>
      </td>

      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <Link
            to={`/analysis/${ticker}`}
            className="rounded-sm border border-base-border bg-base-raised px-3 py-1.5 text-xs font-medium text-ink-primary transition-colors duration-250 hover:border-accent/40 hover:text-accent"
          >
            Analyze
          </Link>
          <button
            onClick={() => onRemove(ticker)}
            aria-label={`Remove ${ticker} from watchlist`}
            className="rounded-sm p-1.5 text-ink-muted transition-colors duration-250 hover:bg-base-raised hover:text-bear-text"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

// Desktop/tablet table. Hidden below md breakpoint; WatchlistCard takes over.
const COLUMNS = ["Ticker", "Call", "AI Score", "Price", "Change", "Actions"];

export default function WatchlistTable({ tickers, rows, onRemove }) {
  return (
    <div className="panel overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse">
        <thead>
          <tr className="border-b border-base-border bg-base-raised/40 text-left">
            {COLUMNS.map((col) => (
              <th key={col} className="px-4 py-3 text-2xs font-semibold uppercase tracking-wide text-ink-muted">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence initial={false}>
            {tickers.map((ticker) => (
              <DataRow
                key={ticker}
                ticker={ticker}
                row={rows[ticker] ?? { data: null, isLoading: true, error: null }}
                onRemove={onRemove}
              />
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
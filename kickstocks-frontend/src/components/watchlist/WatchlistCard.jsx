import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RecommendationBadge from "../common/RecommendationBadge";
import { SkeletonBlock } from "../common/Skeleton";
import { getScoreTextClass } from "../../utils/scoreColors";
import { formatCurrency, formatChangePercent } from "../../utils/formatters";

// Mobile card layout — swaps in below the md breakpoint where the table
// becomes too wide to be comfortable. Mirrors the same data columns as
// WatchlistTable so both views are always in sync.
export function WatchlistCardSkeleton({ ticker }) {
  return (
    <div className="panel flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <SkeletonBlock className="h-5 w-14" />
          <SkeletonBlock className="h-3 w-24" />
        </div>
        <SkeletonBlock className="h-6 w-14 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <SkeletonBlock className="h-8 rounded" />
        <SkeletonBlock className="h-8 rounded" />
        <SkeletonBlock className="h-8 rounded" />
      </div>
    </div>
  );
}

export default function WatchlistCard({ ticker, row, onRemove }) {
  const { data, isLoading, error } = row;

  if (isLoading) return <WatchlistCardSkeleton ticker={ticker} />;

  if (error) {
    return (
      <div className="panel flex items-center justify-between gap-3 p-4">
        <div>
          <p className="font-tabular text-sm font-semibold text-ink-primary">{ticker}</p>
          <p className="mt-0.5 text-xs text-bear-text">{error}</p>
        </div>
        <button
          onClick={() => onRemove(ticker)}
          aria-label={`Remove ${ticker}`}
          className="rounded-sm p-1.5 text-ink-muted transition-colors hover:bg-base-raised hover:text-bear-text"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    );
  }

  const changePositive = (data?.daily_change_percent ?? 0) >= 0;
  const changeClass = changePositive ? "text-bull-text" : "text-bear-text";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="panel panel-hover flex flex-col gap-3 p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <Link to={`/analysis/${ticker}`} className="flex flex-col group">
          <span className="font-tabular text-sm font-semibold text-ink-primary group-hover:text-accent transition-colors duration-250">
            {ticker}
          </span>
          <span className="text-2xs text-ink-muted">
            {data?.company_name ?? ticker}
          </span>
        </Link>
        <div className="flex items-center gap-1.5">
          {data?.recommendation && (
            <RecommendationBadge recommendation={data.recommendation} size="sm" />
          )}
          <button
            onClick={() => onRemove(ticker)}
            aria-label={`Remove ${ticker} from watchlist`}
            className="rounded-sm p-1 text-ink-muted transition-colors duration-250 hover:bg-base-raised hover:text-bear-text"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-base-border pt-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-2xs uppercase tracking-wide text-ink-muted">Price</span>
          <span className="font-tabular text-sm font-semibold text-ink-primary">
            {data?.current_price != null ? formatCurrency(data.current_price) : "—"}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-2xs uppercase tracking-wide text-ink-muted">Change</span>
          <span className={`font-tabular text-sm font-semibold ${changeClass}`}>
            {data?.daily_change_percent != null
              ? formatChangePercent(data.daily_change_percent)
              : "—"}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-2xs uppercase tracking-wide text-ink-muted">AI Score</span>
          <span className={`font-tabular text-sm font-semibold ${data?.final_score != null ? getScoreTextClass(data.final_score) : "text-ink-muted"}`}>
            {data?.final_score != null ? `${Math.round(data.final_score)}/100` : "—"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
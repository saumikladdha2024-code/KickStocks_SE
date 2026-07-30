import { motion } from "framer-motion";

// Shown when the watchlist has zero tickers. Uses a bookmark icon to
// reinforce the "save stocks here" concept without a wall of text.
export default function EmptyWatchlist() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="panel flex flex-col items-center gap-4 py-16 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-base-raised text-ink-muted">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="font-display text-base font-semibold text-ink-primary">Your watchlist is empty</p>
        <p className="max-w-xs text-sm leading-relaxed text-ink-secondary">
          Add tickers above to track their AI scores, prices, and recommendations at a glance.
        </p>
      </div>
    </motion.div>
  );
}
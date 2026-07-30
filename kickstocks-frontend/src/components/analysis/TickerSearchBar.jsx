import { useState } from "react";
import { motion } from "framer-motion";
import { isValidTicker } from "../../utils/formatters";

export default function TickerSearchBar({ onAnalyze, isLoading, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  const trimmed = value.trim();
  const showInvalid = touched && trimmed.length > 0 && !isValidTicker(trimmed);

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!trimmed || !isValidTicker(trimmed)) return;
    onAnalyze(trimmed.toUpperCase());
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
      <div className="flex-1">
        <motion.div
          className="relative"
          initial={false}
          animate={showInvalid ? { x: [0, -6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.35 }}
        >
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (touched) setTouched(false);
            }}
            placeholder="Enter a ticker — e.g. AAPL, NVDA, TSLA"
            aria-label="Stock ticker"
            className={`w-full rounded-sm border bg-base-panel py-3.5 pl-11 pr-4 font-tabular text-base text-ink-primary placeholder:text-ink-muted focus:outline-none focus:ring-1 transition-colors duration-250 ${
              showInvalid ? "border-bear/50 focus:ring-bear/60" : "border-base-border focus:ring-accent/60 focus:border-accent/40"
            }`}
          />
        </motion.div>
        {showInvalid && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-xs text-bear-text">
            Enter a valid ticker symbol (letters only, up to 6 characters).
          </motion.p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileTap={{ scale: 0.97 }}
        className="shrink-0 rounded-sm bg-accent px-7 py-3.5 text-sm font-semibold text-base transition-colors duration-250 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Analyzing…" : "Analyze"}
      </motion.button>
    </form>
  );
}
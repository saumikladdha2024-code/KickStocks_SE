import { useState } from "react";
import { motion } from "framer-motion";
import { isValidTicker } from "../../utils/formatters";

// Controlled input for adding a ticker. Shakes + shows inline validation on
// bad input — same UX pattern as TickerSearchBar on the Analysis page.
export default function AddTickerInput({ onAdd, existingTickers }) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const trimmed = value.trim().toUpperCase();
  const isDuplicate = existingTickers.includes(trimmed);
  const isInvalid = touched && trimmed.length > 0 && !isValidTicker(trimmed);
  const showError = isInvalid || (touched && isDuplicate);
  const errorMsg = isDuplicate
    ? `${trimmed} is already on your watchlist.`
    : "Enter a valid ticker symbol (letters only, up to 6 characters).";

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!trimmed || !isValidTicker(trimmed) || isDuplicate) return;
    onAdd(trimmed);
    setValue("");
    setTouched(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-2">
      <div className="flex-1">
        <motion.div
          className="relative"
          animate={showError ? { x: [0, -5, 5, -3, 3, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={value}
            onChange={(e) => {
                const next = e.target.value
                .toUpperCase()
                .replace(/[^A-Z.]/g, "");
                setValue(next);
                if (touched) {
                    setTouched(false);
                }
            }}
            placeholder="Add ticker — e.g. AAPL"
            aria-label="Ticker symbol to add"
            className={`w-full rounded-sm border bg-base-panel py-2.5 pl-9 pr-3 font-tabular text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:ring-1 transition-colors duration-250 ${
              showError
                ? "border-bear/50 focus:ring-bear/40"
                : "border-base-border focus:border-accent/40 focus:ring-accent/40"
            }`}
          />
        </motion.div>
        {showError && (
          <motion.p
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-2xs text-bear-text"
          >
            {errorMsg}
          </motion.p>
        )}
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-base transition-colors duration-250 hover:bg-accent-hover"
      >
        Add
      </button>
    </form>
  );
}
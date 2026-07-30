import { motion } from "framer-motion";
import {
  formatCurrency,
  getCurrencyForTicker,
} from "../../utils/formatters";

function TrendArrow({ positive }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10" fill="none"
      aria-hidden="true"
      className={`shrink-0 ${positive ? "text-bull-text" : "text-bear-text"}`}
    >
      {positive ? (
        <path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M5 2v6M2 5l3 3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default function ForecastTable({
  ticker,
  forecast,
})
{
  const baseline = forecast[0].predicted_close;

  const currency = getCurrencyForTicker(ticker);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="flex flex-col gap-4"
    >
      <h2 className="font-display text-lg font-semibold text-ink-primary">Daily Breakdown</h2>

      <div className="panel overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-base-border bg-base-raised/40 text-left">
              <th className="px-4 py-3 text-2xs font-semibold uppercase tracking-wide text-ink-muted">Day</th>
              <th className="px-4 py-3 text-2xs font-semibold uppercase tracking-wide text-ink-muted">Label</th>
              <th className="px-4 py-3 text-2xs font-semibold uppercase tracking-wide text-ink-muted">Predicted Close</th>
              <th className="px-4 py-3 text-2xs font-semibold uppercase tracking-wide text-ink-muted">vs Day 1</th>
              <th className="px-4 py-3 text-2xs font-semibold uppercase tracking-wide text-ink-muted">Change</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((row, i) => {
              const delta = row.predicted_close - baseline;
              const deltaPct = baseline !== 0 ? (delta / baseline) * 100 : 0;
              const positive = delta >= 0;
              const changeClass = positive ? "text-bull-text" : "text-bear-text";
              const isFirst = i === 0;

              return (
                <tr
                  key={row.day}
                  className={`border-b border-base-border/60 transition-colors duration-250 last:border-0 hover:bg-base-raised/50 ${
                    isFirst ? "bg-accent-soft/30" : ""
                  }`}
                >
                  <td className="px-4 py-3.5">
                    <span className={`font-tabular text-sm font-semibold ${isFirst ? "text-accent" : "text-ink-muted"}`}>
                      {row.day}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-ink-secondary">
                      {isFirst ? "Tomorrow" : `Day ${row.day}`}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-tabular text-sm font-semibold text-ink-primary">
                      {formatCurrency(row.predicted_close, currency)}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {isFirst ? (
                      <span className="text-xs text-ink-muted">—</span>
                    ) : (
                      <span className={`font-tabular text-sm font-semibold ${changeClass}`}>
                        {delta >= 0 ? "+" : ""}{formatCurrency(Math.abs(delta), currency)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    {isFirst ? (
                      <span className="text-xs text-ink-muted">baseline</span>
                    ) : (
                      <span className={`inline-flex items-center gap-1 font-tabular text-sm font-semibold ${changeClass}`}>
                        <TrendArrow positive={positive} />
                        {Math.abs(deltaPct).toFixed(2)}%
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
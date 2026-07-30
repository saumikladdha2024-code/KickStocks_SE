import { motion } from "framer-motion";
import AnimatedNumber from "../common/AnimatedNumber";
import {
  formatCurrency,
  getCurrencyForTicker,
} from "../../utils/formatters";

// Shows the ticker and the Day 1 prediction prominently — the single most
// important number on the page. Trend arrow derived from Day 1 vs Day 10.
export default function ForecastHero({ ticker, forecast }) {
  const day1 = forecast[0];
  const day10 = forecast[forecast.length - 1];
  const trend = day10.predicted_close >= day1.predicted_close ? "up" : "down";
  const trendColor = trend === "up" ? "#00C875" : "#FF4D5E";
  const trendBg = trend === "up" ? "bg-bull-soft border-bull/30" : "bg-bear-soft border-bear/30";
  const trendText = trend === "up" ? "text-bull-text" : "text-bear-text";
  const arrow = trend === "up" ? "↑" : "↓";

  const delta = day10.predicted_close - day1.predicted_close;
  const deltaSign = delta >= 0 ? "+" : "";

  const currency = getCurrencyForTicker(ticker);
  const currencySymbol = currency === "INR" ? "₹" : "$";

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`panel flex flex-col gap-5 overflow-hidden border p-6 sm:flex-row sm:items-center sm:justify-between ${trendBg}`}
    >
      {/* Left: ticker + day-1 price */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h2 className="font-tabular font-display text-3xl font-semibold text-ink-primary sm:text-4xl">
            {ticker}
          </h2>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${trendBg} ${trendText}`}
          >
            <span aria-hidden="true">{arrow}</span>
            10-Day Forecast
          </span>
        </div>
        <p className="text-sm text-ink-secondary">Tomorrow's Kickstock's-predicted closing price</p>
        <AnimatedNumber
        value={day1.predicted_close}
        prefix={currencySymbol}
        decimals={2}
        className="text-4xl font-semibold text-ink-primary sm:text-5xl"
        />
      </div>

      {/* Right: 10-day range summary */}
      <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
        <p className="text-2xs uppercase tracking-wide text-ink-muted">10-Day Range</p>
        <div className="flex items-baseline gap-2">
          <span className="font-tabular text-sm text-ink-secondary">Day 10:</span>
          <span className={`font-tabular text-lg font-semibold ${trendText}`}>
            {formatCurrency(day10.predicted_close, currency)}
          </span>
        </div>
        <span className={`font-tabular text-sm font-semibold ${trendText}`}>
          {arrow} {deltaSign}
          {formatCurrency(Math.abs(delta), currency)}
        </span>
        <p className="text-2xs text-ink-muted">
          AI model predictions · not financial advice
        </p>
      </div>
    </motion.section>
  );
}

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory } from "../../hooks/useHistory";
import { SkeletonBlock } from "../common/Skeleton";
import { formatCurrency, formatLargeNumber } from "../../utils/formatters";

const TIMEFRAMES = [
  { label: "1D", period: "1d" },
  { label: "5D", period: "5d" },
  { label: "1M", period: "1mo" },
  { label: "3M", period: "3mo" },
  { label: "6M", period: "6mo" },
  { label: "1Y", period: "1y" },
];

function formatAxisDate(dateStr, period) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  if (period === "1d") {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

function ChartTooltip({ active, payload, currency }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  const d = new Date(point.date);
  const dateLabel = Number.isNaN(d.getTime()) ? point.date : d.toLocaleString();

  return (
    <div className="panel px-3 py-2 text-xs shadow-card-hover">
      <p className="mb-1.5 font-medium text-ink-primary">{dateLabel}</p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 font-tabular text-ink-secondary">
        <span>O <span className="text-ink-primary">{formatCurrency(point.open, currency)}</span></span>
        <span>H <span className="text-ink-primary">{formatCurrency(point.high, currency)}</span></span>
        <span>L <span className="text-ink-primary">{formatCurrency(point.low, currency)}</span></span>
        <span>C <span className="text-ink-primary">{formatCurrency(point.close, currency)}</span></span>
      </div>
      <p className="mt-1 font-tabular text-ink-secondary">
        Vol <span className="text-ink-primary">{formatLargeNumber(point.volume)}</span>
      </p>
    </div>
  );
}

// Live historical price chart — every point comes from GET /history/{ticker}.
// No simulated or forecasted data is ever drawn here; switching timeframe
// always re-fetches from the backend rather than reslicing cached data.
export default function PriceChart({ ticker, currency = "USD" }) {
  const [period, setPeriod] = useState("1mo");
  const { data, isLoading, error, refetch } = useHistory(ticker, period);

  const isUp = data.length > 1 && data[data.length - 1].close >= data[0].close;
  const lineColor = isUp ? "#00C875" : "#FF4D5E";

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-lg font-semibold text-ink-primary">Price History</h2>
        <div className="flex items-center gap-1 rounded-sm border border-base-border bg-base-panel p-1">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.period}
              onClick={() => setPeriod(tf.period)}
              aria-pressed={period === tf.period}
              className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors duration-250 ${
                period === tf.period
                  ? "bg-accent text-base"
                  : "text-ink-secondary hover:text-ink-primary hover:bg-base-raised"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="panel relative h-80 p-4">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-4">
              <SkeletonBlock className="h-full w-full rounded-lg" />
            </motion.div>
          )}

          {!isLoading && error && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="max-w-sm text-sm text-ink-secondary">{error}</p>
              <button onClick={refetch} className="rounded-sm border border-base-border bg-base-raised px-4 py-2 text-sm font-medium text-ink-primary transition-colors duration-250 hover:border-accent/40 hover:text-accent">
                Retry
              </button>
            </motion.div>
          )}

          {!isLoading && !error && data.length === 0 && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full items-center justify-center">
              <p className="text-sm text-ink-muted">No price history available for this period.</p>
            </motion.div>
          )}

          {!isLoading && !error && data.length > 0 && (
            <motion.div key={period} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={lineColor} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#1F2730" strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={(d) => formatAxisDate(d, period)} tick={{ fill: "#8B98A9", fontSize: 11 }} axisLine={{ stroke: "#1F2730" }} tickLine={false} minTickGap={32} />
                  <YAxis domain={["auto", "auto"]} tick={{ fill: "#8B98A9", fontSize: 11 }} axisLine={false} tickLine={false} width={56} tickFormatter={(v) => formatCurrency(v, currency, 0)} />
                  <Tooltip content={<ChartTooltip currency={currency} />} cursor={{ stroke: "#2A333E" }} />
                  <Area type="monotone" dataKey="close" stroke={lineColor} strokeWidth={2} fill="url(#priceFill)" isAnimationActive animationDuration={700} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
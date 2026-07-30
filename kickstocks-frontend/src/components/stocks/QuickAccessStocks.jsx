import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CompanyLogo from "../analysis/CompanyLogo";
import { POPULAR_STOCKS } from "../../utils/popularStocks";

const POPULAR = [
  POPULAR_STOCKS.us[0],      // Apple
  POPULAR_STOCKS.us[2],      // NVIDIA
  POPULAR_STOCKS.us[1],      // Microsoft
  POPULAR_STOCKS.india[0],   // Reliance
  POPULAR_STOCKS.india[5],   // SBI
  POPULAR_STOCKS.india[1],   // TCS
];

function StockCard({ stock, onSelect }) {
  const exchange = stock.ticker.includes(".NS")
    ? "NSE"
    : stock.ticker.startsWith("^")
    ? "INDEX"
    : "NASDAQ";

  return (
    <motion.button
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(stock.ticker)}
      className="panel group flex flex-col items-center rounded-xl border border-base-border p-5 transition-all duration-300 hover:border-accent hover:shadow-lg"
    >
      <CompanyLogo ticker={stock.ticker} size={52} />

      <h3 className="mt-4 text-center font-display text-base font-semibold text-ink-primary">
        {stock.name}
      </h3>

      <p className="mt-1 font-tabular text-sm text-ink-secondary">
        {stock.ticker}
      </p>

      <span className="mt-3 rounded-full bg-base-raised px-3 py-1 text-xs text-ink-muted">
        {exchange}
      </span>

      <span className="mt-4 text-sm font-semibold text-accent transition-transform duration-300 group-hover:translate-x-1">
        Open →
      </span>
    </motion.button>
  );
}

function Section({ title, stocks, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="panel rounded-xl p-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between"
      >
        <h2 className="font-display text-lg font-semibold text-ink-primary">
          {title}
        </h2>

        <span className="text-xl text-ink-muted">
          {open ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {stocks.map((stock) => (
                <StockCard
                  key={stock.ticker}
                  stock={stock}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QuickAccessStocks({ onSelect }) {
  return (
    <div className="flex flex-col gap-8">

      <div>
        <h2 className="mb-5 font-display text-xl font-semibold text-ink-primary">
          ⭐ Popular Stocks
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR.map((stock) => (
            <StockCard
              key={stock.ticker}
              stock={stock}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      <Section
        title="🇺🇸 US Stocks"
        stocks={POPULAR_STOCKS.us}
        onSelect={onSelect}
      />

      <Section
        title="🇮🇳 Indian Stocks"
        stocks={POPULAR_STOCKS.india}
        onSelect={onSelect}
      />

      <Section
        title="📈 Market Indices"
        stocks={POPULAR_STOCKS.indices}
        onSelect={onSelect}
      />

    </div>
  );
}
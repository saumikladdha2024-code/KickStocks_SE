import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ForecastSearchBar from "../components/forecast/ForecastSearchBar";
import ForecastHero from "../components/forecast/ForecastHero";
import ForecastChart from "../components/forecast/ForecastChart";
import ForecastTable from "../components/forecast/ForecastTable";
import ForecastCommentary from "../components/forecast/ForecastCommentary";
import ForecastSkeleton from "../components/forecast/ForecastSkeleton";
import EmptyState from "../components/common/EmptyState";
import { useForecast } from "../hooks/useForecast";
import QuickAccessStocks from "../components/stocks/QuickAccessStocks";

// /forecast and /forecast/:ticker — uses the same route-param deep-linking
// pattern as StockAnalysis so users can share forecast URLs directly.
export default function Forecast() {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading, activeTicker, forecast, retry } = useForecast();

  useEffect(() => {
    if (ticker) forecast(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  function handleForecast(symbol) {
    navigate(`/forecast/${symbol}`, { replace: true });
  }

  const hasSearched = isLoading || !!data || !!error;

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-semibold text-ink-primary">AI Price Forecast</h1>
        <p className="text-sm text-ink-secondary">
          10-day recursive ML forecast — enter any ticker to see the model's predicted closing prices.
        </p>
      </div>

      <ForecastSearchBar onForecast={handleForecast} isLoading={isLoading} initialValue={ticker || ""} />

      <AnimatePresence mode="wait">
        {/* Idle — nothing searched yet */}
        {!hasSearched && (
            <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-8"
        >
            <EmptyState
            title="Search a ticker or explore popular stocks"
            message="Use the search above or click any stock below to instantly generate a 10-day forecast."
            />
            
        <QuickAccessStocks onSelect={handleForecast} />
        </motion.div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ForecastSkeleton />
          </motion.div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 py-14 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bear-soft text-bear-text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="font-display text-lg font-semibold text-ink-primary">
              Couldn't fetch forecast for {activeTicker}
            </p>
            <p className="max-w-md text-sm text-ink-secondary">{error}</p>
            <button
              onClick={retry}
              className="mt-1 rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-base transition-colors duration-250 hover:bg-accent-hover"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Result */}
        {!isLoading && !error && data && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <ForecastHero ticker={data.ticker} forecast={data.forecast} />
            <ForecastChart forecast={data.forecast} />
            <ForecastTable
            ticker={data.ticker}
            forecast={data.forecast}
            />
            <ForecastCommentary ticker={data.ticker} forecast={data.forecast} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
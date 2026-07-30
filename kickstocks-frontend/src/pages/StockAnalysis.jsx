import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import TickerSearchBar from "../components/analysis/TickerSearchBar";
import RecommendationBanner from "../components/analysis/RecommendationBanner";
import PriceChart from "../components/analysis/PriceChart";
import TechnicalScoreCard from "../components/analysis/TechnicalScoreCard";
import SentimentScoreCard from "../components/analysis/SentimentScoreCard";
import MLPredictionCard from "../components/analysis/MLPredictionCard";
import ConfidenceGauge from "../components/analysis/ConfidenceGauge";
import AIExplanationCard from "../components/analysis/AIExplanationCard";
import FinalScoreBreakdown from "../components/analysis/FinalScoreBreakdown";
import AnalysisSkeleton from "../components/analysis/AnalysisSkeleton";
import EmptyState from "../components/common/EmptyState";
import { useAnalyze } from "../hooks/useAnalyze";
import CompanyProfileCard from "../components/analysis/CompanyProfileCard";
import QuickAccessStocks from "../components/stocks/QuickAccessStocks";

// PHASE 5 — live /analyze/{ticker} integration, extended with the Phase 5
// fields (price, market stats, AI insights) plus a real price chart backed
// by /history/{ticker}. No mock data anywhere on this page.
export default function StockAnalysis() {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading, activeTicker, analyze, retry } = useAnalyze();

  useEffect(() => {
    if (ticker) analyze(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker]);

  function handleAnalyze(symbol) {
    navigate(`/analysis/${symbol}`, { replace: true });
    analyze(symbol);
  }

  const hasSearched = isLoading || !!data || !!error;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-semibold text-ink-primary">Stock Analysis</h1>
        <p className="text-sm text-ink-secondary">
          Search any ticker for a live technical, sentiment, and ML-driven breakdown.
        </p>
      </div>

      <TickerSearchBar onAnalyze={handleAnalyze} isLoading={isLoading} initialValue={ticker || ""} />

      <AnimatePresence mode="wait">
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
          message="Use the search above or click any stock below to instantly view its analysis."
          />
          
          <QuickAccessStocks onSelect={handleAnalyze} />
        </motion.div>
      )}

        {isLoading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AnalysisSkeleton />
          </motion.div>
        )}

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
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="font-display text-lg font-semibold text-ink-primary">
              Couldn't analyze {activeTicker}
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

        {!isLoading && !error && data && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <RecommendationBanner analysis={data} />

            <CompanyProfileCard analysis={data} />
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <TechnicalScoreCard score={data.technical_score} />
              <SentimentScoreCard sentiment={data.news_sentiment} />
              <MLPredictionCard prediction={data.ml_prediction} probability={data.up_probability} />
              <div className="panel flex items-center justify-center p-5">
                <ConfidenceGauge probability={data.up_probability} prediction={data.ml_prediction} size={112} />
              </div>
            </div>

            <AIExplanationCard analysis={data} />

            <PriceChart ticker={data.ticker} currency={data.currency || "USD"} />

            <FinalScoreBreakdown analysis={data} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

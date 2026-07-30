import { useMemo } from "react";
import HeroSection from "../components/dashboard/HeroSection";
import MarketPulseStrip from "../components/dashboard/MarketPulseStrip";
import TopOpportunities from "../components/dashboard/TopOpportunities";
import ScannerRankingsTable from "../components/dashboard/ScannerRankingsTable";
import FinalScoreChart from "../components/dashboard/FinalScoreChart";
import EmptyState from "../components/common/EmptyState";
import { useScanner } from "../hooks/useScanner";

// PHASE 3 — live backend integration. All scanner data now comes from
// GET /scanner via useScanner(); no mock data is used here anymore.
export default function Dashboard() {
  const { data, isLoading, error, refetch } = useScanner();

  const stats = useMemo(() => {
    if (!data.length) return { total: 0, bullish: 0, bearish: 0, avgConfidence: 0 };
    const bullish = data.filter((s) => s.recommendation === "BUY").length;
    const bearish = data.filter((s) => s.recommendation === "SELL").length;
    const avgConfidence = data.reduce((sum, s) => sum + s.up_probability, 0) / data.length;
    return { total: data.length, bullish, bearish, avgConfidence };
  }, [data]);

  // Error takes priority — never show stale/empty sections next to an error.
  if (error && !isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
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
        <p className="font-display text-lg font-semibold text-ink-primary">Couldn't load the scanner</p>
        <p className="max-w-md text-sm text-ink-secondary">{error}</p>
        <button
          onClick={refetch}
          className="mt-1 rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-base transition-colors duration-250 hover:bg-accent-hover"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty: request succeeded, backend just has nothing to report right now.
  if (!isLoading && data.length === 0) {
    return (
      <div className="flex flex-col gap-10">
        <HeroSection stats={stats} isLoading={false} />
        <EmptyState
          title="No scanner results"
          message="The scanner ran successfully but returned no stocks. Check back shortly."
          action={
            <button
              onClick={refetch}
              className="mt-1 rounded-sm border border-base-border bg-base-panel px-4 py-2 text-sm font-medium text-ink-primary transition-colors duration-250 hover:border-accent/40 hover:text-accent"
            >
              Refresh
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="-mx-4 -mt-6 sm:-mx-6 sm:-mt-8 lg:-mx-8">
        <MarketPulseStrip data={data} isLoading={isLoading} />
      </div>
      <HeroSection stats={stats} isLoading={isLoading} />
      <TopOpportunities data={data} isLoading={isLoading} />
      <FinalScoreChart data={data} isLoading={isLoading} />
      <ScannerRankingsTable data={data} isLoading={isLoading} />
    </div>
  );
}
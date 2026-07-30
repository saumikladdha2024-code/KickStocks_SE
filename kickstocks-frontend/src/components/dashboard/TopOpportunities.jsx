import OpportunityCard from "./OpportunityCard";
import { OpportunityCardSkeleton } from "../common/Skeleton";

// Highest-conviction subset of the scanner — top N by final_score, shown as cards
// before the full table, mirroring how Zerodha/Groww surface "top picks" above the list.
export default function TopOpportunities({ data, isLoading, count = 4 }) {
  const topStocks = isLoading
    ? []
    : [...data].sort((a, b) => b.final_score - a.final_score).slice(0, count);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink-primary">Top Opportunities</h2>
        <span className="text-xs text-ink-muted">Ranked by final score</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: count }).map((_, i) => <OpportunityCardSkeleton key={i} />)
          : topStocks.map((stock) => <OpportunityCard key={stock.ticker} stock={stock} />)}
      </div>
    </section>
  );
}
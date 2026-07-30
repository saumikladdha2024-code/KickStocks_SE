import { Link } from "react-router-dom";
import StatCard from "../common/StatCard";
import { SkeletonBlock } from "../common/Skeleton";

// The dashboard's opening statement: what KickStocks does, in one line, plus the
// four numbers that prove the scanner is actually running across the market.
export default function HeroSection({ stats, isLoading }) {
  return (
    <section className="flex flex-col gap-8 py-2 sm:py-4">
      <div className="flex flex-col gap-4">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-2xs font-medium uppercase tracking-wide text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" />
          Live market scan
        </span>

        <h1 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-ink-primary sm:text-4xl lg:text-[2.75rem]">
          Stock intelligence made simple,{" "}
          <span className="text-accent">scored in real time.</span>
        </h1>

        <p className="max-w-xl text-sm leading-relaxed text-ink-secondary sm:text-base">
          KickStocks blends a Random Forest prediction model, technical analysis, and FinBERT
          news sentiment into one composite score — so you see the signal, not just the noise.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Link
          to="/analysis"
          className="rounded-sm bg-accent px-5 py-2.5 text-sm font-semibold text-base transition-colors duration-250 hover:bg-accent-hover">
            Analyze a stock
          </Link>

  <a
    href="#scanner-rankings"
    className="rounded-sm border border-base-border bg-base-panel px-5 py-2.5 text-sm font-medium text-ink-primary transition-colors duration-250 hover:border-accent/40 hover:text-accent"
  >
    View full scanner
  </a>
</div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-[78px] rounded" />
            ))
          : (
              <>
                <StatCard label="Stocks scanned" value={stats.total} />
                <StatCard label="Bullish signals" value={stats.bullish} accent="bull" />
                <StatCard label="Bearish signals" value={stats.bearish} accent="bear" />
                <StatCard label="Avg. ML confidence" value={stats.avgConfidence} decimals={0} suffix="%" />
              </>
            )}
      </div>
    </section>
  );
}
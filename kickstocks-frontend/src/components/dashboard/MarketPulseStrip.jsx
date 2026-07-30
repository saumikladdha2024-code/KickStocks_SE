import { getScoreColor } from "../../utils/scoreColors";
import { formatScore } from "../../utils/formatters";
import { SignalStripSkeleton } from "../common/Skeleton";

// Bloomberg/CNBC-style crawling ticker tape: every scanned symbol, its final score,
// and direction, scrolling continuously. Sits right under the navbar — the strip
// reads as "this terminal is live" before a single click happens.
function StripItem({ item }) {
  const color = getScoreColor(item.final_score);
  const arrow = item.ml_prediction === "UP" ? "▲" : "▼";

  return (
    <div className="flex shrink-0 items-center gap-2 px-4 font-tabular text-xs">
      <span className="font-semibold text-ink-primary">{item.ticker}</span>
      <span style={{ color }}>{arrow}</span>
      <span style={{ color }} className="font-medium">
        {formatScore(item.final_score, 1)}
      </span>
      <span className="text-ink-muted">·</span>
    </div>
  );
}

export default function MarketPulseStrip({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="border-b border-base-border bg-base-panel">
        <SignalStripSkeleton />
      </div>
    );
  }

  // Duplicate the list so the marquee loop is seamless (translateX(-50%) on a 2x-wide track).
  const track = [...data, ...data];

  return (
    <div className="group overflow-hidden border-b border-base-border bg-base-panel">
      <div className="flex w-max animate-marquee py-2.5 group-hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <StripItem key={`${item.ticker}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import RecommendationBadge from "../common/RecommendationBadge";
import SentimentPill from "../common/SentimentPill";
import ConfidenceBar from "../common/ConfidenceBar";
import { TableRowSkeleton } from "../common/Skeleton";
import { getCompanyName } from "../../utils/tickerNames";
import { getScoreTextClass, getPredictionStyles } from "../../utils/scoreColors";
import { formatPercent } from "../../utils/formatters";

const COLUMNS = [
  { key: "rank", label: "#", sortable: false },
  { key: "ticker", label: "Ticker", sortable: true },
  { key: "technical_score", label: "Technical", sortable: true, hideOn: "sm" },
  { key: "news_sentiment", label: "Sentiment", sortable: true, hideOn: "md" },
  { key: "ml_prediction", label: "ML Signal", sortable: true, hideOn: "md" },
  { key: "up_probability", label: "Confidence", sortable: true, hideOn: "lg" },
  { key: "final_score", label: "Final Score", sortable: true },
  { key: "recommendation", label: "Call", sortable: true },
];

const HIDE_CLASS = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
};

// Full sortable scanner table — every column header toggles sort, defaulting to
// final_score descending (the platform's own recommended ordering).
export default function ScannerRankingsTable({ data, isLoading }) {
  const [sortKey, setSortKey] = useState("final_score");
  const [sortDir, setSortDir] = useState("desc");

  const sorted = useMemo(() => {
    if (isLoading) return [];
    const copy = [...data];
    copy.sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];
      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [data, sortKey, sortDir, isLoading]);

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <section id="scanner-rankings" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink-primary">Scanner Rankings</h2>
        <span className="text-xs text-ink-muted">{isLoading ? "Loading…" : `${data.length} stocks tracked`}</span>
      </div>

      <div className="panel overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-base-border bg-base-raised/40 text-left">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`whitespace-nowrap px-2.5 sm:px-4 py-3 text-2xs font-semibold uppercase tracking-wide text-ink-muted ${
                    col.hideOn ? HIDE_CLASS[col.hideOn] : ""
                  } ${col.sortable ? "cursor-pointer select-none hover:text-ink-secondary" : ""}`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <span className="text-accent">{sortDir === "asc" ? "↑" : "↓"}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <TableRowSkeleton key={i} />)
              : sorted.map((stock, idx) => {
                  const { text: predictionText, arrow } = getPredictionStyles(stock.ml_prediction);
                  return (
                    <tr
                      key={stock.ticker}
                      className="border-b border-base-border/60 transition-colors duration-250 last:border-0 hover:bg-base-raised/50"
                    >
                      <td className="px-2.5 sm:px-4 py-3.5 font-tabular text-xs text-ink-muted">{idx + 1}</td>
                      <td className="px-2.5 sm:px-4 py-3.5">
                        <Link to={`/analysis/${stock.ticker}`} className="flex flex-col hover:text-accent">
                          <span className="font-tabular text-sm font-semibold text-ink-primary">
                            {stock.ticker}
                          </span>
                          <span className="text-2xs text-ink-muted">{getCompanyName(stock.ticker)}</span>
                        </Link>
                      </td>
                      <td className={`px-2.5 sm:px-4 py-3.5 font-tabular text-sm text-ink-primary ${HIDE_CLASS.sm}`}>
                        {stock.technical_score}
                      </td>
                      <td className={`px-2.5 sm:px-4 py-3.5 ${HIDE_CLASS.md}`}>
                        <SentimentPill sentiment={stock.news_sentiment} size="sm" />
                      </td>
                      <td className={`px-2.5 sm:px-4 py-3.5 font-tabular text-sm font-medium ${predictionText} ${HIDE_CLASS.md}`}>
                        {arrow} {stock.ml_prediction}
                      </td>
                      <td className={`px-2.5 sm:px-4 py-3.5 ${HIDE_CLASS.lg}`}>
                        <div className="w-24">
                          <ConfidenceBar
                            probability={stock.up_probability}
                            prediction={stock.ml_prediction}
                            showLabel={false}
                          />
                        </div>
                      </td>
                      <td className={`px-2.5 sm:px-4 py-3.5 font-tabular text-sm font-semibold ${getScoreTextClass(stock.final_score)}`}>
                        {formatPercent(stock.final_score, 1).replace("%", "")}
                      </td>
                      <td className="px-2.5 sm:px-4 py-3.5">
                        <RecommendationBadge recommendation={stock.recommendation} size="sm" />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
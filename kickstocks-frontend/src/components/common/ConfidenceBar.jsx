import { getPredictionStyles } from "../../utils/scoreColors";
import { formatPercent } from "../../utils/formatters";

// Linear confidence indicator for up_probability — colored by predicted direction
// so the bar itself communicates UP/DOWN even before reading the number.
export default function ConfidenceBar({ probability, prediction, showLabel = true }) {
  const { text } = getPredictionStyles(prediction);
  const fillColor = prediction === "UP" ? "bg-bull" : "bg-bear";

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-2xs uppercase tracking-wide text-ink-muted">ML Confidence</span>
          <span className={`font-tabular text-xs font-semibold ${text}`}>
            {formatPercent(probability)}
          </span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-raised">
        <div
          className={`h-full rounded-full ${fillColor} transition-all duration-700 ease-out`}
          style={{ width: `${Math.min(Math.max(probability, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}
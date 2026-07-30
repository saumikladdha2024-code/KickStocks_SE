import { getSentimentStyles } from "../../utils/scoreColors";
import { formatSentiment } from "../../utils/formatters";

// Compact sentiment indicator — sign-aware color and a directional glyph,
// so "is this bullish or bearish news" reads in under a second.
export default function SentimentPill({ sentiment, size = "md" }) {
  const styles = getSentimentStyles(sentiment);
  const glyph = sentiment > 0.05 ? "▲" : sentiment < -0.05 ? "▼" : "•";
  const sizeClass = size === "sm" ? "text-2xs px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-tabular font-medium ${styles.bg} ${styles.text} ${styles.border} ${sizeClass}`}
    >
      <span aria-hidden="true" className="text-[10px]">{glyph}</span>
      {formatSentiment(sentiment)}
    </span>
  );
}
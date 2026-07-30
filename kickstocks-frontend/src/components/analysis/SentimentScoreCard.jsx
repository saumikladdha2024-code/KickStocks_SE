import { motion } from "framer-motion";
import SentimentPill from "../common/SentimentPill";
import { getSentimentStyles } from "../../utils/scoreColors";

function sentimentDescription(sentiment) {
  if (sentiment > 0.2) return "News flow is strongly positive.";
  if (sentiment > 0.05) return "News flow leans positive.";
  if (sentiment < -0.2) return "News flow is strongly negative.";
  if (sentiment < -0.05) return "News flow leans negative.";
  return "News flow is roughly neutral.";
}

export default function SentimentScoreCard({ sentiment }) {
  const styles = getSentimentStyles(sentiment);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="panel flex flex-col gap-4 p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-2xs uppercase tracking-wide text-ink-muted">News Sentiment</span>
        <span className="text-2xs text-ink-muted">FinBERT</span>
      </div>

      <div className="flex items-center gap-3">
        <span className={`font-tabular text-3xl font-semibold ${styles.text}`}>
          {sentiment > 0 ? "+" : ""}{sentiment.toFixed(3)}
        </span>
        <SentimentPill sentiment={sentiment} />
      </div>

      <p className="text-xs leading-relaxed text-ink-secondary">{sentimentDescription(sentiment)}</p>
    </motion.div>
  );
}
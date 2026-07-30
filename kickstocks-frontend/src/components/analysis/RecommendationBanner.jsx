import { motion } from "framer-motion";
import RecommendationBadge from "../common/RecommendationBadge";
import ScoreGauge from "../common/ScoreGauge";
import { getCompanyName } from "../../utils/tickerNames";
import { getRecommendationStyles } from "../../utils/scoreColors";

export default function RecommendationBanner({ analysis }) {
  const styles = getRecommendationStyles(analysis.recommendation);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`panel flex flex-col items-start gap-6 overflow-hidden p-6 sm:flex-row sm:items-center sm:justify-between ${styles.border}`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-tabular font-display text-3xl font-semibold text-ink-primary sm:text-4xl">
            {analysis.ticker}
          </h1>
          <RecommendationBadge recommendation={analysis.recommendation} size="lg" animated />
        </div>
        <p className="text-sm text-ink-secondary">{getCompanyName(analysis.ticker)}</p>
        <p className="max-w-md text-xs leading-relaxed text-ink-muted">
          Composite score blending technical momentum, FinBERT news sentiment, and the
          Random Forest model's directional prediction.
        </p>
      </div>

      <div className="flex items-center gap-2 sm:pl-6">
        <ScoreGauge value={analysis.final_score} size="lg" label="Final Score" />
      </div>
    </motion.section>
  );
}
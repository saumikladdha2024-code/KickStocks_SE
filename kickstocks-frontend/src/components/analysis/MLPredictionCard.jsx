import { motion } from "framer-motion";
import AnimatedNumber from "../common/AnimatedNumber";
import ConfidenceBar from "../common/ConfidenceBar";
import { getPredictionStyles } from "../../utils/scoreColors";

export default function MLPredictionCard({ prediction, probability }) {
  const { text, arrow } = getPredictionStyles(prediction);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="panel flex flex-col gap-4 p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-2xs uppercase tracking-wide text-ink-muted">ML Prediction</span>
        <span className="text-2xs text-ink-muted">Random Forest</span>
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-2xl ${text}`} aria-hidden="true">{arrow}</span>
        <span className={`font-tabular text-3xl font-semibold ${text}`}>{prediction}</span>
      </div>

      <div className="flex items-baseline gap-1.5">
        <AnimatedNumber value={probability} decimals={0} suffix="%" className="text-sm font-semibold text-ink-primary" />
        <span className="text-xs text-ink-muted">probability of {prediction === "UP" ? "rising" : "falling"}</span>
      </div>

      <ConfidenceBar probability={probability} prediction={prediction} showLabel={false} />
    </motion.div>
  );
}
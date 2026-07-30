import { motion } from "framer-motion";
import AnimatedNumber from "../common/AnimatedNumber";
import { getScoreColor, getScoreTextClass } from "../../utils/scoreColors";

export default function TechnicalScoreCard({ score }) {
  const color = getScoreColor(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="panel flex flex-col gap-4 p-5"
    >
      <div className="flex items-center justify-between">
        <span className="text-2xs uppercase tracking-wide text-ink-muted">Technical Score</span>
        <span className="text-2xs text-ink-muted">Price &amp; volume signals</span>
      </div>

      <AnimatedNumber value={score} decimals={0} suffix=" / 100" delay={150} className={`text-3xl font-semibold ${getScoreTextClass(score)}`} />

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-raised">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        />
      </div>
    </motion.div>
  );
}
import { motion } from "framer-motion";
import { buildSummary, buildKeyFactors, getRiskLevel, getSuggestedAction } from "../../utils/aiExplanation";

const RISK_STYLES = {
  "Low Risk": "text-bull-text bg-bull-soft border-bull/30",
  "Moderate Risk": "text-accent bg-accent-soft border-accent/30",
  "Elevated Risk": "text-neutral-text bg-neutral-soft border-neutral/30",
  "High Risk": "text-bear-text bg-bear-soft border-bear/30",
};

const ACTION_STYLES = {
  BUY: "border-bull/30 bg-bull-soft text-bull-text",
  HOLD: "border-neutral/30 bg-neutral-soft text-neutral-text",
  SELL: "border-bear/30 bg-bear-soft text-bear-text",
};

// Institutional-research-style explanation of the recommendation, built
// entirely from existing /analyze fields (see utils/aiExplanation.js) — no
// new backend data, no fabricated figures.
export default function AIExplanationCard({ analysis }) {
  const summary = buildSummary(analysis);
  const keyFactors = buildKeyFactors(analysis);
  const riskLevel = getRiskLevel(analysis.final_score);
  const suggestedAction = getSuggestedAction(analysis.recommendation);
  const actionStyle = ACTION_STYLES[analysis.recommendation] || ACTION_STYLES.HOLD;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden rounded-lg border border-base-border bg-gradient-to-b from-base-panel to-base-raised/50 p-6 shadow-card sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-border pb-4">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-ink-primary">
          <span aria-hidden="true">🧠</span> AI Investment Summary
        </h2>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-2xs font-semibold uppercase tracking-wide ${RISK_STYLES[riskLevel]}`}
        >
          {riskLevel}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{summary}</p>

      <div className="mt-5 flex flex-col gap-2.5">
        <span className="text-2xs font-semibold uppercase tracking-wide text-ink-muted">Key Factors</span>
        <ul className="flex flex-col gap-2">
          {keyFactors.map((factor, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.15 + i * 0.07 }}
              className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-secondary"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{factor}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className={`mt-5 rounded-md border px-4 py-3 text-sm leading-relaxed ${actionStyle}`}
      >
        <span className="mb-1 block text-2xs font-semibold uppercase tracking-wide opacity-80">
          Suggested Action
        </span>
        {suggestedAction}
      </motion.div>
    </motion.section>
  );
}

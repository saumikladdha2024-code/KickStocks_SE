import { getRecommendationStyles } from "../../utils/scoreColors";

const SIZE_CLASSES = {
  sm: "text-2xs px-2 py-0.5 gap-1",
  md: "text-xs px-2.5 py-1 gap-1.5",
  lg: "text-sm px-3.5 py-1.5 gap-2",
};

// The recommendation pill used everywhere: opportunity cards, table rows, the analysis banner.
// `animated` adds a one-time fade/scale-in — used for the hero banner, not every table row.
export default function RecommendationBadge({ recommendation, size = "md", animated = false }) {
  const styles = getRecommendationStyles(recommendation);
  return (
    <span
      className={`inline-flex items-center rounded-full border font-semibold uppercase tracking-wide ${styles.bg} ${styles.text} ${styles.border} ${SIZE_CLASSES[size]} ${
        animated ? "animate-fade-in" : ""
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
      {recommendation}
    </span>
  );
}
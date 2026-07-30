// Single source of truth for mapping data -> color tokens.
// Keeps "BUY is green, SELL is red" logic out of every individual component.

export function getRecommendationStyles(recommendation) {
  switch (recommendation) {
    case "BUY":
      return {
        text: "text-bull-text",
        bg: "bg-bull-soft",
        border: "border-bull/30",
        dot: "bg-bull",
        solid: "bg-bull",
      };
    case "SELL":
      return {
        text: "text-bear-text",
        bg: "bg-bear-soft",
        border: "border-bear/30",
        dot: "bg-bear",
        solid: "bg-bear",
      };
    default:
      return {
        text: "text-neutral-text",
        bg: "bg-neutral-soft",
        border: "border-neutral/30",
        dot: "bg-neutral",
        solid: "bg-neutral",
      };
  }
}

// Final/technical score (0-100) -> color, independent of the recommendation label.
export function getScoreColor(score) {
  if (score >= 65) return "#00C875"; // bull
  if (score <= 40) return "#FF4D5E"; // bear
  return "#F2A93B"; // neutral
}

export function getScoreTextClass(score) {
  if (score >= 65) return "text-bull-text";
  if (score <= 40) return "text-bear-text";
  return "text-neutral-text";
}

// News sentiment is roughly -1..1 in practice, centered on 0.
export function getSentimentStyles(sentiment) {
  if (sentiment > 0.05) {
    return { text: "text-bull-text", bg: "bg-bull-soft", border: "border-bull/30" };
  }
  if (sentiment < -0.05) {
    return { text: "text-bear-text", bg: "bg-bear-soft", border: "border-bear/30" };
  }
  return { text: "text-ink-secondary", bg: "bg-base-raised", border: "border-base-border" };
}

export function getPredictionStyles(prediction) {
  return prediction === "UP"
    ? { text: "text-bull-text", arrow: "↑" }
    : { text: "text-bear-text", arrow: "↓" };
}
// All reasoning here is template-driven from fields the backend already
// returns (technical_score, news_sentiment, ml_prediction, up_probability,
// final_score, recommendation). No new backend fields, no fabricated facts.

function technicalDescriptor(score) {
  if (score >= 70) return "strong";
  if (score >= 50) return "moderate";
  return "weak";
}

function sentimentDescriptor(sentiment) {
  if (sentiment > 0.05) return "positive";
  if (sentiment < -0.05) return "negative";
  return "neutral";
}

// Final-score risk bands, as specified:
// 80-100 Low Risk · 60-79 Moderate Risk · 40-59 Elevated Risk · 0-39 High Risk
export function getRiskLevel(finalScore) {
  if (finalScore >= 80) return "Low Risk";
  if (finalScore >= 60) return "Moderate Risk";
  if (finalScore >= 40) return "Elevated Risk";
  return "High Risk";
}

export function getSuggestedAction(recommendation) {
  switch (recommendation) {
    case "BUY":
      return "Conditions currently appear favorable according to the AI model.";
    case "SELL":
      return "Current signals suggest caution before opening or increasing positions.";
    default:
      return "Mixed signals suggest waiting for stronger confirmation.";
  }
}

// Builds a 2-sentence natural-language explanation: what's driving the call,
// then how the ML prediction relates to it (reinforcing it, not decisive
// enough, or outweighed by the other signals).
export function buildSummary(analysis) {
  const { recommendation, technical_score, news_sentiment, ml_prediction, up_probability } = analysis;
  const techDesc = technicalDescriptor(technical_score);
  const sentDesc = sentimentDescriptor(news_sentiment);
  const mlDirection = ml_prediction === "UP" ? "upward" : "downward";
  const probability = Math.round(up_probability);

  const opening = `The AI currently recommends ${recommendation} because the technical score is ${techDesc} while recent news sentiment is ${sentDesc}.`;

  const mlAgreesWithCall =
    (ml_prediction === "UP" && recommendation === "BUY") ||
    (ml_prediction === "DOWN" && recommendation === "SELL");

  let mlClause;
  if (mlAgreesWithCall) {
    mlClause = `The machine learning model reinforces this view, predicting a ${probability}% probability of ${mlDirection} movement.`;
  } else if (recommendation === "HOLD") {
    mlClause = `The machine learning model predicts a ${probability}% probability of ${mlDirection} movement, but that's not decisive enough on its own to tip the balance toward a clear buy or sell.`;
  } else {
    mlClause = `Although the machine learning model predicts a ${probability}% probability of ${mlDirection} movement, that confidence is not high enough to outweigh the signals driving the ${recommendation} call.`;
  }

  return `${opening} ${mlClause}`;
}

// 3-5 bullets, each a direct, dynamically-generated readout of one backend field.
export function buildKeyFactors(analysis) {
  const { technical_score, news_sentiment, ml_prediction, up_probability, final_score } = analysis;
  const bullets = [];

  if (technical_score >= 70) bullets.push("Technical indicators are strong.");
  else if (technical_score >= 50) bullets.push("Technical indicators are moderate.");
  else bullets.push("Technical indicators remain weak.");

  const sentDesc = sentimentDescriptor(news_sentiment);
  bullets.push(`News sentiment is ${sentDesc}.`);

  bullets.push(`ML model predicts ${ml_prediction} with ${Math.round(up_probability)}% confidence.`);
  bullets.push(`Overall AI score is ${Math.round(final_score)}/100.`);
  bullets.push(`Risk level is classified as ${getRiskLevel(final_score)} based on the composite score.`);

  return bullets;
}

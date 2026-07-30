import { Link } from "react-router-dom";
import RecommendationBadge from "../common/RecommendationBadge";
import ScoreGauge from "../common/ScoreGauge";
import SentimentPill from "../common/SentimentPill";
import { getCompanyName } from "../../utils/tickerNames";
import { getPredictionStyles } from "../../utils/scoreColors";
import { formatPercent } from "../../utils/formatters";

// The single most important card on the dashboard — one scanner result, distilled
// to a glance: ticker, recommendation, final score, and the three inputs behind it.
export default function OpportunityCard({ stock }) {
  const { text: predictionText, arrow } = getPredictionStyles(stock.ml_prediction);

  return (
    <Link
      to={`/analysis/${stock.ticker}`}
      className="panel panel-hover group flex flex-col gap-4 p-5"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="font-tabular text-lg font-semibold text-ink-primary group-hover:text-accent transition-colors duration-250">
            {stock.ticker}
          </span>
          <span className="text-xs text-ink-muted">{getCompanyName(stock.ticker)}</span>
        </div>
        <RecommendationBadge recommendation={stock.recommendation} size="sm" />
      </div>

      <div className="flex items-center gap-4">
        <ScoreGauge value={stock.final_score} size="md" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink-muted">Technical</span>
            <span className="font-tabular font-medium text-ink-primary">{stock.technical_score}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink-muted">Sentiment</span>
            <SentimentPill sentiment={stock.news_sentiment} size="sm" />
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-ink-muted">ML signal</span>
            <span className={`font-tabular font-medium ${predictionText}`}>
              {arrow} {formatPercent(stock.up_probability)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
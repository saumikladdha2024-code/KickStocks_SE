import CompanyLogo from "./CompanyLogo";
import { formatCurrency, getCurrencyForTicker } from "../../utils/formatters";

function formatMarketCap(value) {
  if (!value) return "—";

  if (value >= 1_000_000_000_000)
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;

  if (value >= 1_000_000_000)
    return `$${(value / 1_000_000_000).toFixed(2)}B`;

  if (value >= 1_000_000)
    return `$${(value / 1_000_000).toFixed(2)}M`;

  return value;
}

export default function CompanyProfileCard({ analysis }) {
  const change =
    analysis.current_price - analysis.previous_close;

  const percent =
    (change / analysis.previous_close) * 100;

  const positive = change >= 0;

  return (
    <div className="panel p-6">

      <div className="flex items-start justify-between">

        <div>

            <div className="flex items-center gap-4">

        <CompanyLogo
            ticker={analysis.ticker}
            size={56}
        />

        <div>

            <h2 className="font-display text-2xl font-semibold text-ink-primary">
                {analysis.company_name}
            </h2>

            <p className="mt-1 text-sm text-ink-secondary">
                {analysis.ticker} • {analysis.exchange}
            </p>

        </div>

    </div>

          <div className="mt-5 flex items-end gap-4">

            <span className="text-4xl font-bold text-ink-primary">
              {formatCurrency(
                analysis.current_price,
                getCurrencyForTicker(analysis.ticker)
                )}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                positive
                  ? "bg-bull-soft text-bull-text"
                  : "bg-bear-soft text-bear-text"
              }`}
            >
              {positive ? "+" : ""}
              {change.toFixed(2)}
              {" "}
              ({percent.toFixed(2)}%)
            </span>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">

          <div>
            <p className="text-ink-muted">Sector</p>
            <p className="font-medium text-ink-primary">
              {analysis.sector}
            </p>
          </div>

          <div>
            <p className="text-ink-muted">Industry</p>
            <p className="font-medium text-ink-primary">
              {analysis.industry}
            </p>
          </div>

          <div>
            <p className="text-ink-muted">Market Cap</p>
            <p className="font-medium text-ink-primary">
              {formatMarketCap(analysis.market_cap)}
            </p>
          </div>

          <div>
            <p className="text-ink-muted">Exchange</p>
            <p className="font-medium text-ink-primary">
              {analysis.exchange}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
// Quiet, informational footer — disclaimer + links, no visual competition with the dashboard.
export default function Footer() {
  return (
    <footer className="border-t border-base-border bg-base">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-8 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-ink-secondary">
          <span className="font-display font-semibold text-ink-primary">KickStocks</span>{" "}
          — ML-driven stock analysis, technical signals & news sentiment in one terminal.
        </p>
        <p className="max-w-md text-2xs leading-relaxed text-ink-muted">
          Scores and predictions are model outputs for informational purposes only and are not
          financial advice. Markets carry risk — always do your own research.
        </p>
      </div>
    </footer>
  );
}

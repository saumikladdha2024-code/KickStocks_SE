// Generic "nothing here" state — used when the backend responds successfully
// but the scanner returns zero results (e.g. market closed, filters too strict).
export default function EmptyState({
  title = "No data yet",
  message = "There's nothing to show right now.",
  action = null,
}) {
  return (
    <div className="panel flex flex-col items-center gap-3 rounded-lg px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-base-raised text-ink-muted">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 19h16M6 19V9l6-4 6 4v10M10 19v-5h4v5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="font-display text-base font-semibold text-ink-primary">{title}</p>
      <p className="max-w-sm text-sm text-ink-secondary">{message}</p>
      {action}
    </div>
  );
}
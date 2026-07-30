import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <p className="font-display text-5xl font-semibold text-ink-primary">404</p>
      <p className="text-sm text-ink-secondary">This page doesn't exist.</p>
      <Link
        to="/"
        className="mt-2 rounded-sm border border-base-border bg-base-raised px-4 py-2 text-sm font-medium text-ink-primary transition-colors duration-250 hover:border-accent/40 hover:text-accent"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

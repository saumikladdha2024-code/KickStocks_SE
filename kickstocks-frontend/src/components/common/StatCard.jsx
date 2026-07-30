import AnimatedNumber from "./AnimatedNumber";

// Generic glass-light stat card — used in the hero stats row and reusable anywhere
// a single labeled metric needs to stand on its own.
export default function StatCard({ label, value, decimals = 0, suffix = "", accent = "default" }) {
  const accentClass =
    accent === "bull" ? "text-bull-text" : accent === "bear" ? "text-bear-text" : "text-ink-primary";

  return (
    <div className="panel flex flex-col gap-1 px-5 py-4">
      <span className="text-2xs uppercase tracking-wide text-ink-muted">{label}</span>
      <AnimatedNumber
        value={value}
        decimals={decimals}
        suffix={suffix}
        className={`text-2xl font-semibold ${accentClass}`}
      />
    </div>
  );
}
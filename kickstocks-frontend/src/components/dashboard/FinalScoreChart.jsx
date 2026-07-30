import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { SkeletonBlock } from "../common/Skeleton";
import { getScoreColor } from "../../utils/scoreColors";

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const stock = payload[0].payload;
  return (
    <div className="panel px-3 py-2 text-xs shadow-card-hover">
      <p className="font-tabular font-semibold text-ink-primary">{stock.ticker}</p>
      <p className="text-ink-secondary">
        Final score: <span className="font-tabular text-ink-primary">{stock.final_score.toFixed(1)}</span>
      </p>
    </div>
  );
}

// Horizontal bar comparison of final scores across the scanner universe — the
// "shape of the market" at a glance, colored the same way as every other score in the app.
export default function FinalScoreChart({ data, isLoading }) {
  if (isLoading) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold text-ink-primary">Final Score Comparison</h2>
        <SkeletonBlock className="h-72 w-full rounded-lg" />
      </section>
    );
  }

  const sorted = [...data].sort((a, b) => b.final_score - a.final_score);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-lg font-semibold text-ink-primary">Final Score Comparison</h2>
      <div className="panel p-4">
        <ResponsiveContainer width="100%" height={Math.max(sorted.length * 34, 280)}>
          <BarChart data={sorted} layout="vertical" margin={{ top: 4, right: 24, bottom: 4, left: 4 }}>
            <CartesianGrid horizontal={false} stroke="#1F2730" strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: "#8B98A9", fontSize: 11 }}
              axisLine={{ stroke: "#1F2730" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="ticker"
              tick={{ fill: "#E6EAF0", fontSize: 12, fontFamily: "JetBrains Mono" }}
              axisLine={false}
              tickLine={false}
              width={56}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="final_score" radius={[0, 4, 4, 0]} maxBarSize={18} isAnimationActive animationDuration={800}>
              {sorted.map((entry) => (
                <Cell key={entry.ticker} fill={getScoreColor(entry.final_score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
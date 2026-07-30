import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { getScoreColor } from "../../utils/scoreColors";

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="panel px-3 py-2 text-xs shadow-card-hover">
      <p className="font-medium text-ink-primary">{item.label}</p>
      <p className="font-tabular text-ink-secondary">{item.value.toFixed(1)} / 100</p>
    </div>
  );
}

export default function FinalScoreBreakdown({ analysis }) {
  const sentimentScaled = ((analysis.news_sentiment + 1) / 2) * 100;

  const data = [
    { key: "technical", label: "Technical", value: analysis.technical_score },
    { key: "sentiment", label: "Sentiment", value: sentimentScaled },
    { key: "confidence", label: "ML Confidence", value: analysis.up_probability },
    { key: "final", label: "Final Score", value: analysis.final_score },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.2 }}
      className="flex flex-col gap-4"
    >
      <h2 className="font-display text-lg font-semibold text-ink-primary">Final Score Breakdown</h2>
      <div className="panel p-4">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 8, right: 16, bottom: 4, left: 4 }}>
            <CartesianGrid vertical={false} stroke="#1F2730" strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fill: "#8B98A9", fontSize: 11 }} axisLine={{ stroke: "#1F2730" }} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "#8B98A9", fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={56} isAnimationActive animationDuration={800}>
              {data.map((entry) => (
                <Cell key={entry.key} fill={getScoreColor(entry.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-2xs text-ink-muted">
        Sentiment is rescaled from its native -1..1 range to 0-100 for visual comparison only.
      </p>
    </motion.section>
  );
}
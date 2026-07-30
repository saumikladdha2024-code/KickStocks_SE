import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import AnimatedNumber from "./AnimatedNumber";
import { getScoreColor } from "../../utils/scoreColors";

const SIZE_PX = {
  sm: 56,
  md: 88,
  lg: 132,
};

// Circular 0-100 gauge built on Recharts' RadialBarChart, with the numeric value
// overlaid in the center. Used for final_score (dashboard cards) and confidence (analysis page).
export default function ScoreGauge({ value, size = "md", label }) {
  const px = SIZE_PX[size];
  const color = getScoreColor(value);
  const data = [{ name: "score", value, fill: color }];

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div style={{ width: px, height: px }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="72%"
            outerRadius="100%"
            data={data}
            startAngle={90}
            endAngle={-270}
            barSize={size === "sm" ? 5 : 8}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              dataKey="value"
              background={{ fill: "#1F2730" }}
              cornerRadius={20}
              isAnimationActive={true}
              animationDuration={900}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedNumber
            value={value}
            decimals={0}
            className={size === "sm" ? "text-sm font-semibold" : "text-xl font-semibold"}
            style={{ color }}
          />
        </div>
      </div>
      {label && <span className="text-2xs uppercase tracking-wide text-ink-muted">{label}</span>}
    </div>
  );
}
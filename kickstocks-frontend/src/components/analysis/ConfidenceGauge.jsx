import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import AnimatedNumber from "../common/AnimatedNumber";

export default function ConfidenceGauge({ probability, prediction, size = 132 }) {
  const color = prediction === "UP" ? "#00C875" : "#FF4D5E";
  const data = [{ name: "confidence", value: probability, fill: color }];

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div style={{ width: size, height: size }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="72%" outerRadius="100%" data={data} startAngle={90} endAngle={-270} barSize={8}>
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar dataKey="value" background={{ fill: "#1F2730" }} cornerRadius={20} isAnimationActive animationDuration={900} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatedNumber value={probability} decimals={0} suffix="%" className="text-xl font-semibold" style={{ color }} />
        </div>
      </div>
      <span className="text-2xs uppercase tracking-wide text-ink-muted">ML Confidence</span>
    </div>
  );
}
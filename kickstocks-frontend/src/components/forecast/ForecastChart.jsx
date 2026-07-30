import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { formatCurrency } from "../../utils/formatters";

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="panel px-3 py-2 text-xs shadow-card-hover">
      <p className="mb-1 font-medium text-ink-primary">Day {point.day}</p>
      <p className="font-tabular text-ink-secondary">
        Predicted close:{" "}
        <span className="text-ink-primary">{formatCurrency(point.predicted_close)}</span>
      </p>
    </div>
  );
}

export default function ForecastChart({ forecast }) {
  const first = forecast[0].predicted_close;
  const last = forecast[forecast.length - 1].predicted_close;
  const isUp = last >= first;
  const lineColor = isUp ? "#00C875" : "#FF4D5E";

  // Day 1 acts as the reference baseline — draw a subtle line at that price.
  const min = Math.min(...forecast.map((d) => d.predicted_close));
  const max = Math.max(...forecast.map((d) => d.predicted_close));
  const padding = (max - min) * 0.12 || 1;
  const domain = [min - padding, max + padding];

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="flex flex-col gap-4"
    >
      <h2 className="font-display text-lg font-semibold text-ink-primary">
        10-Day Price Projection
      </h2>

      <div className="panel p-4">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={forecast} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lineColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#1F2730" strokeDasharray="3 3" />

            <XAxis
              dataKey="day"
              tickFormatter={(d) => `Day ${d}`}
              tick={{ fill: "#8B98A9", fontSize: 11 }}
              axisLine={{ stroke: "#1F2730" }}
              tickLine={false}
            />

            <YAxis
              domain={domain}
              tick={{ fill: "#8B98A9", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={64}
              tickFormatter={(v) => formatCurrency(v, "USD", 0)}
            />

            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#2A333E" }} />

            {/* Dashed reference line at Day 1's price */}
            <ReferenceLine
              y={first}
              stroke="#5C6776"
              strokeDasharray="4 4"
              strokeWidth={1}
            />

            <Area
              type="monotone"
              dataKey="predicted_close"
              stroke={lineColor}
              strokeWidth={2}
              fill="url(#forecastFill)"
              dot={{ fill: lineColor, strokeWidth: 0, r: 3 }}
              activeDot={{ fill: lineColor, stroke: "#0A0E14", strokeWidth: 2, r: 5 }}
              isAnimationActive
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
}
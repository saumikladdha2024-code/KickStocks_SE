import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";

// Thin rendering wrapper around useAnimatedCounter — handles formatting/sign/suffix
// so callers don't repeat toFixed() logic everywhere a number counts up.
export default function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 900,
  delay = 0,
  className = "",
  style,
}) {
  const animated = useAnimatedCounter(value, { duration, delay });
  return (
    <span className={`font-tabular ${className}`} style={style}>
      {prefix}
      {animated.toFixed(decimals)}
      {suffix}
    </span>
  );
}
import { useEffect, useRef, useState } from "react";

// Animates a number from 0 (or a start value) up to `target` using requestAnimationFrame.
// Used anywhere a score/stat should "count up" on first render rather than just appearing.
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function useAnimatedCounter(target, { duration = 900, delay = 0, start = 0 } = {}) {
  const [value, setValue] = useState(start);
  const frameRef = useRef(null);

  useEffect(() => {
    let startTime = null;
    let timeoutId = null;

    function tick(now) {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setValue(start + (target - start) * eased);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    timeoutId = setTimeout(() => {
      frameRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, delay]);

  return value;
}
"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";

export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) =>
    `${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, value, duration, count]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

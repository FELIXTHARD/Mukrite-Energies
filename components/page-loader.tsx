"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlameLogo } from "@/components/logo";

const MIN_SHOW_MS = 1500;

/** Branded splash shown while the app boots, then curtains away. */
export function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const minDelay = new Promise((r) => setTimeout(r, MIN_SHOW_MS));
    const pageReady =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener("load", r, { once: true }));
    let cancelled = false;
    Promise.all([minDelay, pageReady]).then(() => {
      if (!cancelled) setDone(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="page-loader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-brand"
          aria-label="Loading Mukrite Energies"
          role="status"
        >
          {/* soft radial glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_65%)]" />

          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col items-center"
          >
            {/* pulsing rings */}
            {[0, 1].map((i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ opacity: 0, scale: 1.9 }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.9,
                  ease: "easeOut",
                }}
                className="absolute top-0 size-28 rounded-full border-2 border-white/50"
              />
            ))}

            {/* logo badge */}
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 14, stiffness: 180 }}
              className="relative flex size-28 items-center justify-center rounded-full bg-white shadow-2xl"
            >
              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <FlameLogo className="h-16 w-16" />
              </motion.span>
            </motion.span>

            {/* wordmark */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-7 font-display text-2xl font-bold tracking-wide text-white"
            >
              Mukrite Energies
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-1 font-body text-[0.62rem] font-bold uppercase tracking-[0.42em] text-white/60"
            >
              A Smart Future
            </motion.p>

            {/* indeterminate progress bar */}
            <div className="mt-8 h-1 w-44 overflow-hidden rounded-full bg-white/20">
              <motion.span
                initial={{ x: "-100%" }}
                animate={{ x: "260%" }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                className="block h-full w-2/5 rounded-full bg-white"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

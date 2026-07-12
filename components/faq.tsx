"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={f.q} delay={i * 0.06}>
            <div className="mb-3 overflow-hidden rounded-2xl border border-line bg-white">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span
                  className={`font-display text-[0.95rem] font-bold transition-colors ${
                    isOpen ? "text-brand" : "text-ink"
                  }`}
                >
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isOpen ? "bg-brand text-white" : "bg-cream text-brand"
                  }`}
                >
                  <ChevronDown className="size-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-mute">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

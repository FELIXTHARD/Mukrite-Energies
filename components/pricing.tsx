"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CYLINDERS, ugx, type OrderMode } from "@/lib/data";
import { useApp } from "@/components/providers";
import { Reveal } from "@/components/reveal";
import { SectionHeading, Accent } from "@/components/section-heading";

export function Pricing() {
  const { openOrder } = useApp();
  const [mode, setMode] = useState<OrderMode>("set");

  return (
    <section id="pricing" className="noise relative scroll-mt-24 overflow-hidden bg-deep py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Cylinder Sizes & Prices"
          title={
            <>
              Transparent <Accent color="gold">Pricing</Accent>
            </>
          }
          desc="No hidden fees. Complete set includes cylinder, gas & regulator."
          align="center"
          dark
        />

        {/* Mode toggle */}
        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <div className="grid grid-cols-2 rounded-xl bg-white/10 p-1 backdrop-blur">
            {(
              [
                ["set", "New Purchase · Complete Set"],
                ["refill", "Refill Only"],
              ] as const
            ).map(([m, label]) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative cursor-pointer rounded-lg px-5 py-2.5 font-display text-[0.7rem] font-bold uppercase tracking-wider transition-colors sm:px-7 ${
                  mode === m ? "text-brand" : "text-white/60 hover:text-white"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="pricing-mode"
                    className="absolute inset-0 rounded-lg bg-white"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Rows */}
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-white/15">
          {CYLINDERS.map((c, i) => (
            <Reveal key={c.kg} delay={i * 0.07}>
              <div
                className={`flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-white/10 px-5 py-5 transition-colors last:border-b-0 sm:px-7 ${
                  c.popular ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <span
                    className={`font-display text-2xl font-bold tracking-tight sm:text-3xl ${
                      c.popular ? "text-gold" : "text-white"
                    }`}
                  >
                    {c.kg}
                    <span className="text-sm font-semibold">kg</span>
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/50">
                        {c.tier}
                      </span>
                      {c.popular && (
                        <span className="rounded-full bg-brand-light px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-white">
                          Most Popular
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-white/40">{c.use}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-[0.6rem] font-semibold uppercase tracking-wider text-white/40">
                    UGX
                  </span>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={mode}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className={`block font-display text-lg font-bold sm:text-xl ${
                        c.popular ? "text-gold" : "text-white"
                      }`}
                    >
                      {(mode === "set" ? c.set : c.refill).toLocaleString()}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => openOrder({ kg: c.kg, mode })}
                  className="group flex cursor-pointer items-center gap-1.5 rounded-lg bg-ember px-4 py-2.5 font-display text-[0.65rem] font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-ember-dark"
                >
                  Order
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-xs leading-relaxed text-white/40">
            Complete set includes cylinder + gas + regulator · All prices in
            Ugandan Shillings (UGX) · Contact us for bulk &amp; wholesale
            discounts.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

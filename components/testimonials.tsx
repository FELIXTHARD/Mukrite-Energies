"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { SectionHeading, Accent } from "@/components/section-heading";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
      7000
    );
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              What Our <Accent>Customers Say</Accent>
            </>
          }
          align="center"
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote className="absolute -top-6 left-0 size-16 text-brand/8" />
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
              className="text-center"
            >
              <div className="mb-5 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="font-accent text-xl italic leading-relaxed text-ink md:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7">
                <span className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-white">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span className="block font-display text-sm font-bold text-brand">
                  {t.name}
                </span>
                <span className="mt-0.5 block text-xs text-mute">{t.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-9 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 cursor-pointer rounded-full transition-all ${
                  i === index
                    ? "w-7 bg-brand"
                    : "w-2 bg-line-dark hover:bg-brand-light"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

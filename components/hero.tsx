"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { useApp } from "@/components/providers";
import { ugx } from "@/lib/data";

const SLIDES = [
  { src: "/images/samples.jpeg", alt: "Mukrite Energies LPG cylinders" },
  { src: "/images/workers.jpeg", alt: "Mukrite Energies delivery team" },
  { src: "/images/16.jpeg", alt: "Mukrite Energies depot operations" },
];

/* Rotating promo banners, like the ad strip on rubisuganda.com */
const PROMOS = [
  {
    img: "/images/samples.jpeg",
    kicker: "Most Popular",
    title: "13kg Complete Set",
    text: `Cylinder + gas + regulator — ${ugx(230_000)}`,
  },
  {
    img: "/images/7.jpeg",
    kicker: "Fast Delivery",
    title: "Same-Day in Kampala",
    text: "Order before noon, cook tonight",
  },
  {
    img: "/images/3.jpeg",
    kicker: "Partnership",
    title: "Become a Mukrite Dealer",
    text: "Wholesale pricing & priority supply",
  },
];

export function Hero() {
  const { openOrder } = useApp();
  const [slide, setSlide] = useState(0);
  const [promo, setPromo] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPromo((p) => (p + 1) % PROMOS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative mt-20 flex min-h-[calc(100svh-5rem)] flex-col overflow-hidden bg-night">
      {/* Slideshow */}
      <AnimatePresence>
        <motion.div
          key={slide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3 }}
          className="absolute inset-0"
        >
          <div className="animate-kenburns absolute inset-0">
            <Image
              src={SLIDES[slide].src}
              alt={SLIDES[slide].alt}
              fill
              priority={slide === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Left dark gradient, Rubis-style */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-40 pt-16 md:px-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-body text-xl text-white/90 md:text-2xl"
          >
            Welcome
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-3 max-w-3xl font-display text-[clamp(2.6rem,6.5vw,4.8rem)] font-bold leading-[1.05] text-white"
          >
            Powering Every Ugandan Home
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-5 max-w-xl font-body text-base leading-relaxed text-white/80 md:text-lg"
          >
            Premium LPG supply, cylinder refilling, and bulk delivery across
            all regions of Uganda — for homes, businesses, and industry.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <button
              onClick={() => openOrder()}
              className="cursor-pointer rounded-md bg-brand px-7 py-3.5 font-display text-[0.95rem] font-bold text-white transition-colors hover:bg-brand-mid"
            >
              Order Gas Now
            </button>
          </motion.div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`size-2.5 cursor-pointer rounded-full transition-all ${
              i === slide ? "bg-white" : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* ── Bottom strip: promo banner + red order block (Rubis "Find a Station") ── */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl items-stretch px-0 md:px-10">
          {/* Promo banner carousel */}
          <div className="relative hidden h-28 flex-1 overflow-hidden bg-white md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={promo}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
                className="flex h-full items-center gap-6 px-8"
              >
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={PROMOS[promo].img}
                    alt=""
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-body text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ember">
                    {PROMOS[promo].kicker}
                  </p>
                  <p className="truncate font-display text-xl font-bold text-ink">
                    {PROMOS[promo].title}
                  </p>
                  <p className="truncate font-body text-sm text-mute">
                    {PROMOS[promo].text}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            {/* promo dots */}
            <div className="absolute bottom-2.5 right-4 flex gap-1.5">
              {PROMOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPromo(i)}
                  aria-label={`Show promo ${i + 1}`}
                  className={`size-1.5 cursor-pointer rounded-full transition-colors ${
                    i === promo ? "bg-brand" : "bg-line-dark"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Red action block */}
          <button
            onClick={() => openOrder()}
            className="flex h-28 w-full cursor-pointer items-center justify-center gap-3 bg-ember px-10 font-display text-2xl font-bold text-white transition-colors hover:bg-ember-dark md:w-80"
          >
            <Flame className="size-6" />
            Order Gas
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

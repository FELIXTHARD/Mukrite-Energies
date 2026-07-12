"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  sub,
  image = "/images/samples.jpeg",
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  image?: string;
}) {
  return (
    <section className="relative mt-20 flex min-h-[52vh] items-end overflow-hidden bg-night pb-16 pt-24">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-lg text-white/90 md:text-xl"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-2 font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold leading-[1.05] text-white"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 max-w-xl font-body text-base leading-relaxed text-white/75"
        >
          {sub}
        </motion.p>
      </div>
    </section>
  );
}

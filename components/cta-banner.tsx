"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import type { ReactNode } from "react";
import { useApp } from "@/components/providers";
import { Reveal } from "@/components/reveal";
import { CONTACT } from "@/lib/data";

/** Full-width photo banner with overlay — like Rubis' "Explore somewhere new" strip */
export function CtaBanner({
  title,
  sub,
  orderLabel = "Order Gas Now",
  image = "/images/18.jpeg",
}: {
  title: ReactNode;
  sub: string;
  orderLabel?: string;
  image?: string;
}) {
  const { openOrder } = useApp();
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
      <Reveal className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-10">
        <h2 className="max-w-2xl font-display text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.05] text-white">
          {title}
        </h2>
        <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-white/80">
          {sub}
        </p>
        <div className="mt-8 flex flex-wrap gap-3.5">
          <button
            onClick={() => openOrder()}
            className="cursor-pointer rounded-md bg-brand px-7 py-3.5 font-display text-[0.95rem] font-bold text-white transition-colors hover:bg-brand-mid"
          >
            {orderLabel}
          </button>
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-2 rounded-md bg-white/15 px-6 py-3.5 font-display text-[0.95rem] font-bold text-white backdrop-blur transition-colors hover:bg-white/25"
          >
            <Phone className="size-4" /> {CONTACT.phoneDisplay}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

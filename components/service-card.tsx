"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import {
  Home,
  Store,
  Factory,
  RotateCw,
  Truck,
  Handshake,
} from "lucide-react";
import type { Service } from "@/lib/data";
import { useApp } from "@/components/providers";

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  business: Store,
  industrial: Factory,
  refill: RotateCw,
  delivery: Truck,
  wholesale: Handshake,
};

export function ServiceCard({
  service,
  index,
  detailed = false,
}: {
  service: Service;
  index: number;
  detailed?: boolean;
}) {
  const { openOrder } = useApp();
  const Icon = ICONS[service.slug] ?? Home;

  const cta =
    service.cta.action === "order" ? (
      <button
        onClick={() => openOrder()}
        className="group/cta flex cursor-pointer items-center gap-2 font-display text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand transition-all"
      >
        {service.cta.label}
        <ArrowRight className="size-3.5 transition-transform group-hover/cta:translate-x-1.5" />
      </button>
    ) : (
      <Link
        href="/contact"
        className="group/cta flex items-center gap-2 font-display text-[0.7rem] font-bold uppercase tracking-[0.14em] text-brand transition-all"
      >
        {service.cta.label}
        <ArrowRight className="size-3.5 transition-transform group-hover/cta:translate-x-1.5" />
      </Link>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-white p-8 transition-shadow hover:shadow-brand-md"
    >
      <span className="absolute right-6 top-5 font-display text-5xl font-bold text-brand/6 transition-colors group-hover:text-brand/12 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-light transition-transform duration-500 group-hover:scale-x-100" />

      <div className="mb-6 flex size-14 items-center justify-center rounded-2xl border border-line-dark bg-brand/5 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
        <Icon className="size-6" />
      </div>
      <p className="font-display text-[0.62rem] font-bold uppercase tracking-[0.22em] text-ember">
        {service.tag}
      </p>
      <h3 className="mt-1.5 font-display text-xl font-bold text-brand">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-mute">{service.desc}</p>

      {detailed && (
        <ul className="mt-5 space-y-2">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[0.82rem] text-ink">
              <Check className="size-3.5 shrink-0 text-brand-light" />
              {f}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">{cta}</div>
    </motion.div>
  );
}

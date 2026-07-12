import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  desc?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      {eyebrow && (
        <p
          className={`font-body text-[0.72rem] font-bold uppercase tracking-[0.24em] ${
            dark ? "text-gold" : "text-ember"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] ${
          dark ? "text-white" : "text-brand"
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p
          className={`mt-4 font-body text-[0.95rem] leading-relaxed ${
            dark ? "text-white/65" : "text-mute"
          }`}
        >
          {desc}
        </p>
      )}
    </Reveal>
  );
}

/** Colored emphasis inside section titles (Rubis style — plain, no italics) */
export function Accent({
  children,
  color = "ember",
}: {
  children: ReactNode;
  color?: "ember" | "gold" | "bright";
}) {
  const map = {
    ember: "text-ember",
    gold: "text-gold",
    bright: "text-brand-bright",
  } as const;
  return <span className={map[color]}>{children}</span>;
}

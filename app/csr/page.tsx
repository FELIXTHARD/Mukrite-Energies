import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Megaphone, Sprout, GraduationCap, Leaf } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading, Accent } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { CtaBanner } from "@/components/cta-banner";
import { CSR_FRAMEWORKS, CSR_IMPACT, CSR_PILLARS } from "@/lib/data";

const PAGE_DESCRIPTION =
  "Mukrite Energies' Climate & Environmental Conservation Programme — advocacy, activism and community education advancing Uganda's transition to clean, safe and affordable cooking energy.";

export const metadata: Metadata = {
  title: "Corporate Social Responsibility — Climate & Conservation",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/csr" },
  openGraph: {
    title: "CSR — Climate & Environmental Conservation Programme",
    description: PAGE_DESCRIPTION,
    url: "/csr",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const PILLAR_ICONS = [Megaphone, Sprout, GraduationCap];

export default function CsrPage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate Social Responsibility"
        title={
          <>
            Climate &amp; Environmental{" "}
            <span className="text-gold">Conservation</span>
          </>
        }
        sub="As a key player in Uganda's LPG sector, Mukrite Energies is committed to advancing the transition to clean, safe and affordable cooking energy — through advocacy, activism and community education."
        image="/images/hillside-sign.jpeg"
      />

      {/* ── Programme intro ── */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal direction="left">
              <SectionHeading
                eyebrow="Our Flagship Programme"
                title={
                  <>
                    Cleaner Cooking, <Accent>Cleaner Air</Accent>
                  </>
                }
              />
              <div className="mt-6 space-y-4 font-body text-[0.95rem] leading-relaxed text-mute">
                <p>
                  Our Climate and Environmental Conservation Programme is
                  Mukrite Energies&apos; flagship CSR initiative, built around
                  three pillars: advocacy, activism, and education and community
                  outreach.
                </p>
                <p>
                  Through this Programme we engage policymakers and industry
                  partners to strengthen the enabling environment for clean
                  cooking; take visible, on-the-ground action in the communities
                  we serve; and run sustained education campaigns that help
                  households understand the health, economic and environmental
                  benefits of switching from charcoal, firewood and kerosene to
                  LPG.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {CSR_FRAMEWORKS.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-brand/8 px-4 py-1.5 font-body text-[0.72rem] font-bold text-brand"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" className="relative">
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/images/family-cooking.jpeg"
                  alt="A Ugandan family cooking together on a Mukrite Energies LPG cylinder"
                  width={860}
                  height={720}
                  className="aspect-[6/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand/30" />
              </div>
              <div className="absolute -bottom-6 left-5 flex items-center gap-3 rounded-2xl bg-brand px-6 py-4 text-white shadow-brand-lg">
                <Leaf className="size-6 text-gold" strokeWidth={1.75} />
                <span className="font-body text-[0.65rem] font-bold uppercase leading-tight tracking-[0.14em]">
                  Every switch to LPG
                  <br />
                  cuts smoke &amp; deforestation
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Three pillars ── */}
      <section id="pillars" className="scroll-mt-24 bg-cream py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="How We Work"
            title={
              <>
                Our <Accent>Approach</Accent>
              </>
            }
            desc="Three pillars that carry the Programme from national policy rooms all the way to the kitchen."
            align="center"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {CSR_PILLARS.map((p, i) => {
              const Icon = PILLAR_ICONS[i];
              return (
                <Reveal key={p.title} delay={i * 0.1}>
                  <div className="group h-full overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1.5 hover:shadow-brand-md">
                    <div className="h-1.5 w-full bg-brand transition-colors group-hover:bg-ember" />
                    <div className="p-8">
                      <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-line-dark bg-brand/5 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <Icon className="size-5" strokeWidth={1.75} />
                      </div>
                      <p className="font-body text-[0.68rem] font-bold uppercase tracking-[0.24em] text-ember">
                        Pillar {p.no}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl font-bold text-brand">
                        {p.title}
                      </h3>
                      <p className="mt-3 font-body text-sm leading-relaxed text-mute">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Zero Emissions Day (dark) ── */}
      <section className="noise relative overflow-hidden bg-deep py-20 md:py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <div className="grid items-center gap-10 rounded-3xl border border-white/12 bg-white/5 p-9 backdrop-blur md:grid-cols-[auto_1fr] md:p-12">
              <div className="text-center md:text-left">
                <span className="block font-display text-[clamp(2.8rem,7vw,4.5rem)] font-bold leading-none text-gold">
                  21 Sept
                </span>
                <span className="mt-2 block font-body text-[0.62rem] font-bold uppercase tracking-[0.24em] text-white/70">
                  Zero Emissions Day
                </span>
              </div>
              <p className="font-body text-base leading-relaxed text-white/75">
                Each year, our Programme activities culminate around Zero
                Emissions Day, when Mukrite Energies partners with communities,
                schools and policymakers to spotlight the role clean cooking
                plays in reducing emissions and protecting public health.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              {
                src: "/images/healthy-lifestyle.jpeg",
                caption: "Household education campaigns",
              },
              {
                src: "/images/product-range.jpeg",
                caption: "Clean, safe, reliable cylinders",
              },
            ].map((p, i) => (
              <Reveal key={p.src} delay={i * 0.1}>
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/12">
                  <Image
                    src={p.src}
                    alt={p.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-night/80 via-transparent to-transparent p-4">
                    <figcaption className="font-accent text-xs italic text-white/90">
                      {p.caption}
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact ── */}
      <section id="impact" className="scroll-mt-24 bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="Measured, Not Claimed"
            title={
              <>
                Our <Accent>Impact</Accent>
              </>
            }
            desc="Where the Programme stands today, and the target we're working towards over the next 24 months."
            align="center"
          />
          <Reveal className="mt-14">
            <div className="grid overflow-hidden rounded-3xl border border-line sm:grid-cols-2 lg:grid-cols-4">
              {CSR_IMPACT.map((s) => (
                <div
                  key={s.label}
                  className="border-b border-r border-line bg-white p-9 text-center last:border-b-0 lg:border-b-0"
                >
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    className="font-display text-[clamp(1.9rem,3vw,2.4rem)] font-bold tracking-tight text-brand"
                  />
                  <p className="mt-2 font-body text-[0.65rem] font-bold uppercase leading-relaxed tracking-[0.16em] text-mute">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 text-center">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 font-display text-sm font-bold text-brand transition-colors hover:text-ember"
            >
              Meet the team behind the Programme{" "}
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Clean Energy. <Accent color="gold">Cleaner Air.</Accent> Stronger
            Communities.
          </>
        }
        sub="Switch your home or business to LPG and become part of Uganda's clean-cooking transition."
        orderLabel="Switch to Clean Gas"
        image="/images/family-cooking.jpeg"
      />
    </>
  );
}

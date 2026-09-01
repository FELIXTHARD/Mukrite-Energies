import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  BadgePercent,
  Clock,
  Handshake,
  Headset,
  Leaf,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading, Accent } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { Gallery } from "@/components/gallery";
import { CtaBanner } from "@/components/cta-banner";
import { REGIONS, VALUES } from "@/lib/data";

const PAGE_DESCRIPTION =
  "Mukrite Energies is a 100% Ugandan-owned energy company founded in 2018, supplying safe, affordable LPG gas to homes, businesses and industry across all four regions of Uganda. UNBS certified with 10,000+ customers served.";

export const metadata: Metadata = {
  title: "About Us — Uganda's Gas Supply Specialists",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Mukrite Energies — Uganda's Gas Supply Specialists",
    description: PAGE_DESCRIPTION,
    url: "/about",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const VALUE_ICONS = [ShieldCheck, BadgePercent, Clock, Handshake, Headset, Leaf];

const STATS = [
  { value: 10000, suffix: "+", label: "Cylinders Filled" },
  { value: 4, suffix: "", label: "Uganda Regions" },
  { value: 48, suffix: "hr", label: "Max Delivery Time" },
  { value: 100, suffix: "%", label: "Ugandan Owned" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={
          <>
            About <span className="text-gold">Mukrite</span>
          </>
        }
        sub="A Ugandan-owned energy company built on the belief that every home and business deserves safe, affordable, and reliable gas supply."
        image="/images/workers.jpeg"
      />

      {/* ── Story ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal direction="left" className="relative">
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/images/workers.jpeg"
                  alt="Mukrite Energies team at work"
                  width={760}
                  height={950}
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand/35" />
              </div>
              <div className="absolute -bottom-6 right-5 rounded-2xl bg-brand px-7 py-5 text-center shadow-brand-lg">
                <span className="block font-display text-4xl font-bold text-gold">
                  2018
                </span>
                <span className="mt-0.5 block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/70">
                  Founded
                </span>
              </div>
            </Reveal>

            <Reveal direction="right">
              <SectionHeading
                eyebrow="Who We Are"
                title={
                  <>
                    Uganda&apos;s Gas <Accent>Supply Specialists</Accent>
                  </>
                }
              />
              <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-mute">
                <p>
                  Mukrite Energies was founded in 2018 with a simple mission —
                  to make LPG gas accessible, safe, and affordable for every
                  Ugandan. What started as a small cylinder distribution
                  business in Kampala has grown into one of Uganda&apos;s most
                  trusted energy supply companies.
                </p>
                <p>
                  We serve households, restaurants, hotels, schools, factories,
                  and wholesale distributors across all four regions of Uganda.
                  Our team of trained gas-handling professionals ensures every
                  cylinder we supply meets UNBS safety standards.
                </p>
                <p>
                  Today, Mukrite Energies operates from its headquarters in
                  Makindye Boston, Kampala, with distribution networks spanning
                  Central, Eastern, Western, and Northern Uganda. We are proud
                  to be 100% Ugandan-owned and operated.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Stats row */}
          <Reveal className="mt-20">
            <div className="grid overflow-hidden rounded-3xl border border-line sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="border-b border-r border-line bg-white p-9 text-center last:border-b-0 lg:border-b-0"
                >
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    className="font-display text-4xl font-bold tracking-tight text-brand"
                  />
                  <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-mute">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Values ── */}
      <section id="values" className="scroll-mt-24 bg-cream py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="What Drives Us"
            title={
              <>
                Our Core <Accent>Values</Accent>
              </>
            }
            desc="Everything we do at Mukrite Energies is guided by these six principles."
            align="center"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[i];
              return (
                <Reveal key={v.title} delay={(i % 3) * 0.1}>
                  <div className="group h-full rounded-2xl border border-line bg-white p-8 transition-all hover:-translate-y-1.5 hover:shadow-brand-md">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-line-dark bg-brand/5 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-brand">
                      {v.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-mute">
                      {v.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Regions (dark) ── */}
      <section id="regions" className="noise relative scroll-mt-24 overflow-hidden bg-deep py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Coverage"
            title={
              <>
                We Operate Across{" "}
                <Accent color="gold">All of Uganda</Accent>
              </>
            }
            desc="Our distribution network spans all four regions with dedicated hubs and last-mile delivery in every major district."
            dark
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REGIONS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/12 bg-white/5 p-7 backdrop-blur transition-all hover:-translate-y-1.5 hover:border-brand-bright/40 hover:bg-white/10">
                  <MapPin className="mb-4 size-5 text-brand-bright" />
                  <h3 className="font-display text-lg font-bold text-white">
                    {r.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {r.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {r.cities.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[0.62rem] font-semibold tracking-wide text-white/80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore more: team + CSR ── */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Go Deeper"
            title={
              <>
                More About <Accent>Mukrite</Accent>
              </>
            }
            desc="The people who lead the company, and the climate programme that shapes how we grow."
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                href: "/team",
                img: "/images/plant-team.jpeg",
                eyebrow: "Leadership",
                title: "Our Team",
                desc: "Meet the management team combining energy operations, finance, marketing and partnerships expertise.",
              },
              {
                href: "/csr",
                img: "/images/family-cooking.jpeg",
                eyebrow: "Corporate Social Responsibility",
                title: "Climate & Conservation",
                desc: "Our flagship CSR programme — advocacy, activism and education driving Uganda's clean-cooking transition.",
              },
            ].map((c, i) => (
              <Reveal key={c.href} delay={i * 0.1}>
                <Link
                  href={c.href}
                  className="group relative block h-full overflow-hidden rounded-3xl"
                >
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={c.img}
                      alt={c.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/35 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <p className="font-body text-[0.68rem] font-bold uppercase tracking-[0.24em] text-gold">
                      {c.eyebrow}
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl font-bold text-white">
                      {c.title}
                    </h3>
                    <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-white/75">
                      {c.desc}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-bold text-white transition-colors group-hover:text-gold">
                      Read More <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="scroll-mt-24 bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="On the Ground"
            title={
              <>
                Mukrite in <Accent>Action</Accent>
              </>
            }
            desc="A look at our depots, fleet and team serving customers across Uganda."
            align="center"
          />
          <div className="mt-14">
            <Gallery />
          </div>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Work With <Accent color="gold">Mukrite</Accent>
          </>
        }
        sub="Order gas, become a dealer, or just say hello. We'd love to hear from you."
        orderLabel="Order Gas Now"
        image="/images/23.jpeg"
      />
    </>
  );
}

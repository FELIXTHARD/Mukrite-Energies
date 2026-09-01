import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  BadgePercent,
  Clock,
  Headset,
  MapPin,
  Leaf,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { SectionHeading, Accent } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { Testimonials } from "@/components/testimonials";
import { CtaBanner } from "@/components/cta-banner";
import { CSR_PILLARS, REGIONS, SERVICES, TEAM } from "@/lib/data";

/* Product-card images, matched to each service */
const SERVICE_IMAGES: Record<string, string> = {
  home: "/images/5.jpeg",
  business: "/images/11.jpeg",
  industrial: "/images/4.jpeg",
  refill: "/images/10.jpeg",
  delivery: "/images/14.jpeg",
  wholesale: "/images/3.jpeg",
};

const WHY_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    desc: "All cylinders are pressure-tested and meet UNBS standards before every refill.",
  },
  {
    icon: BadgePercent,
    title: "Best Market Prices",
    desc: "The most competitive rates in Uganda, with volume discounts for wholesale buyers.",
  },
  {
    icon: Clock,
    title: "Always On Time",
    desc: "Guaranteed delivery within 24–48 hours across Kampala and 72 hours upcountry.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    desc: "Call, WhatsApp, or visit our depots — a real person picks up every time.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── Welcome statement (Rubis: "Fuelling Ugandan homes and economy") ── */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            title={
              <>
                Fuelling Ugandan homes <Accent>and businesses</Accent>
              </>
            }
            align="center"
          />
          <Reveal delay={0.12} className="mx-auto mt-6 max-w-3xl text-center">
            <p className="font-body text-base leading-relaxed text-mute">
              Mukrite Energies is 100% committed to raising the bar of customer
              service to a new, higher level — offering our customers safe,
              reliable and affordable LPG gas. Order from Mukrite today and
              experience great service and high quality products, delivered to
              your door anywhere in Uganda.
            </p>
          </Reveal>

          {/* Quick stats */}
          <Reveal delay={0.2}>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-y-8 text-center sm:grid-cols-4">
              {[
                { value: 10000, suffix: "+", label: "Customers Served" },
                { value: 4, suffix: "", label: "Regions Covered" },
                { value: 48, suffix: "hr", label: "Max Delivery Time" },
                { value: 100, suffix: "%", label: "Ugandan Owned" },
              ].map((s) => (
                <div key={s.label}>
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    className="font-display text-4xl font-bold text-brand"
                  />
                  <p className="mt-1.5 font-body text-[0.7rem] font-bold uppercase tracking-[0.16em] text-mute">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Products & Services (Rubis image cards) ── */}
      <section className="bg-cream py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            title={<>Products &amp; Services</>}
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.1}>
                <div className="group h-full overflow-hidden rounded-lg bg-white shadow-brand-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-brand-lg">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={SERVICE_IMAGES[s.slug]}
                      alt={s.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-brand">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 font-body text-sm leading-relaxed text-mute">
                      {s.desc}
                    </p>
                    <Link
                      href="/services"
                      className="mt-5 inline-flex items-center gap-2 font-display text-sm font-bold text-brand transition-colors hover:text-ember"
                    >
                      Read More <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Mukrite ── */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-2">
          <Reveal direction="left" className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/images/workers.jpeg"
                alt="Mukrite Energies team inspecting cylinders"
                width={760}
                height={950}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-lg bg-brand px-6 py-4 text-white shadow-brand-md">
              <span className="font-display text-3xl font-bold">8+</span>
              <span className="font-body text-[0.65rem] font-bold uppercase tracking-[0.14em]">
                Years in
                <br />
                Operation
              </span>
            </div>
          </Reveal>

          <Reveal direction="right">
            <SectionHeading
              eyebrow="Why Choose Us"
              title={<>The Mukrite Promise</>}
              desc="We don't just sell gas. We build long-term energy partnerships rooted in safety, reliability, and fair pricing for every Ugandan."
            />
            <div className="mt-8 space-y-4">
              {WHY_FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="flex gap-4 rounded-lg border border-line p-5 transition-colors hover:border-brand/40 hover:bg-cream"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/8 text-brand">
                    <f.icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">
                      {f.title}
                    </h3>
                    <p className="mt-1 font-body text-sm leading-relaxed text-mute">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Regions ── */}
      <section className="bg-cream py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="Coverage"
            title={<>We Are All Over Uganda</>}
            desc="Distribution hubs in key cities and reliable last-mile delivery networks across all four regions."
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REGIONS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.1}>
                <div className="h-full rounded-lg bg-white p-7 shadow-brand-sm transition-all hover:-translate-y-1 hover:shadow-brand-md">
                  <MapPin className="mb-4 size-6 text-brand" strokeWidth={1.5} />
                  <h3 className="font-display text-lg font-bold text-ink">
                    {r.name}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mute">
                    {r.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {r.cities.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-brand/8 px-2.5 py-0.5 font-body text-[0.65rem] font-bold text-brand"
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

      {/* ── Clean-cooking commitment (CSR teaser) ── */}
      <section className="noise relative overflow-hidden bg-deep py-20 md:py-24">
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-2">
          <Reveal direction="left" className="relative">
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src="/images/family-cooking.jpeg"
                alt="A Ugandan family cooking together on a Mukrite Energies LPG cylinder"
                width={860}
                height={720}
                className="aspect-[6/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-5 flex items-center gap-3 rounded-2xl bg-brand px-6 py-4 text-white shadow-brand-lg">
              <Leaf className="size-6 text-gold" strokeWidth={1.75} />
              <span className="font-body text-[0.65rem] font-bold uppercase leading-tight tracking-[0.14em]">
                2,500+ households
                <br />
                cooking cleaner
              </span>
            </div>
          </Reveal>

          <Reveal direction="right">
            <SectionHeading
              eyebrow="Corporate Social Responsibility"
              title={
                <>
                  Clean Energy.{" "}
                  <Accent color="gold">Cleaner Air.</Accent> Stronger
                  Communities.
                </>
              }
              desc="Our Climate & Environmental Conservation Programme drives Uganda's shift away from charcoal, firewood and kerosene — through advocacy, activism and community education."
              dark
            />
            <div className="mt-8 space-y-3">
              {CSR_PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="flex gap-4 rounded-lg border border-white/12 bg-white/5 p-5 backdrop-blur transition-colors hover:border-brand-bright/40 hover:bg-white/10"
                >
                  <span className="font-display text-lg font-bold text-brand-bright">
                    {p.no}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-1 font-body text-sm leading-relaxed text-white/60">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="/csr"
                className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3.5 font-display text-[0.95rem] font-bold text-white transition-colors hover:bg-brand-mid"
              >
                Explore the Programme <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 rounded-md bg-white/12 px-6 py-3.5 font-display text-[0.95rem] font-bold text-white backdrop-blur transition-colors hover:bg-white/25"
              >
                Meet our team ({TEAM.length})
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Testimonials />

      <CtaBanner
        title={<>Never run out of gas again.</>}
        sub="Join thousands of homes and businesses across Uganda who trust Mukrite Energies for consistent, safe, and affordable gas supply."
      />
    </>
  );
}

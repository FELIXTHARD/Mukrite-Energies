import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  ClipboardCheck,
  Truck,
  CookingPot,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading, Accent } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { Pricing } from "@/components/pricing";
import { CtaBanner } from "@/components/cta-banner";
import { Reveal } from "@/components/reveal";
import { SERVICES, STEPS } from "@/lib/data";
import { productsJsonLd, jsonLd } from "@/lib/seo";

const PAGE_DESCRIPTION =
  "Mukrite Gas — trusted cooking gas in Uganda. LPG cylinder prices from UGX 27,000: 3kg, 6kg, 13kg, 38kg & 45kg sets and refills, doorstep delivery, and bulk supply for homes, businesses and industry.";

export const metadata: Metadata = {
  title: "Gas Products, Services & Cylinder Prices",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Mukrite Gas — Products, Services & Cylinder Prices",
    description: PAGE_DESCRIPTION,
    url: "/services",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const STEP_ICONS = [Smartphone, ClipboardCheck, Truck, CookingPot];

const PURCHASE_CHECKS = [
  "Engraved Mukrite Energies name on the cylinder collar",
  "Genuine quality assurance seal on the valve is not broken or missing",
  "UNBS quality mark is present on the cylinder",
  "Brand owner name and cylinder manufacturer are clearly marked",
  "Cylinder is in good condition with no dents, rust or damage",
  "Valve and regulator connect firmly with no gas smell",
];

export default function ServicesPage() {
  return (
    <>
      {/* Structured data: LPG cylinder products & prices */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(productsJsonLd) }}
      />
      <PageHero
        eyebrow="Mukrite Gas"
        title={<>Light up your life</>}
        sub="Mukrite Gas is trusted by consumers across Uganda for safety, reliability and affordability — available in 3kg, 6kg, 13kg, 38kg and 45kg cylinders."
        image="/images/10.jpeg"
      />

      {/* ── Intro ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            title={
              <>
                Everything Gas, <Accent>All in One Place</Accent>
              </>
            }
            align="center"
          />
          <Reveal delay={0.12} className="mx-auto mt-6 max-w-3xl text-center">
            <p className="font-body text-base leading-relaxed text-mute">
              We supply, refill, and deliver LPG gas for every customer type —
              households, businesses, and industry. In addition, we supply
              accompanying accessories such as burners, regulators, hoses and
              grills through our depots.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} detailed />
            ))}
          </div>
        </div>
      </section>

      {/* ── How to order ── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="Simple Process"
            title={<>How to Order From Us</>}
            desc="Getting gas from Mukrite Energies is quick and easy. Here's how it works."
            align="center"
          />
          <div className="relative mt-14 grid gap-10 md:grid-cols-4">
            <span className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-line-dark md:block" />
            {STEPS.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <Reveal key={s.title} delay={i * 0.12}>
                  <div className="relative text-center">
                    <div className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-white text-brand shadow-brand-sm">
                      <Icon className="size-6" strokeWidth={1.5} />
                      <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-ember font-display text-[0.7rem] font-bold text-white">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-base font-bold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-mute">
                      {s.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Pricing />

      {/* ── Safety & purchase guide (Rubis Gas Safety Guide style) ── */}
      <section id="safety" className="scroll-mt-24 bg-white py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-2">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Safety Guide"
              title={<>Mukrite Gas Purchase Guide</>}
              desc="When buying your cooking gas, please ensure the following:"
            />
            <ul className="mt-7 space-y-3.5">
              {PURCHASE_CHECKS.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-brand" />
                  <span className="font-body text-[0.95rem] leading-relaxed text-ink">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-7 font-body text-sm leading-relaxed text-mute">
              Always store and use your cylinder upright with the valve facing
              upwards, away from heat sources, in a well-ventilated area on or
              above ground level.
            </p>
          </Reveal>
          <Reveal direction="right">
            <Image
              src="/images/howto.jpeg"
              alt="How to place a Mukrite Energies LPG cylinder safely"
              width={640}
              height={640}
              className="w-full rounded-lg bg-cream object-contain p-4 shadow-brand-sm"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Commercial strip ── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid items-center gap-10 rounded-lg bg-brand p-10 md:grid-cols-[1.6fr_1fr] md:p-14">
            <div>
              <h2 className="font-display text-3xl font-bold text-white">
                Commercial
              </h2>
              <p className="mt-4 max-w-2xl font-body text-[0.95rem] leading-relaxed text-white/80">
                Our expansive commercial client base in Uganda comprises
                various industries and institutions — restaurants, leading
                manufacturing companies, schools, hospitals, hotel chains and
                poultry farmers. For commercial LPG supply, please get in touch
                with us.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 font-display text-[0.95rem] font-bold text-brand transition-colors hover:bg-gold"
              >
                Get In Touch <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title={<>Ready to place your order?</>}
        sub="Contact us today and get your gas delivered within 48 hours anywhere in Uganda."
        image="/images/21.jpeg"
      />
    </>
  );
}

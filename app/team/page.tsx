import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Users, HeartHandshake, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading, Accent } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { CtaBanner } from "@/components/cta-banner";
import { TEAM, teamEmail } from "@/lib/data";

const PAGE_DESCRIPTION =
  "Meet the Mukrite Energies management team — combining energy sector operations, finance, marketing and partnerships expertise to build Uganda's clean-cooking transition.";

export const metadata: Metadata = {
  title: "Our Team — Mukrite Energies Leadership",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Our Team — Mukrite Energies Leadership",
    description: PAGE_DESCRIPTION,
    url: "/team",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const STRENGTHS = [
  {
    icon: Briefcase,
    title: "Operations & Manufacturing",
    desc: "Hands-on experience running a local LPG cylinder manufacturing and filling operation to UNBS standards.",
  },
  {
    icon: Users,
    title: "Distribution at Scale",
    desc: "Building the household and micro-hub network that puts safe, affordable gas within reach of every community.",
  },
  {
    icon: HeartHandshake,
    title: "Partnerships & Community",
    desc: "Relationships with policymakers, dealers and local leaders that turn clean-cooking targets into real adoption.",
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            Our <span className="text-gold">Team</span>
          </>
        }
        sub="Mukrite Energies is led by a management team combining energy sector operations, finance, marketing and partnerships expertise — united in building Uganda's clean-cooking transition."
        image="/images/plant-team.jpeg"
      />

      {/* ── Intro ── */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal direction="left" className="relative">
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="/images/plant-team.jpeg"
                  alt="Mukrite Energies leadership at the cylinder store"
                  width={760}
                  height={950}
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand/35" />
              </div>
              <div className="absolute -bottom-6 right-5 rounded-2xl bg-brand px-7 py-5 text-center shadow-brand-lg">
                <span className="block font-display text-4xl font-bold text-gold">
                  {TEAM.length}
                </span>
                <span className="mt-0.5 block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/70">
                  Leaders
                </span>
              </div>
            </Reveal>

            <Reveal direction="right">
              <SectionHeading
                eyebrow="Leadership"
                title={
                  <>
                    The People Behind <Accent>Mukrite</Accent>
                  </>
                }
              />
              <p className="mt-6 font-body text-[0.95rem] leading-relaxed text-mute">
                Our leadership team brings together the operational, financial
                and partnership expertise needed to scale safe, affordable LPG
                access across Uganda — while keeping community impact and
                environmental responsibility at the center of how we grow.
              </p>
              <div className="mt-8 space-y-4">
                {STRENGTHS.map((s) => (
                  <div
                    key={s.title}
                    className="flex gap-4 rounded-lg border border-line p-5 transition-colors hover:border-brand/40 hover:bg-cream"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/8 text-brand">
                      <s.icon className="size-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-1 font-body text-sm leading-relaxed text-mute">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Management team ── */}
      <section id="management" className="scroll-mt-24 bg-cream py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="Who We Are"
            title={
              <>
                Management <Accent>Team</Accent>
              </>
            }
            desc="Four leaders driving strategy, finance, market growth and community partnerships across Uganda."
            align="center"
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={(i % 2) * 0.1}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1.5 hover:shadow-brand-md">
                  <div className="h-1.5 w-full shrink-0 bg-brand transition-colors group-hover:bg-ember" />
                  <div className="flex flex-1 flex-col p-8">
                    <span className="flex size-14 items-center justify-center rounded-full bg-brand font-display text-lg font-bold tracking-wide text-white shadow-brand-sm transition-colors group-hover:bg-ember">
                      {m.initials}
                    </span>
                    <h3 className="mt-5 font-display text-xl font-bold text-brand">
                      {m.name}
                    </h3>
                    <p className="mt-1 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ember">
                      {m.role}
                    </p>
                    <p className="mb-6 mt-3.5 font-body text-sm leading-relaxed text-mute">
                      {m.bio}
                    </p>
                    <a
                      href={`mailto:${teamEmail(m)}?subject=${encodeURIComponent(
                        `Enquiry for ${m.name}, ${m.role}`,
                      )}`}
                      className="mt-auto flex items-center gap-2 border-t border-line pt-5 font-body text-sm font-semibold text-brand transition-colors hover:text-ember"
                    >
                      <Mail className="size-4 shrink-0" />
                      <span className="break-all">{teamEmail(m)}</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team at work (dark) ── */}
      <section className="noise relative overflow-hidden bg-deep py-20 md:py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="On the Ground"
            title={
              <>
                Backed by a Team That{" "}
                <Accent color="gold">Shows Up</Accent>
              </>
            }
            desc="Behind the management team is a trained workforce of plant operators, drivers and depot staff who handle every cylinder to UNBS standards."
            dark
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/images/filling-plant.jpeg", caption: "Certified filling plant operations" },
              { src: "/images/hillside-sign.jpeg", caption: "Mukrite Energies UG Ltd" },
              { src: "/images/workers.jpeg", caption: "Delivery and depot crew" },
            ].map((p, i) => (
              <Reveal key={p.src} delay={i * 0.1}>
                <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/12">
                  <Image
                    src={p.src}
                    alt={p.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-108"
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

          <Reveal delay={0.2} className="mt-12">
            <Link
              href="/csr"
              className="inline-flex items-center gap-2 rounded-md bg-white/12 px-6 py-3.5 font-display text-[0.95rem] font-bold text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              See our climate programme <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Let&apos;s Build The <Accent color="gold">Clean-Cooking</Accent>{" "}
            Transition Together
          </>
        }
        sub="Partner with our team on distribution, community programmes, or bulk supply — we'd love to hear from you."
        orderLabel="Order Gas Now"
        image="/images/filling-plant.jpeg"
      />
    </>
  );
}

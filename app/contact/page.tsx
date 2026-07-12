import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  BadgePercent,
  FileText,
  Megaphone,
  Truck,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading, Accent } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ContactForm, DealerForm, QuickReach } from "@/components/contact-forms";
import { Faq } from "@/components/faq";
import { WhatsAppIcon } from "@/components/icons";
import { CONTACT, waLink } from "@/lib/data";
import { faqJsonLd, jsonLd } from "@/lib/seo";

const PAGE_DESCRIPTION =
  "Order gas or get a quote: call or WhatsApp +256 785 239 229, email energymukrite@gmail.com, or visit our depot in Makindye Boston, Kampala. Open Mon–Sat, 8am–6pm. Dealer enquiries welcome.";

export const metadata: Metadata = {
  title: "Contact Us — Order Gas, Quotes & Dealer Enquiries",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Mukrite Energies — Order Gas & Dealer Enquiries",
    description: PAGE_DESCRIPTION,
    url: "/contact",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

const DEALER_PERKS = [
  {
    icon: BadgePercent,
    title: "Preferential Pricing",
    desc: "Access wholesale rates and volume discounts not available to retail customers.",
  },
  {
    icon: FileText,
    title: "Credit Terms Available",
    desc: "Qualified dealers get flexible payment terms to manage cash flow.",
  },
  {
    icon: Megaphone,
    title: "Marketing Support",
    desc: "Branded materials, promotional support, and a listing on our website.",
  },
  {
    icon: Truck,
    title: "Priority Supply",
    desc: "Dealers get first priority on stock during high-demand periods.",
  },
];

export default function ContactPage() {
  const cards = [
    {
      icon: <Phone className="size-5" />,
      label: "Call Us",
      value: CONTACT.phoneDisplay,
      note: "Mon – Sat, 8am – 6pm",
      href: CONTACT.phoneHref,
    },
    {
      icon: <WhatsAppIcon className="size-5" />,
      label: "WhatsApp",
      value: CONTACT.phoneDisplay,
      note: "Fastest response — usually within minutes",
      href: waLink("Hello Mukrite Energies!"),
      external: true,
    },
    {
      icon: <Mail className="size-5" />,
      label: "Email",
      value: CONTACT.email,
      note: "We reply within 1–2 business hours",
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: <MapPin className="size-5" />,
      label: "Visit Our Depot",
      value: CONTACT.address,
      note: "Walk-ins welcome, Mon – Sat",
    },
  ];

  return (
    <>
      {/* Structured data: FAQ rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }}
      />
      <PageHero
        eyebrow="Contact Us"
        title={<>We are always here to help you</>}
        sub="Call, WhatsApp, email, or visit us at our depot in Kampala. A real person picks up every time."
        image="/images/17.jpeg"
      />

      {/* ── Main contact ── */}
      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 md:px-8 lg:grid-cols-2">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Reach Us"
              title={<>Get In Touch</>}
              desc="For more information, contact us through any of these channels — whether you want to place an order, get a quote, or ask a question."
            />
            <div className="mt-8 space-y-3.5">
              {cards.map((c) => {
                const inner = (
                  <>
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-line-dark bg-brand/5 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-mute">
                        {c.label}
                      </p>
                      <p className="font-display text-base font-bold text-brand">
                        {c.value}
                      </p>
                      <p className="text-xs text-mute">{c.note}</p>
                    </div>
                  </>
                );
                const cls =
                  "group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-brand-light hover:shadow-brand-sm";
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    className={cls}
                    {...(c.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </div>
            <QuickReach />
          </Reveal>

          <Reveal direction="right">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* ── Become a dealer ── */}
      <section className="noise relative overflow-hidden bg-deep py-24">
        <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-14 px-5 md:px-8 lg:grid-cols-2">
          <Reveal direction="left">
            <SectionHeading
              eyebrow="Partnership"
              title={
                <>
                  Become a <Accent color="gold">Mukrite Dealer</Accent>
                </>
              }
              desc="Are you a retailer, distributor, or entrepreneur looking to enter the gas supply business? Partner with Mukrite Energies and access Uganda's most reliable wholesale gas supply network."
              dark
            />
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {DEALER_PERKS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-white/12 bg-white/5 p-6 backdrop-blur transition-colors hover:bg-white/10"
                >
                  <p.icon className="mb-3 size-5 text-brand-bright" />
                  <h3 className="font-display text-[0.95rem] font-bold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right">
            <DealerForm />
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Questions"
            title={
              <>
                Frequently <Accent>Asked</Accent>
              </>
            }
            desc="Quick answers to the things customers ask us most."
            align="center"
          />
          <div className="mt-12">
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}

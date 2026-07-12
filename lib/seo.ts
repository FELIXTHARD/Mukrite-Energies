import { CONTACT, CYLINDERS, FAQS, ugx } from "@/lib/data";

/** Canonical site origin — override via NEXT_PUBLIC_SITE_URL when the domain changes. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://felixthard.github.io/pro-one";

export const SITE_NAME = "Mukrite Energies";

export const DEFAULT_TITLE =
  "Mukrite Energies — LPG Gas Delivery, Refilling & Wholesale in Uganda";

export const DEFAULT_DESCRIPTION =
  "Uganda's trusted LPG gas supply specialists since 2018. Order 3kg–45kg gas cylinders, refills and bulk supply with same-day delivery in Kampala and nationwide coverage. UNBS certified, 100% Ugandan owned.";

export const KEYWORDS = [
  "gas delivery Uganda",
  "LPG gas Kampala",
  "cooking gas Uganda",
  "gas cylinder prices Uganda",
  "gas refill Kampala",
  "13kg gas cylinder Uganda",
  "6kg gas cylinder price",
  "wholesale gas supplier Uganda",
  "bulk LPG supply",
  "gas delivery near me",
  "Mukrite Energies",
  "Mukrite gas",
];

/* ── JSON-LD structured data ── */

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "Mukrite Energies Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  foundingDate: "2018",
  slogan: "Powering every Ugandan home",
  email: CONTACT.email,
  telephone: "+256785239229",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Makindye Boston",
    addressLocality: "Kampala",
    addressCountry: "UG",
  },
  sameAs: [CONTACT.tiktok, CONTACT.x],
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  image: `${SITE_URL}/images/og-image.jpg`,
  url: SITE_URL,
  telephone: "+256785239229",
  email: CONTACT.email,
  priceRange: "UGX 27,000 – UGX 630,000",
  currenciesAccepted: "UGX",
  paymentAccepted: "Cash, Mobile Money",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Makindye Boston",
    addressLocality: "Kampala",
    addressCountry: "UG",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
  areaServed: { "@type": "Country", name: "Uganda" },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-UG",
};

/** Product offers for every cylinder size (new set + refill). */
export const productsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mukrite Gas LPG Cylinders",
  itemListElement: CYLINDERS.flatMap((c, i) => [
    {
      "@type": "Product",
      position: i * 2 + 1,
      name: `${c.kg}kg LPG Gas Cylinder — Complete Set`,
      description: `${c.kg}kg cooking gas complete set (cylinder + gas + regulator) for ${c.use.toLowerCase()}. ${ugx(c.set)}.`,
      brand: { "@type": "Brand", name: SITE_NAME },
      offers: {
        "@type": "Offer",
        price: c.set,
        priceCurrency: "UGX",
        availability: "https://schema.org/InStock",
        areaServed: "UG",
      },
    },
    {
      "@type": "Product",
      position: i * 2 + 2,
      name: `${c.kg}kg LPG Gas Refill`,
      description: `${c.kg}kg cooking gas refill for ${c.use.toLowerCase()}. ${ugx(c.refill)}.`,
      brand: { "@type": "Brand", name: SITE_NAME },
      offers: {
        "@type": "Offer",
        price: c.refill,
        priceCurrency: "UGX",
        availability: "https://schema.org/InStock",
        areaServed: "UG",
      },
    },
  ]),
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** Serialize JSON-LD safely for a <script> tag. */
export const jsonLd = (data: object) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

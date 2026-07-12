export const CONTACT = {
  phoneDisplay: "+256 785 239 229",
  phoneHref: "tel:+256785239229",
  whatsapp: "256785239229",
  email: "energymukrite@gmail.com",
  address: "Makindye Boston, Kampala",
  tiktok: "https://tiktok.com/@mukriteenergies",
  x: "https://x.com/MukriteEnergy",
};

export const waLink = (text: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailtoLink = (subject: string, body: string) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const ugx = (n: number) => `UGX ${n.toLocaleString("en-US")}`;

/* ── Cylinders & pricing ── */
export type OrderMode = "set" | "refill";

export type Cylinder = {
  kg: number;
  tier: string;
  use: string;
  set: number;
  refill: number;
  popular?: boolean;
};

export const CYLINDERS: Cylinder[] = [
  { kg: 3, tier: "Starter", use: "Single rooms & studios", set: 95_000, refill: 27_000 },
  { kg: 6, tier: "Small", use: "Small households, hostels", set: 125_000, refill: 45_000 },
  { kg: 13, tier: "Standard", use: "Families, restaurants, schools", set: 230_000, refill: 90_000, popular: true },
  { kg: 38, tier: "Commercial", use: "Caterers, canteens, bakeries", set: 570_000, refill: 210_000 },
  { kg: 45, tier: "Large", use: "Hotels, factories, institutions", set: 630_000, refill: 250_000 },
];

/* ── Services ── */
export type Service = {
  slug: string;
  tag: string;
  title: string;
  desc: string;
  features: string[];
  cta: { label: string; action: "order" | "contact" };
};

export const SERVICES: Service[] = [
  {
    slug: "home",
    tag: "Residential",
    title: "Home Gas Supply",
    desc: "Reliable LPG cylinder delivery for households across Uganda. Never run out of cooking gas again.",
    features: [
      "6kg & 13kg cylinders",
      "Same-day delivery in Kampala",
      "Flexible payment options",
      "Monthly subscription available",
    ],
    cta: { label: "Order Now", action: "order" },
  },
  {
    slug: "business",
    tag: "Commercial",
    title: "Business & Hospitality",
    desc: "Bulk gas supply for restaurants, hotels, schools and institutions with flexible delivery schedules.",
    features: [
      "13kg & 50kg cylinders",
      "Volume discount pricing",
      "Dedicated account manager",
      "Credit terms available",
    ],
    cta: { label: "Get a Quote", action: "contact" },
  },
  {
    slug: "industrial",
    tag: "Industrial",
    title: "Industrial Bulk Gas",
    desc: "High-volume cylinder supply for manufacturing, construction and processing facilities.",
    features: [
      "50kg cylinders & bulk tanks",
      "Priority supply guarantee",
      "Nationwide delivery",
      "Safety compliance support",
    ],
    cta: { label: "Enquire", action: "contact" },
  },
  {
    slug: "refill",
    tag: "Refilling",
    title: "Cylinder Refill Service",
    desc: "Fast, safe refilling of all standard LPG cylinders at our depots. Bring your empty, leave with a full one.",
    features: [
      "All cylinder sizes accepted",
      "Pressure-tested before fill",
      "Walk-in, no appointment",
      "UNBS certified process",
    ],
    cta: { label: "Find a Depot", action: "contact" },
  },
  {
    slug: "delivery",
    tag: "Logistics",
    title: "Doorstep Delivery",
    desc: "Schedule a delivery at your convenience. Our fleet covers Kampala and surrounding districts.",
    features: [
      "24–48hr delivery time",
      "Real-time order tracking",
      "SMS delivery confirmation",
      "Safe handling guaranteed",
    ],
    cta: { label: "Schedule Delivery", action: "order" },
  },
  {
    slug: "wholesale",
    tag: "Wholesale",
    title: "Wholesale Distribution",
    desc: "Partner with Mukrite as a sub-dealer or distributor. Access preferential pricing and credit terms.",
    features: [
      "Preferential pricing tiers",
      "Credit terms for dealers",
      "Regional exclusivity options",
      "Marketing support",
    ],
    cta: { label: "Become a Partner", action: "contact" },
  },
];

/* ── Regions ── */
export const REGIONS = [
  {
    name: "Central Region",
    desc: "Our headquarters and primary distribution hub. Fastest delivery — same day available in Kampala.",
    cities: ["Kampala", "Entebbe", "Wakiso", "Mukono"],
  },
  {
    name: "Eastern Region",
    desc: "Serving the bustling commercial towns of eastern Uganda with bulk and retail gas.",
    cities: ["Jinja", "Mbale", "Tororo", "Soroti"],
  },
  {
    name: "Western Region",
    desc: "Reliable supply to western districts including the tourism and hospitality sectors.",
    cities: ["Mbarara", "Fort Portal", "Kasese", "Kabale"],
  },
  {
    name: "Northern Region",
    desc: "Expanding coverage serving homes and businesses across the growing northern region.",
    cities: ["Gulu", "Lira", "Arua", "Kitgum"],
  },
];

/* ── Company values ── */
export const VALUES = [
  {
    title: "Safety Above All",
    desc: "Every cylinder is pressure-tested and UNBS certified before leaving our depot. Zero compromise on safety.",
  },
  {
    title: "Fair Pricing",
    desc: "Every Ugandan deserves affordable cooking energy. Competitive rates with transparent, no-hidden-fee pricing.",
  },
  {
    title: "Reliability",
    desc: "We show up when we say we will. Our logistics network guarantees on-time delivery — every single order.",
  },
  {
    title: "Community First",
    desc: "As a Ugandan-owned business we reinvest in the communities we serve, support local dealers and create jobs.",
  },
  {
    title: "Dedicated Support",
    desc: "A real person always picks up our phone. From first order to account management, we are here for you.",
  },
  {
    title: "Sustainability",
    desc: "LPG burns cleaner than charcoal and firewood. Every customer we gain helps cut deforestation and indoor smoke.",
  },
];

/* ── Order steps ── */
export const STEPS = [
  {
    title: "Place Your Order",
    desc: "Call, WhatsApp, or use the order button. Tell us the size and number of cylinders you need.",
  },
  {
    title: "Confirm & Pay",
    desc: "Our team confirms your order and delivery time. Pay on delivery or via mobile money in advance.",
  },
  {
    title: "We Deliver",
    desc: "Your gas arrives safely at your door within 24–48 hours in Kampala, 72 hours upcountry.",
  },
  {
    title: "Cook Away!",
    desc: "Enjoy uninterrupted cooking. Reorder anytime — we keep track so you never run out.",
  },
];

/* ── Testimonials ── */
export const TESTIMONIALS = [
  {
    quote:
      "Mukrite has supplied our restaurant for two years without a single missed delivery. When we call, gas arrives the same day. That reliability keeps our kitchen running.",
    name: "Sarah Nakato",
    role: "Restaurant Owner · Ntinda, Kampala",
  },
  {
    quote:
      "We switched our hotel to Mukrite's 45kg cylinders and cut our energy costs noticeably. Their account manager checks in before we even think of reordering.",
    name: "David Okello",
    role: "Hotel Operations Manager · Jinja",
  },
  {
    quote:
      "As a first-time gas user I was nervous about safety. The delivery team installed everything, tested for leaks and showed me exactly how to use it. Wonderful service.",
    name: "Grace Namuli",
    role: "Home Customer · Wakiso",
  },
  {
    quote:
      "Becoming a Mukrite dealer was the best business decision I made. Fair wholesale prices, priority stock and they even helped me brand my shop.",
    name: "Ibrahim Ssenyonga",
    role: "Gas Dealer · Mbarara",
  },
];

/* ── FAQs ── */
export const FAQS = [
  {
    q: "How fast is delivery?",
    a: "Within Kampala we deliver in 24–48 hours, with same-day delivery often available in central areas. Upcountry orders arrive within 72 hours.",
  },
  {
    q: "What does a complete set include?",
    a: "A complete set includes the cylinder, a full charge of gas, and a regulator — everything you need to start cooking right away.",
  },
  {
    q: "How can I pay?",
    a: "Pay cash on delivery, or in advance via mobile money (MTN MoMo and Airtel Money). Wholesale clients can apply for credit terms.",
  },
  {
    q: "Do you refill cylinders from other brands?",
    a: "Yes — we safely refill all standard LPG cylinders. Every cylinder is pressure-tested and inspected before filling, following UNBS standards.",
  },
  {
    q: "Do you offer bulk or wholesale discounts?",
    a: "Absolutely. Restaurants, institutions and dealers get volume-based pricing. Contact us for a tailored quote or apply through the dealer form.",
  },
];

/* ── Partners ── */
export const PARTNERS = [
  "Rolex Chapati Co.",
  "Hotel Africana",
  "Nakumatt Foods",
  "Kampala Bakeries",
  "Uganda Breweries",
  "Jinja Resorts",
  "Central Foods Ltd",
  "Mbarara Caterers",
];

/* ── Ticker headlines ── */
export const TICKER_ITEMS = [
  "LPG Cylinders",
  "3kg · 6kg · 13kg · 38kg · 45kg",
  "Cylinder Refilling",
  "Bulk Industrial Supply",
  "Wholesale & Retail",
  "Kampala Same-Day Delivery",
  "Nationwide Coverage",
  "UNBS Safety Certified",
];

/* ── Photo album (marquee + gallery) ── */
export const ALBUM = [
  { src: "/images/1.jpeg", caption: "Gas delivery — Kampala" },
  { src: "/images/2.jpeg", caption: "Safe cylinder placement" },
  { src: "/images/3.jpeg", caption: "Wholesale depot, Nakawa" },
  { src: "/images/4.jpeg", caption: "Industrial bulk supply" },
  { src: "/images/5.jpeg", caption: "Residential home service" },
  { src: "/images/6.jpeg", caption: "Cylinder safety check" },
  { src: "/images/7.jpeg", caption: "Delivery team ready" },
  { src: "/images/8.jpeg", caption: "Kampala distribution" },
  { src: "/images/9.jpeg", caption: "Quality inspection" },
  { src: "/images/10.jpeg", caption: "Filling station" },
  { src: "/images/11.jpeg", caption: "Retail customers" },
  { src: "/images/12.jpeg", caption: "Bulk order loading" },
];

export const GALLERY = [
  { src: "/images/13.jpeg", caption: "Depot operations" },
  { src: "/images/14.jpeg", caption: "Fleet vehicles" },
  { src: "/images/15.jpeg", caption: "Customer delivery" },
  { src: "/images/16.jpeg", caption: "Safety training" },
  { src: "/images/17.jpeg", caption: "Team at work" },
  { src: "/images/18.jpeg", caption: "Community supply" },
  { src: "/images/19.jpeg", caption: "Cylinder stock" },
  { src: "/images/20.jpeg", caption: "Wholesale loading" },
  { src: "/images/21.jpeg", caption: "On the road" },
  { src: "/images/22.jpeg", caption: "Depot inspection" },
  { src: "/images/23.jpeg", caption: "Ready for dispatch" },
  { src: "/images/24.jpeg", caption: "Serving Uganda" },
];

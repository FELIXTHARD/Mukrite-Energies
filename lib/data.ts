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
  { src: "/images/hillside-sign.jpeg", caption: "Mukrite Energies UG Ltd" },
  { src: "/images/filling-plant.jpeg", caption: "Certified filling plant" },
  { src: "/images/plant-team.jpeg", caption: "Cylinder store & stock" },
  { src: "/images/product-range.jpeg", caption: "Clean. Safe. Reliable." },
];

/* ── Management team ── */
/** Domain the role-based team mailboxes live on. Change here to update all of them. */
export const MAIL_DOMAIN = "mukriteenergies.com";

export type TeamMember = {
  name: string;
  initials: string;
  role: string;
  /** Mailbox local-part; the address is `${mailbox}@${MAIL_DOMAIN}`. */
  mailbox: string;
  bio: string;
};

/** Full address for a team member, e.g. md@mukriteenergies.com */
export const teamEmail = (m: TeamMember) => `${m.mailbox}@${MAIL_DOMAIN}`;

export const TEAM: TeamMember[] = [
  {
    name: "Mukhwana Ronald",
    initials: "MR",
    mailbox: "md",
    role: "Managing Director",
    bio: "Leads Mukrite Energies' overall strategy and operations, driving the company's growth as a local LPG cylinder manufacturing and clean-cooking distribution enterprise.",
  },
  {
    name: "Namono Mary",
    initials: "NM",
    mailbox: "finance",
    role: "Chief Finance Officer",
    bio: "Oversees the company's financial management and planning, supporting sustainable growth of the household and micro-hub distribution network.",
  },
  {
    name: "Ssegawa Solomon",
    initials: "SS",
    mailbox: "marketing",
    role: "Marketing Lead",
    bio: "Drives market growth and customer engagement, building awareness of clean-cooking adoption among households and communities.",
  },
  {
    name: "Atukunda Haggai",
    initials: "AH",
    mailbox: "partnerships",
    role: "Partnerships & Community Liaison",
    bio: "Builds and manages strategic partnerships that expand Mukrite Energies' reach and support delivery of its climate and community programmes.",
  },
];

/* ── CSR: Climate & Environmental Conservation Programme ── */
export const CSR_FRAMEWORKS = [
  "Paris Agreement & Uganda NDC",
  "UN SDGs 3 · 5 · 7 · 13 · 15",
  "WLPGA Cooking for Life",
];

export const CSR_PILLARS = [
  {
    no: "01",
    title: "Advocacy",
    desc: "Engaging policymakers, industry bodies and the media to strengthen the enabling environment for clean cooking and emissions reduction in Uganda.",
  },
  {
    no: "02",
    title: "Activism",
    desc: "Visible, on-the-ground action — tree-planting, clean-up drives and safe-appliance campaigns — that demonstrates our commitment beyond statements.",
  },
  {
    no: "03",
    title: "Education & Outreach",
    desc: "Building grassroots understanding of clean energy choices and their impact on health, household economics and the environment.",
  },
];

export const CSR_IMPACT = [
  { value: 2500, suffix: "+", label: "Clean-cooking households served" },
  { value: 18, suffix: "%", label: "Month-on-month refill growth" },
  { value: 3200, suffix: " MT", label: "CO₂e avoided annually" },
  { value: 32000, suffix: " MT", label: "CO₂e/yr target — 24-month roadmap" },
];

/* ── Media: YouTube videos ── */
export type VideoCategory = "Company" | "Safety" | "Community" | "How-To";

export const VIDEO_CATEGORIES: VideoCategory[] = [
  "Company",
  "Safety",
  "Community",
  "How-To",
];

export type Video = {
  /**
   * YouTube video ID — the part after `v=` in a watch URL
   * (`https://youtube.com/watch?v=ABC123xyz` becomes `"ABC123xyz"`).
   * Leave empty and the card renders a "coming soon" state instead of a player.
   */
  youtubeId: string;
  title: string;
  desc: string;
  /**
   * Local still used as the card thumbnail. Nothing is requested from YouTube
   * until the visitor presses play, which keeps the page fast and cookie-free.
   */
  poster: string;
  category: VideoCategory;
  /** Display only, e.g. "4:12". */
  duration: string;
};

export const VIDEOS: Video[] = [
  {
    youtubeId: "",
    title: "Inside Our Certified Filling Plant",
    desc: "A walk through the depot where every Mukrite cylinder is inspected, pressure-tested and filled to UNBS standard.",
    poster: "/images/filling-plant.jpeg",
    category: "Company",
    duration: "4:12",
  },
  {
    youtubeId: "",
    title: "How to Connect Your Cylinder Safely",
    desc: "Step by step: fitting the regulator, checking for leaks with soapy water, and the three things never to do in your kitchen.",
    poster: "/images/howto.jpeg",
    category: "How-To",
    duration: "3:05",
  },
  {
    youtubeId: "",
    title: "Zero Emissions Day — Community Drive",
    desc: "Highlights from our Climate and Environmental Conservation Programme's flagship day of action across Kampala.",
    poster: "/images/hillside-sign.jpeg",
    category: "Community",
    duration: "5:48",
  },
  {
    youtubeId: "",
    title: "Cylinder Sizes Explained — 3kg to 45kg",
    desc: "Which cylinder fits your home, restaurant or factory, how long each one lasts, and what a complete set includes.",
    poster: "/images/product-range.jpeg",
    category: "How-To",
    duration: "2:37",
  },
  {
    youtubeId: "",
    title: "Meet the Delivery Team",
    desc: "The riders and drivers who get gas to your door in 24–48 hours, and how they keep every load safe on the road.",
    poster: "/images/workers.jpeg",
    category: "Company",
    duration: "3:51",
  },
  {
    youtubeId: "",
    title: "From Charcoal to Clean Cooking",
    desc: "Ugandan families on what changed after they switched to LPG — the cost, the smoke, and the time saved.",
    poster: "/images/family-cooking.jpeg",
    category: "Community",
    duration: "6:20",
  },
];

/** Privacy-preserving embed URL — youtube-nocookie, autoplaying on open. */
export const youtubeEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export const youtubeWatch = (id: string) =>
  `https://www.youtube.com/watch?v=${id}`;

/* ── Media: events ── */
export type EventItem = {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD) the event starts. Drives the upcoming/past split. */
  date: string;
  /** ISO date the event ends. Omit for single-day events. */
  endDate?: string;
  time: string;
  venue: string;
  location: string;
  desc: string;
  image: string;
  tag: string;
  /** Upcoming events: what a visitor gets by turning up. */
  highlights?: string[];
  /** Past events: what the event actually delivered. */
  outcomes?: string[];
};

/**
 * The date the upcoming/past split is rendered against at build time. The site
 * is a static export, so the timeline re-splits against the real clock once it
 * mounts — this constant only keeps server and client markup identical on the
 * first paint. Bump it whenever you edit the list below.
 */
export const EVENTS_AS_OF = "2026-09-01";

/** Last instant of an event's final day — it stays "upcoming" all day. */
export const eventEndMs = (e: EventItem) =>
  new Date(`${e.endDate ?? e.date}T23:59:59`).getTime();

/** "21 September 2026", or "17–18 October 2026" for a multi-day event. */
export const eventDateLabel = (e: EventItem) => {
  const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", opts);
  const long: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  if (!e.endDate) return fmt(e.date, long);
  const sameMonth = e.date.slice(0, 7) === e.endDate.slice(0, 7);
  return sameMonth
    ? `${fmt(e.date, { day: "numeric" })}–${fmt(e.endDate, long)}`
    : `${fmt(e.date, { day: "numeric", month: "long" })} – ${fmt(e.endDate, long)}`;
};

export const EVENTS: EventItem[] = [
  {
    slug: "zero-emissions-day-2026",
    title: "Zero Emissions Day Community Drive",
    date: "2026-09-21",
    time: "9:00 AM – 4:00 PM",
    venue: "Makindye Boston Grounds",
    location: "Kampala",
    tag: "Climate Programme",
    desc: "Our Climate and Environmental Conservation Programme's flagship day of action. Households, schools and policymakers meet to mark Zero Emissions Day with clean-cooking demonstrations and a tree-planting drive.",
    image: "/images/hillside-sign.jpeg",
    highlights: [
      "Live LPG cooking demonstrations",
      "Free cylinder safety inspections",
      "Tree seedlings for every household",
      "Switch-to-gas discount on the day",
    ],
  },
  {
    slug: "nakawa-safety-clinic",
    title: "Clean Cooking Safety Clinic",
    date: "2026-10-03",
    time: "10:00 AM – 3:00 PM",
    venue: "Nakawa Market",
    location: "Kampala",
    tag: "Safety",
    desc: "A walk-in clinic for market vendors and nearby households. Bring any cylinder — whatever the brand — for a free leak test, regulator check and hands-on safety briefing.",
    image: "/images/howto.jpeg",
    highlights: [
      "Free leak and regulator testing",
      "Hands-on handling training",
      "Damaged-cylinder trade-in offer",
      "Safety guides in Luganda and English",
    ],
  },
  {
    slug: "dealer-training-october",
    title: "Dealer & Sub-Distributor Training",
    date: "2026-10-17",
    endDate: "2026-10-18",
    time: "8:30 AM – 5:00 PM daily",
    venue: "Mukrite Depot, Makindye",
    location: "Kampala",
    tag: "Partners",
    desc: "Two days for current and prospective dealers covering safe storage, stock handling, UNBS compliance and the wholesale pricing tiers — plus how to apply for credit terms.",
    image: "/images/plant-team.jpeg",
    highlights: [
      "UNBS compliance walkthrough",
      "Wholesale pricing and credit terms",
      "Depot storage and stock rotation",
      "Certificate on completion",
    ],
  },
  {
    slug: "mbarara-depot-open-day",
    title: "Mbarara Regional Depot Open Day",
    date: "2026-11-07",
    time: "9:00 AM – 2:00 PM",
    venue: "Mbarara Distribution Hub",
    location: "Mbarara",
    tag: "Western Region",
    desc: "We open the doors of our western hub to customers, hoteliers and caterers. Tour the filling floor, meet the regional team and set up a bulk supply account on the spot.",
    image: "/images/filling-plant.jpeg",
    highlights: [
      "Guided filling-floor tour",
      "Bulk supply account sign-up",
      "Hospitality sector pricing",
      "Meet the western region team",
    ],
  },
  {
    slug: "makindye-switch-campaign",
    title: "Makindye Household Switch Campaign",
    date: "2026-08-15",
    time: "8:00 AM – 5:00 PM",
    venue: "Makindye Division",
    location: "Kampala",
    tag: "Outreach",
    desc: "A week-long door-to-door campaign helping charcoal-using households move to LPG, with subsidised starter sets and in-home installation.",
    image: "/images/family-cooking.jpeg",
    outcomes: [
      "412 households switched to LPG",
      "380 starter sets installed in-home",
      "Every household given a safety briefing",
    ],
  },
  {
    slug: "wakiso-tree-planting",
    title: "World Environment Day Tree-Planting",
    date: "2026-06-05",
    time: "7:30 AM – 1:00 PM",
    venue: "Wakiso District",
    location: "Wakiso",
    tag: "Activism",
    desc: "Staff, dealers and community volunteers planted indigenous seedlings on degraded land, tying our clean-cooking work to visible restoration on the ground.",
    image: "/images/18.jpeg",
    outcomes: [
      "1,800 indigenous seedlings planted",
      "6 schools and 3 dealer teams took part",
      "Two-year maintenance plan agreed",
    ],
  },
  {
    slug: "jinja-hospitality-forum",
    title: "Jinja Hospitality Bulk-Gas Forum",
    date: "2026-04-24",
    time: "2:00 PM – 6:00 PM",
    venue: "Jinja Resort Conference Hall",
    location: "Jinja",
    tag: "Commercial",
    desc: "Hotel and restaurant operators across the eastern region met our commercial team to work through bulk supply scheduling, 45kg economics and kitchen safety compliance.",
    image: "/images/product-range.jpeg",
    outcomes: [
      "37 hospitality businesses attended",
      "14 new bulk supply accounts opened",
      "Regional delivery schedule agreed",
    ],
  },
  {
    slug: "schools-clean-air-outreach",
    title: "Schools Clean-Air Outreach",
    date: "2026-02-20",
    time: "9:00 AM – 12:00 PM",
    venue: "Six schools across Kampala",
    location: "Kampala",
    tag: "Education",
    desc: "Classroom sessions on indoor air pollution, deforestation and safe gas handling, delivered alongside kitchen assessments for each school's catering staff.",
    image: "/images/workers.jpeg",
    outcomes: [
      "1,240 pupils reached",
      "6 school kitchens assessed and upgraded",
      "Catering staff certified in safe handling",
    ],
  },
];

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FlameLogo } from "@/components/logo";
import { WhatsAppIcon, TikTokIcon, XIcon } from "@/components/icons";
import { CONTACT, waLink } from "@/lib/data";

const ABOUT_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Core Values", href: "/about#values" },
  { label: "CSR Programme", href: "/csr" },
  { label: "Coverage Regions", href: "/about#regions" },
  { label: "Media Centre", href: "/media" },
  { label: "Become a Dealer", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Home Gas Supply", href: "/services" },
  { label: "Cylinder Refilling", href: "/services" },
  { label: "Commercial Supply", href: "/services" },
  { label: "Industrial Bulk Gas", href: "/services" },
  { label: "Gas Prices", href: "/services#pricing" },
  { label: "Videos", href: "/media#videos" },
  { label: "Upcoming Events", href: "/media#upcoming" },
];

export function Footer() {
  return (
    <footer className="bg-brand text-white">
      {/* Tagline row */}
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border-b border-white/15 px-5 py-12 md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white shadow-brand-md">
            <FlameLogo className="h-9 w-9" />
          </span>
          <p className="font-display text-2xl font-bold leading-snug md:text-3xl">
            Powering every Ugandan home.
          </p>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={CONTACT.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-white/70 transition-colors hover:text-white"
          >
            <XIcon className="size-5" />
          </a>
          <a
            href={CONTACT.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-white/70 transition-colors hover:text-white"
          >
            <TikTokIcon className="size-5" />
          </a>
          <a
            href={waLink("Hello Mukrite Energies!")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-white/70 transition-colors hover:text-white"
          >
            <WhatsAppIcon className="size-5" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            aria-label="Email"
            className="text-white/70 transition-colors hover:text-white"
          >
            <Mail className="size-5" />
          </a>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 md:grid-cols-3 md:px-10">
        <div>
          <h3 className="font-display text-base font-bold">About Mukrite</h3>
          <ul className="mt-5 space-y-2.5">
            {ABOUT_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="font-body text-sm text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold">
            Products &amp; Services
          </h3>
          <ul className="mt-5 space-y-2.5">
            {SERVICE_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="font-body text-sm text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold">Contact Us</h3>
          <ul className="mt-5 space-y-3 font-body text-sm">
            <li>
              <span className="flex items-start gap-2.5 text-white/70">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {CONTACT.address}, Uganda
              </span>
            </li>
            <li>
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2.5 text-white/70 transition-colors hover:text-white"
              >
                <Phone className="size-4 shrink-0" />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2.5 text-white/70 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0" />
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={waLink("Hello Mukrite Energies!")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/70 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="size-4 shrink-0" />
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-deeper">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 font-body text-xs text-white/60 md:flex-row md:px-10">
          <span>
            Mukrite Energies ® is a registered trademark. Copyright ©{" "}
            {new Date().getFullYear()} All Rights Reserved.
          </span>
          <span>
            Built &amp; maintained by{" "}
            <span className="font-bold tracking-widest text-white/80">
              BLACK AXIOS
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}

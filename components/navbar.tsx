"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  X,
  Flame,
  Home,
  Store,
  Factory,
  RotateCw,
  Truck,
  BookOpenText,
  HeartHandshake,
  Images,
  MapPinned,
  ShieldCheck,
  Tag,
  Mail,
  Users,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { FlameLogo } from "@/components/logo";
import { WhatsAppIcon, TikTokIcon, XIcon } from "@/components/icons";
import { useApp } from "@/components/providers";
import { CONTACT, waLink } from "@/lib/data";

type MenuItem = { label: string; href: string; icon: LucideIcon };
type Menu = { label: string; href: string; items?: MenuItem[]; match?: string[] };

const MENUS: Menu[] = [
  {
    label: "About Us",
    href: "/about",
    match: ["/about", "/team", "/csr"],
    items: [
      { label: "Our Story", href: "/about", icon: BookOpenText },
      { label: "Our Team", href: "/team", icon: Users },
      { label: "Core Values", href: "/about#values", icon: HeartHandshake },
      { label: "CSR Programme", href: "/csr", icon: Leaf },
      { label: "Coverage Regions", href: "/about#regions", icon: MapPinned },
      { label: "Gallery", href: "/about#gallery", icon: Images },
    ],
  },
  {
    label: "Products & Services",
    href: "/services",
    items: [
      { label: "Home Gas Supply", href: "/services", icon: Home },
      { label: "Business & Hospitality", href: "/services", icon: Store },
      { label: "Industrial Bulk Gas", href: "/services", icon: Factory },
      { label: "Cylinder Refilling", href: "/services", icon: RotateCw },
      { label: "Doorstep Delivery", href: "/services", icon: Truck },
      { label: "Gas Prices", href: "/services#pricing", icon: Tag },
    ],
  },
  {
    label: "Media",
    href: "/about#gallery",
    items: [
      { label: "Gallery", href: "/about#gallery", icon: Images },
      { label: "Safety Guide", href: "/services#safety", icon: ShieldCheck },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

const DRAWER_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Our Services", href: "/services" },
  { label: "Gas Prices", href: "/services#pricing" },
  { label: "Safety Guide", href: "/services#safety" },
  { label: "Gallery", href: "/about#gallery" },
  { label: "CSR Programme", href: "/csr" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { openOrder } = useApp();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer + dropdowns on route change
  useEffect(() => {
    setDrawerOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Lock scroll + Escape while the drawer is open
  useEffect(() => {
    if (!drawerOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[1000] bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-brand-md" : "shadow-brand-sm"
        }`}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <nav className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          {/* Round hanging logo, Rubis-style */}
          <Link href="/" aria-label="Mukrite Energies home" className="relative z-10">
            <span className="absolute -top-10 left-0 flex size-24 items-center justify-center rounded-full bg-white shadow-brand-md md:size-28">
              <span className="flex flex-col items-center">
                <FlameLogo className="h-12 w-12 md:h-14 md:w-14" />
                <span className="-mt-1 font-display text-[0.55rem] font-bold uppercase tracking-[0.08em] text-brand md:text-[0.62rem]">
                  Mukrite
                </span>
              </span>
            </span>
            {/* spacer that reserves the logo width in flow */}
            <span className="block w-24 md:w-28" />
          </Link>

          {/* Desktop menu */}
          <ul className="hidden items-center gap-8 md:flex">
            {MENUS.map((m) => {
              const active = (m.match ?? [m.href.split("#")[0]]).includes(
                pathname,
              );
              const isOpen = openMenu === m.label;
              return (
                <li
                  key={m.label}
                  onMouseEnter={() => setOpenMenu(m.items ? m.label : null)}
                >
                  <Link
                    href={m.href}
                    className={`flex items-center gap-1 font-display text-[0.82rem] font-bold uppercase tracking-[0.04em] transition-colors ${
                      active || isOpen ? "text-ember" : "text-ink hover:text-ember"
                    }`}
                  >
                    {m.label}
                    {m.items && (
                      <ChevronDown
                        className={`size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            className="flex size-11 cursor-pointer flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span className="h-[2px] w-6 rounded-full bg-ink" />
            <span className="h-[2px] w-6 rounded-full bg-ink" />
            <span className="h-[2px] w-6 rounded-full bg-ink" />
          </button>

          {/* Dropdown panel (Rubis mega-menu style) */}
          <AnimatePresence>
            {openMenu &&
              (() => {
                const menu = MENUS.find((m) => m.label === openMenu);
                if (!menu?.items) return null;
                return (
                  <motion.div
                    key={menu.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-10 top-full mt-1 hidden rounded-lg border border-line bg-white p-8 shadow-brand-lg md:block"
                  >
                    <div
                      className="grid gap-x-10 gap-y-6"
                      style={{
                        gridTemplateColumns: `repeat(${Math.min(menu.items.length, 6)}, minmax(0,1fr))`,
                      }}
                    >
                      {menu.items.map((it) => (
                        <Link
                          key={it.label}
                          href={it.href}
                          onClick={() => setOpenMenu(null)}
                          className="group flex w-24 flex-col items-center gap-3 text-center"
                        >
                          <it.icon
                            strokeWidth={1.25}
                            className="size-10 text-ink transition-colors group-hover:text-brand"
                          />
                          <span className="font-display text-[0.78rem] font-bold leading-tight text-ink transition-colors group-hover:text-brand">
                            {it.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                );
              })()}
          </AnimatePresence>
        </nav>
      </header>

      {/* ── Mobile drawer — solid green, Rubis-style ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[1090] bg-black/60 md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-[1100] flex w-[min(84vw,340px)] flex-col bg-brand md:hidden"
              aria-label="Site navigation"
            >
              <div className="flex justify-end px-5 pt-5">
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="flex size-10 cursor-pointer items-center justify-center text-white/90 transition-colors hover:text-white"
                >
                  <X className="size-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-8 py-4">
                {DRAWER_LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setDrawerOpen(false)}
                    className="block py-4 font-body text-lg text-white transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setDrawerOpen(false);
                    openOrder();
                  }}
                  className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-ember py-3.5 font-display text-sm font-bold text-white transition-colors hover:bg-ember-dark"
                >
                  <Flame className="size-4" /> Order Gas Now
                </button>
              </nav>

              <div className="flex items-center gap-6 px-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
                <a
                  href={CONTACT.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  <XIcon className="size-4.5" />
                </a>
                <a
                  href={CONTACT.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  <TikTokIcon className="size-4.5" />
                </a>
                <a
                  href={waLink("Hello Mukrite Energies!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  <WhatsAppIcon className="size-4.5" />
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  aria-label="Email"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="size-5" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

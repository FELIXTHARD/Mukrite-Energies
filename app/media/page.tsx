import type { Metadata } from "next";
import { CalendarClock, History, PlayCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading, Accent } from "@/components/section-heading";
import { VideoGallery } from "@/components/video-player";
import { UpcomingEvents, PastEvents } from "@/components/events";
import { Gallery } from "@/components/gallery";
import { CtaBanner } from "@/components/cta-banner";
import { eventsJsonLd, jsonLd } from "@/lib/seo";

const PAGE_DESCRIPTION =
  "Watch Mukrite Energies on video, see what is coming up on our events calendar, and look back at the community drives, safety clinics and dealer trainings we have already run across Uganda.";

export const metadata: Metadata = {
  title: "Media Centre — Videos, Events & Photos",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Media Centre — Mukrite Energies",
    description: PAGE_DESCRIPTION,
    url: "/media",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function MediaPage() {
  return (
    <>
      {/* Structured data so upcoming events can surface in search results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(eventsJsonLd) }}
      />

      <PageHero
        eyebrow="Media Centre"
        title={
          <>
            Watch, Attend, <span className="text-gold">Look Back</span>
          </>
        }
        sub="Our films, our calendar and our photo archive in one place — from inside the filling plant to the community drives that take clean cooking to Ugandan doorsteps."
        image="/images/plant-team.jpeg"
      />

      {/* ── Quick jump strip ── */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-line px-0 sm:grid-cols-3">
          {[
            { href: "#videos", label: "Videos", icon: PlayCircle },
            { href: "#upcoming", label: "Upcoming Events", icon: CalendarClock },
            { href: "#past", label: "Past Events", icon: History },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group flex items-center justify-center gap-3 bg-white px-6 py-6 transition-colors hover:bg-cream"
            >
              <l.icon
                className="size-5 text-brand transition-colors group-hover:text-ember"
                strokeWidth={1.75}
              />
              <span className="font-display text-[0.82rem] font-bold uppercase tracking-[0.06em] text-ink transition-colors group-hover:text-ember">
                {l.label}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Videos ── */}
      <section id="videos" className="scroll-mt-24 bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="Video Library"
            title={
              <>
                Mukrite on <Accent>Film</Accent>
              </>
            }
            desc="Plant tours, safety walkthroughs and the stories of families who switched from charcoal. Press play — nothing loads from YouTube until you do."
            align="center"
          />
          <VideoGallery />
        </div>
      </section>

      {/* ── Upcoming events ── */}
      <section id="upcoming" className="scroll-mt-24 bg-cream py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="What's Next"
            title={
              <>
                Upcoming <Accent>Events</Accent>
              </>
            }
            desc="Community drives, safety clinics, dealer trainings and depot open days. Everyone is welcome — reserve a place and we will keep you posted."
            align="center"
          />
          <UpcomingEvents />
        </div>
      </section>

      {/* ── Past events ── */}
      <section
        id="past"
        className="noise relative scroll-mt-24 overflow-hidden bg-deep py-20 md:py-24"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="The Record"
            title={
              <>
                Past <Accent color="gold">Events</Accent>
              </>
            }
            desc="Where we have been and what it delivered — measured in households switched, cylinders made safe and seedlings in the ground."
            align="center"
            dark
          />
          <PastEvents />
        </div>
      </section>

      {/* ── Photo archive ── */}
      <section id="gallery" className="scroll-mt-24 bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <SectionHeading
            eyebrow="Photo Archive"
            title={
              <>
                From the <Accent>Field</Accent>
              </>
            }
            desc="Depot operations, delivery runs and the communities we serve across Uganda."
            align="center"
          />
          <div className="mt-12">
            <Gallery />
          </div>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Come and <Accent color="gold">Meet Us</Accent> in Person
          </>
        }
        sub="Every event is open to the public. Bring your cylinder for a free safety check, or talk to us about switching your home or business to LPG."
        orderLabel="Order Gas Now"
        image="/images/hillside-sign.jpeg"
      />
    </>
  );
}

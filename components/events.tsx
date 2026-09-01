"use client";

import Image from "next/image";
import { useMemo, useSyncExternalStore } from "react";
import { CalendarDays, MapPin, Clock, Check, CircleCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import {
  EVENTS,
  EVENTS_AS_OF,
  eventDateLabel,
  eventEndMs,
  waLink,
  type EventItem,
} from "@/lib/data";

const DAY_MS = 86_400_000;

/** The date the prerendered markup was split against. */
const BUILD_NOW = new Date(`${EVENTS_AS_OF}T00:00:00`).getTime();

/**
 * The real clock, read once and cached so the snapshot stays referentially
 * stable across renders — `useSyncExternalStore` requires that.
 */
let clientNow: number | null = null;
const noopSubscribe = () => () => {};
const getClientNow = () => (clientNow ??= Date.now());
const getBuildNow = () => BUILD_NOW;

/**
 * Splits the calendar into upcoming and past.
 *
 * The site is a static export, so the first render — on the build server and
 * again during hydration — has to use the same fixed `EVENTS_AS_OF` date.
 * Once mounted we re-split against the visitor's real clock, so events roll
 * over from upcoming to past without a redeploy.
 */
function useEventSplit() {
  const now = useSyncExternalStore(noopSubscribe, getClientNow, getBuildNow);
  const live = now !== BUILD_NOW;

  return useMemo(() => {
    const byDate = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date));
    return {
      now,
      live,
      upcoming: byDate.filter((e) => eventEndMs(e) >= now),
      // Most recent first.
      past: byDate.filter((e) => eventEndMs(e) < now).reverse(),
    };
  }, [now, live]);
}

/** "In 20 days" / "Tomorrow" / "Happening now". */
function countdownLabel(e: EventItem, now: number) {
  const start = new Date(`${e.date}T00:00:00`).getTime();
  const days = Math.ceil((start - now) / DAY_MS);
  if (days <= 0) return "Happening now";
  if (days === 1) return "Tomorrow";
  if (days < 31) return `In ${days} days`;
  const months = Math.round(days / 30);
  return `In ${months} month${months === 1 ? "" : "s"}`;
}

/** Big stacked day/month block used down the left edge of each card. */
function DateBlock({ event, dark }: { event: EventItem; dark?: boolean }) {
  const d = new Date(`${event.date}T12:00:00`);
  return (
    <div
      className={`flex size-16 shrink-0 flex-col items-center justify-center rounded-xl ${
        dark ? "bg-white/10 text-white" : "bg-brand text-white"
      }`}
    >
      <span className="font-display text-xl font-bold leading-none">
        {d.toLocaleDateString("en-GB", { day: "numeric" })}
      </span>
      <span className="mt-0.5 font-body text-[0.58rem] font-bold uppercase tracking-[0.14em] opacity-80">
        {d.toLocaleDateString("en-GB", { month: "short" })}
      </span>
    </div>
  );
}

function UpcomingCard({
  event,
  now,
  live,
  delay,
}: {
  event: EventItem;
  now: number;
  live: boolean;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="group grid overflow-hidden rounded-2xl border border-line bg-white transition-all hover:shadow-brand-md md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="relative aspect-[4/3] md:aspect-auto">
          <Image
            src={event.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/50 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-ember px-3 py-1 font-body text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white">
            {event.tag}
          </span>
          {live && (
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 font-body text-[0.62rem] font-bold uppercase tracking-[0.14em] text-brand backdrop-blur">
              {countdownLabel(event, now)}
            </span>
          )}
        </div>

        <div className="p-7 md:p-9">
          <div className="flex items-start gap-4">
            <DateBlock event={event} />
            <div>
              <h3 className="font-display text-xl font-bold leading-tight text-brand">
                {event.title}
              </h3>
              <p className="mt-1.5 font-body text-[0.78rem] font-bold text-ember">
                {eventDateLabel(event)}
              </p>
            </div>
          </div>

          <p className="mt-5 font-body text-sm leading-relaxed text-mute">
            {event.desc}
          </p>

          <dl className="mt-5 space-y-2 font-body text-[0.82rem] text-ink">
            <div className="flex items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-brand" strokeWidth={1.75} />
              <dd>{event.time}</dd>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-brand" strokeWidth={1.75} />
              <dd>
                {event.venue} · {event.location}
              </dd>
            </div>
          </dl>

          {event.highlights && (
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {event.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 font-body text-[0.8rem] leading-snug text-mute"
                >
                  <Check
                    className="mt-0.5 size-3.5 shrink-0 text-brand-bright"
                    strokeWidth={2.5}
                  />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <a
            href={waLink(
              `Hello Mukrite Energies! I would like to attend "${event.title}" on ${eventDateLabel(event)}. Please send me the details.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 font-display text-[0.85rem] font-bold text-white transition-colors hover:bg-brand-mid"
          >
            <CalendarDays className="size-4" /> Reserve a Place
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function PastCard({ event, delay }: { event: EventItem; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/5 backdrop-blur transition-colors hover:border-white/25">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={event.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 font-body text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
            {event.tag}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <div className="flex items-start gap-4">
            <DateBlock event={event} dark />
            <div>
              <h3 className="font-display text-lg font-bold leading-tight text-white">
                {event.title}
              </h3>
              <p className="mt-1.5 font-body text-[0.75rem] font-bold text-gold">
                {eventDateLabel(event)} · {event.location}
              </p>
            </div>
          </div>

          <p className="mt-4 font-body text-sm leading-relaxed text-white/65">
            {event.desc}
          </p>

          {event.outcomes && (
            <ul className="mt-5 space-y-2 border-t border-white/12 pt-5">
              {event.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-2.5 font-body text-[0.82rem] leading-snug text-white/80"
                >
                  <CircleCheck
                    className="mt-0.5 size-4 shrink-0 text-brand-bright"
                    strokeWidth={1.75}
                  />
                  {o}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function UpcomingEvents() {
  const { upcoming, now, live } = useEventSplit();

  if (upcoming.length === 0) {
    return (
      <Reveal className="mt-12 rounded-2xl border border-dashed border-line-dark bg-white p-12 text-center">
        <CalendarDays
          className="mx-auto size-8 text-brand"
          strokeWidth={1.5}
        />
        <p className="mt-4 font-display text-lg font-bold text-brand">
          No events on the calendar right now
        </p>
        <p className="mx-auto mt-2 max-w-md font-body text-sm leading-relaxed text-mute">
          Our next community drive is being planned. Message us on WhatsApp and
          we will let you know as soon as dates are confirmed.
        </p>
        <a
          href={waLink(
            "Hello Mukrite Energies! Please let me know about your upcoming events.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-md bg-brand px-6 py-3 font-display text-[0.85rem] font-bold text-white transition-colors hover:bg-brand-mid"
        >
          Notify Me
        </a>
      </Reveal>
    );
  }

  return (
    <div className="mt-12 grid gap-6">
      {upcoming.map((e, i) => (
        <UpcomingCard
          key={e.slug}
          event={e}
          now={now}
          live={live}
          delay={Math.min(i, 2) * 0.08}
        />
      ))}
    </div>
  );
}

export function PastEvents() {
  const { past } = useEventSplit();

  if (past.length === 0) return null;

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {past.map((e, i) => (
        <PastCard key={e.slug} event={e} delay={(i % 2) * 0.08} />
      ))}
    </div>
  );
}

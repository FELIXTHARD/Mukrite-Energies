"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Play,
  X,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import {
  VIDEOS,
  VIDEO_CATEGORIES,
  youtubeEmbed,
  youtubeWatch,
  type Video,
  type VideoCategory,
} from "@/lib/data";

type Filter = VideoCategory | "All";
const FILTERS: Filter[] = ["All", ...VIDEO_CATEGORIES];

/** The player itself — a 16:9 YouTube iframe. */
export function YouTubePlayer({
  video,
  className = "",
}: {
  video: Video;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-night ${className}`}
    >
      <iframe
        src={youtubeEmbed(video.youtubeId)}
        title={video.title}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}

/** Poster card — requests nothing from YouTube until the visitor presses play. */
function VideoCard({
  video,
  onPlay,
  delay,
}: {
  video: Video;
  onPlay: () => void;
  delay: number;
}) {
  const ready = video.youtubeId !== "";

  return (
    <Reveal delay={delay}>
      <article className="group h-full overflow-hidden rounded-2xl border border-line bg-white transition-all hover:-translate-y-1.5 hover:shadow-brand-md">
        <button
          onClick={onPlay}
          disabled={!ready}
          aria-label={
            ready ? `Play ${video.title}` : `${video.title} — coming soon`
          }
          className="relative block aspect-video w-full cursor-pointer overflow-hidden disabled:cursor-default"
        >
          <Image
            src={video.poster}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 ${
              ready ? "group-hover:scale-105" : "opacity-70 grayscale-[0.35]"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/75 via-night/10 to-transparent" />

          {ready ? (
            <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ember text-white shadow-ember transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 size-6 fill-current" />
            </span>
          ) : (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 px-4 py-2 font-body text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
              Coming soon
            </span>
          )}

          <span className="absolute bottom-3 left-3 rounded-full bg-brand px-3 py-1 font-body text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white">
            {video.category}
          </span>
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-night/70 px-2.5 py-1 font-body text-[0.65rem] font-bold text-white backdrop-blur">
            <Clock className="size-3" /> {video.duration}
          </span>
        </button>

        <div className="p-6">
          <h3 className="font-display text-lg font-bold leading-tight text-brand">
            {video.title}
          </h3>
          <p className="mt-2 font-body text-sm leading-relaxed text-mute">
            {video.desc}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

/** Filterable video grid with a full-screen lightbox player. */
export function VideoGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<number | null>(null);

  const shown =
    filter === "All" ? VIDEOS : VIDEOS.filter((v) => v.category === filter);
  // Only videos with an ID can be opened, so the lightbox indexes this subset.
  const playable = shown.filter((v) => v.youtubeId !== "");
  const current = active === null ? null : (playable[active] ?? null);

  // Lock scroll, and drive the lightbox from the keyboard, while it is open
  useEffect(() => {
    if (current === null) return;
    document.body.style.overflow = "hidden";
    const step = (dir: 1 | -1) =>
      setActive((a) =>
        a === null ? a : (a + dir + playable.length) % playable.length,
      );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [current, playable.length]);

  const step = (dir: 1 | -1) =>
    setActive((a) =>
      a === null ? a : (a + dir + playable.length) % playable.length,
    );

  return (
    <>
      <Reveal className="mt-10 flex flex-wrap justify-center gap-2.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setActive(null);
            }}
            className={`cursor-pointer rounded-full px-5 py-2 font-body text-[0.72rem] font-bold uppercase tracking-[0.14em] transition-colors ${
              filter === f
                ? "bg-brand text-white"
                : "bg-brand/8 text-brand hover:bg-brand/15"
            }`}
          >
            {f}
          </button>
        ))}
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((v, i) => (
          <VideoCard
            key={v.title}
            video={v}
            delay={(i % 3) * 0.08}
            onPlay={() =>
              setActive(playable.findIndex((p) => p.title === v.title))
            }
          />
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-night/92 p-4 backdrop-blur-sm"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close video"
              className="absolute right-5 top-5 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            >
              <X className="size-5" />
            </button>

            {playable.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous video"
                  className="absolute left-3 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:left-8"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next video"
                  className="absolute right-3 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:right-8"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}

            <motion.div
              key={current.youtubeId}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <YouTubePlayer video={current} />
              <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {current.title}
                  </h3>
                  <p className="mt-1 max-w-2xl font-body text-sm leading-relaxed text-white/65">
                    {current.desc}
                  </p>
                </div>
                <a
                  href={youtubeWatch(current.youtubeId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex shrink-0 items-center gap-2 rounded-md bg-white/12 px-4 py-2 font-display text-[0.8rem] font-bold text-white transition-colors hover:bg-white/25"
                >
                  Watch on YouTube <ExternalLink className="size-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

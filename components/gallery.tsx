"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const step = (dir: 1 | -1) => {
    if (active === null) return;
    setActive((active + dir + GALLERY.length) % GALLERY.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {GALLERY.map((g, i) => (
          <Reveal key={g.src} delay={(i % 4) * 0.07}>
            <button
              onClick={() => setActive(i)}
              className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl"
            >
              <Image
                src={g.src}
                alt={g.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-night/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-accent text-xs italic text-white/90">
                  {g.caption}
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-night/90 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <button
              aria-label="Close gallery"
              className="absolute right-5 top-5 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            >
              <X className="size-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-3 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:left-8"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
              className="absolute right-3 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 md:right-8"
            >
              <ChevronRight className="size-5" />
            </button>

            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-4xl"
            >
              <Image
                src={GALLERY[active].src}
                alt={GALLERY[active].caption}
                width={1280}
                height={960}
                className="mx-auto max-h-[80vh] w-auto rounded-xl object-contain"
              />
              <figcaption className="mt-4 text-center font-accent text-base italic text-white/80">
                {GALLERY[active].caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

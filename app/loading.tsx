import { FlameLogo } from "@/components/logo";

/** Route-level fallback shown while a page segment loads. */
export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 pt-20">
      <span className="relative flex size-20 items-center justify-center rounded-full bg-white shadow-brand-md">
        <span className="absolute inset-0 animate-ping rounded-full border-2 border-brand/40" />
        <FlameLogo className="h-11 w-11 animate-pulse" />
      </span>
      <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.32em] text-mute">
        Loading…
      </p>
    </div>
  );
}

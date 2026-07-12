import { WhatsAppIcon } from "@/components/icons";
import { waLink } from "@/lib/data";

export function WhatsAppFab() {
  return (
    <a
      href={waLink("Hello Mukrite Energies! I need gas.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="animate-pulse-wa fixed bottom-5 right-4 z-[999] flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 md:bottom-7 md:right-7 md:size-14"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}

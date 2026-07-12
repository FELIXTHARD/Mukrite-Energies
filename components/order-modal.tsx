"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Mail } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { useApp, type OrderPreset } from "@/components/providers";
import {
  CYLINDERS,
  mailtoLink,
  ugx,
  waLink,
  type OrderMode,
} from "@/lib/data";

export function OrderModal({
  open,
  preset,
  onClose,
}: {
  open: boolean;
  preset: OrderPreset;
  onClose: () => void;
}) {
  const { toast } = useApp();
  const [mode, setMode] = useState<OrderMode>("set");
  const [kg, setKg] = useState(13);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (open) {
      setMode(preset.mode ?? "set");
      setKg(preset.kg ?? 13);
      setQty(1);
    }
  }, [open, preset]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const cylinder = useMemo(
    () => CYLINDERS.find((c) => c.kg === kg) ?? CYLINDERS[2],
    [kg]
  );
  const unitPrice = mode === "set" ? cylinder.set : cylinder.refill;
  const total = unitPrice * qty;

  const validate = () => {
    if (!name.trim() || !phone.trim() || !location.trim()) {
      toast("Please fill in your name, phone and location.", "error");
      return false;
    }
    return true;
  };

  const orderLabel = `${cylinder.kg}kg — ${
    mode === "set" ? "New Purchase / Complete Set" : "Refill Only"
  } (${ugx(unitPrice)})`;

  const submitWhatsApp = () => {
    if (!validate()) return;
    const msg =
      `Hello Mukrite Energies! 👋\n\nI'd like to place a gas order:\n\n` +
      `🧑 *Name:* ${name}\n📞 *Phone:* ${phone}\n📍 *Location:* ${location}\n` +
      `🔵 *Order:* ${orderLabel}\n📦 *Quantity:* ${qty}\n💰 *Total:* ${ugx(total)}\n\n` +
      `Please confirm. Thank you!`;
    window.open(waLink(msg), "_blank");
    toast("Opening WhatsApp with your order…");
    onClose();
  };

  const submitEmail = () => {
    if (!validate()) return;
    const body =
      `Hello Mukrite Energies,\n\nI would like to place an order:\n\n` +
      `Name: ${name}\nPhone: ${phone}\nLocation: ${location}\n` +
      `Order: ${orderLabel}\nQuantity: ${qty}\nTotal: ${ugx(total)}\n\n` +
      `Please confirm. Thank you.`;
    window.location.href = mailtoLink(`New Gas Order — ${name}`, body);
    toast("Opening your email app with the order…");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1100] flex items-end justify-center bg-night/60 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Place your gas order"
        >
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex size-9 cursor-pointer items-center justify-center rounded-full bg-cream text-mute transition-all hover:rotate-90 hover:bg-brand hover:text-white"
            >
              <X className="size-4" />
            </button>

            <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.3em] text-ember">
              Quick Order
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-brand">
              Place Your Gas Order
            </h2>

            {/* Mode toggle */}
            <div className="mt-5 grid grid-cols-2 rounded-xl bg-cream p-1">
              {(
                [
                  ["set", "Complete Set"],
                  ["refill", "Refill Only"],
                ] as const
              ).map(([m, label]) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`relative cursor-pointer rounded-lg py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-colors ${
                    mode === m ? "text-white" : "text-mute hover:text-brand"
                  }`}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="order-mode"
                      className="absolute inset-0 rounded-lg bg-brand"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </div>
            {mode === "set" && (
              <p className="mt-2 text-center text-[0.7rem] text-mute">
                Complete set includes cylinder + gas + regulator
              </p>
            )}

            {/* Cylinder selection */}
            <div className="mt-4 grid grid-cols-5 gap-2">
              {CYLINDERS.map((c) => {
                const selected = c.kg === kg;
                return (
                  <button
                    key={c.kg}
                    onClick={() => setKg(c.kg)}
                    className={`relative cursor-pointer rounded-xl border-2 px-1 py-3 text-center transition-all ${
                      selected
                        ? "border-brand bg-brand text-white shadow-brand-md"
                        : "border-line bg-white text-ink hover:border-brand-light"
                    }`}
                  >
                    {c.popular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-1.5 py-px text-[0.5rem] font-bold uppercase tracking-wide text-ink">
                        Popular
                      </span>
                    )}
                    <span className="block font-display text-lg font-bold leading-none">
                      {c.kg}
                      <span className="text-[0.6rem] font-semibold">kg</span>
                    </span>
                    <span
                      className={`mt-1 block text-[0.55rem] leading-tight ${
                        selected ? "text-white/70" : "text-mute"
                      }`}
                    >
                      {(mode === "set" ? c.set : c.refill).toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Qty + total */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-line bg-cream/60 px-4 py-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-line-dark bg-white text-brand transition-colors hover:bg-brand hover:text-white"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center font-display text-lg font-bold text-ink">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  aria-label="Increase quantity"
                  className="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-line-dark bg-white text-brand transition-colors hover:bg-brand hover:text-white"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <div className="text-right">
                <span className="block text-[0.6rem] font-semibold uppercase tracking-widest text-mute">
                  Estimated Total
                </span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={total}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="block font-display text-xl font-bold text-brand"
                  >
                    {ugx(total)}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Details */}
            <div className="mt-4 space-y-3">
              <Field label="Full Name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Nakato"
                  className="field-input"
                />
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Phone Number">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+256 7XX XXX XXX"
                    className="field-input"
                  />
                </Field>
                <Field label="Location / Area">
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Ntinda, Kampala"
                    className="field-input"
                  />
                </Field>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-5 space-y-2.5">
              <button
                onClick={submitWhatsApp}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 font-display text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:brightness-95"
              >
                <WhatsAppIcon className="size-4.5" /> Send via WhatsApp
              </button>
              <button
                onClick={submitEmail}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-line-dark py-3 font-display text-sm font-bold uppercase tracking-wider text-brand transition-all hover:bg-brand hover:text-white"
              >
                <Mail className="size-4" /> Send Order by Email
              </button>
            </div>
            <p className="mt-4 text-center text-[0.7rem] leading-relaxed text-mute">
              Your order goes directly to our team. We&apos;ll confirm within
              1–2 hours.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.65rem] font-bold uppercase tracking-widest text-mute">
        {label}
      </span>
      {children}
    </label>
  );
}

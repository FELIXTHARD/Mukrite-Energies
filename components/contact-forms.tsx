"use client";

import { useState } from "react";
import { Handshake, Phone, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { useApp } from "@/components/providers";
import { mailtoLink, waLink } from "@/lib/data";

const TOPICS = [
  "Order Gas",
  "Get a Quote",
  "Become a Dealer",
  "General Enquiry",
  "Safety Question",
  "Other",
];

export function ContactForm() {
  const { toast } = useApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [msg, setMsg] = useState("");

  const validate = () => {
    if (!name.trim() || !msg.trim()) {
      toast("Please enter at least your name and message.", "error");
      return false;
    }
    return true;
  };

  const sendEmail = () => {
    if (!validate()) return;
    const t = topic || "General Enquiry";
    window.location.href = mailtoLink(
      `[${t}] — ${name}`,
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nTopic: ${t}\n\nMessage:\n${msg}`
    );
    toast("Opening your email app…");
  };

  const sendWA = () => {
    if (!validate()) return;
    const t = topic || "Enquiry";
    window.open(
      waLink(
        `Hello Mukrite Energies! 👋\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Topic:* ${t}\n\n*Message:*\n${msg}`
      ),
      "_blank"
    );
    toast("Opening WhatsApp…");
  };

  return (
    <div className="rounded-3xl border border-line bg-white p-7 shadow-brand-md md:p-9">
      <h3 className="font-display text-2xl font-bold text-brand">
        Drop Us a Line
      </h3>
      <p className="mt-2 text-sm text-mute">
        Fill in the form below and we&apos;ll get back to you promptly. For
        orders, use the Order button above.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="field-input"
          />
        </Field>
        <Field label="Phone Number">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+256 7XX XXX XXX"
            className="field-input"
          />
        </Field>
        <Field label="Email Address">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="field-input"
          />
        </Field>
        <Field label="Topic">
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="field-input cursor-pointer"
          >
            <option value="" disabled>
              Select topic
            </option>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Your Message">
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={4}
              placeholder="Tell us how we can help you..."
              className="field-input resize-y"
            />
          </Field>
        </div>
      </div>

      <div className="mt-6 space-y-2.5">
        <button
          onClick={sendEmail}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand py-3.5 font-display text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-brand-mid"
        >
          <Send className="size-4" /> Send via Email
        </button>
        <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-mute">
          or send directly
        </p>
        <button
          onClick={sendWA}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 font-display text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:brightness-95"
        >
          <WhatsAppIcon className="size-4" /> Send via WhatsApp
        </button>
      </div>
      <p className="mt-4 text-center text-[0.7rem] leading-relaxed text-mute">
        Your message goes directly to our team. We typically respond within 1–2
        hours during business hours.
      </p>
    </div>
  );
}

const BUSINESS_TYPES = [
  "Retail shop / Supermarket",
  "Hardware store",
  "Independent dealer",
  "Distributor / Wholesaler",
  "Other",
];

export function DealerForm() {
  const { toast } = useApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const submit = () => {
    if (!name.trim() || !phone.trim()) {
      toast("Please fill in your name and phone number.", "error");
      return;
    }
    window.open(
      waLink(
        `Hello Mukrite Energies,\n\nI'd like to enquire about becoming a dealer.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Location:* ${location}\n*Business Type:* ${type || "Not specified"}\n\nPlease get in touch. Thank you!`
      ),
      "_blank"
    );
    toast("Opening WhatsApp with your dealer enquiry…");
  };

  return (
    <div className="rounded-3xl bg-white p-7 shadow-brand-lg md:p-9">
      <h3 className="font-display text-2xl font-bold text-brand">
        Dealer Enquiry Form
      </h3>
      <p className="mt-2 text-sm text-mute">
        Fill in your details and our team will reach out within 24 hours.
      </p>
      <div className="mt-6 space-y-4">
        <Field label="Full Name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="field-input"
          />
        </Field>
        <Field label="Phone Number">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+256 7XX XXX XXX"
            className="field-input"
          />
        </Field>
        <Field label="Your District / Area">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Mbarara, Jinja..."
            className="field-input"
          />
        </Field>
        <Field label="Business Type">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="field-input cursor-pointer"
          >
            <option value="" disabled>
              Select type
            </option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <button
          onClick={submit}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-ember py-3.5 font-display text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-ember-dark"
        >
          <Handshake className="size-4" /> Submit Dealer Enquiry
        </button>
      </div>
    </div>
  );
}

export function QuickReach() {
  return (
    <div className="mt-8 rounded-2xl border border-line bg-cream/70 p-6">
      <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.24em] text-mute">
        Quick Reach
      </p>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <a
          href={waLink("Hello Mukrite Energies! I need gas.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 font-display text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:brightness-95"
        >
          <WhatsAppIcon className="size-4" /> Chat on WhatsApp
        </a>
        <a
          href="tel:+256785239229"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand py-3.5 font-display text-sm font-bold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 hover:bg-brand-mid"
        >
          <Phone className="size-4" /> Call Now
        </a>
      </div>
    </div>
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

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, Twitter, Github, Linkedin, Instagram } from "lucide-react";
import { SectionHeader } from "./Services";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Book a visit"
          title="Begin your Velora ritual."
          subtitle="Request a consultation and our concierge will reach out within one business day to plan your visit."
        />

        <div className="mt-16 grid lg:grid-cols-5 gap-5">
          <motion.form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 rounded-3xl glass-strong p-6 sm:p-8 shadow-card"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name"><input required className="field" placeholder="Ada Lovelace" /></Field>
              <Field label="Email"><input required type="email" className="field" placeholder="ada@studio.com" /></Field>
              <Field label="Company" className="sm:col-span-2"><input className="field" placeholder="Velora Studio" /></Field>
              <Field label="Treatment of interest" className="sm:col-span-2">
                <textarea required rows={5} className="field resize-none" placeholder="Tell us what you'd like to address — skin, contouring, wellness…" />
              </Field>
            </div>
            <button
              type="submit"
              className="mt-6 group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-elegant hover:opacity-90 transition"
            >
              {sent ? "Request received — we'll be in touch." : "Request a consultation"}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.form>

          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: Mail, label: "Email", value: "concierge@veloraclinic.com" },
              { icon: Phone, label: "Phone", value: "+1 (415) 555-0144" },
              { icon: MapPin, label: "Clinic", value: "120 Madison Ave · NYC" },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="rounded-3xl glass-strong p-5 flex items-center gap-4 hover-lift"
                >
                  <div className="h-11 w-11 rounded-2xl bg-aurora text-white inline-flex items-center justify-center shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-3xl overflow-hidden glass-strong h-64"
            >
              <iframe
                title="map"
                className="w-full h-full"
                loading="lazy"
                src="https://www.google.com/maps?q=Lisbon&output=embed"
              />
            </motion.div>

            <div className="flex gap-2">
              {[Twitter, Github, Linkedin, Instagram].map((I, i) => (
                <a key={i} href="#" className="h-11 w-11 rounded-2xl glass-strong inline-flex items-center justify-center hover:bg-accent transition" aria-label="social">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

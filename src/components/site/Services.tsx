import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Droplet, Sun, Heart, Flower2, Gem, Plus } from "lucide-react";

const services = [
  { icon: Sparkles, title: "Signature Facials", desc: "Bespoke facials tailored to your skin's needs — deep cleansing, hydration and renewal.", details: "Hydra-glow, oxygen infusion, gold lift, vitamin C therapy. 60–90 minutes." },
  { icon: Droplet, title: "Injectables & Fillers", desc: "Subtle, expert-administered treatments that refresh — never overdone.", details: "Botox, hyaluronic fillers, lip enhancement, jawline contouring by board-certified MDs." },
  { icon: Sun, title: "Laser & Light", desc: "Advanced laser technology for clearer, smoother and more even skin.", details: "IPL photofacial, laser hair removal, pigmentation correction, vascular treatments." },
  { icon: Flower2, title: "Skin Rejuvenation", desc: "Microneedling, peels and resurfacing that reveal your healthiest skin.", details: "Chemical peels, RF microneedling, dermaplaning, PRP therapy." },
  { icon: Heart, title: "Body Contouring", desc: "Non-invasive body sculpting with proven, FDA-cleared technology.", details: "CoolSculpting, EMSculpt, radiofrequency tightening, lymphatic drainage." },
  { icon: Gem, title: "Wellness & Aesthetics", desc: "Holistic treatments that nourish skin from the inside out.", details: "IV vitamin therapy, NAD+, micronutrient panels, bespoke skincare protocols." },
];

export function Services() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="What we do"
          title="A studio, end-to-end."
          subtitle="Six disciplines, one small team. We embed quickly and deliver work that holds up under scrutiny."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isOpen = open === i;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative rounded-3xl glass-strong p-7 hover-lift overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: "radial-gradient(400px circle at var(--x,50%) var(--y,50%), color-mix(in oklab, var(--brand) 18%, transparent), transparent 60%)" }} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-aurora text-white shadow-glow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full glass hover:bg-accent transition"
                      aria-label="Expand"
                    >
                      <Plus className={`h-4 w-4 transition-transform ${isOpen ? "rotate-45" : ""}`} />
                    </button>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-sm border-t border-border pt-4">{s.details}</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-5 font-display text-4xl sm:text-5xl font-semibold tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

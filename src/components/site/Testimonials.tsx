import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "./Services";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";

const items = [
  { name: "Ava Larsen", role: "Hydra-Glow Facial · 6 months", avatar: p1, rating: 5,
    quote: "My skin has never looked better. The team at Velora actually listens — every treatment feels personal, never rushed. I leave glowing every time." },
  { name: "Marcus Chen", role: "Laser Resurfacing · 1 year", avatar: p2, rating: 5,
    quote: "Years of sun damage, gone. Dr. Hayes walked me through every option and the results have been life-changing. The clinic itself is a sanctuary." },
  { name: "Priya Raman", role: "Injectables & Fillers · 2 years", avatar: p3, rating: 5,
    quote: "I look like myself, just rested. That's the highest compliment. Velora is the only place I trust with my face." },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = items[i];
  return (
    <section id="testimonials" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Clients" title="Loved by builders." />

        <div className="relative mt-16 mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-strong rounded-3xl p-8 sm:p-12 text-center shadow-elegant"
            >
              <div className="flex justify-center gap-1 text-amber-400">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 font-display text-2xl sm:text-3xl leading-snug tracking-tight">
                "{t.quote}"
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-border" />
                <div className="text-left">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={() => setI((i - 1 + items.length) % items.length)} className="h-10 w-10 rounded-full glass-strong inline-flex items-center justify-center hover:bg-accent transition" aria-label="Prev">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {items.map((_, k) => (
                <button key={k} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${i === k ? "w-8 bg-foreground" : "w-3 bg-muted"}`} aria-label={`Go ${k}`} />
              ))}
            </div>
            <button onClick={() => setI((i + 1) % items.length)} className="h-10 w-10 rounded-full glass-strong inline-flex items-center justify-center hover:bg-accent transition" aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

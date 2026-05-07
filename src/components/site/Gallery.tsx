import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { SectionHeader } from "./Services";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";

const items = [
  { src: g1, title: "Atrium — Architecture Co.", tag: "Brand" },
  { src: g2, title: "Flux — Generative Identity", tag: "Motion" },
  { src: g3, title: "Quill — Editor Suite", tag: "Product" },
  { src: g4, title: "Prism — Color OS", tag: "Design System" },
  { src: g5, title: "Studio — Internal", tag: "Culture" },
  { src: g6, title: "Lume — Sculpture Series", tag: "Art Direction" },
];

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <SectionHeader
            eyebrow="Selected work"
            title="A gallery of recent craft."
            subtitle="A small selection from the last 18 months."
          />
        </div>

        <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {items.map((it, i) => (
            <motion.button
              key={it.title}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative mb-5 block w-full overflow-hidden rounded-3xl break-inside-avoid text-left"
            >
              <img
                src={it.src}
                alt={it.title}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 text-white">
                <div className="text-xs uppercase tracking-[0.18em] opacity-80">{it.tag}</div>
                <div className="mt-1 text-lg font-semibold">{it.title}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={items[active].src} alt={items[active].title} className="w-full rounded-3xl shadow-elegant" />
              <button
                onClick={() => setActive(null)}
                className="absolute -top-4 -right-4 h-10 w-10 rounded-full glass-strong inline-flex items-center justify-center"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mt-4 text-center">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{items[active].tag}</div>
                <div className="text-lg font-semibold">{items[active].title}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

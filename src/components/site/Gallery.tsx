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
import { GalleryItem } from "@/lib/api-types";

const defaultItems = [
  { src: g1, title: "The Velora Suite", tag: "Clinic" },
  { src: g2, title: "Hydra-Glow Serum Therapy", tag: "Treatment" },
  { src: g3, title: "Bespoke Skincare Rituals", tag: "Products" },
  { src: g4, title: "Precision Aesthetic Tools", tag: "Technology" },
  { src: g5, title: "Clean Beauty Edit", tag: "Curation" },
  { src: g6, title: "Treatment Sanctuary", tag: "Spa" },
];

export function Gallery({ items: dbItems }: { items?: GalleryItem[] }) {
  const items = dbItems && dbItems.length > 0
    ? dbItems.map(it => ({
        src: it.image_url,
        title: it.title,
        tag: it.tag
      }))
    : [];

  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="work" className="relative py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.3em] text-aurora font-bold block mb-4"
          >
            Clinical Excellence, Personalized Care.
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold mb-4"
          >
            Our Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto"
          >
            Trusted by Innovators Worldwide
          </motion.p>
        </div>

        {/* Desktop Grid / Mobile Carousel Hybrid */}
        <div className="mt-8 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-x-visible sm:pb-0">
          {items.map((it, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className="group relative block min-w-[85vw] sm:min-w-0 w-full overflow-hidden rounded-[2.5rem] text-left aspect-[4/5] sm:aspect-[4/3] snap-center shadow-lg sm:shadow-none"
            >
              <img
                src={it.src}
                alt={it.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-5 translate-y-0 sm:translate-y-3 group-hover:translate-y-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-500 text-white">
                <div className="text-[10px] uppercase tracking-[0.2em] opacity-80 font-bold">{it.tag}</div>
                <div className="mt-1 text-xl sm:text-lg font-bold sm:font-semibold">{it.title}</div>
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

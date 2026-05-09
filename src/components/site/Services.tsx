import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Droplet, Sun, LucideIcon } from "lucide-react";
import { Service } from "@/types";
import haircare from "@/assets/service/haircare.webp";
import skincare from "@/assets/service/skincare.webp";
import dentalcare from "@/assets/service/dentalcare.webp";

const iconMap: Record<string, LucideIcon> = {
  Sparkles, Droplet, Sun
};

export function Services({ services: dbServices }: { services?: Service[] }) {
  const services = dbServices || [];

  // SMART GUARD: Hide section if no dynamic services exist
  if (services.length === 0) return null;

  return (
    <section id="services" className="relative py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Our Services"
          title="Clinical Excellence, Personalized Care."
          subtitle="Discover our range of professional aesthetic and medical treatments."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => {
            const IconComp = iconMap[s.icon_name] || Sparkles;
            return (
              <motion.div
                key={s.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-3xl p-8 bg-[#F9FAFB] border border-zinc-100 hover:border-aurora/30 hover:bg-white hover:shadow-2xl hover:shadow-aurora/5 transition-all duration-500"
              >
                <div className="flex flex-col h-full">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm text-aurora mb-6 group-hover:scale-110 group-hover:bg-aurora group-hover:text-white transition-all duration-500">
                    <IconComp className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {s.description}
                  </p>
                  
                  {s.details && (
                    <div className="pt-6 border-t border-zinc-100">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-aurora/60 mb-2">Key Benefits</p>
                      <p className="text-xs text-muted-foreground italic">{s.details}</p>
                    </div>
                  )}

                  <Link
                    to="/booking"
                    className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-950 group-hover:text-aurora transition-colors"
                  >
                    Book Treatment
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, align = "center" }: { eyebrow: string; title: string; subtitle?: string; align?: "left" | "center" }) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "text-center mx-auto" : "text-left"} max-w-3xl`}>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-aurora shadow-sm ${isCenter ? "" : "ml-0"}`}
      >
        <Sparkles className="h-3 w-3" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-6 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mt-6 text-lg text-muted-foreground max-w-2xl ${isCenter ? "mx-auto" : ""}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

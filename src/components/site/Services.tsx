import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Droplet, Sun, LucideIcon } from "lucide-react";
import { Service } from "@/lib/api-types";
import haircare from "@/assets/service/haircare.webp";
import skincare from "@/assets/service/skincare.webp";
import dentalcare from "@/assets/service/dentalcare.webp";

const mainServices = [
  { 
    title: "Hair Care", 
    image: haircare,
    desc: "Advanced hair restoration and scalp treatments designed for thickness and vitality.",
    items: ["PRP Therapy", "Scalp Micropigmentation", "Hair Growth Serums", "Laser Hair Therapy"]
  },
  { 
    title: "Skin Care", 
    image: skincare,
    desc: "Medical-grade dermatology and aesthetic facials for a flawless, youthful glow.",
    items: ["Signature Facials", "Microneedling", "Chemical Peels", "Laser Resurfacing"]
  },
  { 
    title: "Dental Care", 
    image: dentalcare,
    desc: "Expert cosmetic dentistry and oral wellness for your most confident smile.",
    items: ["Teeth Whitening", "Invisalign", "Porcelain Veneers", "Smile Makeovers"]
  }
];

const defaultServices = [
  { icon: Sparkles, title: "Signature Facials", desc: "Bespoke facials tailored to your skin's needs — deep cleansing, hydration and renewal.", details: "Hydra-glow, oxygen infusion, gold lift, vitamin C therapy. 60–90 minutes." },
  { icon: Droplet, title: "Injectables & Fillers", desc: "Subtle, expert-administered treatments that refresh — never overdone.", details: "Botox, hyaluronic fillers, lip enhancement, jawline contouring by board-certified MDs." },
  { icon: Sun, title: "Laser & Light", desc: "Advanced laser technology for clearer, smoother and more even skin.", details: "IPL photofacial, laser hair removal, pigmentation correction, vascular treatments." },
];

const iconMap: Record<string, LucideIcon> = {
  Sparkles, Droplet, Sun
};

export function Services({ services: dbServices }: { services?: Service[] }) {
  const services = dbServices || [];

  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="What We Offer"
          title="Clinical Excellence, Personalized Care."
          subtitle="Discover our three core disciplines of aesthetic and medical mastery."
        />

        {/* Main 3 Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainServices.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative h-[500px] rounded-[2.5rem] overflow-hidden bg-zinc-900 shadow-2xl"
            >
              <img 
                src={s.image} 
                alt={s.title} 
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-display text-3xl font-bold text-white">{s.title}</h3>
                  <p className="mt-3 text-sm text-white/70 leading-relaxed max-w-[280px]">
                    {s.desc}
                  </p>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.items.map(item => (
                      <span key={item} className="px-3 py-1 rounded-full glass text-[10px] font-bold uppercase tracking-wider text-white/90">
                        {item}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/booking"
                    className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-zinc-100 transition-all shadow-glow"
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/booking"
            className="group inline-flex items-center gap-3 rounded-full glass px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-foreground hover:bg-aurora hover:text-white transition-all shadow-elegant"
          >
            Explore Other Services & Booking
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Secondary Services (Dynamic Only) */}
        {services.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">More Treatments</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s, i) => {
                const IconComp = iconMap[s.icon_name] || Sparkles;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="group rounded-3xl glass-strong p-7 hover-lift border border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-aurora/10 text-aurora border border-aurora/20">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{s.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mx-auto max-w-3xl">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-aurora shadow-sm"
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
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

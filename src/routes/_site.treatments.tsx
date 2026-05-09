import { Link, createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import treatmentsImg from "@/assets/gallery/gallery2.webp";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import haircare from "@/assets/service/haircare.webp";
import skincare from "@/assets/service/skincare.webp";
import dentalcare from "@/assets/service/dentalcare.webp";

const sections = [
  {
    id: "hair",
    title: "Hair Care & Restoration",
    subtitle: "Science-backed solutions for thickness and vitality.",
    image: haircare,
    description: "Our hair restoration suite combines advanced medical technology with holistic scalp health. Whether you're looking to reverse thinning or maintain your natural volume, our specialists deliver results you can see.",
    treatments: [
      { name: "PRP Hair Therapy", price: "Starts from ₹5,500" },
      { name: "Scalp Micropigmentation", price: "Bespoke Pricing" },
      { name: "Laser Hair Restoration", price: "Starts from ₹3,000" },
      { name: "Advanced Hair Growth Serums", price: "Consultation Required" }
    ]
  },
  {
    id: "skin",
    title: "Advanced Skin Therapies",
    subtitle: "Medical-grade dermatology for a flawless glow.",
    image: skincare,
    description: "Reveal your healthiest, most radiant skin with our signature facials and laser treatments. From anti-ageing to acne management, we provide personalized protocols that go beyond the surface.",
    treatments: [
      { name: "Signature Hydrafacial", price: "Starts from ₹4,500" },
      { name: "Medical-Grade Peels", price: "Starts from ₹2,500" },
      { name: "RF Microneedling", price: "Starts from ₹8,000" },
      { name: "Laser Skin Resurfacing", price: "Consultation Required" }
    ]
  },
  {
    id: "dental",
    title: "Cosmetic & General Dentistry",
    subtitle: "Your most confident smile, expertly crafted.",
    image: dentalcare,
    description: "Transform your smile with our expert cosmetic dental services. We blend clinical precision with aesthetic artistry to ensure your dental health is as beautiful as it is functional.",
    treatments: [
      { name: "Professional Teeth Whitening", price: "Starts from ₹6,000" },
      { name: "Invisalign® Clear Aligners", price: "Bespoke Pricing" },
      { name: "Porcelain Veneers", price: "Consultation Required" },
      { name: "Full Smile Makeovers", price: "Consultation Required" }
    ]
  }
];

export const Route = createFileRoute("/_site/treatments")({
  head: () => ({
    meta: [
      { title: "Treatments — Grace Aesthetics Clinic" },
      { name: "description", content: "Signature facials, injectables, laser, hair restoration and cosmetic dentistry — all under one roof at Grace Aesthetics Clinic." },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Treatments"
        title="Clinical Excellence in Every Discipline"
        subtitle="Explore our specialized services across hair, skin, and dental care. Each treatment is delivered by a master of their craft."
        image={treatmentsImg}
      />

      <div className="bg-white">
        {sections.map((s, i) => (
          <section 
            key={s.id} 
            id={s.id}
            className={`relative py-24 sm:py-32 overflow-hidden ${i % 2 === 1 ? "bg-zinc-50" : "bg-white"}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                {/* Image Column */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group">
                    <img 
                      src={s.image} 
                      alt={s.title} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
                  </div>
                  {/* Floating badge */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-6 -right-6 h-32 w-32 glass rounded-3xl flex flex-col items-center justify-center text-center p-4 shadow-xl z-10"
                  >
                    <Sparkles className="h-6 w-6 text-aurora mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">Master Specialists</span>
                  </motion.div>
                </motion.div>

                {/* Content Column */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-aurora">{s.subtitle}</span>
                  <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight">{s.title}</h2>
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>

                  <div className="mt-10 grid gap-4">
                    {s.treatments.map((t) => (
                      <div 
                        key={t.name}
                        className="flex items-center justify-between p-5 rounded-2xl glass-strong hover:bg-white transition-colors border border-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-aurora/60" />
                          <span className="font-semibold text-zinc-900">{t.name}</span>
                        </div>
                        <span className="text-xs font-bold text-muted-foreground bg-accent px-3 py-1 rounded-full">
                          {t.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/booking"
                    className="mt-10 inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-bold text-background hover:opacity-90 transition shadow-elegant"
                  >
                    Book {s.title.split(' ')[0]} Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  ),
});

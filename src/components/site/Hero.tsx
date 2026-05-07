import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";
import slide1 from "@/assets/slide1.jpg";
import slide2 from "@/assets/slide2.jpg";
import slide3 from "@/assets/slide3.jpg";

const slides = [
  {
    image: slide1,
    eyebrow: "Signature Skincare",
    title: ["Skin that", "glows."],
    accent: "glows.",
    description:
      "Bespoke facials and medical-grade serums, formulated for your skin — not the masses.",
    cta: "Book a facial",
    accentTo: "#services",
  },
  {
    image: slide2,
    eyebrow: "The Velora Suite",
    title: ["A sanctuary,", "by design."],
    accent: "by design.",
    description:
      "Step inside our flagship clinic — calm, considered, designed around the modern client.",
    cta: "Tour the clinic",
    accentTo: "#work",
  },
  {
    image: slide3,
    eyebrow: "Expert Care",
    title: ["Confidence,", "rediscovered."],
    accent: "rediscovered.",
    description:
      "Board-certified specialists. Honest advice. Subtle, natural-looking results that last.",
    cta: "Meet the team",
    accentTo: "#about",
  },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const s = slides[i];
  const next = () => setI((x) => (x + 1) % slides.length);
  const prev = () => setI((x) => (x - 1 + slides.length) % slides.length);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 grid-bg" />

      <motion.div
        aria-hidden
        animate={{ y: [0, -30, 0], x: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-aurora opacity-40 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 30, 0], x: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 -right-24 h-96 w-96 rounded-full bg-aurora opacity-30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text side */}
          <div className="text-center lg:text-left min-h-[28rem] lg:min-h-[32rem] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {s.eyebrow}
                </span>

                <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
                  {s.title[0]}
                  <br />
                  <span className="text-gradient">{s.title[1]}</span>
                </h1>

                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {s.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-elegant hover:opacity-90 transition"
                  >
                    <Calendar className="h-4 w-4" />
                    Book a consultation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={s.accentTo}
                    className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-accent transition"
                  >
                    {s.cta}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel controls */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-4">
              <button
                onClick={prev}
                className="h-11 w-11 rounded-full glass-strong inline-flex items-center justify-center hover:bg-accent transition"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2">
                {slides.map((_, k) => (
                  <button
                    key={k}
                    onClick={() => setI(k)}
                    aria-label={`Go to slide ${k + 1}`}
                    className="group relative h-1.5 overflow-hidden rounded-full bg-border transition-all"
                    style={{ width: i === k ? 48 : 16 }}
                  >
                    {i === k && (
                      <motion.span
                        key={`bar-${i}-${paused}`}
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? "100%" : "100%" }}
                        transition={{ duration: paused ? 0 : 6, ease: "linear" }}
                        className="absolute inset-y-0 left-0 bg-foreground"
                      />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                className="h-11 w-11 rounded-full glass-strong inline-flex items-center justify-center hover:bg-accent transition"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="ml-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* Image side */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-aurora opacity-30 blur-3xl" />
            <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden rounded-[2rem] glass-strong p-2 shadow-elegant">
              <AnimatePresence mode="wait">
                <motion.img
                  key={i}
                  src={s.image}
                  alt={s.eyebrow}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] rounded-[1.5rem] object-cover"
                />
              </AnimatePresence>

              {/* Slide counter pill */}
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full glass-strong px-3 py-1.5 text-xs font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                Now booking · Spring
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:flex absolute -left-6 top-12 glass-strong rounded-2xl p-4 shadow-card items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-aurora flex items-center justify-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Glow score</div>
                <div className="font-semibold">+ 47%</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:block absolute -right-6 bottom-10 glass-strong rounded-2xl p-4 shadow-card"
            >
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">12,000+ happy clients</div>
              <div className="font-semibold text-base">4.9 average rating</div>
            </motion.div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { v: "12k+", l: "Treatments delivered" },
            { v: "25+", l: "Signature services" },
            { v: "4.9★", l: "Average rating" },
            { v: "12 yrs", l: "Of expert care" },
          ].map((s, k) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: k * 0.06 }}
              className="rounded-2xl glass px-5 py-4 text-center sm:text-left"
            >
              <div className="font-display text-2xl font-semibold tracking-tight">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </motion.div>
          ))}
        </div>

        {/* Featured logos */}
        <div className="mt-16 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">As featured in</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
            {["Vogue", "Elle", "Harper's", "Allure", "Marie Claire", "Glamour"].map((b) => (
              <span key={b} className="text-xl font-display font-semibold tracking-tight italic">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

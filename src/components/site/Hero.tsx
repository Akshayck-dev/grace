import { motion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
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
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              Award-winning aesthetic clinic · Est. 2014
            </span>

            <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
              Skin that{" "}
              <span className="text-gradient">glows.</span>
              <br />
              Confidence that lasts.
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Velora is a premium cosmetics clinic blending medical expertise with
              modern aesthetics — bespoke facials, advanced skincare and non-invasive
              treatments delivered by board-certified specialists.
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
                href="#services"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-accent transition"
              >
                Explore treatments
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div>
                <div className="font-display text-2xl font-semibold text-foreground">12k+</div>
                <div className="text-xs">Happy clients</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-semibold text-foreground">4.9★</div>
                <div className="text-xs">Avg. rating</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-semibold text-foreground">25+</div>
                <div className="text-xs">Treatments</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-aurora opacity-30 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] glass-strong p-2 shadow-elegant">
              <img
                src={hero}
                alt="Velora cosmetics clinic"
                width={1536}
                height={1024}
                className="w-full rounded-[1.5rem] object-cover aspect-[4/5] sm:aspect-[5/6]"
              />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:flex absolute -left-6 top-12 glass-strong rounded-2xl p-4 shadow-card items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-aurora" />
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
              <div className="text-xs text-muted-foreground">Next opening</div>
              <div className="font-semibold text-lg">Tomorrow · 10:30</div>
              <div className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 3 slots left
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            As featured in
          </p>
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

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 grid-bg" />

      {/* Floating blobs */}
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            New — Lumen Studio v3 is live
          </span>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            Design that feels{" "}
            <span className="text-gradient">inevitable.</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
            We build elegant digital products for ambitious teams. From brand and
            interface to motion and engineering — crafted with relentless care.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-elegant hover:opacity-90 transition"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-accent transition"
            >
              <Play className="h-4 w-4" /> Watch the reel
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-aurora opacity-30 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] glass-strong p-2 shadow-elegant">
            <img
              src={hero}
              alt="Lumen interface preview"
              width={1536}
              height={1024}
              className="w-full rounded-[1.5rem] object-cover aspect-[16/10]"
            />
          </div>

          {/* Floating UI cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:flex absolute -left-6 top-12 glass-strong rounded-2xl p-4 shadow-card items-center gap-3"
          >
            <div className="h-10 w-10 rounded-xl bg-aurora" />
            <div>
              <div className="text-xs text-muted-foreground">Live users</div>
              <div className="font-semibold">+ 24,381</div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:block absolute -right-6 bottom-10 glass-strong rounded-2xl p-4 shadow-card"
          >
            <div className="text-xs text-muted-foreground">Conversion</div>
            <div className="font-semibold text-lg">+38.2%</div>
            <div className="mt-1 h-1.5 w-32 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-2/3 bg-aurora" />
            </div>
          </motion.div>
        </motion.div>

        {/* Logos */}
        <div className="mt-20 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by teams at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
            {["Vercel", "Linear", "Framer", "Notion", "Stripe", "Arc"].map((b) => (
              <span key={b} className="text-xl font-display font-semibold tracking-tight">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

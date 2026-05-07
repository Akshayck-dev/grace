import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { SectionHeader } from "./Services";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * ease));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 12000, suffix: "+", label: "Happy clients" },
  { value: 25, suffix: "+", label: "Treatments offered" },
  { value: 98, suffix: "%", label: "Would recommend" },
  { value: 12, suffix: "", label: "Years of expertise" },
];

const timeline = [
  { year: "2014", title: "Velora opens its doors", text: "A small clinic founded by Dr. Elena Hayes with one goal — honest, expert aesthetic care." },
  { year: "2018", title: "Medical aesthetics expansion", text: "Added board-certified injectors and our flagship laser suite." },
  { year: "2022", title: "Wellness pavilion launch", text: "Opened our IV therapy and holistic wellness space — beauty from the inside out." },
  { year: "2026", title: "Flagship clinic redesign", text: "A reimagined sanctuary built around the modern client. You'll feel the difference at the door." },
];

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="About Velora"
          title="Expert care, beautifully delivered."
          subtitle="A team of board-certified physicians, master estheticians and wellness specialists — united by one standard of care."
        />

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-3xl glass-strong p-6 hover-lift"
            >
              <div className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl glass-strong p-8 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-aurora opacity-30 blur-3xl" />
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-aurora text-white shadow-glow">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold">Our Mission</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              To deliver expert aesthetic care that respects the individual — natural-looking results, never overdone, always honest.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="rounded-3xl glass-strong p-8 relative overflow-hidden"
          >
            <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-aurora opacity-30 blur-3xl" />
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-aurora text-white shadow-glow">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold">Our Vision</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              A world where everyone feels at home in their skin — supported by science, guided by artistry, treated with kindness.
            </p>
          </motion.div>
        </div>

        <div className="mt-20">
          <h3 className="font-display text-2xl font-semibold">Our journey</h3>
          <div className="mt-8 relative">
            <div className="absolute left-3 sm:left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`relative grid sm:grid-cols-2 gap-4 sm:gap-12 ${i % 2 ? "sm:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className={`pl-10 sm:pl-0 ${i % 2 ? "sm:text-left" : "sm:text-right"}`}>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.year}</div>
                    <div className="mt-1 font-semibold text-lg">{t.title}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
                  </div>
                  <div className="hidden sm:block" />
                  <span className="absolute left-3 sm:left-1/2 top-1.5 -translate-x-1/2 h-3 w-3 rounded-full bg-aurora ring-4 ring-background" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

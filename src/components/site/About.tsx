import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Compass, Telescope } from "lucide-react";
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
  { value: 142, suffix: "+", label: "Projects shipped" },
  { value: 38, suffix: "", label: "Awards & features" },
  { value: 99, suffix: "%", label: "Client retention" },
  { value: 12, suffix: "", label: "Years compounding" },
];

const timeline = [
  { year: "2013", title: "Founded in Lisbon", text: "Started as a two-person studio with one big belief: craft compounds." },
  { year: "2017", title: "Series of breakthroughs", text: "Shipped flagship work for Northwind, Fielder and Tessera." },
  { year: "2021", title: "Studio expands globally", text: "Opened an outpost in Brooklyn. Grew to a team of fifteen." },
  { year: "2026", title: "Lumen v3", text: "Launched our internal design OS. Now powering every engagement." },
];

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="About"
          title="A small studio, a long horizon."
          subtitle="We're a tightly-knit team obsessed with the work. We choose a few partners a year and go deep."
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
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold">Mission</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Make digital products that respect people's time and attention — beautiful by default, useful by design.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="rounded-3xl glass-strong p-8 relative overflow-hidden"
          >
            <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-aurora opacity-30 blur-3xl" />
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-aurora text-white shadow-glow">
              <Telescope className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold">Vision</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              A world where the best software feels inevitable — quiet, considered, alive with detail.
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

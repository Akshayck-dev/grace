import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { HeroSlide } from "@/types";

export function Hero({ slides: dbSlides }: { slides?: HeroSlide[] }) {
  const slides = dbSlides && dbSlides.length > 0 
    ? dbSlides.map(s => ({
        image: s.image_url,
        mobileImage: s.mobile_image_url,
        eyebrow: s.eyebrow,
        title: [s.title1, s.title2],
        description: s.description,
        cta: s.cta,
        accentTo: s.accent_to
      }))
    : [];

  if (slides.length === 0) return null;

  const [i, setI] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => {
      setDirection(1);
      setI((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(t);
  }, [slides.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setI((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  const current = slides[i];

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-white">
      {/* Background Images with Cross-fade */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={i}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <picture>
            {current.mobileImage && <source media="(max-width: 768px)" srcSet={current.mobileImage} />}
            <img 
              src={current.image} 
              alt="Hero" 
              className="h-full w-full object-cover object-top md:object-center transition-transform duration-[10s] scale-105"
            />
          </picture>
          {/* Top gradient for Navbar visibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950/40 to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="container relative z-10 mx-auto h-full px-4 sm:px-6">
        <div className="flex h-full max-w-3xl flex-col justify-center">
          <motion.div
            key={`content-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-auto mb-20 text-center sm:text-left"
          >
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4 sm:gap-6 mt-8">
                {current.cta && (
                  <Link
                    to={current.accentTo}
                    className="group relative flex h-12 sm:h-14 w-fit sm:w-auto items-center justify-center overflow-hidden rounded-full bg-zinc-950 px-8 sm:px-10 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white transition-all shadow-2xl"
                  >
                    <span className="relative z-10">{current.cta}</span>
                    <ArrowRight className="absolute right-4 h-4 w-4 translate-x-4 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                )}
                
                <Link
                  to="/contact"
                  className="group flex h-12 sm:h-auto w-fit sm:w-auto items-center justify-center sm:justify-start gap-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-zinc-900 glass-strong px-6 py-3 rounded-full hover:bg-white transition-all shadow-lg"
                >
                  <span className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-aurora/10 flex items-center justify-center group-hover:bg-aurora/20 transition-colors">
                    <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-aurora" />
                  </span>
                  Book a Consultation
                </Link>
              </div>
            </motion.div>
        </div>
      </div>

      {/* Navigation Controls - Refined Center-Bottom for Mobile */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 sm:left-auto sm:right-10 -translate-x-1/2 sm:translate-x-0 z-20 flex flex-col items-center sm:items-end gap-6">
        <div className="flex items-center gap-4 sm:gap-6 bg-white/20 backdrop-blur-xl px-4 py-2.5 sm:py-3 rounded-full border border-white/30 shadow-2xl">
          <div className="flex gap-2 sm:gap-3">
            <button 
              onClick={() => paginate(-1)}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white flex items-center justify-center text-zinc-950 hover:bg-zinc-950 hover:text-white transition-all shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white flex items-center justify-center text-zinc-950 hover:bg-zinc-950 hover:text-white transition-all shadow-md"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="h-4 w-[1px] bg-white/30 hidden sm:block" />
          
          {/* Progress Dots */}
          <div className="flex gap-1.5 sm:gap-2">
            {slides.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${i === k ? "w-5 sm:w-6 bg-aurora" : "w-1 sm:w-1.5 bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Side Featured In (Minimal) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-12 px-8 py-12 border-l border-zinc-100 opacity-60 hover:opacity-100 transition-opacity">
        {["Vogue", "Elle", "Allure"].map((brand) => (
          <span key={brand} className="text-sm font-display font-bold tracking-tighter text-zinc-900 rotate-90 italic">
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

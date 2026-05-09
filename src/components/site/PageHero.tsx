import { motion } from "framer-motion";

export function PageHero({ 
  eyebrow, 
  title, 
  subtitle, 
  image,
  position = "object-top",
  className = ""
}: { 
  eyebrow: string; 
  title: string; 
  subtitle?: string; 
  image?: string;
  position?: string;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-20 bg-white ${className}`}>
      {image && (
        <div className="absolute inset-0 z-0">
          <img src={image} alt={title} className={`w-full h-full object-cover ${position}`} />
          <div className="absolute inset-0 bg-gradient-to-l from-zinc-950/60 via-transparent to-transparent" />
          {/* Top gradient for Navbar visibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950/60 to-transparent" />
        </div>
      )}
      <div className="absolute inset-0 bg-hero/10" />
      <div className="absolute inset-0 grid-bg" />
      <motion.div
        aria-hidden
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-aurora opacity-30 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 flex justify-end">
        <div className="max-w-2xl text-right">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-white"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-lg text-white/80 font-medium max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
        </div>
      </div>
    </section>
  );
}

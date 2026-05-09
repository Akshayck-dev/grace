import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-12 bg-[#fff1f5] overflow-hidden text-center">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-aurora/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          {/* Icon with Hand Style (Simplified representation) */}
          <div className="relative mb-4 group">
            <div className="absolute -inset-4 bg-aurora/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
            <div className="relative h-16 w-16 flex items-center justify-center">
              {/* Using a custom SVG for the heart-in-hand look from the screenshot */}
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="h-16 w-16 text-aurora"
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" fillOpacity="0.1" />
                <path d="M2 12h5l2 3h4l2-3h7" stroke="currentColor" fill="none" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 tracking-tight">
            Begin Your Transformation Today
          </h2>
          
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed mb-4">
            Discover personalized beauty and wellness treatments designed to help you look radiant, 
            feel confident, and live beautifully — inside and out.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-aurora text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-lg hover:shadow-aurora/20 hover:opacity-90 transition-all">
              Schedule a Free Discovery Call
            </button>
            <button className="bg-aurora text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-lg hover:shadow-aurora/20 hover:opacity-90 transition-all">
              View Service Packages
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

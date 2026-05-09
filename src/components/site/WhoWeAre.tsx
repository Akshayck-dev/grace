import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function WhoWeAre() {
  return (
    <section className="relative py-12 overflow-hidden">
      {/* Background Image with Parallax/Zoom effect */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop" 
          alt="Clinic Background" 
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-strong rounded-[2.5rem] p-8 md:p-16 text-center shadow-2xl backdrop-blur-2xl border border-white/20">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Your Premier Destination for
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              Beauty and Wellness
            </p>
            
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="w-16 h-1 bg-aurora rounded-full" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-aurora">
                Who We Are
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg mb-10 max-w-2xl mx-auto">
              Grace Aesthetics Clinic is a leading multi-specialty clinic in Kottayam, Kerala, offering a
              comprehensive range of cosmetic, hair, and dental services to enhance your natural beauty and
              improve your overall well-being. At Grace Aesthetics Clinic, we pride ourselves on providing top-
              quality services that cater to all your aesthetic and wellness needs. With a team of experienced
              professionals and state-of-the-art facilities, we are dedicated to helping you look and feel your
              best, inside and out.
            </p>

            <Link 
              to="/about"
              className="inline-flex items-center gap-2 bg-aurora text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl group"
            >
              Read More
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

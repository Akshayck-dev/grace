import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Testimonial } from "@/lib/api-types";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import { Link } from "@tanstack/react-router";

const defaultItems = [
  { name: "Rahul Menon", role: "Kottayam", avatar: p1, rating: 5,
    quote: "The UI is so clean and intuitive. It feels like it was designed with the user's peace of mind at the forefront. Truly a soft and delightful experience." },
  { name: "Anjali Varghese", role: "Thrissur", avatar: p2, rating: 5,
    quote: "A masterclass in minimalist design. It doesn't scream for attention, but it's impossible to ignore. The subtle shadows and highlights are beautiful." },
  { name: "Basil Jose", role: "Idukki", avatar: p3, rating: 5,
    quote: "The interface is so friendly and soft. It makes complex tasks feel simple and approachable. A really delightful user experience from top to bottom." },
];

export function Testimonials({ items: dbItems }: { items?: Testimonial[] }) {
  const items = dbItems && dbItems.length > 0
    ? dbItems.map(it => ({
        name: it.name,
        role: it.role,
        avatar: it.avatar_url,
        rating: it.rating,
        quote: it.quote
      }))
    : [];

  return (
    <section id="testimonials" className="relative pt-12 pb-4 overflow-hidden bg-gradient-to-br from-[#e0e8ff] via-white to-[#ffe0f0]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-zinc-900 mb-6 tracking-tight"
          >
            Trusted by Innovators Worldwide
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-600 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Join thousands of satisfied customers who have transformed their business with our innovative solutions
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto mb-20">
          {items.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
              className="relative pt-12"
            >
              <div className="bg-white rounded-[2rem] p-8 pb-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col items-center text-center h-full border border-white/50 backdrop-blur-sm">
                {/* Overlapping Avatar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="h-24 w-24 rounded-full p-1 bg-white shadow-xl">
                    <img src={t.avatar} alt={t.name} className="h-full w-full rounded-full object-cover border-2 border-zinc-50" />
                  </div>
                </div>

                <div className="flex justify-center gap-1 text-amber-400 mb-4 mt-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                
                <h3 className="font-bold text-xl text-zinc-900 mb-4">{t.name}</h3>
                
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px]">
                  "{t.quote}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            to="/reviews"
            className="inline-flex items-center px-10 py-4 rounded-full bg-gradient-to-r from-[#8b7ff0] to-[#7c6dec] text-white font-bold shadow-[0_10px_25px_rgba(139,127,240,0.4)] hover:shadow-[0_15px_35px_rgba(139,127,240,0.5)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Read More Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}

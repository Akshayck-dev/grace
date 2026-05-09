import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const offers = [
  {
    title: "Hair Care",
    subtitle: "Truly Exceptional Results",
    description: "At Grace Aesthetics, we offer advanced hair care solutions to help you achieve healthy, beautiful hair that you can feel proud of. We offer comprehensive solutions to address all your hair-related concerns, whether you're dealing with hair loss, thinning hair, or simply want to improve the overall health and appearance of your hair. Our team of hair care experts is here to help.",
    image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=2072&auto=format&fit=crop",
    link: "/treatments"
  },
  {
    title: "Skin Care",
    subtitle: "The Difference You're Looking For",
    description: "At Grace Aesthetics, we believe that healthy, radiant skin is the foundation of beauty. Our dermatology services are designed to rejuvenate and enhance your skin, helping you achieve a youthful, glowing complexion. We offer a wide range of treatments designed to enhance your natural beauty and rejuvenate your skin. Our expert team of dermatologists is committed to providing results.",
    image: "https://images.unsplash.com/photo-1570172619380-21c6bda0ca34?q=80&w=2070&auto=format&fit=crop",
    link: "/treatments"
  },
  {
    title: "Dental Care",
    subtitle: "Customized For Your Needs",
    description: "At Grace Aesthetics, we understand the importance of a healthy, beautiful smile. Our dental team is committed to providing top-quality care to help you achieve and maintain optimal oral health. From routine cleanings and exams to advanced cosmetic procedures and restorative treatments, our team of experienced dentists is dedicated to providing top-quality care in a comfortable environment.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2074&auto=format&fit=crop",
    link: "/treatments"
  }
];

export function WhatWeOffer() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            What We Offer
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground uppercase tracking-[0.2em] text-sm font-semibold"
          >
            Treatments You Can Trust
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group bg-white rounded-[1.5rem] border border-border shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-1 text-center">
                <h3 className="text-xl font-display font-bold mb-1">{offer.title}</h3>
                <p className="text-aurora font-semibold text-[10px] uppercase tracking-wider mb-4 italic">
                  {offer.subtitle}
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed mb-6 flex-1 italic line-clamp-3">
                  {offer.description}
                </p>
                
                <Link
                  to={offer.link}
                  className="inline-flex items-center justify-center gap-2 border-2 border-aurora text-aurora px-5 py-2 rounded-full text-xs font-bold hover:bg-aurora hover:text-white transition-all group/btn mx-auto"
                >
                  Book Online
                  <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

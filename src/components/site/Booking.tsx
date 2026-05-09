import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./Services";
import { ExternalLink, Plus } from "lucide-react";

const categories = [
  { id: "all", label: "All Services" },
  { id: "cosmetic", label: "Cosmetic Clinic" },
  { id: "facial", label: "Facial Surgeries" },
  { id: "anti-ageing", label: "Anti-ageing" },
  { id: "hair", label: "Hair Clinic" },
  { id: "dental", label: "Dental Clinic" },
];

const services = [
  { name: "Chemical Peels", duration: "1 Hour", category: ["all", "cosmetic"] },
  { name: "Hydrafacial", duration: "2 Hour", category: ["all", "cosmetic"] },
  { name: "Tattoo Removal", duration: "1 Hour", category: ["all", "cosmetic"] },
  { name: "Laser Hair Reduction", duration: "1 Hour", category: ["all", "cosmetic"] },
  { name: "Carbon Laser Peel", duration: "1 Hour", category: ["all", "cosmetic"] },
  { name: "Microneedling", duration: "1 Hour", category: ["all", "cosmetic"] },
  { name: "Microblading", duration: "1 Hour", category: ["all", "cosmetic"] },
  { name: "Warts & Skin tag Removal", duration: "1 Hour", category: ["all", "facial"] },
  { name: "Keloid Removal", duration: "1 Hour", category: ["all", "facial"] },
  { name: "Earlobe Repairs", duration: "1 Hour", category: ["all", "facial"] },
  { name: "Dimpleplasty", duration: "2 Hour", category: ["all", "facial"] },
  { name: "Lip debulking", duration: "1 Hour", category: ["all", "facial"] },
  { name: "Scar Revisions", duration: "2 Hour", category: ["all", "facial"] },
  { name: "Botox", duration: "2 Hour", category: ["all", "anti-ageing"] },
  { name: "Fillers", duration: "2 Hour", category: ["all", "anti-ageing"] },
  { name: "Threadlifts", duration: "1 Hour 30 Minutes", category: ["all", "anti-ageing"] },
  { name: "Glutathione Injections", duration: "1 Hour", category: ["all", "anti-ageing"] },
  { name: "Hair Transplantation", duration: "3 Hour", category: ["all", "hair"] },
  { name: "PRP & GFC treatments", duration: "1 Hour", category: ["all", "hair"] },
  { name: "Scalp Micropigmentation", duration: "2 Hour", category: ["all", "hair"] },
  { name: "Dental Implants", duration: "2 Hour", category: ["all", "dental"] },
  { name: "Smile Designing", duration: "3 Hour", category: ["all", "dental"] },
  { name: "Clear Aligners", duration: "1 Hour 30 min", category: ["all", "dental"] },
  { name: "Wisdom Tooth Removal", duration: "2 Hour", category: ["all", "dental"] },
  { name: "Crowns and Bridges", duration: "2 Hour", category: ["all", "dental"] },
  { name: "Complete / Partial dentures", duration: "2 Hour", category: ["all", "dental"] },
  { name: "Tooth Whitening", duration: "2 Hour", category: ["all", "dental"] },
  { name: "Root Canal Treatments", duration: "2 Hour", category: ["all", "dental"] },
  { name: "Teeth Extractions", duration: "1 Hour", category: ["all", "dental"] },
];

export function Booking() {
  const [activeTab, setActiveTab] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredServices = services.filter((s) => s.category.includes(activeTab));
  const displayedServices = showAll ? filteredServices : filteredServices.slice(0, 10);

  return (
    <section className="py-24 bg-zinc-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Service Menu"
          title="Clinical Pricing & Booking"
          subtitle="Transparent pricing for our medical-grade aesthetic and dental procedures."
          align="center"
        />

        {/* Categories Tab */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setShowAll(false);
              }}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                activeTab === cat.id
                  ? "bg-zinc-950 text-white shadow-lg"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Table */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200">
                  <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-zinc-900">Service</th>
                  <th className="px-8 py-5 text-sm font-bold uppercase tracking-wider text-zinc-900">Estimated Duration</th>
                  <th className="px-8 py-5 text-right text-sm font-bold uppercase tracking-wider text-zinc-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <AnimatePresence mode="popLayout">
                  {displayedServices.map((service) => (
                    <motion.tr
                      key={service.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="group hover:bg-zinc-50/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <span className="block text-base font-medium text-zinc-900 group-hover:text-aurora transition-colors">
                          {service.name}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm text-zinc-500 font-medium">
                        {service.duration}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <a
                          href="https://wa.me/919645969799"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Book via WhatsApp
                          <ExternalLink className="h-3 w-3 opacity-50" />
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {!showAll && filteredServices.length > 10 && (
            <div className="border-t border-zinc-100 bg-zinc-50/50 p-6 flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="text-sm font-bold text-zinc-900 hover:text-aurora transition-colors flex items-center gap-2"
              >
                View All {filteredServices.length} Services
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Note */}
        <div className="mt-8 text-center text-sm text-zinc-400 italic">
          * Note: Durations are estimates and may vary based on individual consultation.
        </div>
      </div>
    </section>
  );
}

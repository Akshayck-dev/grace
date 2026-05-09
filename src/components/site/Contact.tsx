import { motion } from "framer-motion";
import { useState } from "react";
import { Send, MapPin, Mail, Phone, Clock } from "lucide-react";
import { SectionHeader } from "./Services";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Compose the message for WhatsApp
    const text = `Hello Grace Aesthetics & Dental Care...%0ANew Enquiry Details,%0AName: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0APhone: ${encodeURIComponent(formData.phone)}%0AMessage: ${encodeURIComponent(formData.message)}`;

    // Clinic's WhatsApp number
    const phoneNumber = "919645969799";

    // WhatsApp link
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative pt-2 pb-28 sm:pt-4 sm:pb-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Get in Touch"
          title="Begin your transformation."
          subtitle="Have questions or need more information? Our knowledgeable team is here to assist you with any inquiries. Whether you want to schedule an appointment or simply say hello — we're always happy to hear from you."
        />

        <div className="mt-10 grid lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 self-start rounded-3xl glass-strong p-6 sm:pt-10 sm:px-10 sm:pb-0 shadow-card border border-white/10 overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Your Name">
                  <input 
                    required 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="field" 
                    placeholder="Enter your name" 
                  />
                </Field>
                <Field label="Email Address">
                  <input 
                    required 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="field" 
                    placeholder="Enter your email" 
                  />
                </Field>
              </div>
              <Field label="Mobile Number">
                <input 
                  required 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="field" 
                  placeholder="Enter your mobile number" 
                />
              </Field>
              <Field label="How can we help?">
                <textarea 
                  required 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5} 
                  className="field resize-none" 
                  placeholder="Write your message here..." 
                />
              </Field>
              <div className="flex justify-center pb-2">
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-foreground px-10 py-4 text-sm font-bold text-background shadow-glow hover:opacity-95 transition-all active:scale-[0.98]"
                >
                  Send Message via WhatsApp
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </motion.div>

          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <ContactInfo 
                icon={MapPin} 
                label="Location" 
                value="Padavathil Building, Thellakom PO, Kottayam" 
              />
              <ContactInfo 
                icon={Mail} 
                label="Email Us" 
                value="info@graceaesthetics.com" 
              />
              <ContactInfo 
                icon={Phone} 
                label="Call Now" 
                value="+91 96459 69799" 
              />
              <ContactInfo 
                icon={Clock} 
                label="Clinic Hours" 
                value="Mon - Sat: 10:00 AM - 7:00 PM" 
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden glass-strong h-80 border border-white/10 shadow-card"
            >
              <iframe 
                title="Grace Aesthetics Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62935.58818662269!2d76.5030250791064!3d9.640455476020366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07d30ef458dc3d%3A0x549c94d7b559d5ba!2sGrace%20Aesthetics%20%26%20Dental%20Care!5e0!3m2!1sml!2sin!4v1760533502941!5m2!1sml!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground ml-1">{label}</span>
      {children}
    </label>
  );
}

function ContactInfo({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl glass p-4 flex items-center gap-4 hover:border-brand/30 transition-colors"
    >
      <div className="h-10 w-10 rounded-xl bg-aurora text-white inline-flex items-center justify-center shadow-glow">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-bold">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </motion.div>
  );
}

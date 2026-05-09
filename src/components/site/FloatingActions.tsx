import { motion } from "framer-motion";
import { Calendar, Phone, MessageCircle, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";

const actions = [
  { 
    id: "booking",
    icon: Calendar, 
    color: "bg-amber-500", 
    href: "/booking",
    isExternal: false,
    label: "Book Appointment"
  },
  { 
    id: "call",
    icon: Phone, 
    color: "bg-cyan-500", 
    href: "tel:+919645969799",
    isExternal: true,
    label: "Call Us"
  },
  { 
    id: "whatsapp",
    icon: MessageCircle, 
    color: "bg-green-500", 
    href: "https://wa.me/919645969799",
    isExternal: true,
    label: "WhatsApp Chat"
  },
  { 
    id: "email",
    icon: Mail, 
    color: "bg-rose-500", 
    href: "mailto:concierge@graceaestheticsclinic.com",
    isExternal: true,
    label: "Email Us"
  },
];

export function FloatingActions() {
  return (
    <div className="fixed right-6 bottom-8 z-[60] flex flex-col gap-4">
      {actions.map((action, i) => (
        <motion.div
          key={action.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: [0, -6, 0] 
          }}
          transition={{ 
            delay: i * 0.1,
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }
          }}
        >
          <Tooltip label={action.label}>
            {action.isExternal ? (
              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-all hover:scale-110 hover:rotate-3 active:scale-95 ${action.color} border border-white/20`}
              >
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                <action.icon className="relative h-5 w-5" />
              </a>
            ) : (
              <Link
                to={action.href as any}
                className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-all hover:scale-110 hover:rotate-3 active:scale-95 ${action.color} border border-white/20`}
              >
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                <action.icon className="relative h-5 w-5" />
              </Link>
            )}
          </Tooltip>
        </motion.div>
      ))}
    </div>
  );
}

function Tooltip({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="group relative">
      {children}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 shadow-xl">
        {label}
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-zinc-900" />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./theme";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { 
    to: "/treatments", 
    label: "Services", 
    items: [
      { to: "/treatments#hair", label: "Hair Care" },
      { to: "/treatments#skin", label: "Skin Care" },
      { to: "/treatments#dental", label: "Dental Care" },
    ]
  },
  { to: "/reviews", label: "Testimonials" },
  { to: "/clinic", label: "Gallery" },
  { to: "/contact", label: "Contact" },
  { to: "/booking", label: "Service Booking" },
];

import logo from "@/assets/Gracelogo.webp";
import slider11 from "@/assets/silder_web/slider11.webp";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-card" : "bg-white/5 backdrop-blur-[2px] border border-white/10"
          }`}
        >
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Grace Aesthetics Clinic" className="h-16 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            {links.map((l) => {
              const active = pathname === l.to;
              const hasItems = !!l.items;
              
              if (hasItems) {
                return (
                  <div key={l.label} className="group relative">
                    <button
                      className={`relative flex items-center gap-1 px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                        active 
                          ? (scrolled ? "text-foreground" : "text-white") 
                          : (scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white")
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className={`absolute inset-0 rounded-full ${scrolled ? "bg-accent" : "bg-white/20"}`}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative flex items-center gap-1">
                        {l.label}
                        <ChevronDown className={`h-3 w-3 transition-transform group-hover:rotate-180 ${scrolled ? "opacity-50" : "opacity-80"}`} />
                      </span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100">
                      <div className="w-48 glass-strong rounded-2xl p-2 shadow-card border border-white/10 overflow-hidden">
                        {l.items?.map((item) => (
                          <Link
                            key={item.label}
                            to={item.to}
                            className="block px-4 py-2.5 text-sm text-foreground hover:bg-accent rounded-xl transition-colors font-medium"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={l.label}
                  to={l.to}
                  className={`relative px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                    active 
                      ? (scrolled ? "text-foreground" : "text-white") 
                      : (scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white")
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className={`absolute inset-0 rounded-full ${scrolled ? "bg-accent" : "bg-white/20"}`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1">
                    {l.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/contact"
              className="hidden sm:inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background hover:opacity-90 transition"
            >
              Book now
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass transition-colors ${
                scrolled ? "text-foreground" : "text-white border-white/20"
              }`}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-3 glass-strong rounded-3xl p-4 flex flex-col gap-1 overflow-hidden"
            >
              {links.map((l) => {
                if (l.items) {
                  return (
                    <div key={l.label} className="flex flex-col">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm hover:bg-accent transition"
                      >
                        {l.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-col gap-1 pl-4 overflow-hidden"
                          >
                            {l.items.map((item) => (
                              <Link
                                key={item.label}
                                to={item.to}
                                className="px-4 py-2.5 rounded-xl text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="px-4 py-3 rounded-2xl text-sm hover:bg-accent transition"
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-foreground px-5 py-3 text-sm font-medium text-background"
              >
                Book now
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

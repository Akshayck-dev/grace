import { Link } from "@tanstack/react-router";
import { Sparkles, Twitter, Github, Linkedin, Instagram } from "lucide-react";

const cols = [
  { title: "Clinic", links: [
    { label: "Treatments", to: "/treatments" },
    { label: "The Clinic", to: "/clinic" },
    { label: "About", to: "/about" },
    { label: "Reviews", to: "/reviews" },
  ]},
  { title: "Resources", links: [
    { label: "Book a visit", to: "/contact" },
    { label: "Aftercare", to: "/contact" },
    { label: "Gift cards", to: "/contact" },
    { label: "FAQ", to: "/contact" },
  ]},
];

import logo from "@/assets/Gracelogo.webp";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Grace Aesthetics" className="h-16 w-auto object-contain" />
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            A premium multi-specialty clinic delivering expert aesthetic care, beautifully.
          </p>
          <div className="mt-5 flex gap-2">
            {[Twitter, Github, Linkedin, Instagram].map((I, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full glass inline-flex items-center justify-center hover:bg-accent transition" aria-label="social">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.title}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-foreground text-muted-foreground transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>concierge@graceaestheticsclinic.com</li>
            <li>+91 (481) 555-0144</li>
            <li>Kottayam, Kerala, India</li>
            <li>Mon–Sat · 9–8</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Grace Aesthetics Clinic. All rights reserved.</div>
        <div className="flex gap-5"><a href="#" className="hover:text-foreground">Privacy</a><a href="#" className="hover:text-foreground">Terms</a><a href="#" className="hover:text-foreground">Cookies</a></div>
      </div>
    </footer>
  );
}

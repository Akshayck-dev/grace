import { Sparkles, Twitter, Github, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border py-16 mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2 font-display font-semibold text-lg">
            <span className="h-8 w-8 rounded-xl bg-aurora text-white inline-flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </span>
            Velora
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A premium cosmetics clinic delivering expert aesthetic care, beautifully.
          </p>
          <div className="mt-5 flex gap-2">
            {[Twitter, Github, Linkedin, Instagram].map((I, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full glass inline-flex items-center justify-center hover:bg-accent transition" aria-label="social">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Clinic", links: ["Treatments", "Gallery", "About", "Careers"] },
          { title: "Resources", links: ["Journal", "Aftercare", "Gift cards", "FAQ"] },
          { title: "Contact", links: ["concierge@veloraclinic.com", "+1 (415) 555-0144", "120 Madison Ave", "Mon–Sat · 9–8"] },
        ].map((c) => (
          <div key={c.title}>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.title}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="hover:text-foreground text-muted-foreground transition">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-12 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Velora Studio. All rights reserved.</div>
        <div className="flex gap-5"><a href="#" className="hover:text-foreground">Privacy</a><a href="#" className="hover:text-foreground">Terms</a><a href="#" className="hover:text-foreground">Cookies</a></div>
      </div>
    </footer>
  );
}

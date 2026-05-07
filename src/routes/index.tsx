import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velora — Premium Cosmetics Clinic" },
      { name: "description", content: "Velora is a premium cosmetics clinic offering bespoke facials, injectables, laser and aesthetic wellness by board-certified specialists." },
      { property: "og:title", content: "Velora — Premium Cosmetics Clinic" },
      { property: "og:description", content: "Expert aesthetic care, beautifully delivered. Book a consultation today." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

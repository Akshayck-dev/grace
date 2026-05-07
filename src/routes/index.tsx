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
      { title: "Velora — A studio for inevitable products" },
      { name: "description", content: "Velora is a design and engineering studio crafting elegant digital products for ambitious teams." },
      { property: "og:title", content: "Velora — A studio for inevitable products" },
      { property: "og:description", content: "Brand, product, motion and engineering — crafted with relentless care." },
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

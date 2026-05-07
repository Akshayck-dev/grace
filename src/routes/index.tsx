import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Velora — Premium Cosmetics Clinic" },
      { name: "description", content: "Bespoke facials, injectables, laser and aesthetic wellness by board-certified specialists." },
      { property: "og:title", content: "Velora — Premium Cosmetics Clinic" },
      { property: "og:description", content: "Expert aesthetic care, beautifully delivered." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
    </>
  );
}

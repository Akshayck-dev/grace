import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { PageHero } from "@/components/site/PageHero";
import aboutImage from "@/assets/about.webp";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About — Grace Aesthetics Clinic" },
      { name: "description", content: "Meet the Grace Aesthetics Clinic team — board-certified physicians and master estheticians united by one standard of care." },
      { property: "og:title", content: "About — Grace Aesthetics Clinic" },
      { property: "og:description", content: "Expert team. Honest care. Beautifully delivered." },
    ],
  }),
  component: () => (
    <>
      <PageHero
        image={aboutImage}
        position="object-center"
        className="min-h-[600px] sm:min-h-[700px] flex items-center"
        eyebrow="About Grace Aesthetics"
        title="Expert care, beautifully delivered."
        subtitle="A team united by one standard — natural-looking results, never overdone, always honest."
      />
      <About />
    </>
  ),
});

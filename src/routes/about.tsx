import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Velora" },
      { name: "description", content: "Meet the Velora team — board-certified physicians and master estheticians united by one standard of care." },
      { property: "og:title", content: "About — Velora" },
      { property: "og:description", content: "Expert team. Honest care. Beautifully delivered." },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="About Velora"
        title="Expert care, beautifully delivered."
        subtitle="A team united by one standard — natural-looking results, never overdone, always honest."
      />
      <About />
    </>
  ),
});

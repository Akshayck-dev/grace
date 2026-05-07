import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/site/Gallery";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/clinic")({
  head: () => ({
    meta: [
      { title: "The Clinic — Velora" },
      { name: "description", content: "Step inside the Velora flagship — a sanctuary built around expert care, considered design and calm." },
      { property: "og:title", content: "The Clinic — Velora" },
      { property: "og:description", content: "Tour our flagship cosmetics clinic." },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="The Clinic"
        title="A sanctuary, by design."
        subtitle="Step inside our flagship — every detail considered, from the marble counters to the curated soundscape."
      />
      <Gallery />
    </>
  ),
});

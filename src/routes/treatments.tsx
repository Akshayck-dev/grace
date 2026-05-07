import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/site/Services";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Treatments — Velora" },
      { name: "description", content: "Signature facials, injectables, laser, body contouring and wellness — all under one roof at Velora." },
      { property: "og:title", content: "Treatments — Velora" },
      { property: "og:description", content: "A complete menu of expert aesthetic treatments." },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Treatments"
        title="A complete menu of care."
        subtitle="From signature facials to advanced injectables and body contouring — every treatment is delivered by a board-certified specialist."
      />
      <Services />
    </>
  ),
});

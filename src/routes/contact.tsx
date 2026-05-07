import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/Contact";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Velora" },
      { name: "description", content: "Request a Velora consultation. Our concierge will respond within one business day." },
      { property: "og:title", content: "Book a Consultation — Velora" },
      { property: "og:description", content: "Begin your Velora ritual." },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Book a visit"
        title="Begin your Velora ritual."
        subtitle="Request a consultation and our concierge will reach out within one business day."
      />
      <Contact />
    </>
  ),
});

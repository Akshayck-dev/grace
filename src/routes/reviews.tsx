import { createFileRoute } from "@tanstack/react-router";
import { Testimonials } from "@/components/site/Testimonials";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Velora" },
      { name: "description", content: "Read what Velora clients have to say about their treatments and experience." },
      { property: "og:title", content: "Reviews — Velora" },
      { property: "og:description", content: "12,000+ happy clients. 4.9 average rating." },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Loved by our clients."
        subtitle="Twelve thousand visits, one consistent standard. Here's what our community is saying."
      />
      <Testimonials />
    </>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { Testimonials } from "@/components/site/Testimonials";
import { PageHero } from "@/components/site/PageHero";
import reviewsImg from "@/assets/gallery/gallery8.webp";

import { useTestimonials } from "@/hooks/use-testimonials";

export const Route = createFileRoute("/_site/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Grace Aesthetics Clinic" },
      { name: "description", content: "Read what Grace Aesthetics Clinic clients have to say about their treatments and experience." },
      { property: "og:title", content: "Reviews — Grace Aesthetics Clinic" },
      { property: "og:description", content: "12,000+ happy clients. 4.9 average rating." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { testimonialsQuery } = useTestimonials();
  
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Trust in Every Smile & Result"
        subtitle="With over 12,000 satisfied clients, we are honored to be your partner in beauty. Here is what our community has to say."
        image={reviewsImg}
      />
      <Testimonials items={testimonialsQuery.data || []} />
    </>
  );
}

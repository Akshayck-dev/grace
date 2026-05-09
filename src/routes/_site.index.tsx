import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { useHero } from "@/hooks/use-hero";
import { useServices } from "@/hooks/use-services";
import { useGallery } from "@/hooks/use-gallery";
import { useTestimonials } from "@/hooks/use-testimonials";

import { WhoWeAre } from "@/components/site/WhoWeAre";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/_site/")({
  component: Index,
});

function Index() {
  const { heroQuery } = useHero();
  const { servicesQuery } = useServices();
  const { galleryQuery } = useGallery();
  const { testimonialsQuery } = useTestimonials();

  return (
    <>
      <Hero slides={heroQuery.data || []} />
      <WhoWeAre />
      <Services services={servicesQuery.data || []} />
      <Gallery items={galleryQuery.data || []} />
      <CTA />
      <Testimonials items={testimonialsQuery.data || []} />
    </>
  );
}

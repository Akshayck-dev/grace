import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/site/Gallery";
import { PageHero } from "@/components/site/PageHero";
import galleryHero from "@/assets/silder_web/slider16.webp";

import { useGallery } from "@/hooks/use-gallery";

export const Route = createFileRoute("/_site/clinic")({
  head: () => ({
    meta: [
      { title: "The Clinic — Grace Aesthetics" },
      { name: "description", content: "Step inside the Grace Aesthetics flagship — a sanctuary built around expert care, considered design and calm." },
      { property: "og:title", content: "The Clinic — Grace Aesthetics" },
      { property: "og:description", content: "Tour our flagship cosmetics clinic." },
    ],
  }),
  component: ClinicPage,
});

function ClinicPage() {
  const { galleryQuery } = useGallery();
  
  return (
    <>
      <PageHero
        image={galleryHero}
        eyebrow="The Clinic"
        title="A sanctuary, by design."
        subtitle="Step inside our flagship — every detail considered, from the marble counters to the curated soundscape."
      />
      <Gallery items={galleryQuery.data || []} />
    </>
  );
}

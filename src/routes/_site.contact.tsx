import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/Contact";
import { PageHero } from "@/components/site/PageHero";
import gallery4 from "@/assets/gallery/gallery4.webp";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact us — Grace Aesthetics" },
      { name: "description", content: "Have questions or need guidance? Our friendly team at Grace Aesthetics is always here to help." },
      { property: "og:title", content: "Contact us — Grace Aesthetics" },
      { property: "og:description", content: "Get in touch with our experts." },
    ],
  }),
  component: () => (
    <>
      <PageHero
        image={gallery4}
        eyebrow="Get in Touch"
        title="Contact us"
        subtitle="Have questions or need guidance? Our friendly team at Grace Aesthetics is always here to help. Whether you’d like to learn more about our treatments, book an appointment, or simply say hello — we’d love to hear from you!"
      />
      <Contact />
    </>
  ),
});

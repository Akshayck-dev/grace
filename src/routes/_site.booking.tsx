import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '@/components/site/PageHero'
import { Booking } from '@/components/site/Booking'
import gallery3 from '@/assets/gallery/gallery3.webp'

export const Route = createFileRoute('/_site/booking')({
  component: BookingPage,
})

function BookingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Grace Aesthetics"
        title="Service Booking"
        subtitle="Explore our advanced skin, hair, and dental care solutions tailored to your unique beauty and wellness goals."
        image={gallery3}
      />
      <Booking />
    </main>
  )
}

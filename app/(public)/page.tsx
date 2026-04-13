import { getContent } from '@/lib/content'
import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import ServiceCards from '@/components/home/ServiceCards'
import TrustPillars from '@/components/home/TrustPillars'
import GalleryPreview from '@/components/home/GalleryPreview'
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel'
import CTABanner from '@/components/home/CTABanner'

export const revalidate = 60

export default async function HomePage() {
  const content = await getContent()

  return (
    <>
      <HeroSection hero={content.hero} />
      <StatsBar stats={content.stats} />
      <ServiceCards services={content.services} />
      <TrustPillars pillars={content.trustPillars} />
      <GalleryPreview gallery={content.gallery} />
      <TestimonialsCarousel testimonials={content.testimonials} />
      <CTABanner />
    </>
  )
}

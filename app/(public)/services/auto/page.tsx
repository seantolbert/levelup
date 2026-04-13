import { getContent } from '@/lib/content'
import ServiceHero from '@/components/shared/ServiceHero'
import BenefitsGrid from '@/components/shared/BenefitsGrid'
import PackagesTable from '@/components/shared/PackagesTable'
import FAQAccordion from '@/components/shared/FAQAccordion'
import SectionHeader from '@/components/shared/SectionHeader'
import CTABanner from '@/components/home/CTABanner'
import ContactFormInline from '@/components/shared/ContactFormInline'

export const revalidate = 60

export default async function AutoPage() {
  const content = await getContent()
  const svc = content.services.auto

  return (
    <>
      <ServiceHero
        eyebrow="Automotive Window Film"
        headline={svc.heroHeadline}
        subheadline={svc.heroSubheadline}
      />

      {/* Benefits */}
      <section className="section-padding bg-obsidian-950 noise-overlay relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            eyebrow="Performance"
            headline="Built for Every"
            highlight="Road Condition"
            subheadline="Our automotive films deliver measurable improvements across every dimension that matters to discerning drivers."
          />
          <BenefitsGrid benefits={svc.benefits} />
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding bg-obsidian-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Film Options"
            headline="Choose Your"
            highlight="Film Series"
            subheadline="From daily drivers to exotic sports cars — we have the right film for every application and budget."
          />
          <PackagesTable packages={svc.packages} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-obsidian-950">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader
            eyebrow="Common Questions"
            headline="Automotive Film"
            highlight="FAQ"
          />
          <FAQAccordion items={svc.faq} />
        </div>
      </section>

      {/* Inline quote form */}
      <section className="section-padding bg-obsidian-900">
        <div className="max-w-2xl mx-auto px-6">
          <SectionHeader
            eyebrow="Get Started"
            headline="Request a"
            highlight="Free Quote"
            subheadline="Tell us about your vehicle and we'll get back to you within 24 hours."
          />
          <ContactFormInline serviceType="Auto" />
        </div>
      </section>

      <CTABanner />
    </>
  )
}

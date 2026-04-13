import { getContent } from '@/lib/content'
import ServiceHero from '@/components/shared/ServiceHero'
import BenefitsGrid from '@/components/shared/BenefitsGrid'
import PackagesTable from '@/components/shared/PackagesTable'
import FAQAccordion from '@/components/shared/FAQAccordion'
import SectionHeader from '@/components/shared/SectionHeader'
import CTABanner from '@/components/home/CTABanner'
import ContactFormInline from '@/components/shared/ContactFormInline'

export const revalidate = 60

export default async function ResidentialPage() {
  const content = await getContent()
  const svc = content.services.residential

  return (
    <>
      <ServiceHero
        eyebrow="Residential Window Film"
        headline={svc.heroHeadline}
        subheadline={svc.heroSubheadline}
      />

      {/* Benefits */}
      <section className="section-padding bg-obsidian-950 noise-overlay relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            eyebrow="Home Benefits"
            headline="Your Home, Working"
            highlight="Smarter"
            subheadline="Residential window film delivers year-round comfort, protection, and energy savings across every room."
          />
          <BenefitsGrid benefits={svc.benefits} />
        </div>
      </section>

      {/* Room use cases */}
      <section className="section-padding bg-obsidian-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Applications"
            headline="Film for Every"
            highlight="Room"
            subheadline="Every space has different needs. We'll match the right film to each window in your home."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                room: 'Living Room',
                desc: 'Eliminate glare on screens without sacrificing natural light. Keep furnishings fade-free for years.',
              },
              {
                room: 'Bedroom',
                desc: 'Privacy films let light in during the day while blocking outside views. Sleep cooler in summer.',
              },
              {
                room: 'Home Office',
                desc: 'Reduce monitor glare, lower heat near your workstation, and maintain crisp natural light.',
              },
            ].map((item) => (
              <div key={item.room} className="p-6 bg-obsidian-800/40 border border-white/6 hover:border-gold-500/20 transition-colors">
                <h3 className="font-display text-lg text-ash-100 mb-2">{item.room}</h3>
                <p className="text-ash-400 text-sm leading-relaxed font-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Film Options"
            headline="Residential"
            highlight="Film Series"
            subheadline="Choose from solar, privacy, or premium ceramic films for any window in your home."
          />
          <PackagesTable packages={svc.packages} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-obsidian-900">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader
            eyebrow="Common Questions"
            headline="Residential Film"
            highlight="FAQ"
          />
          <FAQAccordion items={svc.faq} />
        </div>
      </section>

      {/* Inline quote form */}
      <section className="section-padding bg-obsidian-950">
        <div className="max-w-2xl mx-auto px-6">
          <SectionHeader
            eyebrow="Get Started"
            headline="Request a"
            highlight="Free Quote"
            subheadline="Share your home's details and we'll put together a custom quote within 24 hours."
          />
          <ContactFormInline serviceType="Residential" />
        </div>
      </section>

      <CTABanner />
    </>
  )
}

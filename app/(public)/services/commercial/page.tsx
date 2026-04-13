import { getContent } from '@/lib/content'
import ServiceHero from '@/components/shared/ServiceHero'
import BenefitsGrid from '@/components/shared/BenefitsGrid'
import PackagesTable from '@/components/shared/PackagesTable'
import FAQAccordion from '@/components/shared/FAQAccordion'
import SectionHeader from '@/components/shared/SectionHeader'
import CTABanner from '@/components/home/CTABanner'
import ContactFormInline from '@/components/shared/ContactFormInline'

export const revalidate = 60

export default async function CommercialPage() {
  const content = await getContent()
  const svc = content.services.commercial

  return (
    <>
      <ServiceHero
        eyebrow="Commercial Window Film"
        headline={svc.heroHeadline}
        subheadline={svc.heroSubheadline}
      />

      {/* Benefits */}
      <section className="section-padding bg-obsidian-950 noise-overlay relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            eyebrow="Business Benefits"
            headline="Engineered for"
            highlight="Scale"
            subheadline="From single storefronts to multi-floor office towers — our commercial film programs deliver ROI across every property type."
          />
          <BenefitsGrid benefits={svc.benefits} />
        </div>
      </section>

      {/* Trust signals */}
      <section className="section-padding bg-obsidian-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="B2B Credentials"
            headline="Licensed, Bonded,"
            highlight="Insured"
            subheadline="We provide all documentation required for commercial contracts, including COIs and LEED certification support."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: 'IWFA Certified', desc: 'International Window Film Association member' },
              { label: 'Fully Insured', desc: 'General liability and workers comp coverage' },
              { label: 'LEED Eligible', desc: 'Films qualify for energy credit documentation' },
              { label: 'After-Hours Work', desc: 'We work around your business operations' },
            ].map((item) => (
              <div key={item.label} className="p-5 bg-obsidian-800/40 border border-white/6 hover:border-gold-500/20 transition-colors">
                <div className="w-1 h-6 bg-gold-500 mb-3" />
                <h3 className="font-display text-base text-ash-100 mb-1">{item.label}</h3>
                <p className="text-ash-500 text-sm font-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-padding bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Film Programs"
            headline="Commercial"
            highlight="Solutions"
            subheadline="Custom-priced programs for solar, security, and decorative applications at any scale."
          />
          <PackagesTable packages={svc.packages} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-obsidian-900">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader
            eyebrow="Common Questions"
            headline="Commercial Film"
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
            highlight="Commercial Quote"
            subheadline="Tell us about your property and we'll prepare a detailed proposal within 48 hours."
          />
          <ContactFormInline serviceType="Commercial" />
        </div>
      </section>

      <CTABanner />
    </>
  )
}

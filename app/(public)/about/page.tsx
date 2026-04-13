import { getContent } from '@/lib/content'
import SectionHeader from '@/components/shared/SectionHeader'
import CTABanner from '@/components/home/CTABanner'

export const revalidate = 60

export default async function AboutPage() {
  const content = await getContent()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-obsidian-950 overflow-hidden pt-20 noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 via-obsidian-900/80 to-obsidian-950" />
        <div className="shimmer-effect" aria-hidden="true" />
        <div className="relative z-10 text-center px-6 py-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-body">Our Story</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-ash-100 mb-5">
            Crafted With <em className="italic text-gold-400">Purpose</em>
          </h1>
          <p className="text-ash-400 text-lg max-w-2xl mx-auto font-body leading-relaxed">
            {content.siteSettings.businessName} was founded on one principle: that exceptional film installation is a craft, not a commodity.
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section className="section-padding bg-obsidian-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="h-px w-10 bg-gold-500 mb-5" />
              <h2 className="font-display text-3xl text-ash-100 mb-5">
                18 Years of Precision
              </h2>
              <p className="text-ash-400 leading-relaxed font-body mb-4">
                Founded in 2006 by master installer Elias Vance, {content.siteSettings.businessName} has grown from a two-person automotive shop into one of Texas&apos;s most respected window film studios. Every project — from a single sedan to a 14-story office tower — receives the same obsessive attention to detail.
              </p>
              <p className="text-ash-400 leading-relaxed font-body">
                We chose the name LuminaFilm because we believe window film should work with light, not against it. Properly installed film enhances a space&apos;s relationship with natural light: filtering, softening, and protecting — without sacrificing the view or the aesthetic.
              </p>
            </div>
            <div className="space-y-5">
              {[
                { label: 'Founded', value: '2006' },
                { label: 'Headquarters', value: 'Austin, TX' },
                { label: 'Certifications', value: 'IWFA Certified' },
                { label: 'Film Partners', value: '3M, LLumar, Huper Optik' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 py-4 border-b border-white/6">
                  <span className="text-ash-500 text-sm font-body w-32 shrink-0">{item.label}</span>
                  <span className="text-ash-100 text-sm font-body">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-obsidian-950 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(201,162,39,0.05) 0%, transparent 60%)' }}
        />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="h-px w-10 bg-gold-500 mx-auto mb-6" />
          <blockquote className="font-display text-2xl md:text-3xl text-ash-100 italic leading-relaxed">
            &ldquo;We don&apos;t just install window film. We refine the way light enters your world.&rdquo;
          </blockquote>
          <p className="text-ash-500 mt-5 text-sm font-body">— Elias Vance, Founder</p>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-obsidian-900">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="Meet the Team"
            headline="The People Behind"
            highlight="Every Install"
            subheadline="Our certified specialists bring decades of combined expertise to every project."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.team.map((member) => (
              <div key={member.id} className="p-6 bg-obsidian-800/40 border border-white/6 hover:border-gold-500/20 transition-colors">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mb-4">
                  <span className="font-display text-2xl text-gold-400">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-display text-lg text-ash-100 mb-0.5">{member.name}</h3>
                <p className="text-gold-400 text-xs tracking-widest uppercase font-body mb-3">{member.role}</p>
                <p className="text-ash-400 text-sm leading-relaxed font-body">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <SectionHeader
            eyebrow="Credentials"
            headline="Certified &"
            highlight="Affiliated"
            subheadline="Our certifications and partnerships reflect our commitment to industry-leading standards."
          />
          <div className="flex flex-wrap justify-center gap-6">
            {['IWFA Member', '3M Authorized', 'LLumar Dealer', 'Huper Optik Certified', 'BBB A+', 'LEED Support'].map((cert) => (
              <div key={cert} className="px-6 py-4 border border-gold-500/20 text-gold-400 text-sm font-body tracking-wide hover:border-gold-400/40 transition-colors">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}

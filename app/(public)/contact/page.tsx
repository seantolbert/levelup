import { getContent } from '@/lib/content'
import ContactFormFull from '@/components/shared/ContactFormFull'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const revalidate = 60

export default async function ContactPage() {
  const content = await getContent()
  const { siteSettings } = content

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[35vh] flex items-center justify-center bg-obsidian-950 overflow-hidden pt-20 noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 to-obsidian-900" />
        <div className="shimmer-effect" aria-hidden="true" />
        <div className="relative z-10 text-center px-6 py-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-body">Get in Touch</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-ash-100 mb-4">
            Let&apos;s <em className="italic text-gold-400">Connect</em>
          </h1>
        </div>
      </section>

      {/* Contact content */}
      <section className="section-padding bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <div className="h-px w-10 bg-gold-500 mb-6" />
              <h2 className="font-display text-3xl text-ash-100 mb-8">
                Visit or Call Us
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-gold-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-ash-200 text-sm font-body font-medium mb-0.5">Phone</div>
                    <a href={`tel:${siteSettings.phone}`} className="text-ash-400 hover:text-gold-400 transition-colors font-body">
                      {siteSettings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-gold-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-ash-200 text-sm font-body font-medium mb-0.5">Email</div>
                    <a href={`mailto:${siteSettings.email}`} className="text-ash-400 hover:text-gold-400 transition-colors font-body">
                      {siteSettings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-gold-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-ash-200 text-sm font-body font-medium mb-0.5">Address</div>
                    <p className="text-ash-400 font-body">{siteSettings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-gold-400" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-ash-200 text-sm font-body font-medium mb-0.5">Hours</div>
                    <p className="text-ash-400 font-body">{siteSettings.hours}</p>
                  </div>
                </div>
              </div>

              {/* Map embed */}
              <div className="mt-10 border border-white/8 overflow-hidden">
                <iframe
                  src={siteSettings.googleMapsEmbedUrl}
                  width="100%"
                  height="260"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Business location map"
                />
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="h-px w-10 bg-gold-500 mb-6" />
              <h2 className="font-display text-3xl text-ash-100 mb-8">
                Send a Message
              </h2>
              <ContactFormFull />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

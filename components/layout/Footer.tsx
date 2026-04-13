import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import type { SiteContent } from '@/lib/content'

interface FooterProps {
  content: SiteContent['siteSettings']
  businessName: string
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  )
}

export default function Footer({ content, businessName }: FooterProps) {
  return (
    <footer className="bg-obsidian-900 border-t border-white/6 noise-overlay relative">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-7 h-7 border border-gold-500/60 flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-gold-500 rotate-45" />
              </div>
              <span className="font-display text-lg text-ash-100">{businessName}</span>
            </Link>
            <p className="text-ash-400 text-sm leading-relaxed mb-6 font-body">
              Premium window film solutions for automotive, residential, and commercial applications.
            </p>
            <div className="flex items-center gap-4">
              {content.socialLinks.instagram && (
                <a
                  href={content.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-ash-600 hover:text-gold-400 transition-colors"
                >
                  <InstagramIcon />
                </a>
              )}
              {content.socialLinks.facebook && (
                <a
                  href={content.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-ash-600 hover:text-gold-400 transition-colors"
                >
                  <FacebookIcon />
                </a>
              )}
              {content.socialLinks.youtube && (
                <a
                  href={content.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-ash-600 hover:text-gold-400 transition-colors"
                >
                  <YoutubeIcon />
                </a>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-ash-100 text-sm font-semibold tracking-widest uppercase mb-4 font-body">
              Services
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/services/auto', label: 'Automotive Film' },
                { href: '/services/residential', label: 'Residential Film' },
                { href: '/services/commercial', label: 'Commercial Film' },
                { href: '/gallery', label: 'Project Gallery' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ash-400 hover:text-gold-400 text-sm transition-colors font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-ash-100 text-sm font-semibold tracking-widest uppercase mb-4 font-body">
              Company
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/quote', label: 'Get a Quote' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ash-400 hover:text-gold-400 text-sm transition-colors font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-ash-100 text-sm font-semibold tracking-widest uppercase mb-4 font-body">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${content.phone}`} className="flex items-start gap-2.5 text-ash-400 hover:text-gold-400 text-sm transition-colors font-body group">
                  <Phone size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {content.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${content.email}`} className="flex items-start gap-2.5 text-ash-400 hover:text-gold-400 text-sm transition-colors font-body group">
                  <Mail size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {content.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-ash-400 text-sm font-body">
                  <MapPin size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{content.address}</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-ash-400 text-sm font-body">
                  <Clock size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{content.hours}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/20 to-transparent mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-ash-600 text-xs font-body">
          <p>&copy; {new Date().getFullYear()} {businessName}. All rights reserved.</p>
          <p>Crafted with precision. Built for performance.</p>
        </div>
      </div>
    </footer>
  )
}

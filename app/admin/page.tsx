import { getContent, getQuotes } from '@/lib/content'
import Link from 'next/link'
import { FileText, Image, Star, Users, Settings, Sparkles } from 'lucide-react'

export default async function AdminDashboard() {
  const content = await getContent()
  const quotes = await getQuotes()
  const uncontacted = quotes.filter((q) => !q.contacted).length
  const recent = quotes.slice(0, 5)

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-ash-100 mb-1">
          Welcome back
        </h1>
        <p className="text-ash-500 font-body text-sm">
          {content.siteSettings.businessName} — Admin Dashboard
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Quotes', value: quotes.length, icon: FileText, href: '/admin/quotes' },
          { label: 'Needs Follow-Up', value: uncontacted, icon: FileText, href: '/admin/quotes', alert: uncontacted > 0 },
          { label: 'Gallery Items', value: content.gallery.length, icon: Image, href: '/admin/gallery' },
          { label: 'Testimonials', value: content.testimonials.length, icon: Star, href: '/admin/testimonials' },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`p-5 border transition-colors hover:border-gold-500/30 ${
              stat.alert
                ? 'bg-gold-500/8 border-gold-500/30'
                : 'bg-obsidian-800/40 border-white/6'
            }`}
          >
            <stat.icon size={18} className={`mb-2 ${stat.alert ? 'text-gold-400' : 'text-ash-600'}`} aria-hidden="true" />
            <div className={`text-2xl font-display mb-0.5 ${stat.alert ? 'text-gold-400' : 'text-ash-100'}`}>
              {stat.value}
            </div>
            <div className="text-ash-500 text-xs font-body">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-10">
        <h2 className="font-display text-lg text-ash-100 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: '/admin/settings', label: 'Edit Site Settings', icon: Settings },
            { href: '/admin/hero', label: 'Update Hero', icon: Image },
            { href: '/admin/testimonials', label: 'Manage Testimonials', icon: Star },
            { href: '/admin/gallery', label: 'Upload to Gallery', icon: Image },
            { href: '/admin/team', label: 'Update Team', icon: Users },
            { href: '/admin/suggestions', label: 'AI Suggestions', icon: Sparkles },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-3 px-4 py-3 bg-obsidian-800/40 border border-white/6 hover:border-gold-500/20 transition-colors text-sm text-ash-300 hover:text-ash-100 font-body"
            >
              <action.icon size={15} className="text-gold-400/60" aria-hidden="true" />
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent quotes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-ash-100">Recent Quote Requests</h2>
          <Link href="/admin/quotes" className="text-xs text-gold-400 hover:underline font-body">
            View All
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="py-10 text-center text-ash-600 font-body text-sm border border-white/6">
            No quote submissions yet.
          </div>
        ) : (
          <div className="divide-y divide-white/6 border border-white/6">
            {recent.map((quote) => (
              <div key={quote.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <span className="text-ash-100 text-sm font-body font-medium">{quote.contact.name}</span>
                  <span className="text-ash-500 text-xs font-body ml-2">{quote.serviceType}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-ash-600 text-xs font-body">
                    {new Date(quote.submittedAt).toLocaleDateString()}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 border font-body ${
                      quote.contacted
                        ? 'border-emerald-500/30 text-emerald-400'
                        : 'border-gold-500/30 text-gold-400'
                    }`}
                  >
                    {quote.contacted ? 'Contacted' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

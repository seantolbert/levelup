import QuoteWizard from '@/components/shared/QuoteWizard'

export default function QuotePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[35vh] flex items-center justify-center bg-obsidian-950 overflow-hidden pt-20 noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 to-obsidian-900" />
        <div className="shimmer-effect" aria-hidden="true" />
        <div className="relative z-10 text-center px-6 py-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-body">No Obligation</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-ash-100 mb-4">
            Request a <em className="italic text-gold-400">Free Quote</em>
          </h1>
          <p className="text-ash-400 text-lg max-w-xl mx-auto font-body">
            Tell us about your project and we&apos;ll prepare a detailed quote within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-padding bg-obsidian-900">
        <div className="max-w-2xl mx-auto px-6">
          <QuoteWizard />
        </div>
      </section>
    </>
  )
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { CheckCircle, Clock, Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { QuoteSubmission } from '@/lib/content'

export default function QuotesAdminPage() {
  const [quotes, setQuotes] = useState<QuoteSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/quotes')
    const data = await res.json()
    setQuotes(data)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const toggleContacted = async (id: string, current: boolean) => {
    setUpdating(id)
    await fetch('/api/admin/quotes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, contacted: !current }),
    })
    setQuotes(quotes.map((q) => q.id === id ? { ...q, contacted: !current } : q))
    setUpdating(null)
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ash-100 mb-1">Quote Submissions</h1>
          <p className="text-ash-500 font-body text-sm">
            {quotes.filter((q) => !q.contacted).length} pending · {quotes.length} total
          </p>
        </div>
        <Button variant="outline" onClick={load} disabled={loading}>
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-ash-500 font-body">
          <Loader2 size={16} className="animate-spin" /> Loading…
        </div>
      ) : quotes.length === 0 ? (
        <div className="py-16 text-center text-ash-600 font-body border border-white/6">
          No quote submissions yet.
        </div>
      ) : (
        <div className="space-y-3">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className={`p-5 border transition-colors ${
                quote.contacted ? 'bg-obsidian-800/20 border-white/5' : 'bg-obsidian-800/40 border-white/8'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-ash-100 font-body font-medium">{quote.contact.name}</span>
                    <span className="text-xs px-2 py-0.5 border border-gold-500/20 text-gold-400 font-body">
                      {quote.serviceType}
                    </span>
                    {!quote.contacted && (
                      <span className="text-xs px-2 py-0.5 border border-amber-500/30 text-amber-400 font-body">
                        Needs Follow-Up
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-ash-500 text-xs font-body">
                    <a href={`mailto:${quote.contact.email}`} className="hover:text-gold-400 transition-colors">
                      {quote.contact.email}
                    </a>
                    {quote.contact.phone && (
                      <a href={`tel:${quote.contact.phone}`} className="hover:text-gold-400 transition-colors">
                        {quote.contact.phone}
                      </a>
                    )}
                    <span>{new Date(quote.submittedAt).toLocaleString()}</span>
                  </div>
                  {Object.keys(quote.details).length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.entries(quote.details).map(([key, val]) => (
                        <span key={key} className="text-xs bg-obsidian-700 text-ash-400 px-2 py-0.5 font-body">
                          <span className="text-ash-600">{key}:</span> {val}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleContacted(quote.id, quote.contacted)}
                  disabled={updating === quote.id}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-body border transition-colors shrink-0 ${
                    quote.contacted
                      ? 'border-emerald-500/30 text-emerald-400 hover:border-emerald-500/50'
                      : 'border-white/10 text-ash-500 hover:border-gold-500/30 hover:text-gold-400'
                  }`}
                >
                  {updating === quote.id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : quote.contacted ? (
                    <CheckCircle size={12} />
                  ) : (
                    <Clock size={12} />
                  )}
                  {quote.contacted ? 'Contacted' : 'Mark Contacted'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

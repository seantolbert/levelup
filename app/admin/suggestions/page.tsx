'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Loader2, RefreshCw, Zap, TrendingUp, Paintbrush } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Suggestion {
  id: number
  title: string
  suggestion: string
  severity: 'Quick Win' | 'High Impact' | 'Optional Polish'
}

const severityConfig = {
  'Quick Win': {
    label: 'Quick Win',
    className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    icon: Zap,
  },
  'High Impact': {
    label: 'High Impact',
    className: 'bg-gold-500/15 text-gold-400 border-gold-500/30',
    icon: TrendingUp,
  },
  'Optional Polish': {
    label: 'Optional Polish',
    className: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    icon: Paintbrush,
  },
}

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasLoaded, setHasLoaded] = useState(false)

  const generate = async () => {
    setLoading(true)
    setError('')
    setSuggestions([])

    try {
      const res = await fetch('/api/admin/suggestions', { method: 'POST' })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to generate suggestions.')
        return
      }

      setSuggestions(data.suggestions)
      setHasLoaded(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 border border-gold-500/40 flex items-center justify-center">
            <Sparkles size={18} className="text-gold-400" />
          </div>
          <div>
            <h1 className="font-display text-3xl text-ash-100 leading-tight">AI Suggestions</h1>
          </div>
        </div>
        <p className="text-ash-500 font-body text-sm ml-12">
          Powered by Claude — analyzes your site content and surfaces actionable improvements.
        </p>
      </div>

      {/* CTA */}
      <div className="mb-10 p-6 bg-gradient-to-r from-gold-500/6 to-transparent border border-gold-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-ash-100 font-body font-medium mb-1">
            Conversion &amp; SEO Analysis
          </div>
          <div className="text-ash-500 text-sm font-body">
            Claude will review your current site content and return 5 specific, prioritized recommendations.
          </div>
        </div>
        <Button
          onClick={generate}
          disabled={loading}
          size="lg"
          className="shrink-0"
        >
          {loading ? (
            <><Loader2 size={16} className="animate-spin" /> Analyzing…</>
          ) : hasLoaded ? (
            <><RefreshCw size={16} /> Regenerate</>
          ) : (
            <><Sparkles size={16} /> Generate Suggestions</>
          )}
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 border border-red-500/30 bg-red-500/8 text-red-400 text-sm font-body">
          {error}
          {error.includes('ANTHROPIC_API_KEY') && (
            <p className="mt-2 text-red-500/70">
              Add ANTHROPIC_API_KEY to your .env.local file and restart the server.
            </p>
          )}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-28 bg-obsidian-800/40 border border-white/6 animate-pulse" />
          ))}
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {!loading && suggestions.length > 0 && (
          <div className="space-y-4">
            {suggestions.map((s, i) => {
              const config = severityConfig[s.severity] || severityConfig['Optional Polish']
              const SeverityIcon = config.icon
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 bg-obsidian-800/40 border border-white/6 hover:border-gold-500/15 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-obsidian-700 border border-white/8 flex items-center justify-center shrink-0">
                        <span className="text-ash-500 text-xs font-body">{s.id}</span>
                      </div>
                      <h3 className="font-display text-ash-100 text-base">{s.title}</h3>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 border text-xs font-body shrink-0 ${config.className}`}>
                      <SeverityIcon size={11} />
                      {config.label}
                    </div>
                  </div>
                  <p className="text-ash-400 text-sm leading-relaxed font-body ml-10">{s.suggestion}</p>
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!loading && !hasLoaded && (
        <div className="text-center py-16 border border-white/6">
          <Sparkles size={32} className="text-ash-700 mx-auto mb-4" />
          <p className="text-ash-600 font-body text-sm">
            Click &ldquo;Generate Suggestions&rdquo; to get started.
          </p>
        </div>
      )}
    </div>
  )
}

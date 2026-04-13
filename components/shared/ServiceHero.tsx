'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ServiceHeroProps {
  eyebrow: string
  headline: string
  subheadline: string
}

export default function ServiceHero({ eyebrow, headline, subheadline }: ServiceHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-obsidian-950 overflow-hidden noise-overlay pt-20">
      {/* BG elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 via-obsidian-900/70 to-obsidian-950" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(201,162,39,0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>
      <div className="shimmer-effect" aria-hidden="true" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-body">{eyebrow}</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />
          </div>

          <h1 className="font-display text-5xl md:text-6xl text-ash-100 mb-5 leading-tight">
            {headline}
          </h1>
          <p className="text-ash-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-body">
            {subheadline}
          </p>

          <Link
            href="/quote"
            className="group inline-flex items-center gap-2 bg-gold-500 text-obsidian-950 px-8 py-3.5 text-sm font-semibold hover:bg-gold-400 transition-all duration-300 tracking-wide"
          >
            Get a Free Quote
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

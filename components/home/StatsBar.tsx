'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { SiteContent } from '@/lib/content'

interface StatsBarProps {
  stats: SiteContent['stats']
}

export default function StatsBar({ stats }: StatsBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="relative bg-obsidian-900 border-y border-white/6 py-10"
      aria-label="Company statistics"
    >
      {/* Gold shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-white/8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col items-center text-center px-8 py-2"
            >
              <span className="font-display text-4xl md:text-5xl text-gold-400 mb-1.5 tracking-tight">
                {stat.value}
              </span>
              <span className="text-ash-400 text-sm tracking-widest uppercase font-body">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
    </section>
  )
}

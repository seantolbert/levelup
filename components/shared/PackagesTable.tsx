'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import Link from 'next/link'

interface Package {
  name: string
  description: string
  priceRange: string
  features: string[]
}

interface PackagesTableProps {
  packages: Package[]
}

export default function PackagesTable({ packages }: PackagesTableProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {packages.map((pkg, i) => (
        <motion.div
          key={pkg.name}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.12 }}
          className={`flex flex-col p-6 border transition-all duration-300 hover:-translate-y-1 ${
            i === packages.length - 1
              ? 'border-gold-500/40 bg-gold-500/5'
              : 'border-white/8 bg-obsidian-800/40 hover:border-gold-500/20'
          }`}
        >
          {i === packages.length - 1 && (
            <div className="text-gold-400 text-xs tracking-widest uppercase font-body mb-3">
              Most Popular
            </div>
          )}
          <h3 className="font-display text-xl text-ash-100 mb-1">{pkg.name}</h3>
          <p className="text-ash-400 text-sm mb-4 font-body leading-relaxed">{pkg.description}</p>
          <div className="text-gold-400 text-2xl font-display mb-5">{pkg.priceRange}</div>

          <ul className="space-y-2 mb-6 flex-1">
            {pkg.features.map((feat) => (
              <li key={feat} className="flex items-center gap-2.5 text-sm text-ash-300 font-body">
                <Check size={13} className="text-gold-400 shrink-0" aria-hidden="true" />
                {feat}
              </li>
            ))}
          </ul>

          <Link
            href="/quote"
            className={`block text-center py-2.5 text-sm font-semibold tracking-wide transition-colors ${
              i === packages.length - 1
                ? 'bg-gold-500 text-obsidian-950 hover:bg-gold-400'
                : 'border border-gold-500/40 text-gold-400 hover:bg-gold-500/10'
            }`}
          >
            Get a Quote
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

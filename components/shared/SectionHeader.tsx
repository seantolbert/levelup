'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionHeaderProps {
  eyebrow?: string
  headline: string
  highlight?: string
  subheadline?: string
  centered?: boolean
}

export default function SectionHeader({
  eyebrow,
  headline,
  highlight,
  subheadline,
  centered = true,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={centered ? 'text-center mb-14' : 'mb-12'}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-3 ${centered ? 'justify-center' : ''}`}>
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
          <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-body">{eyebrow}</span>
          {centered && <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />}
        </div>
      )}
      <h2 className="font-display text-4xl md:text-5xl text-ash-100">
        {headline}{' '}
        {highlight && <em className="italic text-gold-400">{highlight}</em>}
      </h2>
      {subheadline && (
        <p className={`text-ash-400 mt-4 leading-relaxed font-body text-lg ${centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
          {subheadline}
        </p>
      )}
    </motion.div>
  )
}

'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import type { SiteContent } from '@/lib/content'

interface HeroSectionProps {
  hero: SiteContent['hero']
}

export default function HeroSection({ hero }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian-950 noise-overlay"
      aria-label="Hero section"
    >
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 via-obsidian-900/80 to-obsidian-950" />
        {/* Abstract geometric backdrop */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201,162,39,0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,162,39,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* Shimmer effect */}
      <div className="shimmer-effect z-10" aria-hidden="true" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 text-center max-w-5xl mx-auto px-6 pt-24"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500" />
          <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-body">
            Precision Film Installation
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-ash-100 leading-tight mb-6"
        >
          {hero.headline.split(' ').map((word, i) =>
            i === 1 ? (
              <em key={i} className="italic text-gold-400 not-italic">
                {' '}
                {word}
              </em>
            ) : (
              <span key={i}>{i === 0 ? word : ` ${word}`}</span>
            )
          )}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-ash-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-body"
        >
          {hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/quote"
            className="group flex items-center gap-2 bg-gold-500 text-obsidian-950 px-8 py-4 text-sm font-semibold hover:bg-gold-400 transition-all duration-300 tracking-wide"
          >
            {hero.ctaPrimary}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/services/auto"
            className="flex items-center gap-2 border border-gold-500/40 text-ash-200 px-8 py-4 text-sm hover:bg-gold-500/10 hover:border-gold-400/60 transition-all duration-300 tracking-wide font-body"
          >
            {hero.ctaSecondary}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ash-600"
        >
          <span className="text-xs tracking-widest uppercase font-body">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian-950 to-transparent z-10" />
    </section>
  )
}

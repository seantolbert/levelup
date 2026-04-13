'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Award, ShieldCheck, Gem, Star } from 'lucide-react'
import type { SiteContent } from '@/lib/content'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  award: Award,
  'shield-check': ShieldCheck,
  gem: Gem,
  star: Star,
}

interface TrustPillarsProps {
  pillars: SiteContent['trustPillars']
}

export default function TrustPillars({ pillars }: TrustPillarsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <section ref={sectionRef} className="section-padding bg-obsidian-900 relative overflow-hidden" aria-label="Why choose us">
      {/* Parallax BG accent */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{ background: 'radial-gradient(circle at 80% 50%, rgba(201,162,39,0.4), transparent 60%)' }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-body">Our Promise</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-ash-100">
            Why Choose <em className="italic text-gold-400">LuminaFilm</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] || Star
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="flex flex-col items-start p-6 bg-obsidian-800/40 border border-white/6 hover:border-gold-500/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center mb-4 group-hover:border-gold-400/50 transition-colors">
                  <Icon size={18} className="text-gold-400" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg text-ash-100 mb-2 group-hover:text-gold-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-ash-400 text-sm leading-relaxed font-body">{pillar.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

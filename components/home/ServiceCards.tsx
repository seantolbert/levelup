'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Car, Home, Building2, ArrowUpRight } from 'lucide-react'
import type { SiteContent } from '@/lib/content'

const serviceIcons = {
  auto: Car,
  residential: Home,
  commercial: Building2,
}

interface ServiceCardsProps {
  services: SiteContent['services']
}

export default function ServiceCards({ services }: ServiceCardsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  const cards = [
    { key: 'auto' as const, href: '/services/auto', data: services.auto },
    { key: 'residential' as const, href: '/services/residential', data: services.residential },
    { key: 'commercial' as const, href: '/services/commercial', data: services.commercial },
  ]

  return (
    <section ref={sectionRef} className="section-padding bg-obsidian-950 noise-overlay relative overflow-hidden" aria-label="Our services">
      {/* Parallax background orbs */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute -top-20 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.3) 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.2) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      </motion.div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          ref={ref}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-body">What We Do</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-ash-100">
            Three Markets. <em className="italic text-gold-400">One Standard.</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ key, href, data }, i) => {
            const Icon = serviceIcons[key]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12 }}
              >
                <Link
                  href={href}
                  className="group relative flex flex-col h-full bg-obsidian-800/60 border border-white/8 p-8 hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                  style={{ boxShadow: 'none' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(201,162,39,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Top gold line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gold-500/0 group-hover:bg-gold-500/60 transition-all duration-500" />

                  {/* Icon */}
                  <div className="w-12 h-12 border border-gold-500/30 flex items-center justify-center mb-6 group-hover:border-gold-400/60 transition-colors">
                    <Icon size={20} className="text-gold-400" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl text-ash-100 mb-3 group-hover:text-gold-300 transition-colors">
                    {data.title}
                  </h3>
                  <p className="text-ash-400 text-sm leading-relaxed mb-6 flex-1 font-body">
                    {data.shortDesc}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-gold-400 text-sm font-body font-medium group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])

  return (
    <section ref={sectionRef} className="relative py-24 bg-obsidian-950 overflow-hidden" aria-label="Call to action">
      {/* Parallax BG gradient */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(201,162,39,0.1) 0%, transparent 60%)',
          }}
        />
      </motion.div>
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-body">Get Started</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />
          </div>

          <h2 className="font-display text-4xl md:text-6xl text-ash-100 mb-5 leading-tight">
            Ready to Transform{' '}
            <em className="italic text-gold-400">Your Space?</em>
          </h2>

          <p className="text-ash-400 text-lg mb-10 max-w-xl mx-auto font-body leading-relaxed">
            Get a no-obligation quote from our certified film specialists. Most consultations are completed within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="group flex items-center justify-center gap-2 bg-gold-500 text-obsidian-950 px-10 py-4 text-sm font-semibold hover:bg-gold-400 transition-all duration-300 tracking-wide"
            >
              Request Free Quote
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 border border-gold-500/40 text-ash-200 px-10 py-4 text-sm hover:bg-gold-500/10 transition-all duration-300 tracking-wide font-body"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </section>
  )
}

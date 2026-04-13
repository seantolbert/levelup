'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import type { SiteContent } from '@/lib/content'

interface TestimonialsCarouselProps {
  testimonials: SiteContent['testimonials']
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
  }

  return (
    <section
      className="section-padding bg-obsidian-950 noise-overlay relative overflow-hidden"
      aria-label="Client testimonials"
    >
      {/* BG accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div ref={ref} className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-body">Testimonials</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-ash-100">
            What Our <em className="italic text-gold-400">Clients Say</em>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <blockquote className="glass border-gold-500/10 p-8 md:p-10 relative">
                {/* Quote icon */}
                <div className="absolute top-6 right-8 opacity-10">
                  <Quote size={48} className="text-gold-400 rotate-180" aria-hidden="true" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5" aria-label={`${testimonials[current].rating} out of 5 stars`}>
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-gold-400 fill-gold-400" aria-hidden="true" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="font-display text-lg md:text-xl text-ash-100 italic leading-relaxed mb-6">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>

                {/* Attribution */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gold-500/20 border border-gold-500/30 flex items-center justify-center">
                    <span className="text-gold-400 text-sm font-semibold font-display">
                      {testimonials[current].name[0]}
                    </span>
                  </div>
                  <div>
                    <div className="text-ash-100 text-sm font-semibold font-body">
                      {testimonials[current].name}
                    </div>
                    <div className="text-ash-500 text-xs font-body">{testimonials[current].role}</div>
                  </div>
                </div>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => go((current - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 border border-white/10 flex items-center justify-center text-ash-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`transition-all duration-300 ${
                  i === current
                    ? 'w-6 h-1.5 bg-gold-400'
                    : 'w-1.5 h-1.5 bg-ash-600 hover:bg-ash-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => go((current + 1) % testimonials.length)}
            className="w-10 h-10 border border-white/10 flex items-center justify-center text-ash-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}

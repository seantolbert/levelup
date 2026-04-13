'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import type { SiteContent } from '@/lib/content'

interface GalleryPreviewProps {
  gallery: SiteContent['gallery']
}

export default function GalleryPreview({ gallery }: GalleryPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [lightbox, setLightbox] = useState<SiteContent['gallery'][0] | null>(null)
  const preview = gallery.slice(0, 6)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section ref={sectionRef} className="section-padding bg-obsidian-900 relative overflow-hidden" aria-label="Project gallery">
      {/* Parallax background glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-5 rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(201,162,39,0.5) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      </motion.div>
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
              <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-body">Our Work</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-ash-100">
              Featured <em className="italic text-gold-400">Projects</em>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-gold-400 text-sm font-body hover:text-gold-300 transition-colors tracking-wide underline underline-offset-4"
          >
            View All Projects
          </Link>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {preview.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="break-inside-avoid"
            >
              <button
                onClick={() => setLightbox(item)}
                className="group relative w-full overflow-hidden bg-obsidian-800 cursor-pointer block"
                style={{ aspectRatio: i % 3 === 1 ? '3/4' : '4/3' }}
                aria-label={`View ${item.caption}`}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-obsidian-700 text-ash-600 font-display text-sm">
                  {item.caption}
                </div>
                <div className="absolute inset-0 bg-obsidian-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <ZoomIn size={24} className="text-gold-400" />
                  <span className="text-ash-200 text-xs font-body px-4 text-center">{item.caption}</span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(5,5,7,0.95)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-10 right-0 text-ash-400 hover:text-gold-400 transition-colors"
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>
              <div
                className="w-full bg-obsidian-800 flex items-center justify-center text-ash-600 font-display"
                style={{ aspectRatio: '4/3', minHeight: '300px' }}
              >
                {lightbox.caption}
              </div>
              <div className="bg-obsidian-800 border-t border-white/6 px-4 py-3">
                <p className="text-ash-100 font-display text-sm">{lightbox.caption}</p>
                <p className="text-ash-500 text-xs font-body mt-0.5">{lightbox.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

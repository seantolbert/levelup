'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import type { GalleryItem } from '@/lib/content'

interface GalleryClientProps {
  items: GalleryItem[]
}

export default function GalleryClient({ items }: GalleryClientProps) {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  const categories = ['All', 'Auto', 'Residential', 'Commercial']
  const filtered = filter === 'All' ? items : items.filter((i) => i.category === filter)

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center" role="group" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 text-sm font-body tracking-wide transition-all duration-200 ${
              filter === cat
                ? 'bg-gold-500 text-obsidian-950 font-semibold'
                : 'border border-white/10 text-ash-400 hover:text-ash-100 hover:border-white/20'
            }`}
            aria-pressed={filter === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence mode="sync">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="break-inside-avoid"
            >
              <button
                onClick={() => setLightbox(item)}
                className="group relative w-full overflow-hidden bg-obsidian-800 cursor-pointer block border border-white/6 hover:border-gold-500/30 transition-colors"
                style={{ aspectRatio: i % 3 === 1 ? '3/4' : '4/3' }}
                aria-label={`View ${item.caption}`}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-obsidian-700 text-ash-600 font-display text-sm px-4 text-center">
                  {item.caption}
                </div>
                <div className="absolute inset-0 bg-obsidian-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <ZoomIn size={24} className="text-gold-400" />
                  <span className="text-ash-200 text-xs font-body px-4 text-center">{item.caption}</span>
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-ash-500 font-body py-16">No projects in this category yet.</p>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(5,5,7,0.96)' }}
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
                className="w-full bg-obsidian-800 border border-white/10 flex items-center justify-center text-ash-600 font-display text-sm"
                style={{ aspectRatio: '4/3', minHeight: '300px' }}
              >
                {lightbox.caption}
              </div>
              <div className="bg-obsidian-800 border-t border-white/6 px-4 py-3 flex items-start justify-between">
                <div>
                  <p className="text-ash-100 font-display">{lightbox.caption}</p>
                  <p className="text-ash-500 text-xs font-body mt-0.5">{lightbox.category}</p>
                </div>
                <span className="text-xs font-body text-gold-400/60 border border-gold-500/20 px-2 py-1">
                  {lightbox.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

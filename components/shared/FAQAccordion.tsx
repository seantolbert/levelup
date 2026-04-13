'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  q: string
  a: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-2" role="list">
      {items.map((item, i) => (
        <div key={i} className="border border-white/8 hover:border-gold-500/20 transition-colors" role="listitem">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left text-ash-100 hover:text-gold-300 transition-colors"
            aria-expanded={open === i}
          >
            <span className="font-display text-base leading-snug">{item.q}</span>
            <span className="shrink-0 w-6 h-6 border border-gold-500/40 flex items-center justify-center text-gold-400">
              {open === i ? <Minus size={14} /> : <Plus size={14} />}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 text-ash-400 text-sm leading-relaxed font-body border-t border-white/5 pt-4">
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

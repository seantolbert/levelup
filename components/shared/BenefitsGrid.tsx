'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Thermometer, Shield, EyeOff, Sparkles, Zap, Sun, Building, Building2, Users, ShieldCheck
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  thermometer: Thermometer,
  shield: Shield,
  'eye-off': EyeOff,
  sparkles: Sparkles,
  zap: Zap,
  sun: Sun,
  building: Building,
  'building-2': Building2,
  users: Users,
  'shield-check': ShieldCheck,
}

interface Benefit {
  title: string
  desc: string
  icon: string
}

interface BenefitsGridProps {
  benefits: Benefit[]
}

export default function BenefitsGrid({ benefits }: BenefitsGridProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {benefits.map((benefit, i) => {
        const Icon = iconMap[benefit.icon] || Shield
        return (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex flex-col p-6 bg-obsidian-800/40 border border-white/6 hover:border-gold-500/20 transition-all duration-300 group"
          >
            <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center mb-4 group-hover:border-gold-400/50 transition-colors">
              <Icon size={18} className="text-gold-400" aria-hidden="true" />
            </div>
            <h3 className="font-display text-base text-ash-100 mb-2 group-hover:text-gold-300 transition-colors">
              {benefit.title}
            </h3>
            <p className="text-ash-400 text-sm leading-relaxed font-body">{benefit.desc}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

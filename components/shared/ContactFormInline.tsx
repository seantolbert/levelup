'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface ContactFormInlineProps {
  serviceType?: string
}

export default function ContactFormInline({ serviceType = '' }: ContactFormInlineProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, serviceType }),
      })

      if (!res.ok) throw new Error('Failed to send')
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle size={40} className="text-gold-400 mx-auto mb-4" />
        <h3 className="font-display text-2xl text-ash-100 mb-2">Message Received</h3>
        <p className="text-ash-400 font-body">We&apos;ll be in touch within 24 hours.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="inline-name" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
            Name *
          </label>
          <Input
            id="inline-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="inline-email" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
            Email *
          </label>
          <Input
            id="inline-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="inline-phone" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
          Phone
        </label>
        <Input
          id="inline-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="(555) 000-0000"
        />
      </div>

      <div>
        <label htmlFor="inline-message" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
          Message *
        </label>
        <Textarea
          id="inline-message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your project…"
          required
          rows={4}
        />
      </div>

      {error && <p className="text-red-400 text-sm font-body">{error}</p>}

      <Button type="submit" disabled={submitting} className="w-full h-12">
        {submitting ? (
          <><Loader2 size={16} className="animate-spin" /> Sending…</>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  )
}

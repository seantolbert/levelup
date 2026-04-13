'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ContactFormFull() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
  })
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
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try calling us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <CheckCircle size={44} className="text-gold-400 mx-auto mb-4" />
        <h3 className="font-display text-2xl text-ash-100 mb-2">Message Sent</h3>
        <p className="text-ash-400 font-body">Thank you — we&apos;ll respond within 24 hours.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
            Name *
          </label>
          <Input
            id="contact-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
            Email *
          </label>
          <Input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-phone" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
            Phone
          </label>
          <Input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="(555) 000-0000"
          />
        </div>
        <div>
          <label htmlFor="contact-service" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
            Service Type
          </label>
          <Select onValueChange={(val) => setForm({ ...form, serviceType: val })}>
            <SelectTrigger id="contact-service">
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Auto">Automotive</SelectItem>
              <SelectItem value="Residential">Residential</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
          Message *
        </label>
        <Textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Describe your project or ask a question…"
          required
          rows={5}
        />
      </div>

      {error && <p className="text-red-400 text-sm font-body">{error}</p>}

      <Button type="submit" disabled={submitting} size="lg" className="w-full">
        {submitting ? (
          <><Loader2 size={16} className="animate-spin" /> Sending…</>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  )
}

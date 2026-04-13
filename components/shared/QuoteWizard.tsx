'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight, ArrowLeft, Loader2, Car, Home, Building2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Step = 1 | 2 | 3 | 4

const serviceTypes = [
  { id: 'Auto', label: 'Automotive', icon: Car, desc: 'Cars, SUVs, trucks, exotics' },
  { id: 'Residential', label: 'Residential', icon: Home, desc: 'Homes, condos, apartments' },
  { id: 'Commercial', label: 'Commercial', icon: Building2, desc: 'Office, retail, industrial' },
]

export default function QuoteWizard() {
  const [step, setStep] = useState<Step>(1)
  const [direction, setDirection] = useState(1)
  const [serviceType, setServiceType] = useState('')
  const [details, setDetails] = useState<Record<string, string>>({})
  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const next = () => {
    setDirection(1)
    setStep((prev) => Math.min(prev + 1, 4) as Step)
  }

  const prev = () => {
    setDirection(-1)
    setStep((prev) => Math.max(prev - 1, 1) as Step)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceType, details, contact }),
      })
      if (!res.ok) throw new Error('Failed')
      next()
    } catch {
      setError('Something went wrong. Please try again or call us.')
    } finally {
      setSubmitting(false)
    }
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  }

  // Step indicator
  const steps = ['Service', 'Details', 'Contact', 'Done']

  return (
    <div>
      {/* Step progress */}
      {step < 4 && (
        <div className="flex items-center justify-between mb-10">
          {steps.slice(0, 3).map((label, i) => {
            const stepNum = (i + 1) as Step
            const isActive = step === stepNum
            const isDone = step > stepNum
            return (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 flex items-center justify-center text-xs font-semibold transition-colors ${
                    isDone
                      ? 'bg-gold-500 text-obsidian-950'
                      : isActive
                      ? 'border border-gold-500 text-gold-400'
                      : 'border border-white/20 text-ash-600'
                  }`}
                >
                  {isDone ? <CheckCircle size={14} /> : stepNum}
                </div>
                <span className={`text-xs font-body ${isActive ? 'text-ash-200' : 'text-ash-600'}`}>
                  {label}
                </span>
                {i < 2 && (
                  <div className="hidden sm:block h-px w-10 bg-white/10 mx-2" />
                )}
              </div>
            )
          })}
        </div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        {/* Step 1: Service type */}
        {step === 1 && (
          <motion.div
            key="step1"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
          >
            <h2 className="font-display text-2xl text-ash-100 mb-2">What can we help with?</h2>
            <p className="text-ash-500 text-sm font-body mb-8">Select the type of project you have in mind.</p>

            <div className="space-y-3 mb-8">
              {serviceTypes.map(({ id, label, icon: Icon, desc }) => (
                <button
                  key={id}
                  onClick={() => setServiceType(id)}
                  className={`w-full flex items-center gap-4 p-4 border transition-all duration-200 text-left ${
                    serviceType === id
                      ? 'border-gold-500/60 bg-gold-500/8'
                      : 'border-white/8 hover:border-white/20 bg-obsidian-800/40'
                  }`}
                >
                  <div className={`w-10 h-10 border flex items-center justify-center shrink-0 ${
                    serviceType === id ? 'border-gold-500/60' : 'border-white/20'
                  }`}>
                    <Icon size={18} className={serviceType === id ? 'text-gold-400' : 'text-ash-500'} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-ash-100 font-body font-medium">{label}</div>
                    <div className="text-ash-500 text-xs font-body">{desc}</div>
                  </div>
                  {serviceType === id && (
                    <CheckCircle size={18} className="text-gold-400 ml-auto" />
                  )}
                </button>
              ))}
            </div>

            <Button
              onClick={next}
              disabled={!serviceType}
              size="lg"
              className="w-full"
            >
              Continue <ArrowRight size={16} />
            </Button>
          </motion.div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <motion.div
            key="step2"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
          >
            <h2 className="font-display text-2xl text-ash-100 mb-2">Tell us more</h2>
            <p className="text-ash-500 text-sm font-body mb-8">
              {serviceType === 'Auto'
                ? 'Share your vehicle details.'
                : serviceType === 'Residential'
                ? 'Tell us about your home.'
                : 'Describe your commercial space.'}
            </p>

            <div className="space-y-5 mb-8">
              {serviceType === 'Auto' && (
                <>
                  <div>
                    <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                      Vehicle Year/Make/Model
                    </label>
                    <Input
                      placeholder="e.g. 2023 Porsche 911 GT3"
                      value={details.vehicle || ''}
                      onChange={(e) => setDetails({ ...details, vehicle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                      Film Preference
                    </label>
                    <Select onValueChange={(v) => setDetails({ ...details, filmPreference: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select film type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Clarity Shield">Clarity Shield</SelectItem>
                        <SelectItem value="Carbon Series">Carbon Series</SelectItem>
                        <SelectItem value="Ceramic Elite">Ceramic Elite</SelectItem>
                        <SelectItem value="Not sure">Not sure — need advice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {serviceType === 'Residential' && (
                <>
                  <div>
                    <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                      Approx. Square Footage of Glass
                    </label>
                    <Input
                      placeholder="e.g. 400 sq ft"
                      value={details.sqFootage || ''}
                      onChange={(e) => setDetails({ ...details, sqFootage: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                      Primary Goal
                    </label>
                    <Select onValueChange={(v) => setDetails({ ...details, goal: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Energy savings">Energy savings</SelectItem>
                        <SelectItem value="Privacy">Privacy</SelectItem>
                        <SelectItem value="Glare reduction">Glare reduction</SelectItem>
                        <SelectItem value="UV protection">UV / fade protection</SelectItem>
                        <SelectItem value="All of the above">All of the above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {serviceType === 'Commercial' && (
                <>
                  <div>
                    <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                      Building Type
                    </label>
                    <Select onValueChange={(v) => setDetails({ ...details, buildingType: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select building type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Office">Office building</SelectItem>
                        <SelectItem value="Retail">Retail / storefront</SelectItem>
                        <SelectItem value="Industrial">Industrial / warehouse</SelectItem>
                        <SelectItem value="Mixed use">Mixed use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                      Approx. Square Footage
                    </label>
                    <Input
                      placeholder="e.g. 5,000 sq ft"
                      value={details.sqFootage || ''}
                      onChange={(e) => setDetails({ ...details, sqFootage: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                  Additional Notes
                </label>
                <Textarea
                  placeholder="Any other details that would help us prepare your quote…"
                  value={details.notes || ''}
                  onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={prev} className="flex-1">
                <ArrowLeft size={16} /> Back
              </Button>
              <Button onClick={next} className="flex-1">
                Continue <ArrowRight size={16} />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Contact */}
        {step === 3 && (
          <motion.div
            key="step3"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
          >
            <h2 className="font-display text-2xl text-ash-100 mb-2">Your contact info</h2>
            <p className="text-ash-500 text-sm font-body mb-8">We&apos;ll send your quote to this address within 24 hours.</p>

            <div className="space-y-4 mb-8">
              <div>
                <label htmlFor="quote-name" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                  Name *
                </label>
                <Input
                  id="quote-name"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="quote-email" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                  Email *
                </label>
                <Input
                  id="quote-email"
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="quote-phone" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                  Phone
                </label>
                <Input
                  id="quote-phone"
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="(555) 000-0000"
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm font-body mb-4">{error}</p>}

            <div className="flex gap-3">
              <Button variant="outline" onClick={prev} className="flex-1" disabled={submitting}>
                <ArrowLeft size={16} /> Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1"
                disabled={submitting || !contact.name || !contact.email}
              >
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                ) : (
                  <>Submit Quote Request <ArrowRight size={16} /></>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <motion.div
            key="step4"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
            className="text-center py-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            >
              <CheckCircle size={56} className="text-gold-400 mx-auto mb-5" />
            </motion.div>
            <h2 className="font-display text-3xl text-ash-100 mb-3">Quote Request Received</h2>
            <p className="text-ash-400 font-body max-w-sm mx-auto mb-8 leading-relaxed">
              Thank you, {contact.name}. We&apos;ve received your {serviceType.toLowerCase()} quote request and will respond to <strong className="text-ash-200">{contact.email}</strong> within 24 hours.
            </p>
            <div className="h-px w-16 bg-gold-500/30 mx-auto mb-8" />
            <p className="text-ash-500 text-sm font-body">
              Questions? Call us at{' '}
              <a href="tel:5558204400" className="text-gold-400 hover:underline">
                (555) 820-4400
              </a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

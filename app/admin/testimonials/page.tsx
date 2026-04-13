'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, Loader2, CheckCircle, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { Testimonial } from '@/lib/content'

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((data) => { setTestimonials(data.testimonials); setLoading(false) })
  }, [])

  const add = () => {
    setTestimonials([...testimonials, {
      id: `t${Date.now()}`,
      name: '',
      role: '',
      quote: '',
      rating: 5,
    }])
  }

  const remove = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id))
  }

  const update = (id: string, field: keyof Testimonial, value: string | number) => {
    setTestimonials(testimonials.map((t) => t.id === id ? { ...t, [field]: value } : t))
  }

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testimonials }),
    })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <div className="text-ash-500 font-body">Loading…</div>

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ash-100 mb-1">Testimonials</h1>
          <p className="text-ash-500 font-body text-sm">Add, edit, or remove client testimonials.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={add}><Plus size={14} /> Add Testimonial</Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> :
             saved ? <><CheckCircle size={14} className="text-emerald-400" /> Saved!</> :
             <><Save size={14} /> Save</>}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="p-6 bg-obsidian-800/40 border border-white/6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {[1,2,3,4,5].map((n) => (
                  <button key={n} onClick={() => update(t.id, 'rating', n)}>
                    <Star size={16} className={n <= t.rating ? 'text-gold-400 fill-gold-400' : 'text-ash-700'} />
                  </button>
                ))}
              </div>
              <button onClick={() => remove(t.id)} className="text-ash-600 hover:text-red-400 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Name</label>
                <Input value={t.name} onChange={(e) => update(t.id, 'name', e.target.value)} placeholder="Client name" />
              </div>
              <div>
                <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Role / Context</label>
                <Input value={t.role} onChange={(e) => update(t.id, 'role', e.target.value)} placeholder="e.g. Ferrari Owner, Austin TX" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Quote</label>
              <Textarea value={t.quote} onChange={(e) => update(t.id, 'quote', e.target.value)} placeholder="Client quote…" rows={3} />
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="py-12 text-center text-ash-600 font-body border border-white/6">
            No testimonials yet. Click &ldquo;Add Testimonial&rdquo; to get started.
          </div>
        )}
      </div>
    </div>
  )
}

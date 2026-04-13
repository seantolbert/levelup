'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, Loader2, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type ServiceKey = 'auto' | 'residential' | 'commercial'

interface FAQItem { q: string; a: string }
type FAQMap = Record<ServiceKey, FAQItem[]>

export default function FAQAdminPage() {
  const [faqs, setFaqs] = useState<FAQMap>({ auto: [], residential: [], commercial: [] })
  const [activeTab, setActiveTab] = useState<ServiceKey>('auto')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/content').then((r) => r.json()).then((data) => {
      setFaqs({
        auto: data.services.auto.faq,
        residential: data.services.residential.faq,
        commercial: data.services.commercial.faq,
      })
      setLoading(false)
    })
  }, [])

  const add = () => {
    setFaqs({ ...faqs, [activeTab]: [...faqs[activeTab], { q: '', a: '' }] })
  }

  const remove = (idx: number) => {
    const updated = faqs[activeTab].filter((_, i) => i !== idx)
    setFaqs({ ...faqs, [activeTab]: updated })
  }

  const update = (idx: number, field: 'q' | 'a', value: string) => {
    const updated = faqs[activeTab].map((item, i) => i === idx ? { ...item, [field]: value } : item)
    setFaqs({ ...faqs, [activeTab]: updated })
  }

  const save = async () => {
    setSaving(true)
    // We need to patch just the faq inside services
    const contentRes = await fetch('/api/admin/content')
    const content = await contentRes.json()
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        services: {
          ...content.services,
          auto: { ...content.services.auto, faq: faqs.auto },
          residential: { ...content.services.residential, faq: faqs.residential },
          commercial: { ...content.services.commercial, faq: faqs.commercial },
        },
      }),
    })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <div className="text-ash-500 font-body">Loading…</div>

  const tabs: ServiceKey[] = ['auto', 'residential', 'commercial']

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ash-100 mb-1">FAQ</h1>
          <p className="text-ash-500 font-body text-sm">Edit FAQ items per service page.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={add}><Plus size={14} /> Add FAQ</Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> :
             saved ? <><CheckCircle size={14} className="text-emerald-400" /> Saved!</> :
             <><Save size={14} /> Save</>}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-body capitalize transition-colors ${
              activeTab === tab
                ? 'bg-gold-500 text-obsidian-950 font-semibold'
                : 'border border-white/10 text-ash-400 hover:text-ash-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {faqs[activeTab].map((item, i) => (
          <div key={i} className="p-5 bg-obsidian-800/40 border border-white/6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-ash-500 text-xs font-body">Item {i + 1}</span>
              <button onClick={() => remove(i)} className="text-ash-600 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Question</label>
              <Input value={item.q} onChange={(e) => update(i, 'q', e.target.value)} placeholder="Question…" />
            </div>
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Answer</label>
              <Textarea value={item.a} onChange={(e) => update(i, 'a', e.target.value)} rows={3} placeholder="Answer…" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

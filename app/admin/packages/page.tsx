'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, Loader2, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type ServiceKey = 'auto' | 'residential' | 'commercial'
interface Pkg { name: string; description: string; priceRange: string; features: string[] }
type PkgMap = Record<ServiceKey, Pkg[]>

export default function PackagesAdminPage() {
  const [packages, setPackages] = useState<PkgMap>({ auto: [], residential: [], commercial: [] })
  const [activeTab, setActiveTab] = useState<ServiceKey>('auto')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/content').then((r) => r.json()).then((data) => {
      setPackages({
        auto: data.services.auto.packages,
        residential: data.services.residential.packages,
        commercial: data.services.commercial.packages,
      })
      setLoading(false)
    })
  }, [])

  const add = () => {
    setPackages({ ...packages, [activeTab]: [...packages[activeTab], { name: '', description: '', priceRange: '', features: [] }] })
  }

  const remove = (idx: number) => {
    setPackages({ ...packages, [activeTab]: packages[activeTab].filter((_, i) => i !== idx) })
  }

  const update = (idx: number, field: keyof Pkg, value: string | string[]) => {
    const updated = packages[activeTab].map((p, i) => i === idx ? { ...p, [field]: value } : p)
    setPackages({ ...packages, [activeTab]: updated })
  }

  const save = async () => {
    setSaving(true)
    const contentRes = await fetch('/api/admin/content')
    const content = await contentRes.json()
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        services: {
          ...content.services,
          auto: { ...content.services.auto, packages: packages.auto },
          residential: { ...content.services.residential, packages: packages.residential },
          commercial: { ...content.services.commercial, packages: packages.commercial },
        },
      }),
    })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <div className="text-ash-500 font-body">Loading…</div>

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ash-100 mb-1">Film Packages</h1>
          <p className="text-ash-500 font-body text-sm">Edit the packages table on each service page.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={add}><Plus size={14} /> Add Package</Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> :
             saved ? <><CheckCircle size={14} className="text-emerald-400" /> Saved!</> :
             <><Save size={14} /> Save</>}
          </Button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {(['auto', 'residential', 'commercial'] as ServiceKey[]).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-body capitalize transition-colors ${
              activeTab === tab ? 'bg-gold-500 text-obsidian-950 font-semibold' : 'border border-white/10 text-ash-400 hover:text-ash-100'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {packages[activeTab].map((pkg, i) => (
          <div key={i} className="p-5 bg-obsidian-800/40 border border-white/6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-ash-300 font-body font-medium">{pkg.name || `Package ${i + 1}`}</span>
              <button onClick={() => remove(i)} className="text-ash-600 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Package Name</label>
                <Input value={pkg.name} onChange={(e) => update(i, 'name', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Price Range</label>
                <Input value={pkg.priceRange} onChange={(e) => update(i, 'priceRange', e.target.value)} placeholder="From $349" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Description</label>
              <Textarea value={pkg.description} onChange={(e) => update(i, 'description', e.target.value)} rows={2} />
            </div>
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                Features (one per line)
              </label>
              <Textarea
                value={pkg.features.join('\n')}
                onChange={(e) => update(i, 'features', e.target.value.split('\n').filter(Boolean))}
                rows={4}
                placeholder="Heat Rej. 80%+&#10;UV Block 99.9%&#10;Lifetime warranty"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

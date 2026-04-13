'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function HeroAdminPage() {
  const [hero, setHero] = useState({
    headline: '',
    subheadline: '',
    ctaPrimary: '',
    ctaSecondary: '',
    backgroundImage: '',
  })
  const [stats, setStats] = useState([
    { label: '', value: '' },
    { label: '', value: '' },
    { label: '', value: '' },
  ])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((data) => {
        setHero(data.hero)
        setStats(data.stats)
        setLoading(false)
      })
  }, [])

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hero, stats }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <div className="text-ash-500 font-body">Loading…</div>

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ash-100 mb-1">Hero Content</h1>
          <p className="text-ash-500 font-body text-sm">Headline, subheadline, CTA buttons, and stats bar.</p>
        </div>
        <Button onClick={save} disabled={saving}>
          {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> :
           saved ? <><CheckCircle size={14} className="text-emerald-400" /> Saved!</> :
           <><Save size={14} /> Save Changes</>}
        </Button>
      </div>

      <div className="space-y-6">
        <section className="p-6 bg-obsidian-800/40 border border-white/6 space-y-5">
          <h2 className="font-display text-lg text-ash-100">Hero Section</h2>
          <div>
            <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Headline</label>
            <Input value={hero.headline} onChange={(e) => setHero({ ...hero, headline: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Subheadline</label>
            <Textarea value={hero.subheadline} onChange={(e) => setHero({ ...hero, subheadline: e.target.value })} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Primary CTA Label</label>
              <Input value={hero.ctaPrimary} onChange={(e) => setHero({ ...hero, ctaPrimary: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Secondary CTA Label</label>
              <Input value={hero.ctaSecondary} onChange={(e) => setHero({ ...hero, ctaSecondary: e.target.value })} />
            </div>
          </div>
        </section>

        <section className="p-6 bg-obsidian-800/40 border border-white/6 space-y-4">
          <h2 className="font-display text-lg text-ash-100">Stats Bar</h2>
          {stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Stat {i + 1} Value</label>
                <Input
                  value={stat.value}
                  onChange={(e) => {
                    const s = [...stats]
                    s[i] = { ...s[i], value: e.target.value }
                    setStats(s)
                  }}
                  placeholder="e.g. 12,400+"
                />
              </div>
              <div>
                <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Stat {i + 1} Label</label>
                <Input
                  value={stat.label}
                  onChange={(e) => {
                    const s = [...stats]
                    s[i] = { ...s[i], label: e.target.value }
                    setStats(s)
                  }}
                  placeholder="e.g. Projects Completed"
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    businessName: '',
    tagline: '',
    phone: '',
    email: '',
    address: '',
    hours: '',
    googleMapsEmbedUrl: '',
    socialLinks: { instagram: '', facebook: '', youtube: '' },
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/content')
      .then((r) => r.json())
      .then((data) => {
        setSettings(data.siteSettings)
        setLoading(false)
      })
  }, [])

  const save = async () => {
    setSaving(true)
    setSaved(false)
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteSettings: settings }),
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
          <h1 className="font-display text-3xl text-ash-100 mb-1">Site Settings</h1>
          <p className="text-ash-500 font-body text-sm">Business name, contact info, and social links.</p>
        </div>
        <Button onClick={save} disabled={saving}>
          {saving ? (
            <><Loader2 size={14} className="animate-spin" /> Saving…</>
          ) : saved ? (
            <><CheckCircle size={14} className="text-emerald-400" /> Saved!</>
          ) : (
            <><Save size={14} /> Save Changes</>
          )}
        </Button>
      </div>

      <div className="space-y-8">
        <section className="p-6 bg-obsidian-800/40 border border-white/6 space-y-5">
          <h2 className="font-display text-lg text-ash-100 mb-2">Business Info</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Business Name</label>
              <Input value={settings.businessName} onChange={(e) => setSettings({ ...settings, businessName: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Tagline</label>
              <Input value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Phone</label>
              <Input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Email</label>
              <Input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Address</label>
            <Input value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
          </div>

          <div>
            <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Business Hours</label>
            <Input value={settings.hours} onChange={(e) => setSettings({ ...settings, hours: e.target.value })} />
          </div>
        </section>

        <section className="p-6 bg-obsidian-800/40 border border-white/6 space-y-4">
          <h2 className="font-display text-lg text-ash-100 mb-2">Social Links</h2>

          <div>
            <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Instagram URL</label>
            <Input value={settings.socialLinks.instagram} onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, instagram: e.target.value } })} />
          </div>
          <div>
            <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Facebook URL</label>
            <Input value={settings.socialLinks.facebook} onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, facebook: e.target.value } })} />
          </div>
          <div>
            <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">YouTube URL</label>
            <Input value={settings.socialLinks.youtube} onChange={(e) => setSettings({ ...settings, socialLinks: { ...settings.socialLinks, youtube: e.target.value } })} />
          </div>
        </section>

        <section className="p-6 bg-obsidian-800/40 border border-white/6 space-y-4">
          <h2 className="font-display text-lg text-ash-100 mb-2">Map Embed</h2>
          <div>
            <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Google Maps Embed URL</label>
            <Textarea
              value={settings.googleMapsEmbedUrl}
              onChange={(e) => setSettings({ ...settings, googleMapsEmbedUrl: e.target.value })}
              rows={3}
              placeholder="https://maps.google.com/maps?q=..."
            />
          </div>
        </section>
      </div>
    </div>
  )
}

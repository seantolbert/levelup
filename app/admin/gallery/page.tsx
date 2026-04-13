'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, Save, Loader2, CheckCircle, Upload } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { GalleryItem } from '@/lib/content'

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/content').then((r) => r.json()).then((data) => {
      setItems(data.gallery); setLoading(false)
    })
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.url) {
      const newItem: GalleryItem = {
        id: `g${Date.now()}`,
        src: data.url,
        category: 'Auto',
        caption: file.name.replace(/\.[^/.]+$/, ''),
        alt: file.name,
      }
      const updated = [...items, newItem]
      setItems(updated)
      // Auto-save so the public gallery updates immediately
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery: updated }),
      })
    }
    setUploading(false)
  }

  const remove = (id: string) => setItems(items.filter((i) => i.id !== id))

  const update = (id: string, field: keyof GalleryItem, value: string) => {
    setItems(items.map((i) => i.id === id ? { ...i, [field]: value } : i))
  }

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gallery: items }),
    })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <div className="text-ash-500 font-body">Loading…</div>

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ash-100 mb-1">Gallery</h1>
          <p className="text-ash-500 font-body text-sm">Upload and manage project images.</p>
        </div>
        <div className="flex gap-3">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? <><Loader2 size={14} className="animate-spin" /> Uploading…</> : <><Upload size={14} /> Upload Image</>}
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> :
             saved ? <><CheckCircle size={14} className="text-emerald-400" /> Saved!</> :
             <><Save size={14} /> Save</>}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 bg-obsidian-800/40 border border-white/6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-ash-400 text-xs font-body truncate max-w-xs">{item.src}</span>
              <button onClick={() => remove(item.id)} className="text-ash-600 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-1 font-body">Caption</label>
              <Input value={item.caption} onChange={(e) => update(item.id, 'caption', e.target.value)} placeholder="Project caption" />
            </div>
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-1 font-body">Alt Text</label>
              <Input value={item.alt} onChange={(e) => update(item.id, 'alt', e.target.value)} placeholder="Image description for accessibility" />
            </div>
            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-1 font-body">Category</label>
              <Select value={item.category} onValueChange={(v) => update(item.id, 'category', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Auto">Auto</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="py-12 text-center text-ash-600 font-body border border-white/6">
          No gallery items. Upload an image to get started.
        </div>
      )}
    </div>
  )
}

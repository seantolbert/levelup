'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, Save, Loader2, CheckCircle, Upload } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { TeamMember } from '@/lib/content'

export default function TeamAdminPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  useEffect(() => {
    fetch('/api/admin/content').then((r) => r.json()).then((data) => {
      setTeam(data.team); setLoading(false)
    })
  }, [])

  const add = () => {
    setTeam([...team, { id: `tm${Date.now()}`, name: '', role: '', bio: '', photo: '' }])
  }

  const remove = (id: string) => setTeam(team.filter((m) => m.id !== id))

  const update = (id: string, field: keyof TeamMember, value: string) => {
    setTeam(team.map((m) => m.id === id ? { ...m, [field]: value } : m))
  }

  const handlePhotoUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingId(id)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setUploadingId(null)
    if (data.url) update(id, 'photo', data.url)
  }

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ team }),
    })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <div className="text-ash-500 font-body">Loading…</div>

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-ash-100 mb-1">Team</h1>
          <p className="text-ash-500 font-body text-sm">Manage team member profiles.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={add}><Plus size={14} /> Add Member</Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> :
             saved ? <><CheckCircle size={14} className="text-emerald-400" /> Saved!</> :
             <><Save size={14} /> Save</>}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {team.map((member) => (
          <div key={member.id} className="p-6 bg-obsidian-800/40 border border-white/6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                  <span className="font-display text-gold-400">
                    {member.name ? member.name[0] : '?'}
                  </span>
                </div>
                <div>
                  <div className="text-ash-100 font-body font-medium">{member.name || 'New Member'}</div>
                  <div className="text-ash-500 text-xs font-body">{member.role}</div>
                </div>
              </div>
              <button onClick={() => remove(member.id)} className="text-ash-600 hover:text-red-400 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Name</label>
                <Input value={member.name} onChange={(e) => update(member.id, 'name', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Role / Title</label>
                <Input value={member.role} onChange={(e) => update(member.id, 'role', e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Bio</label>
              <Textarea value={member.bio} onChange={(e) => update(member.id, 'bio', e.target.value)} rows={3} />
            </div>

            <div>
              <label className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">Photo</label>
              <div className="flex items-center gap-3">
                <Input value={member.photo} onChange={(e) => update(member.id, 'photo', e.target.value)} placeholder="/uploads/photo.jpg" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={(el) => { fileRefs.current[member.id] = el }}
                  onChange={(e) => handlePhotoUpload(member.id, e)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileRefs.current[member.id]?.click()}
                  disabled={uploadingId === member.id}
                >
                  {uploadingId === member.id ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

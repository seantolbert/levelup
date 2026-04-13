'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid credentials. Please try again.')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center px-4 noise-overlay">
      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-8 h-8 border border-gold-500/60 flex items-center justify-center">
            <div className="w-3 h-3 bg-gold-500 rotate-45" />
          </div>
          <span className="font-display text-xl text-ash-100">LuminaFilm</span>
        </div>

        <div className="bg-obsidian-800/60 border border-white/8 p-8">
          <h1 className="font-display text-2xl text-ash-100 mb-1">Admin Portal</h1>
          <p className="text-ash-500 text-sm font-body mb-8">Sign in to manage your site content.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                Email
              </label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@luminafilm.com"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-xs text-ash-400 uppercase tracking-widest mb-2 font-body">
                Password
              </label>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {error && <p className="text-red-400 text-sm font-body">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full h-12 mt-2">
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Signing in…</>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-ash-600 text-xs font-body mt-6">
          Credentials are set in your .env.local file.
        </p>
      </div>
    </div>
  )
}

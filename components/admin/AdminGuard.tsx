'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (!isLoginPage && status === 'unauthenticated') {
      router.push('/admin/login')
    }
    if (isLoginPage && status === 'authenticated') {
      router.push('/admin')
    }
  }, [status, router, isLoginPage])

  if (!isLoginPage && status === 'loading') {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-gold-400" />
      </div>
    )
  }

  if (!isLoginPage && status === 'unauthenticated') return null

  return <>{children}</>
}

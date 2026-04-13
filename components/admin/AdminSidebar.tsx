'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Settings,
  Image,
  Star,
  Users,
  HelpCircle,
  Package,
  FileText,
  Sparkles,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
  { href: '/admin/hero', label: 'Hero Content', icon: Image },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/admin/packages', label: 'Film Packages', icon: Package },
  { href: '/admin/quotes', label: 'Quote Submissions', icon: FileText },
  { href: '/admin/suggestions', label: 'AI Suggestions', icon: Sparkles },
]

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-7 h-7 border border-gold-500/60 flex items-center justify-center shrink-0">
        <div className="w-2.5 h-2.5 bg-gold-500 rotate-45" />
      </div>
      <div>
        <span className="font-display text-sm text-ash-100 block">LuminaFilm</span>
        <span className="text-ash-600 text-xs font-body">Admin Portal</span>
      </div>
    </Link>
  )
}

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto" aria-label="Admin navigation">
      {navItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.href, item.exact)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150 group ${
              active
                ? 'bg-gold-500/10 text-gold-400 border-l-2 border-gold-500'
                : 'text-ash-400 hover:text-ash-100 hover:bg-white/4 border-l-2 border-transparent'
            }`}
          >
            <Icon
              size={16}
              className={active ? 'text-gold-400' : 'text-ash-600 group-hover:text-ash-400'}
              aria-hidden="true"
            />
            <span className="font-body">{item.label}</span>
            {active && <ChevronRight size={12} className="ml-auto text-gold-500/50" />}
            {!active && item.href === '/admin/suggestions' && (
              <span className="ml-auto text-gold-400 text-xs">⭐</span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

function SignOutButton() {
  return (
    <div className="p-3 border-t border-white/6">
      <button
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-ash-500 hover:text-red-400 transition-colors font-body"
      >
        <LogOut size={16} aria-hidden="true" />
        Sign Out
      </button>
    </div>
  )
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* ── Desktop sidebar (lg+) ── */}
      <aside className="hidden lg:flex w-64 min-h-screen bg-obsidian-900 border-r border-white/6 flex-col shrink-0">
        <div className="p-6 border-b border-white/6">
          <Logo />
        </div>
        <NavLinks pathname={pathname} />
        <SignOutButton />
      </aside>

      {/* ── Mobile top bar ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-obsidian-900 border-b border-white/6 flex items-center justify-between px-4">
        <Logo />
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation"
          className="p-2 text-ash-400 hover:text-ash-100 transition-colors"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* ── Mobile drawer backdrop ── */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/60"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72 bg-obsidian-900 border-r border-white/6 flex flex-col transform transition-transform duration-200 ease-in-out ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        <div className="h-14 px-4 border-b border-white/6 flex items-center justify-between shrink-0">
          <Logo />
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation"
            className="p-2 text-ash-400 hover:text-ash-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <NavLinks pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
        <SignOutButton />
      </aside>
    </>
  )
}

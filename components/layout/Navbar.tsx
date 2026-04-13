'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services/auto', label: 'Automotive' },
  { href: '/services/residential', label: 'Residential' },
  { href: '/services/commercial', label: 'Commercial' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

interface NavbarProps {
  businessName: string
  phone: string
}

export default function Navbar({ businessName, phone }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen ? 'glass-dark shadow-2xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 border border-gold-500/60 flex items-center justify-center group-hover:border-gold-400 transition-colors">
              <div className="w-3 h-3 bg-gold-500 rotate-45 group-hover:bg-gold-400 transition-colors" />
            </div>
            <span className="font-display text-xl text-ash-100 tracking-tight">
              {businessName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors duration-200 font-body ${
                  pathname === link.href
                    ? 'text-gold-400'
                    : 'text-ash-400 hover:text-ash-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 text-sm text-ash-400 hover:text-gold-400 transition-colors"
            >
              <Phone size={14} />
              <span className="font-body">{phone}</span>
            </a>
            <Link
              href="/quote"
              className="bg-gold-500 text-obsidian-950 px-5 py-2 text-sm font-semibold hover:bg-gold-400 transition-colors tracking-wide"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-ash-200 hover:text-gold-400 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(5,5,7,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-2 pt-24">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`block text-center py-3 text-3xl font-display transition-colors ${
                      pathname === link.href
                        ? 'text-gold-400'
                        : 'text-ash-200 hover:text-gold-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.1 }}
                className="mt-8 flex flex-col items-center gap-4"
              >
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-ash-400 hover:text-gold-400 transition-colors font-body"
                >
                  <Phone size={16} />
                  {phone}
                </a>
                <Link
                  href="/quote"
                  className="bg-gold-500 text-obsidian-950 px-8 py-3 font-semibold text-base hover:bg-gold-400 transition-colors tracking-wide"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </div>

            {/* Decorative gold line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
            <div className="h-16" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

import fs from 'fs'
import path from 'path'
import { Redis } from '@upstash/redis'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SiteContent {
  siteSettings: {
    businessName: string
    tagline: string
    phone: string
    email: string
    address: string
    hours: string
    socialLinks: {
      instagram: string
      facebook: string
      youtube: string
    }
    googleMapsEmbedUrl: string
  }
  hero: {
    headline: string
    subheadline: string
    ctaPrimary: string
    ctaSecondary: string
    backgroundImage: string
  }
  stats: Array<{ label: string; value: string }>
  services: {
    auto: ServiceData
    residential: ServiceData
    commercial: ServiceData
  }
  testimonials: Testimonial[]
  gallery: GalleryItem[]
  team: TeamMember[]
  trustPillars: TrustPillar[]
}

export interface ServiceData {
  title: string
  shortDesc: string
  heroHeadline: string
  heroSubheadline: string
  benefits: Array<{ title: string; desc: string; icon: string }>
  faq: Array<{ q: string; a: string }>
  packages: Array<{ name: string; description: string; priceRange: string; features: string[] }>
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  rating: number
}

export interface GalleryItem {
  id: string
  src: string
  category: string
  caption: string
  alt: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo: string
}

export interface TrustPillar {
  title: string
  desc: string
  icon: string
}

export interface QuoteSubmission {
  id: string
  serviceType: string
  details: Record<string, string>
  contact: {
    name: string
    email: string
    phone: string
    message?: string
  }
  submittedAt: string
  contacted: boolean
}

// ─── Storage layer ─────────────────────────────────────────────────────────────
// Uses Upstash Redis when credentials are present (production + local with real creds).
// Falls back to the local JSON files for local dev without credentials.

const USE_REDIS = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
)

function getRedis() {
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  })
}

const CONTENT_KEY = 'site-content'
const QUOTES_KEY = 'quotes'

const contentPath = path.join(process.cwd(), 'content', 'site-content.json')
const quotesPath = path.join(process.cwd(), 'content', 'quotes.json')

// ─── Content ──────────────────────────────────────────────────────────────────

export async function getContent(): Promise<SiteContent> {
  if (USE_REDIS) {
    const redis = getRedis()
    const data = await redis.get<SiteContent>(CONTENT_KEY)
    if (data) return data
    // First run: seed Redis from the local JSON file
    const seed = JSON.parse(fs.readFileSync(contentPath, 'utf-8')) as SiteContent
    await redis.set(CONTENT_KEY, seed)
    return seed
  }
  return JSON.parse(fs.readFileSync(contentPath, 'utf-8')) as SiteContent
}

export async function writeContent(data: SiteContent): Promise<void> {
  if (USE_REDIS) {
    const redis = getRedis()
    await redis.set(CONTENT_KEY, data)
    return
  }
  fs.writeFileSync(contentPath, JSON.stringify(data, null, 2), 'utf-8')
}

// ─── Quotes ───────────────────────────────────────────────────────────────────

export async function getQuotes(): Promise<QuoteSubmission[]> {
  if (USE_REDIS) {
    const redis = getRedis()
    return (await redis.get<QuoteSubmission[]>(QUOTES_KEY)) ?? []
  }
  if (!fs.existsSync(quotesPath)) return []
  return JSON.parse(fs.readFileSync(quotesPath, 'utf-8')) as QuoteSubmission[]
}

export async function saveQuote(quote: QuoteSubmission): Promise<void> {
  const quotes = await getQuotes()
  quotes.unshift(quote)
  if (USE_REDIS) {
    const redis = getRedis()
    await redis.set(QUOTES_KEY, quotes)
    return
  }
  fs.writeFileSync(quotesPath, JSON.stringify(quotes, null, 2), 'utf-8')
}

export async function updateQuote(id: string, updates: Partial<QuoteSubmission>): Promise<void> {
  const quotes = await getQuotes()
  const idx = quotes.findIndex((q) => q.id === id)
  if (idx !== -1) {
    quotes[idx] = { ...quotes[idx], ...updates }
    if (USE_REDIS) {
      const redis = getRedis()
      await redis.set(QUOTES_KEY, quotes)
      return
    }
    fs.writeFileSync(quotesPath, JSON.stringify(quotes, null, 2), 'utf-8')
  }
}

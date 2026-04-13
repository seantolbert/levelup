# LuminaFilm — Premium Window Film Website

A production-ready Next.js 16 website for a premium window film business with a full CMS portal and AI-powered content suggestions.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/luminafilm)

---

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** — obsidian/gold luxury aesthetic
- **Framer Motion** — scroll-triggered animations, parallax, carousel
- **next-auth v4** — credentials-based CMS authentication
- **Anthropic Claude** — AI Suggestions panel in admin
- **Nodemailer** — email notifications for quote submissions
- **JSON file store** — no external database required

---

## Quick Start

```bash
git clone <repo>
cd luminafilm
npm install
# Edit .env.local with your credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.
Admin portal: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Environment Variables (.env.local)

| Variable | Required | Description |
|---|---|---|
| `NEXTAUTH_SECRET` | YES | Random string — use `openssl rand -base64 32` |
| `NEXTAUTH_URL` | YES | Full URL of your deployment |
| `ADMIN_EMAIL` | YES | Login email for CMS admin |
| `ADMIN_PASSWORD` | YES | Login password for CMS admin |
| `ANTHROPIC_API_KEY` | For AI tab | Required for AI Suggestions feature |
| `SMTP_HOST` | Optional | SMTP server for email notifications |
| `SMTP_PORT` | Optional | SMTP port (default 587) |
| `SMTP_USER` | Optional | SMTP username |
| `SMTP_PASS` | Optional | SMTP password |
| `SMTP_FROM` | Optional | From address for emails |

If SMTP vars are not set, quote/contact submissions are logged to the server console.

---

## Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables in Vercel dashboard
4. Deploy

> **Note:** The JSON content store writes to the filesystem. On Vercel, filesystem writes only persist for the life of the function invocation. For durable production storage, migrate to Vercel KV or Postgres. For a single-server VPS deployment, the file store works out of the box.

---

## CMS Portal

Sign in at `/admin/login` with your `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

| Section | What you can edit |
|---|---|
| Site Settings | Business name, phone, email, address, hours, social links, map embed |
| Hero Content | Headline, subheadline, CTA labels, stats bar values |
| Testimonials | Add/edit/delete testimonials with star ratings |
| Gallery | Upload images, assign category (Auto/Residential/Commercial), add captions |
| Team | Add/edit/delete team members with photo upload |
| FAQ | FAQ items per service page |
| Film Packages | Packages table per service page |
| Quote Submissions | View all submitted quotes, mark as contacted |
| AI Suggestions | Generate 5 AI-powered conversion/SEO improvement suggestions |

---

## Pre-Launch Checklist

### Security
- [ ] Change `ADMIN_EMAIL` and `ADMIN_PASSWORD` to strong credentials
- [ ] Set `NEXTAUTH_SECRET` to a cryptographically random string: `openssl rand -base64 32`
- [ ] Set `NEXTAUTH_URL` to your production domain

### Content
- [ ] Replace placeholder stats with real data
- [ ] Upload real project photos to the gallery
- [ ] Add real team member photos
- [ ] Update contact info (phone, email, address, hours)
- [ ] Update Google Maps embed URL with your actual address
- [ ] Update social media links

### Email
- [ ] Configure SMTP env vars to receive form submissions
- [ ] Test the quote form and verify you receive the email

### Domain
- [ ] Connect custom domain in Vercel project settings
- [ ] Verify SSL certificate is issued

### SEO
- [ ] Update `metadata` in `app/layout.tsx` with real description and keywords
- [ ] Add a real favicon to `/public/favicon.ico`
- [ ] Submit sitemap to Google Search Console

### Optional
- [ ] Add Anthropic API key and test AI Suggestions panel
- [ ] Configure Vercel Analytics

---

## File Structure

```
/app
  /(public)            Public website pages
  /admin               CMS portal (auth-protected)
  /api                 API routes
/components
  /layout              Navbar, Footer
  /home                Hero, Stats, Service Cards, Testimonials, etc.
  /shared              Forms, FAQ, Package Table, Quote Wizard
  /admin               Sidebar, Guards, Providers
  /ui                  Button, Input, Card, Badge, Select, Textarea
/lib
  content.ts           File-based content store utilities
  auth.ts              NextAuth config
  mailer.ts            Nodemailer wrapper
/content
  site-content.json    All editable site content
  quotes.json          Quote submission store
/public
  /uploads             Uploaded images
```

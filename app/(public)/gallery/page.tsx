import { getContent } from '@/lib/content'
import GalleryClient from '@/components/home/GalleryClient'

export const revalidate = 60

export default async function GalleryPage() {
  const content = await getContent()

  return (
    <>
      {/* Page header */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-obsidian-950 overflow-hidden pt-20 noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 to-obsidian-900" />
        <div className="shimmer-effect" aria-hidden="true" />
        <div className="relative z-10 text-center px-6 py-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-400 text-xs tracking-[0.3em] uppercase font-body">Our Portfolio</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-ash-100 mb-4">
            Project <em className="italic text-gold-400">Gallery</em>
          </h1>
          <p className="text-ash-400 text-lg max-w-xl mx-auto font-body">
            A curated selection of our finest automotive, residential, and commercial film installations.
          </p>
        </div>
      </section>

      <section className="section-padding bg-obsidian-950">
        <div className="max-w-7xl mx-auto px-6">
          <GalleryClient items={content.gallery} />
        </div>
      </section>
    </>
  )
}

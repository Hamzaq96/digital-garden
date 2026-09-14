import Link from "next/link"
import { MotionCard } from "@/components/ui/animated-card"
import { ArrowRight, Camera } from "lucide-react"
import Navigation from "@/app/navigation"
import { getAllPhotos, getStageEmoji, getStageLabel } from "@/lib/photos"

function getCardClassName(index: number, total: number): string {
  const baseClass = "group hover:shadow-lg transition-shadow"

  if (total >= 4) {
    if (index === 0) return `${baseClass} md:col-span-2`
    if (index % 4 === 3) return `${baseClass} md:col-span-2`
  }

  return baseClass
}

export default function PhotosPage() {
  const photos = getAllPhotos()

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Navigation />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Photos</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Visual observations and moments captured — outings, light studies, and the quiet details worth noticing.
            These aren't polished portfolio pieces; they're notes with cameras, sketches of attention.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <MotionCard key={photo.slug} index={index} className={getCardClassName(index, photos.length)}>
              <Link href={`/photos/${photo.slug}`} className="block">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                  <Camera className="h-12 w-12 text-accent/30" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Camera className="h-4 w-4" />
                      <span>Photos</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{photo.title}</h2>
                  <p className="text-sm text-muted-foreground mb-3">{photo.caption}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span>{getStageEmoji(photo.stage)}</span>
                      <span>{getStageLabel(photo.stage)}</span>
                    </div>
                    {photo.location && (
                      <>
                        <span>·</span>
                        <span>{photo.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </MotionCard>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No photos yet. Time to start capturing moments!</p>
          </div>
        )}
      </section>

      <footer className="border-t border-border mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Digital Garden. Built with Next.js & Tailwind CSS.</p>
            <div className="flex items-center gap-6">
              <a
                href="https://twitter.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://github.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:hello@example.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

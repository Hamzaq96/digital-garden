import Navigation from "@/app/navigation"
import { getAllPhotos } from "@/lib/photos"
import { PhotoCarousel } from "@/components/ui/photo-carousel"

export default function PhotosPage() {
  const photos = getAllPhotos()

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Navigation />
      </div>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Photos</h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Flip through moments captured — an album of observations, light studies, and quiet details.
            Swipe, click arrows, or use keyboard to explore.
          </p>
        </div>
      </section>

      <section className="w-full pb-16 sm:pb-24">
        <PhotoCarousel photos={photos} />
      </section>

      <footer className="border-t border-border mt-16 sm:mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
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

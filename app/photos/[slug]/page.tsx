import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Camera, MapPin } from "lucide-react"
import Navigation from "@/app/navigation"
import { getAllPhotos, getPhotoBySlug, getStageEmoji, getStageLabel } from "@/lib/photos"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export async function generateStaticParams() {
  const photos = getAllPhotos()
  return photos.map((photo) => ({
    slug: photo.slug,
  }))
}

export default function PhotoPage({ params }: { params: { slug: string } }) {
  const photo = getPhotoBySlug(params.slug)

  if (!photo) {
    notFound()
  }

  const fullPath = path.join(process.cwd(), "content/photos", `${params.slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { content } = matter(fileContents)

  const allPhotos = getAllPhotos()
  const relatedPhotos = allPhotos
    .filter((p) => p.slug !== photo.slug)
    .slice(0, 2)

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Navigation />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Button variant="ghost" asChild className="mb-8 -ml-4">
          <Link href="/photos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Album
          </Link>
        </Button>

        <article className="bg-card rounded-lg shadow-md border border-border overflow-hidden">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
            <Camera className="h-16 w-16 sm:h-20 sm:w-20 text-accent/30" />
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 flex-wrap">
              <Camera className="h-3.5 w-3.5" />
              <span>Photos</span>
              <span>·</span>
              <span>{getStageEmoji(photo.stage)}</span>
              <span>{getStageLabel(photo.stage)}</span>
              <span>·</span>
              <time dateTime={photo.date}>
                {new Date(photo.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {photo.location && (
                <>
                  <span>·</span>
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{photo.location}</span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-3">{photo.title}</h1>

            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              {photo.caption}
            </p>

            {photo.tags && photo.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-6">
                {photo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 bg-accent/10 text-accent-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-neutral dark:prose-invert max-w-none prose-sm sm:prose-base">
              {content.split("\n").map((line, i) => {
                if (line.startsWith("# ")) {
                  return null
                } else if (line.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-xl font-bold mt-6 mb-3">
                      {line.slice(3)}
                    </h2>
                  )
                } else if (line.trim() === "") {
                  return <br key={i} />
                } else if (line.startsWith("- ")) {
                  return (
                    <li key={i} className="ml-4 mb-2">
                      {line.slice(2)}
                    </li>
                  )
                } else {
                  return (
                    <p key={i} className="mb-3 leading-relaxed text-muted-foreground">
                      {line}
                    </p>
                  )
                }
              })}
            </div>
          </div>
        </article>

        {relatedPhotos.length > 0 && (
          <section className="mt-8">
            <h3 className="text-lg font-semibold mb-4 px-2">More from Album</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedPhotos.map((relatedPhoto) => (
                <Link
                  key={relatedPhoto.slug}
                  href={`/photos/${relatedPhoto.slug}`}
                  className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                    <Camera className="h-10 w-10 text-accent/30" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                      <span>{getStageEmoji(relatedPhoto.stage)}</span>
                      <span>{getStageLabel(relatedPhoto.stage)}</span>
                    </div>
                    <h4 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                      {relatedPhoto.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPhoto.caption}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

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

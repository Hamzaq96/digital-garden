import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Camera, Calendar, MapPin, Tag } from "lucide-react"
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
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Navigation />
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Button variant="ghost" asChild className="mb-8 -ml-4">
          <Link href="/photos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Photos
          </Link>
        </Button>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span>{getStageEmoji(photo.stage)}</span>
              <span>{getStageLabel(photo.stage)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(photo.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
            {photo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{photo.location}</span>
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{photo.title}</h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {photo.caption}
          </p>

          {photo.tags && photo.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-6">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2 flex-wrap">
                {photo.tags.map((tag) => (
                  <span key={tag} className="text-sm px-3 py-1 bg-secondary rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </header>

        <div className="mb-12">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center overflow-hidden">
            <Camera className="h-16 w-16 text-accent/30" />
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center italic">
            Image placeholder — replace with actual photo
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {content.split("\n").map((line, i) => {
            if (line.startsWith("# ")) {
              return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.slice(2)}</h2>
            } else if (line.startsWith("## ")) {
              return <h3 key={i} className="text-xl font-semibold mt-6 mb-3">{line.slice(3)}</h3>
            } else if (line.trim() === "") {
              return <br key={i} />
            } else if (line.startsWith("- ")) {
              return <li key={i} className="ml-6">{line.slice(2)}</li>
            } else {
              return <p key={i} className="mb-4 leading-relaxed">{line}</p>
            }
          })}
        </div>

        {relatedPhotos.length > 0 && (
          <section className="mt-16 pt-8 border-t border-border">
            <h3 className="text-xl font-semibold mb-6">More Photos</h3>
            <div className="grid gap-4">
              {relatedPhotos.map((relatedPhoto) => (
                <Card key={relatedPhoto.slug} className="group hover:shadow-lg transition-shadow">
                  <Link href={`/photos/${relatedPhoto.slug}`} className="block p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <span>{getStageEmoji(relatedPhoto.stage)}</span>
                          <span>{getStageLabel(relatedPhoto.stage)}</span>
                        </div>
                        <h4 className="font-semibold mb-1">{relatedPhoto.title}</h4>
                        <p className="text-sm text-muted-foreground">{relatedPhoto.caption}</p>
                      </div>
                      <ArrowLeft className="h-5 w-5 text-muted-foreground rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}
      </article>

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

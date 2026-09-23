import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin } from "lucide-react"
import Navigation from "@/app/navigation"
import { getAllAlbums, getAlbumBySlug } from "@/lib/photos"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { PictureCarousel } from "@/components/ui/picture-carousel"

export async function generateStaticParams() {
  const albums = getAllAlbums()
  return albums.map((album) => ({
    slug: album.slug,
  }))
}

export default async function AlbumPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const album = getAlbumBySlug(slug)

  if (!album) {
    notFound()
  }

  const fullPath = path.join(process.cwd(), "content/photos", `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { content } = matter(fileContents)

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Navigation />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/photos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Places
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="h-4 w-4" />
            <span>{album.location}</span>
            <span>·</span>
            <time dateTime={album.date}>
              {new Date(album.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </time>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{album.place}</h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {album.description}
          </p>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
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
                  <p key={i} className="mb-3 leading-relaxed">
                    {line}
                  </p>
                )
              }
            })}
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Photos from {album.place}</h2>
          <PictureCarousel 
            albumName={album.place} 
            pictureCount={album.photoCount || 8}
            photos={album.photos}
          />
        </section>
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

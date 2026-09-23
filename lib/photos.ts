import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type AlbumPhoto = {
  path: string
  caption?: string
}

export type Album = {
  slug: string
  place: string
  date: string
  description: string
  location?: string
  photoCount?: number
  coverImage?: string
  photos?: AlbumPhoto[]
}

const photosDirectory = path.join(process.cwd(), "content/photos")

export function getAllAlbums(): Album[] {
  if (!fs.existsSync(photosDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(photosDirectory)

  const albums = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(photosDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)

      return {
        slug,
        place: data.place as string,
        date: data.date as string,
        description: data.description as string,
        location: data.location as string | undefined,
        photoCount: data.photoCount as number | undefined,
        coverImage: data.coverImage as string | undefined,
        photos: data.photos as AlbumPhoto[] | undefined,
      }
    })

  // Sort by date (most recent first)
  return albums.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getAlbumBySlug(slug: string): Album | null {
  const fullPath = path.join(photosDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data } = matter(fileContents)

  return {
    slug,
    place: data.place as string,
    date: data.date as string,
    description: data.description as string,
    location: data.location as string | undefined,
    photoCount: data.photoCount as number | undefined,
    coverImage: data.coverImage as string | undefined,
    photos: data.photos as AlbumPhoto[] | undefined,
  }
}

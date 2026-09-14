import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type PhotoStage = "seedling" | "budding" | "evergreen"

export type Photo = {
  slug: string
  title: string
  date: string
  caption: string
  tags?: string[]
  stage: PhotoStage
  location?: string
}

const photosDirectory = path.join(process.cwd(), "content/photos")

export function getAllPhotos(): Photo[] {
  if (!fs.existsSync(photosDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(photosDirectory)

  const photos = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(photosDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        caption: data.caption as string,
        tags: data.tags as string[] | undefined,
        stage: data.stage as PhotoStage,
        location: data.location as string | undefined,
      }
    })

  // Sort by date (most recent first)
  return photos.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getPhotoBySlug(slug: string): Photo | null {
  const fullPath = path.join(photosDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data } = matter(fileContents)

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    caption: data.caption as string,
    tags: data.tags as string[] | undefined,
    stage: data.stage as PhotoStage,
    location: data.location as string | undefined,
  }
}

export function getStageEmoji(stage: PhotoStage): string {
  switch (stage) {
    case "seedling":
      return "🌱"
    case "budding":
      return "🌿"
    case "evergreen":
      return "🌳"
  }
}

export function getStageLabel(stage: PhotoStage): string {
  switch (stage) {
    case "seedling":
      return "Seedling"
    case "budding":
      return "Budding"
    case "evergreen":
      return "Evergreen"
  }
}

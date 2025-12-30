import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type NoteStage = "seedling" | "budding" | "evergreen"

export type Note = {
  slug: string
  title: string
  stage: NoteStage
  updatedAt: string
}

const notesDirectory = path.join(process.cwd(), "content/notes")

export function getAllNotes(): Note[] {
  const fileNames = fs.readdirSync(notesDirectory)

  const notes = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(notesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title as string,
        stage: data.stage as NoteStage,
        updatedAt: data.updatedAt as string,
      }
    })

  // Sort by updatedAt (most recent first)
  return notes.sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })
}

export function getNoteBySlug(slug: string): Note | null {
  const fullPath = path.join(notesDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data } = matter(fileContents)

  return {
    slug,
    title: data.title as string,
    stage: data.stage as NoteStage,
    updatedAt: data.updatedAt as string,
  }
}

export function getStageEmoji(stage: NoteStage): string {
  switch (stage) {
    case "seedling":
      return "🌱"
    case "budding":
      return "🌿"
    case "evergreen":
      return "🌳"
  }
}

export function getStageLabel(stage: NoteStage): string {
  switch (stage) {
    case "seedling":
      return "Seedling"
    case "budding":
      return "Budding"
    case "evergreen":
      return "Evergreen"
  }
}

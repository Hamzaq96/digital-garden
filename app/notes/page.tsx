import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight, BookOpen } from "lucide-react"
import Navigation from "@/app/navigation"
import { getAllNotes, getStageEmoji, getStageLabel } from "@/lib/notes"

// Bento grid patterns for visual variety
function getCardClassName(index: number, total: number): string {
  const baseClass = "group hover:shadow-lg transition-shadow"

  // Create visual variety with spanning patterns
  if (total >= 4) {
    // First card spans 2 columns
    if (index === 0) return `${baseClass} md:col-span-2`
    // Every 4th card (after first) spans 2 columns
    if (index % 4 === 3) return `${baseClass} md:col-span-2`
  }

  return baseClass
}

export default function NotesPage() {
  const notes = getAllNotes()

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Navigation />
      </div>

      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Notes</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A collection of thoughts, ideas, and learnings. These notes are at various stages of growth — from fresh
            seedlings to evergreen ideas.
          </p>
        </div>
      </section>

      {/* Notes Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note, index) => (
            <Card key={note.slug} className={getCardClassName(index, notes.length)}>
              <Link href={`/notes/${note.slug}`} className="block p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>Notes</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <h2 className="text-xl font-semibold mb-3">{note.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{getStageEmoji(note.stage)}</span>
                  <span>{getStageLabel(note.stage)}</span>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No notes yet. Start planting some ideas!</p>
          </div>
        )}
      </section>

      {/* Footer */}
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

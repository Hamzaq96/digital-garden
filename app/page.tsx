
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BookOpen, Code, Lightbulb, Sprout } from "lucide-react"
import Navigation from "./navigation"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Navigation />
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Hey there, I'm Hamza 👋</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            Welcome to my{" "}
            <Link
              href="/about"
              className="text-accent underline decoration-2 underline-offset-4 hover:text-accent-foreground transition-colors"
            >
              digital garden
            </Link>{" "}
            🌱 — a living collection of thoughts, ideas, and projects that I'm tending to. This is where half-baked
            ideas grow into something more, where I learn in public, and where I document my journey.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            I like building things, exploring new technologies, and sharing what I learn along the way. Feel free to
            wander around, read my notes, check out my projects, and maybe even plant a few ideas of your own.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/notes">
                Explore Notes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
          {/* Featured Project */}
          <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow md:col-span-2">
            <Link href="/projects/personal-website" className="block p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Code className="h-4 w-4" />
                  <span>Projects</span>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Building a Modern Digital Garden</h3>
              <p className="text-muted-foreground leading-relaxed">
                Exploring the intersection of personal knowledge management and public learning. Built with Next.js,
                TypeScript, and Tailwind CSS.
              </p>
            </Link>
          </Card>

          {/* Note Card */}
          <Card className="group hover:shadow-lg transition-shadow">
            <Link href="/notes/learning-in-public" className="block p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>Notes</span>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learning in Public</h3>
              <p className="text-sm text-muted-foreground">
                Why sharing half-formed ideas is better than waiting for perfection
              </p>
              <div className="mt-4 text-xs text-muted-foreground">Seedling 🌱 · Updated 2 days ago</div>
            </Link>
          </Card>

          {/* Writing Card */}
          <Card className="group hover:shadow-lg transition-shadow">
            <Link href="/writing/on-digital-gardens" className="block p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lightbulb className="h-4 w-4" />
                  <span>Writing</span>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold mb-2">What the heck is a digital garden?</h3>
              <p className="text-sm text-muted-foreground">
                An exploration of non-linear, evolving knowledge spaces on the web
              </p>
              <div className="mt-4 text-xs text-muted-foreground">March 15, 2024</div>
            </Link>
          </Card>

          {/* Image Card */}
          <Card className="group overflow-hidden hover:shadow-lg transition-shadow md:row-span-2">
            <Link href="/notes/typescript-tips" className="block">
              <div className="relative aspect-[4/5] bg-gradient-to-br from-accent/20 to-accent/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="h-16 w-16 text-accent/40" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <BookOpen className="h-4 w-4" />
                  <span>Notes</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">TypeScript Tips & Tricks</h3>
                <p className="text-sm text-muted-foreground">
                  A collection of useful TypeScript patterns I keep coming back to
                </p>
              </div>
            </Link>
          </Card>

          {/* Quote/Highlight Card */}
          <Card className="group bg-accent/5 border-accent/20 hover:shadow-lg transition-shadow md:col-span-2">
            <Link href="/notes/creativity" className="block p-6">
              <div className="flex items-center gap-2 text-sm text-accent mb-4">
                <Sprout className="h-4 w-4" />
                <span>Evergreen Note</span>
              </div>
              <blockquote className="text-xl font-medium italic text-pretty mb-4">
                "A digital garden is not a blog. It's a different metaphor for thinking about content - not a stream,
                but a topography."
              </blockquote>
              <p className="text-sm text-muted-foreground">
                Exploring the philosophy behind digital gardens and why they matter
              </p>
            </Link>
          </Card>

          {/* Simple Link Card */}
          <Card className="group hover:shadow-lg transition-shadow">
            <Link href="/notes/next-js-patterns" className="block p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Code className="h-4 w-4" />
                  <span>Notes</span>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Next.js App Router Patterns</h3>
              <p className="text-sm text-muted-foreground">
                Server components, streaming, and the new way of building React apps
              </p>
              <div className="mt-4 text-xs text-muted-foreground">Budding 🌿 · Updated 5 days ago</div>
            </Link>
          </Card>

          {/* List Card */}
          <Card className="group hover:shadow-lg transition-shadow md:col-span-2">
            <Link href="/projects" className="block p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Code className="h-4 w-4" />
                  <span>Projects</span>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Recent Projects</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>API Documentation Generator</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>Personal Task Manager</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span>Design System Library</span>
                </div>
              </div>
            </Link>
          </Card>
        </div>
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

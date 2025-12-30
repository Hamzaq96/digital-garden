
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Calendar, Tag } from "lucide-react"
import Navigation from "@/app/navigation"

export default function NotePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Navigation />
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Button variant="ghost" asChild className="mb-8 -ml-4">
          <Link href="/notes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Notes
          </Link>
        </Button>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <span>🌱</span>
              <span>Seedling</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Updated 2 days ago</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Learning in Public</h1>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Why sharing half-formed ideas is better than waiting for perfection
          </p>

          <div className="flex items-center gap-2 mt-6">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-2">
              <span className="text-sm px-3 py-1 bg-secondary rounded-full">learning</span>
              <span className="text-sm px-3 py-1 bg-secondary rounded-full">creativity</span>
              <span className="text-sm px-3 py-1 bg-secondary rounded-full">writing</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2>The Garden Metaphor</h2>
          <p>
            Digital gardens are about <strong>tending to ideas over time</strong> rather than publishing perfect,
            polished content. They embrace the concept of learning in public — sharing thoughts as they develop,
            allowing others to see your thinking process.
          </p>

          <p>
            Traditional blogs are like streams of consciousness, moving forward chronologically. Digital gardens are
            more like topographies — ideas planted in one area can grow and connect to ideas in other areas.
          </p>

          <h2>Why Share Half-Formed Ideas?</h2>
          <p>
            There's something liberating about sharing ideas before they're "ready." It removes the pressure of
            perfection and embraces the messy reality of how we actually learn and think.
          </p>

          <ul>
            <li>
              <strong>Feedback loops:</strong> Others can contribute to your thinking early on
            </li>
            <li>
              <strong>Accountability:</strong> Public commitment helps you follow through
            </li>
            <li>
              <strong>Serendipity:</strong> You never know who might find your ideas useful
            </li>
            <li>
              <strong>Documentation:</strong> Your future self will thank you
            </li>
          </ul>

          <blockquote>
            <p>"The best time to plant a tree was 20 years ago. The second best time is now." — Chinese Proverb</p>
          </blockquote>

          <p>
            The same applies to ideas. The best time to share them might have been earlier, but the second best time is
            right now.
          </p>

          <h2>Growth Stages</h2>
          <p>Notes in this garden follow a simple growth metaphor:</p>

          <ul>
            <li>
              <strong>🌱 Seedlings:</strong> Fresh ideas, rough thoughts, things I'm exploring
            </li>
            <li>
              <strong>🌿 Budding:</strong> Ideas that are developing, getting more clarity
            </li>
            <li>
              <strong>🌳 Evergreen:</strong> Well-developed thoughts that stand the test of time
            </li>
          </ul>

          <p>
            This isn't a linear process — evergreen notes can be updated and refined. The goal is continuous
            improvement, not perfection.
          </p>

          <h2>Connected Thoughts</h2>
          <p>
            This note connects to several other ideas in the garden. The beauty of digital gardens is how ideas can link
            together, forming a network of thoughts.
          </p>
        </div>

        {/* Related Notes */}
        <section className="mt-16 pt-8 border-t border-border">
          <h3 className="text-xl font-semibold mb-6">Related Notes</h3>
          <div className="grid gap-4">
            <Card className="group hover:shadow-lg transition-shadow">
              <Link href="/notes/building-in-public" className="block p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span>🌱</span>
                      <span>Seedling</span>
                    </div>
                    <h4 className="font-semibold">Building in Public</h4>
                  </div>
                  <ArrowLeft className="h-5 w-5 text-muted-foreground rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <Link href="/notes/creativity" className="block p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span>🌳</span>
                      <span>Evergreen</span>
                    </div>
                    <h4 className="font-semibold">Creativity and Constraints</h4>
                  </div>
                  <ArrowLeft className="h-5 w-5 text-muted-foreground rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </Card>
          </div>
        </section>
      </article>

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

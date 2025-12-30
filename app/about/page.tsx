
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Navigation from "@/app/navigation"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Navigation />
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Button variant="ghost" asChild className="mb-8 -ml-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Garden
          </Link>
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">About This Garden</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed">
            This is a digital garden — a space where ideas are planted, nurtured, and allowed to grow organically over
            time.
          </p>

          <h2>What is a Digital Garden?</h2>
          <p>Unlike traditional blogs that present polished, chronological posts, a digital garden is:</p>

          <ul>
            <li>
              <strong>Non-linear:</strong> Content is organized by topic and connection, not by date
            </li>
            <li>
              <strong>Evolving:</strong> Notes are continuously updated and refined
            </li>
            <li>
              <strong>Imperfect:</strong> Half-formed ideas are welcome and expected
            </li>
            <li>
              <strong>Interconnected:</strong> Ideas link to each other, forming a network of thought
            </li>
          </ul>

          <h2>Growth Stages</h2>
          <p>Notes in this garden are marked with symbols that indicate their maturity:</p>

          <Card className="p-6 my-6 bg-secondary/50">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">🌱 Seedlings</h3>
                <p className="text-sm text-muted-foreground">
                  Fresh ideas, rough notes, things I'm just starting to explore. These might be incomplete or change
                  significantly.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">🌿 Budding</h3>
                <p className="text-sm text-muted-foreground">
                  Ideas that are developing and taking shape. Still evolving, but with more clarity and structure.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">🌳 Evergreen</h3>
                <p className="text-sm text-muted-foreground">
                  Well-developed thoughts that have stood the test of time. Still open to refinement, but relatively
                  stable.
                </p>
              </div>
            </div>
          </Card>

          <h2>Why Build in Public?</h2>
          <p>I believe in learning and building in public. By sharing my process, I hope to:</p>

          <ul>
            <li>Get feedback and perspectives I wouldn't have considered</li>
            <li>Hold myself accountable to continuous learning</li>
            <li>Connect with others who share similar interests</li>
            <li>Contribute to the collective knowledge of the web</li>
          </ul>

          <blockquote>
            <p>"A garden is never finished. It's a constant process of growth, pruning, and replanting."</p>
          </blockquote>

          <h2>Colophon</h2>
          <p>This digital garden is built with:</p>

          <ul>
            <li>
              <strong>Next.js 16</strong> — React framework with App Router
            </li>
            <li>
              <strong>TypeScript</strong> — Type-safe JavaScript
            </li>
            <li>
              <strong>Tailwind CSS</strong> — Utility-first CSS framework
            </li>
            <li>
              <strong>shadcn/ui</strong> — Beautiful, accessible components
            </li>
          </ul>

          <p>
            The source code is available on{" "}
            <a href="https://github.com" className="text-accent underline">
              GitHub
            </a>
            . Feel free to explore, fork, or suggest improvements.
          </p>

          <h2>Get in Touch</h2>
          <p>
            I'd love to hear from you! Whether you want to discuss an idea, point out an error, or just say hello, you
            can reach me:
          </p>

          <div className="flex gap-3 mt-6">
            <Button asChild>
              <a href="mailto:hazq96@gmail.com">Send me an email</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://x.com/Hamzaq091996">Follow on Twitter</a>
            </Button>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Digital Garden. Built with Next.js & Tailwind CSS.</p>
            <div className="flex items-center gap-6">
              <a
                href="https://x.com/Hamzaq091996"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://github.com/Hamzaq96"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:hazq96@gmail.com"
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

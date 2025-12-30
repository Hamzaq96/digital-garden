# Digital Garden

A personal digital garden where ideas are planted, nurtured, and allowed to grow over time. This is a space for learning in public, exploring thoughts on development, design, and creativity.

## What is a Digital Garden?

Unlike a traditional blog with chronological posts, a digital garden is a collection of evolving notes and ideas. Notes grow through three stages:

- **Seedling** - Fresh ideas, rough thoughts, things being explored
- **Budding** - Ideas that are developing and gaining clarity
- **Evergreen** - Well-developed thoughts that stand the test of time

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Content**: MDX files with gray-matter for frontmatter parsing
- **Package Manager**: Bun

## Project Structure

```
app/                    # Next.js App Router pages
  notes/                # Notes listing and individual note pages
  about/                # About page
components/ui/          # shadcn/ui components
content/notes/          # MDX note files
lib/                    # Utility functions (notes parsing, etc.)
public/                 # Static assets
```

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Run linter
bun lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Adding Notes

Create a new `.mdx` file in `content/notes/` with the following frontmatter:

```mdx
---
title: "Your Note Title"
stage: "seedling"  # seedling | budding | evergreen
updatedAt: "2024-03-15"
---

Your content here...
```

The note will automatically appear on the `/notes` page, sorted by last updated date.

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Garden", href: "/" },
  { label: "Notes", href: "/notes" },
  // { label: "Projects", href: "/projects" },
  // { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/Hamzaq96" },
  { label: "Twitter", href: "https://x.com/Hamzaq091996" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/50">
      <nav className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-1 bg-secondary/60 rounded-full px-1.5 py-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
                pathname === item.href
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Publications } from "@/components/publications"
import { Navigation } from "@/components/navigation"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* The navigation is now part of your layout */}
      <Navigation />
      
      <main>
        <Hero />
        <Experience />
        <Publications />
      </main>
      
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground font-mono">
          <p>&copy; 2025 Nishad Wajge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
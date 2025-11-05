import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Publications } from "@/components/publications";
import { Navigation } from "@/components/navigation";
import VantaBackgroundClient from "@/components/VantaBackgroundClient";

export default function Page() {
  return (
    <div
      id="scroll-container"
      className="h-[100dvh] overflow-y-scroll"
    >
      <div className="fixed inset-0 z-0">
        <VantaBackgroundClient />
      </div>

      <div className="sticky top-0 z-20">
        <Navigation />
      </div>

      <main className="relative z-10 [transform:translateZ(0)]">
        
        <section
          id="hero"
          className="h-[100dvh] bg-background-dark/80 flex items-center justify-center"
        >
          <Hero />
        </section>

        <section
          id="experience"
          className="min-h-[100dvh] bg-background-dark/80 flex items-center justify-center"
        >
          <Experience />
        </section>

        <section
          id="publications"
          className="h-[100dvh] bg-background-dark/80 flex items-center justify-center"
        >
          <Publications />
        </section>

        {/* CHANGE: Removed "border-t" from this footer
        */}
        <footer
          id="footer"
          className="min-h-screen py-8 bg-background-dark/80 flex items-center justify-center"
        >
          <div className="container mx-auto px-4 text-center font-mono text-muted-foreground">
            <p>&copy; 2025 Nishad Wajge. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
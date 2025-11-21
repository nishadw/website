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

      {/* UPDATES HERE:
         1. Added 'flex flex-col' to enable spacing control.
         2. Added 'gap-y-24' (approx 6rem/96px). Increase this number (e.g., gap-y-32, gap-y-48) for even more space.
         3. Added 'py-10' to give a little breathing room at the very top and bottom of the list.
      */}
      <main className="relative z-10 [transform:translateZ(0)] flex flex-col gap-y-24">
        
        <section
          id="hero"
          // Changed to min-h-[100dvh] to ensure it's at LEAST full height, but can grow if needed
          className="min-h-[100dvh] bg-background-dark/80 flex items-center justify-center"
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
          // Changed to min-h-[100dvh]
          className="min-h-[100dvh] bg-background-dark/80 flex items-center justify-center"
        >
          <Publications />
        </section>

        <footer
          id="footer"
          // Reduced min-h-screen to min-h-[50vh] usually a footer doesn't need to be a full page, 
          // but if you want it full page, keep it as min-h-screen.
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
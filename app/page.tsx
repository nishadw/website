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

      <main className="relative z-10 [transform:translateZ(0)] flex flex-col">
        
        {/* Added mb-24 to create spacing between sections manually */}
        <section
          id="hero"
          className="min-h-[100dvh] mb-24 bg-background-dark/80 flex items-center justify-center"
        >
          <Hero />
        </section>

        <section
          id="experience"
          className="min-h-[100dvh] bg-background-dark/80 flex items-center justify-center"
        >
          <Experience />
        </section>

        {/* UPDATED:
            1. Removed 'min-h-[100dvh]' -> changed to 'py-20'.
               This ensures the section is only as tall as the content.
            2. No bottom margin, so the footer sits immediately after.
        */}
        <section
          id="publications"
          className="py-20 bg-background-dark/80 flex items-center justify-center"
        >
          <Publications />
        </section>

        <footer
          id="footer"
          className="w-full pb-8 bg-background-dark/80"
        >
          <div className="container mx-auto px-4">
            {/* UPDATED LINE: 
               Changed to 'bg-zinc-700' (dark grey) so it is visible.
            */}
            <div className="h-[1px] w-full bg-zinc-700 mb-8" />
            
            {/* Footer Text */}
            <div className="text-center font-mono text-muted-foreground text-sm">
              <p>&copy; 2025 Nishad Wajge. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
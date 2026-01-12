"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

// Components
import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Publications } from "@/components/publications"
import { Navigation } from "@/components/navigation"
import VantaBackgroundClient from "@/components/VantaBackgroundClient"

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Safety Timeout: Force load after 4 seconds if Vanta is slow/fails
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded) setIsLoaded(true)
    }, 4000)
    return () => clearTimeout(timeout)
  }, [isLoaded])

  return (
    <>
      {/* 1. LOADING OVERLAY 
        - Covers the whole screen (z-50)
        - Fades out when isLoaded is true
      */}
      <div 
        className={`
          fixed inset-0 z-50 flex items-center justify-center bg-neutral-950
          transition-opacity duration-1000 ease-in-out pointer-events-none
          ${isLoaded ? "opacity-0" : "opacity-100"}
        `}
      >
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="h-10 w-10 text-white animate-spin" />
           <p className="text-neutral-400 font-mono text-sm tracking-widest animate-pulse">
             LOADING SYSTEM...
           </p>
        </div>
      </div>

      {/* 2. MAIN SCROLL CONTAINER 
        - We keep your existing layout structure.
      */}
      <div
        id="scroll-container"
        className="h-[100dvh] overflow-y-scroll"
      >
        {/* Vanta Background - Fixed position */}
        <div className="fixed inset-0 z-0">
          <VantaBackgroundClient onLoaded={() => setIsLoaded(true)} />
        </div>

        {/* CONTENT WRAPPER 
           - Wraps Navigation + Main Sections
           - Adds a subtle slide-up and fade-in animation when loaded
        */}
        <div 
          className={`
            relative z-10 transition-all duration-1000 delay-300
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <div className="sticky top-0 z-20">
            <Navigation />
          </div>

          <main className="relative z-10 [transform:translateZ(0)] flex flex-col">
            
            {/* Hero Section */}
            <section
              id="hero"
              className="min-h-[100dvh] mb-24 bg-background-dark/80 flex items-center justify-center"
            >
              <Hero />
            </section>

            {/* Experience Section */}
            <section
              id="experience"
              className="min-h-[100dvh] bg-background-dark/80 flex items-center justify-center"
            >
              <Experience />
            </section>

            {/* Publications Section */}
            <section
              id="publications"
              className="py-20 bg-background-dark/80 flex items-center justify-center"
            >
              <Publications />
            </section>

            {/* Footer */}
            <footer
              id="footer"
              className="w-full pb-8 bg-background-dark/80"
            >
              <div className="container mx-auto px-4">
                <div className="h-[1px] w-full bg-zinc-700 mb-8" />
                <div className="text-center font-mono text-muted-foreground text-sm">
                  <p>&copy; 2025 Nishad Wajge. All rights reserved.</p>
                </div>
              </div>
            </footer>

          </main>
        </div>
      </div>
    </>
  );
}
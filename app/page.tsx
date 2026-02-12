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
      {/* 1. LOADING OVERLAY */}
      <div 
        className={`
          fixed inset-0 z-[60] flex items-center justify-center bg-neutral-950
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

      {/* 2. NAVIGATION 
          MOVED OUTSIDE: It must be outside the transformed/animated div below 
          to stay truly "fixed" to the top of the viewport.
      */}
      <div className={`transition-opacity duration-1000 delay-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <Navigation />
      </div>

      {/* 3. BACKGROUND (Fixed) */}
      <div className="fixed inset-0 z-0">
        <VantaBackgroundClient onLoaded={() => setIsLoaded(true)} />
      </div>

      {/* 4. MAIN CONTENT 
          - Changed h-[100dvh] to min-h-screen so the WINDOW scrolls naturally.
          - This fixes the Navigation shrink effect.
      */}
      <div className="relative min-h-screen z-10">
        
        {/* CONTENT WRAPPER 
           - Adds the slide-up animation. 
           - Navigation is NO LONGER inside here.
        */}
        <div 
          className={`
            transition-all duration-1000 delay-300
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <main className="flex flex-col">
            
            {/* Hero Section */}
            <section
              id="hero"
              className="min-h-screen mb-24 flex items-center justify-center" // Removed bg-background-dark/80 to let Vanta show
            >
              <Hero />
            </section>

            {/* Experience Section */}
            <section
              id="experience"
              className="min-h-screen flex items-center justify-center"
            >
              <Experience />
            </section>

            {/* Publications Section */}
            <section
              id="publications"
              className="py-20 flex items-center justify-center"
            >
              <Publications />
            </section>

            {/* Footer */}
            <footer
              id="footer"
              className="w-full pb-8"
            >
              <div className="container mx-auto px-4">
                <div className="h-[1px] w-full bg-zinc-700/50 mb-8" />
                <div className="text-center font-mono text-muted-foreground text-sm">
                  <p>&copy; 2025 Nishad Wajge. All rights reserved. | [first] dot [last] at gmail dot com</p>
                </div>
              </div>
            </footer>

          </main>
        </div>
      </div>
    </>
  );
}
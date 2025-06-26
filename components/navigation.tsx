"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle" // Make sure this import path is correct

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // A small threshold (10px) makes the transition feel immediate
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className={`w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "fixed top-0 bg-background/80 backdrop-blur-md shadow-md" // Scrolled state
          : "absolute top-0 bg-transparent" // Initial state
      }`}
    >
      <div className="container mx-auto px-4 relative flex items-center h-24"> {/* Adjusted height */}
        {/* Centered Navigation Links */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex space-x-8">
          <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">
            About
          </button>
          <button onClick={() => scrollToSection("experience")} className="hover:text-primary transition-colors">
            Experience
          </button>
          <button onClick={() => scrollToSection("education")} className="hover:text-primary transition-colors">
            Education
          </button>
          <button onClick={() => scrollToSection("publications")} className="hover:text-primary transition-colors">
            Publications
          </button>
        </div>

        {/* Theme Toggle on the Right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
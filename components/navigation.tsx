"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-bold text-xl">Portfolio</div>
        <div className="hidden md:flex space-x-8">
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
        <ThemeToggle />
      </div>
    </nav>
  )
}

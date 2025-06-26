"use client"

import { useState, useEffect } from "react"
import { Link } from "react-scroll" // 1. Import Link from react-scroll
import { ThemeToggle } from "./theme-toggle"

// 2. Create an array for your links to make the code cleaner
const navLinks = [
  { to: "about", label: "About" },
  { to: "experience", label: "Experience" },
  { to: "education", label: "Education" },
  { to: "publications", label: "Research" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 3. The old scrollToSection function is no longer needed.
  // The Link component handles this automatically.

  return (
    <nav
      className={`w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "fixed top-0 bg-background/80 backdrop-blur-md shadow-md"
          : "absolute top-0 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 relative flex items-center h-24">
        {/* 4. Replace the buttons with the Link component */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex space-x-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              smooth={true}
              duration={1000} // This makes the scroll "slower" (800ms). Adjust as you like.
              offset={-96}  // Your header height (h-24 = 6rem = 96px)
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
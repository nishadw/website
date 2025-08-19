"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Link } from "react-scroll"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { id: "hero", label: "HOME" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "publications", label: "RESEARCH" },
]

export function Navigation() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // This useEffect ensures the component has mounted on the client
  // before rendering the theme switcher to avoid hydration mismatch.
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // We render a placeholder or nothing until mounted.
  const renderThemeChanger = () => {
    if (!mounted) return null

    return (
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="fixed bottom-8 right-8 h-12 w-12 rounded-full elegant-shadow-lg hover:scale-110 transition-all duration-300 z-50"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
      </Button>
    )
  }

  return (
    <>
      {/* Your existing side navigation */}
      <nav className="fixed top-1/2 -translate-y-1/2 left-8 z-50 hidden md:block">
        <ul className="space-y-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                spy={true}
                smooth={true}
                duration={800}
                offset={-96} // Adjust offset as needed for your header height
                className="group flex items-center gap-x-3 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-300"
                activeClass="text-primary font-bold"
              >
                <span className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-bold text-base">
                  →
                </span>
                <span className="font-heading tracking-widest text-medium">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* The new theme toggle button */}
      {renderThemeChanger()}
    </>
  )
}
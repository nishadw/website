"use client"

import { useState, useEffect } from "react"
import { Link } from "react-scroll"
import { motion } from "framer-motion"

const navItems = [
  { id: "hero", label: "HOME" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "publications", label: "RESEARCH" },
]

export function Navigation() {
  const [isAtTop, setIsAtTop] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")

  // 1. Handle Top Bar Minimizing
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 2. Handle Active Section Detection (The Fix)
  useEffect(() => {
    const observerOptions = {
      root: null,
      // This "margin" controls when the section is considered active.
      // "-20% 0px -50% 0px" means:
      // Trigger when the top of the section enters the top 20% of the screen
      // OR when it takes up more than 50% of the viewport.
      rootMargin: "-20% 0px -50% 0px", 
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.nav
        initial={false}
        animate={{
          width: isAtTop ? "auto" : "fit-content",
          padding: isAtTop ? "0px" : "8px 24px",
          background: isAtTop ? "rgba(0,0,0,0)" : "rgba(20, 20, 20, 0.6)",
          backdropFilter: isAtTop ? "blur(0px)" : "blur(12px)",
          borderRadius: "9999px",
          border: isAtTop ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="pointer-events-auto shadow-sm"
      >
        <ul className="flex items-center gap-x-2 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            
            // Keep your scroll offsets here (visual scrolling only)
            const scrollOffset = item.id === "hero" ? -100 : -30

            return (
              <li key={item.id} className="relative z-10">
                <Link
                  to={item.id}
                  spy={false} // Turn OFF built-in spy (we are using our own observer)
                  smooth={true}
                  duration={800}
                  offset={scrollOffset}
                  // We can still manually set active on click for instant feedback
                  onClick={() => setActiveSection(item.id)}
                  className={`
                    relative px-4 py-2 cursor-pointer text-lg font-heading font-medium tracking-wide transition-colors duration-300
                    ${isActive ? "text-white" : "text-gray-400 hover:text-gray-200"}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </motion.nav>
    </div>
  )
}
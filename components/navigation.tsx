"use client"

import { useState, useEffect } from "react"
import { Link } from "react-scroll"

const navItems = [
  { id: "hero", label: "HOME" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "publications", label: "RESEARCH" },
]

export function Navigation() {
  const [isAtTop, setIsAtTop] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation is visible if we are at the top OR hovering
  const isVisible = isAtTop || isHovered

  return (
    <nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed top-0 left-0 right-0 z-50 
        flex justify-center
        transition-all duration-500 ease-in-out
        ${
          isVisible
            ? "py-6 opacity-100 translate-y-0"
            : "py-2 opacity-0 -translate-y-5 pointer-events-none"
        }
      `}
    >
      <ul
        // We add pointer-events-auto here so that even when the nav is hidden (and parent is pointer-events-none),
        // moving the mouse to the top center will still trigger the hover event.
        className={`
          flex items-center gap-x-12
          ${!isVisible ? "pointer-events-auto" : ""}
        `}
      >
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.id}
              spy={true}
              smooth={true}
              duration={800}
              offset={-50}
              containerId="scroll-container"
              className="
                cursor-pointer font-heading tracking-widest text-large
                text-gray-400
                hover:text-white
                transition-colors duration-300
              "
              activeClass="!text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
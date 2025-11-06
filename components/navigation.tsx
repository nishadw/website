"use client"

import { Link } from "react-scroll"
import { ArrowRight } from "lucide-react"


const navItems = [
  { id: "hero", label: "HOME" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "publications", label: "RESEARCH" },
]

export function Navigation() {
  return (
    <nav className="fixed top-1/2 -translate-y-1/2 left-8 z-50 hidden md:block">
      <ul className="space-y-8">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.id}
              spy={true}
              smooth={true}
              duration={800}
              offset={-50}
              // This is the fix, just like the "Explore More" button
              containerId="scroll-container" 
              className="group flex items-center gap-x-4 cursor-pointer text-muted-foreground hover:text-white transition-colors duration-300"
              activeClass="text-white font-bold"
            >
              {/* Arrow that appears on hover */}
              <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-large font-bold">
                <ArrowRight className="w-5 h-5" />
              </span>

              {/* Label text */}
              <span className="font-heading tracking-widest text-large font-semibold">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
"use client"

import { Link } from "react-scroll"

const navItems = [
  { id: "hero", label: "HOME" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "publications", label: "RESEARCH" },
]

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6">
      <div className="bg-neutral-950/80 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 shadow-lg">
        <ul className="flex items-center gap-x-12">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                spy={true}
                smooth={true}
                duration={800}
                offset={-50}
                containerId="scroll-container"
                
                // STYLING LOGIC:
                // 1. Default: text-gray-400 (Grey)
                // 2. Hover: hover:text-white (White)
                // 3. Transition: Smoothly fades colors
                className="
                  cursor-pointer font-bold tracking-widest text-sm
                  text-gray-400
                  hover:text-white
                  transition-colors duration-300
                "
                
                // ACTIVE STATE:
                // Forces the text to be white when looking at that section
                activeClass="!text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
"use client"

import { Link } from "react-scroll"

const navItems = [
  { id: "hero", label: "HOME" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "publications", label: "RESEARCH" },
]

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-8">
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
              
              // ANIMATION LOGIC:
              // 1. Gradient: White (End) -> Blue (Middle) -> Grey (Start)
              // 2. Size: 300% width so only one color shows at a time.
              // 3. Position: Start at 'right' (Grey). Hover to 'left' (White).
              // 4. Transition: As it slides from Right to Left, it passes through Blue.
              className="
                cursor-pointer font-bold tracking-widest text-sm
                
                bg-gradient-to-r from-white via-blue-500 to-zinc-500
                bg-[length:300%_100%] 
                bg-right 
                
                bg-clip-text text-transparent
                
                hover:bg-left
                transition-all duration-500 ease-in-out
              "
              
              // ACTIVE STATE:
              // Keep it solid white when the user is actually on that section
              activeClass="!text-white !bg-none"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
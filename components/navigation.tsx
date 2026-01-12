"use client"

import { Link } from "react-scroll"

const navItems = [
  { id: "hero", label: "HOME" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "publications", label: "RESEARCH" },
]

export function Navigation() {
  return (
    <nav className="
      fixed top-0 left-0 right-0 z-50 
      flex justify-center py-6
      
      {/* MATCHING HERO CARD STYLING: */}
      {/* 1. Blur and Opacity matching 'bg-card/75' */}
      backdrop-blur-md bg-card/75
      
      {/* 2. Border matching 'border-border/50' */}
      border-b border-border/50
    ">
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
              className="
                cursor-pointer font-bold tracking-widest text-sm
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
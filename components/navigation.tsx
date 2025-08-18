"use client"

import { Link } from "react-scroll";

const navItems = [
  { id: "hero", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "publications", label: "RESEARCH" },
];

export function Navigation() {
  return (
    <nav className="fixed top-1/2 -translate-y-1/2 left-8 z-50 hidden md:block">
      <ul className="space-y-6">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.id}
              spy={true}
              smooth={true}
              duration={800}
              offset={-50}
              // --- CHANGE IS HERE ---
              className="group flex items-center gap-x-3 cursor-pointer text-white hover:text-primary transition-colors duration-300"
              activeClass="text-primary font-bold"
            >
              {/* The arrow that appears on hover */}
              <span className="
                opacity-0 
                -translate-x-3
                group-hover:opacity-100 
                group-hover:translate-x-0
                transition-all 
                duration-300
                font-bold
                text-base
              ">
                →
              </span>

              {/* The navigation text */}
              <span className="font-heading tracking-widest text-medium">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
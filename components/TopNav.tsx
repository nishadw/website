"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 border-b border-white/[0.06] bg-[#0a0a0a]/95 backdrop-blur-sm flex items-center justify-between px-8">
      <Link
        href="/"
        className="text-[13px] font-semibold text-[#e0e0e0] tracking-tight hover:text-white transition-colors"
      >
        Nishad Wajge
      </Link>
      <div className="flex items-center gap-7 text-[12px] font-mono text-[#444] tracking-wide">
        <Link
          href="/experience"
          className={`hover:text-[#f0f0f0] transition-colors ${pathname === "/experience" ? "text-[#f0f0f0]" : ""}`}
        >
          Experience
        </Link>
        <a
          href="https://linkedin.com/in/nishadwajge"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#f0f0f0] transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/nishadw"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#f0f0f0] transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://scholar.google.com/citations?user=8h70LbUAAAAJ&hl=en"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#f0f0f0] transition-colors"
        >
          Google Scholar
        </a>
      </div>
    </nav>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 border-b border-white/[0.06] bg-[#0a0a0a] flex items-center justify-between px-8">
      <Link
        href="/"
        className="text-[13px] font-semibold text-[#e8e8e8] hover:text-white transition-colors"
      >
        Nishad Wajge
      </Link>
      <div className="flex items-center gap-6 text-[13px] text-[#6e6e6e]">
        <Link
          href="/experience"
          className={`hover:text-[#e8e8e8] transition-colors ${pathname === "/experience" ? "text-[#e8e8e8]" : ""}`}
        >
          Experience
        </Link>
        <Link
          href="/now"
          className={`hover:text-[#e8e8e8] transition-colors ${pathname === "/now" ? "text-[#e8e8e8]" : ""}`}
        >
          Other
        </Link>
        <a
          href="https://linkedin.com/in/nishadwajge"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#e8e8e8] transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/nishadw"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#e8e8e8] transition-colors"
        >
          GitHub
        </a>
      </div>
    </nav>
  )
}

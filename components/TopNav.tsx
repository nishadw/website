"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 border-b border-hair bg-page flex items-center px-8">
      <Link
        href="/"
        className="text-[17px] font-semibold text-ink transition-colors"
      >
        Nishad Wajge
      </Link>
      {/* Absolutely centered on the bar, so the name's width never shifts it. */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6 text-[17px] text-meta">
        <Link
          href="/experience"
          className={`hover:text-ink transition-colors ${pathname === "/experience" ? "text-ink" : ""}`}
        >
          Experience
        </Link>
        <Link
          href="/now"
          className={`hover:text-ink transition-colors ${pathname === "/now" ? "text-ink" : ""}`}
        >
          Off Hours
        </Link>
        <a
          href="https://linkedin.com/in/nishadwajge"
          target="_blank"
          rel="noreferrer"
          className="hover:text-ink transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/nishadw"
          target="_blank"
          rel="noreferrer"
          className="hover:text-ink transition-colors"
        >
          GitHub
        </a>
      </div>
    </nav>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { navTabs, externalLinks } from "@/lib/links"

// A three-zone masthead: the name at the left, the page tabs centred, the
// off-site links held to the right. The tabs and the links are deliberately
// kept apart, so a tab is never mistaken for something that leaves the site.
// The outer columns are equal-width, which is what keeps the tabs on the
// centre line whatever the name's width happens to be.
export default function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 border-b border-hair bg-page">
      <div className="h-full grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="justify-self-start text-[16px] sm:text-[18px] text-ink hover:underline whitespace-nowrap"
        >
          Nishad Wajge
        </Link>

        <div className="justify-self-center flex items-center gap-5 sm:gap-7 text-[15px] sm:text-[17px] text-meta">
          {navTabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`whitespace-nowrap hover:underline ${pathname === t.href ? "text-ink underline" : ""}`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {/* Off-site. Dropped on narrow screens, where the footer carries them. */}
        <div className="justify-self-end hidden md:flex items-center gap-5 text-[17px] text-meta">
          {externalLinks.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="hover:underline">
              {l.label}
            </a>
          ))}
        </div>
        <span className="md:hidden" />
      </div>
    </nav>
  )
}

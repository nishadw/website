"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

// Fixed to the viewport, so it rides along on every scroll position.
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // The server has no idea which theme is stored; render the shell only
  // after mount so the icon never contradicts the page.
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"
  // Before mount the theme is unknown, so say nothing rather than say it wrong.
  const label = !mounted ? "Toggle theme" : isDark ? "Switch to light mode" : "Switch to dark mode"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full border border-hair bg-page text-meta
                 flex items-center justify-center shadow-lg shadow-black/20
                 hover:text-ink hover:border-meta/40 transition-colors
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-meta/50"
    >
      {mounted && (isDark ? <SunIcon /> : <MoonIcon />)}
    </button>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

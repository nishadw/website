"use client"

import { useEffect } from "react"

export default function MouseTracker() {
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      document.documentElement.style.setProperty("--mx", String(x))
      document.documentElement.style.setProperty("--my", String(y))
    }

    window.addEventListener("mousemove", handleMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  return null
}

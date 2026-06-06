"use client"

import { useEffect, useRef } from "react"

export default function MouseTracker() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      document.documentElement.style.setProperty("--mx", String(x))
      document.documentElement.style.setProperty("--my", String(y))
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest("a, button, [role='button'], input, select, textarea")) {
        el.textContent = "↗"
        el.style.width = "auto"
        el.style.height = "auto"
        el.style.borderRadius = "0"
        el.style.background = "transparent"
        el.style.fontSize = "20px"
        el.style.opacity = "0.8"
      } else {
        el.textContent = ""
        el.style.width = "8px"
        el.style.height = "8px"
        el.style.borderRadius = "50%"
        el.style.background = "#e0e0e0"
        el.style.fontSize = "0"
        el.style.opacity = "0.75"
      }
    }

    const handleLeave = () => { el.style.opacity = "0" }
    const handleEnter = () => { el.style.opacity = "0.75" }

    window.addEventListener("mousemove", handleMove, { passive: true })
    document.addEventListener("mouseover", handleOver)
    document.addEventListener("mouseleave", handleLeave)
    document.addEventListener("mouseenter", handleEnter)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      document.removeEventListener("mouseover", handleOver)
      document.removeEventListener("mouseleave", handleLeave)
      document.removeEventListener("mouseenter", handleEnter)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "#e0e0e0",
        color: "#e0e0e0",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "0",
        lineHeight: 1,
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
        transform: "translate(-200px, -200px) translate(-50%, -50%)",
        transition: "opacity 0.12s ease",
      }}
    />
  )
}

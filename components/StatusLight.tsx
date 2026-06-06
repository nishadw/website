"use client"
import { useState } from "react"
import Link from "next/link"

export default function StatusLight() {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href="/now"
      title="see what I'm up to"
      className="inline-flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`inline-block rounded-full h-[11px] w-[11px] shrink-0 transition-all duration-500 ${
          hovered
            ? "bg-green-400 shadow-[0_0_7px_3px_rgba(74,222,128,0.4)]"
            : "bg-red-600 animate-breathe"
        }`}
      />
    </Link>
  )
}

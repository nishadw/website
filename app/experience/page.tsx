"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const experienceDetails = [
  {
    id: "amazon",
    company: "Amazon",
    logo: "/amzn.jpg", 
    role: "Software Development Engineer Intern",
    period: "Summer 2026",
    points: [
      "Division: Amazon Smart Vehicles",
    ]
  },
  {
    id: "mercor",
    company: "Mercor",
    logo: "/mercor.png", 
    role: "Software Engineer",
    period: "Nov 2025 — Present",
    points: [
      "Division: SWE & Terminal Efficiency",
      "Developing data to support the training of Large Language Models via reinforcement learning from human feedback."
    ]
  },
  {
    id: "gdit",
    company: "General Dynamics Information Technology",
    logo: "/gdit.jpg",
    role: "Software Engineer Intern",
    period: "Jun 2025 — Aug 2025",
    points: [
      "Division: Praxis Engineering",
      "Deployed computer vision system within multimodal ML toolkit to enhance situational awareness.",
    ]
  },
  {
    id: "irs",
    company: "Internal Revenue Service",
    logo: "/irs.png",
    role: "Software Engineer Intern",
    period: "Jan 2024 — Dec 2024",
    points: [
      "Division: Return Review Program",
      "Modernized legacy fraud detection architecture to strengthen system reliability and security.",
    ]
  }
]

export default function ExperiencePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      {/* === DEEP CHARCOAL SLATE BACKGROUND === */}
      <div className={`fixed inset-0 z-[-1] bg-[#121212] transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}></div>

      <div className="h-full overflow-y-auto relative z-10 text-left font-mono">
        <div className="w-full px-4 md:px-8 pt-20 pb-32">
          
          <div className="mb-12 border-b border-white/10 pb-10">
            <h1 className="heading-text sm:text-[32px] font-mono leading-tight text-[#f4f4f5] tracking-tight">
              Experience
            </h1>
          </div>

          <div className="flex flex-col">
            {experienceDetails.map((exp, idx) => (
              <section 
                key={idx} 
                id={exp.id} 
                className="grid grid-cols-1 md:grid-cols-[350px_1fr] md:gap-24 py-12 border-b border-white/5 last:border-0 scroll-mt-24"
              >
                {/* LEFT: Logo height-aligned */}
                <div className="flex flex-col justify-start">
                  <div className="relative w-8 h-8 md:w-32 md:h-32 lg:w-64 lg:h-64 overflow-hidden rounded-2xl">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} Logo`}
                      fill
                      className="object-contain rounded-2xl"
                    />
                  </div>
                </div>

                {/* RIGHT: Text Content extending out */}
                <div className="flex flex-col w-full font-mono overflow-hidden">
                  <div className="flex flex-col mb-6">
                    {/* Header: Date and Company on top - Scaled down and forced to one line */}
                    <h2 className="text-xl md:text-3xl lg:text-[32px] font-bold tracking-tighter text-[#f4f4f5] mb-3 whitespace-nowrap">
                      {exp.company}
                    </h2>

                    {/* METADATA: Uniform font-mono */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[#f4f4f5] text-[12px] sm:text-[14px]">
                      <div className="flex items-center gap-2">
                        <span>{exp.role}</span>
                      </div>
                      <span className="hidden sm:inline text-[#3f3f46]">•</span>
                      <div className="flex text-[12px] items-center gap-2">
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Descriptions with font-mono and reduced text size */}
                  <ul className="space-y-2 w-full pr-4">
                    {exp.points.map((point, pIdx) => (
                      <li 
                        key={pIdx} 
                        className="flex gap-4 text-[14px] leading-relaxed text-[#d4d4d8] font-mono"
                      >
                        <span className="text-[#71717a] mt-1.5 shrink-0 text-[10px]">●</span>
                        <span className="flex-1">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
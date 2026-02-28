"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import VantaBackgroundClient from "@/components/VantaBackgroundClient"


// Updated experience array with month and year dates
const experiences = [
  { company: "Amazon Smart Vehicles", position: "Software Development Engineer Intern", period: "Summer 2026", logo: "/amzn.jpg" },
  { company: "Mercor", position: "Software Engineer", period: "Nov 2025 — Present", logo: "/mercor.png" },
  { company: "General Dynamics Information Technology", position: "Software Engineer Intern", period: "Jun 2025 — Aug 2025", logo: "/gdit.jpg" },
  { company: "Internal Revenue Service", position: "Software Engineer Intern", period: "Jan 2024 — Dec 2024", logo: "/irs.png" }, 
]

const contracts = [
  { company: "Amazon Leo", position: "Technical Advisor, Machine Learning", period: "Feb 2026 - Present", logo: "/leo.jpg" },
  { company: "General Dynamics Information Technology", position: "Engineering Project Lead", period: "Jan 2025 — May 2025", logo: "/gdit.jpg" },
  { company: "Booz Allen Hamilton", position: "Engineering Project Manager", period: "Sep 2024 — Dec 2024", logo: "/bah.jpg" }, 
]

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Safety Timeout: Force load after 4 seconds if Vanta is slow/fails
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded) setIsLoaded(true)
    }, 4000)
    return () => clearTimeout(timeout)
  }, [isLoaded])

  return (
    <>
      {/* === VANTA BACKGROUND (MUTED) === */}
      <div className={`fixed inset-0 z-[-1] transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <VantaBackgroundClient onLoaded={() => setIsLoaded(true)} />
        {/* Deep background contrast for high legibility */}
        <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-[2px]"></div>
      </div>

      {/* Main scrolling wrapper - strictly font-mono and left-aligned */}
      <div className="h-full overflow-y-auto relative z-10 text-left font-mono">

        {/* Main Content Constraints 
          - Max-width removed and w-full added to let content stretch edge-to-edge
          - px-6 md:px-8 provides minimal sidebar spacing
        */}
        <div className="w-full px-6 md:px-8 pt-20 pb-32">
          
          {/* ================= HERO & BIO ================= */}
          <div className="mb-12">
            {/* Avatar */}
            <div className="mb-8 h-36 w-36 overflow-hidden rounded-full ring-1 ring-white/10">
              <Image src="/pfp.JPG" alt="Nishad Wajge" width={32} height={32} className="h-full w-full object-cover" />
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-[28px] sm:text-[32px] font-bold leading-tight text-[#f4f4f5] tracking-tight">
              Engineer · Researcher · Advisor
            </h1>

            {/* Bio Paragraphs */}
            <div className={`space-y-4 font-mono text-[15px] max-w-4xl text-[#d4d4d8]`}>
              <p>
                B.S. in Computer Science (Machine Learning) at the University of Maryland. 
              </p>
              <p>
                I'm currently engineering at Mercor and advising machine learning at Amazon Leo. 
              </p>

              <p>
                My background bridges production engineering with academic research, having published (NeurIPS, INFORMS, MIT SSAC Shortlist) 
                in the fields of game theory, benchmarking, and deep learning. 
              </p>

              <p>
                I'm always looking to make a meaningful impact, so feel free to reach out via Linkedin or Email!
              </p>
            </div>

            {/* Previous Roles list
            <p className="mt-4 text-[14px] text-[#a1a1aa]">
              Prev. <span className="font-medium text-[#f4f4f5]">General Dynamics, Booz Allen Hamilton</span>
            </p> */}
          </div>

          {/* ================= FOCUS AREAS ================= */}
          <div className="mb-16">
            <h2 className="mb-3 text-[13px] text-[#71717a] uppercase tracking-wider">Areas of Interest</h2>
            <p className="text-[14.5px] text-[#d4d4d8] leading-relaxed">
              Game Theory <span className="text-[#71717a] mx-2">·</span> 
              Artificial Intelligence <span className="text-[#71717a] mx-2">·</span> 
              Quantitative Finance <span className="text-[#71717a] mx-2">·</span> 
              Software Engineering
            </p>
          </div>

          {/* ================= TEAM / EXPERIENCE LIST ================= */}
          <div className="mb-16 w-full">
            <h2 className="mb-4 text-[13px] font-medium text-[#71717a] uppercase tracking-wider">Experience</h2>
            <div className="flex flex-col border-t border-white/5 w-full">
              {experiences.map((exp, idx) => (
                <a 
                  key={idx}
                  href={`#${exp.company.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group flex items-center justify-between border-b border-white/5 py-4 transition-colors hover:bg-white/[0.05] px-2 rounded-lg"
                >
                  {/* Left Side: Logo, Company, and Role stretched horizontally */}
                  <div className="flex items-center gap-6 overflow-hidden">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md">
                      <Image src={exp.logo} alt={exp.company} width={32} height={32} className="h-full w-full object-contain rounded-xl" />
                    </div>
                    <div className="flex items-center gap-3 text-[16px] whitespace-nowrap">
                      <span className="font-bold text-[#f4f4f5] tracking-tighter">{exp.company}</span>
                      <span className="text-[#3f3f46]">/</span>
                      <span className="text-[#a1a1aa]">{exp.position}</span>
                    </div>
                  </div>
                  
                  {/* Right Side: Date remains anchored to the far right */}
                  <span className="text-[14px] text-[#71717a] whitespace-nowrap ml-8">{exp.period}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ================= CONTRACT LIST ================= */}
          <div className="mb-24 w-full">
            <h2 className="mb-4 text-[13px] font-medium text-[#71717a] uppercase tracking-wider">Consulting Projects (through App Dev Club)</h2>
            <div className="flex flex-col border-t border-white/5 w-full">
              {contracts.map((exp, idx) => (
                <a 
                  key={idx}
                  href={`#${exp.company.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group flex items-center justify-between border-b border-white/5 py-4 transition-colors hover:bg-white/[0.05] px-2 rounded-lg"
                >
                  {/* Left Side: Logo, Company, and Role stretched horizontally */}
                  <div className="flex items-center gap-6 overflow-hidden">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md">
                      <Image src={exp.logo} alt={exp.company} width={32} height={32} className="h-full w-full object-contain rounded-xl" />
                    </div>
                    <div className="flex items-center gap-3 text-[16px] whitespace-nowrap">
                      <span className="font-bold text-[#f4f4f5] tracking-tighter">{exp.company}</span>
                      <span className="text-[#3f3f46]">/</span>
                      <span className="text-[#a1a1aa]">{exp.position}</span>
                    </div>
                  </div>
                  
                  {/* Right Side: Date remains anchored to the far right */}
                  <span className="text-[14px] text-[#71717a] whitespace-nowrap ml-8">{exp.period}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
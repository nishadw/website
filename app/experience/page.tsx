"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const allExperience = [
  {
    id: "amazon",
    company: "Amazon (Smart Vehicles)",
    logo: "/amzn.jpg",
    role: "Software Development Engineer Intern",
    period: "Summer 2026",
    points: [
      "Developing multimodal foundation models designed for low-latency, on-device deployment across automotive platforms",
      "Creating embedded machine learning inference pipelines to optimize in-vehicle user experiences while operating within automotive hardware constraints",
    ]
  },
  {
    id: "amazon-leo",
    company: "Amazon (Leo)",
    logo: "/amzn.jpg",
    role: "Technical Advisor, Machine Learning Engineering",
    period: "Feb 2026 — Present",
    points: [
      "Developing predictive models to forecast space policy shifts by analyzing sector lag and cross-correlation trends",
      "Architected an automated global policy data pipeline utilizing semantic filtering and language models to significantly streamline research workflows",
    ]
  },
  {
    id: "mercor",
    company: "Mercor",
    logo: "/mercor.png",
    role: "Software Engineer",
    period: "Nov 2025 — Present",
    points: [
      "Architected preference datasets used to train multimodal large language models via reinforcement learning from human feedback",
      "Evaluated and baselined human engineering workflows across diverse programming environments to inform the development of autonomous agents",
      "Constructed supervised fine-tuning datasets tailored for advanced systems programming and terminal execution tasks",
    ]
  },
  {
    id: "gdit",
    company: "General Dynamics Information Technology",
    logo: "/gdit.jpg",
    role: "Software Engineer Intern",
    period: "Jun 2025 — Aug 2025",
    points: [
      "Deployed edge computer vision systems to facilitate real-time vehicle detection and enhance situational awareness and navigation intelligence",
      "Applied adversarial training techniques to improve model robustness and mitigate out-of-distribution data shifts",
      "Developed hardware-optimized inference pipelines using model quantization to achieve highly efficient, low-latency performance",
    ]
  },
  {
    id: "gdit-lead",
    company: "General Dynamics Information Technology",
    logo: "/gdit.jpg",
    role: "Engineering Project Lead",
    period: "Jan 2025 — May 2025",
    points: [
      "Led an engineering team in building an agentic Retrieval-Augmented Generation (RAG) pipeline to analyze large-scale data lakes using cloud-based large language models",
      "Designed and integrated dual graph and vector database architectures to significantly enhance data discovery and relationship mapping",
      "Improved search accuracy within application frameworks through custom semantic chunking and metadata enrichment",
    ]
  },
  {
    id: "bah",
    company: "Booz Allen Hamilton",
    logo: "/bah.jpg",
    role: "Engineering Project Manager",
    period: "Sep 2024 — Dec 2024",
    points: [
      "Developed full-stack web applications designed to automate medical policy extraction, featuring real-time editing and annotation capabilities",
      "Engineered automated web scraping workflows and secure backend database pipelines to streamline data aggregation and significantly reduce manual overhead",
      "Integrated advanced natural language processing models to streamline compliance audits through automated document summarization, feature extraction, and sentiment analysis",
    ]
  },
  {
    id: "irs",
    company: "Internal Revenue Service",
    logo: "/irs.jpg",
    role: "Software Engineer Intern",
    period: "Jan 2024 — Dec 2024",
    points: [
      "Managed and executed comprehensive ETL workflows to support high-volume, enterprise-scale fraud detection systems",
      "Led division-wide infrastructure modernization efforts by upgrading core CI/CD pipelines and enhancing enterprise version control integrations",
      "Architected the migration of extensive legacy codebases to modern build automation frameworks, substantially accelerating overall system deployment times",
    ]
  }
]

type ExpEntry = {
  id: string
  company: string
  logo: string
  role: string
  period: string
  points: string[]
}

function ExperienceSection({ exp }: { exp: ExpEntry }) {
  return (
    <section
      id={exp.id}
      className="grid grid-cols-1 md:grid-cols-[350px_1fr] md:gap-24 py-12 border-b border-white/5 last:border-0 scroll-mt-24"
    >
      <div className="flex flex-col justify-start items-center">
        <div className="relative w-12 h-12 md:w-24 md:h-24 lg:w-56 lg:h-56 overflow-hidden rounded-2xl">
          <Image
            src={exp.logo}
            alt={`${exp.company} Logo`}
            fill
            className="object-contain rounded-2xl"
          />
        </div>
      </div>

      <div className="flex flex-col w-full font-mono overflow-hidden">
        <div className="flex flex-col mb-6">
          <h2 className="text-xl md:text-3xl lg:text-[32px] font-bold tracking-tighter text-[#f4f4f5] mb-3 whitespace-nowrap">
            {exp.company}
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[#f4f4f5] text-[14px]">
            <span>{exp.role}</span>
            <span className="hidden sm:inline text-[#3f3f46]">•</span>
            <span>{exp.period}</span>
          </div>
        </div>

        <ul className="space-y-2 w-full pr-4">
          {exp.points.map((point, pIdx) => (
            <li key={pIdx} className="flex items-start gap-4 text-[14px] leading-relaxed text-[#d4d4d8] font-mono">
              <span className="text-[#71717a] mt-0.5 shrink-0 text-[14px] leading-none">—</span>
              <span className="flex-1">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function ExperiencePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      {/* === DEEP CHARCOAL SLATE BACKGROUND === */}
      <div className="fixed inset-0 z-[-1] bg-[#121212]"></div>

      {/* Loading spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full border-2 border-white/10 border-t-white/60 animate-spin" />
        </div>
      )}

      <div className={`h-full overflow-y-auto relative z-10 text-left font-mono transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full px-4 md:px-8 pt-20 pb-32">
          
          <div className="mb-12 border-b border-white/10 pb-10">
            <h1 className="heading-text sm:text-[32px] font-mono uppercase font-bold leading-tight text-[#f4f4f5] tracking-tight">
              Experience
            </h1>
          </div>

          <div className="flex flex-col">
            {allExperience.map((exp, idx) => (
              <ExperienceSection key={idx} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
"use client"

import { ArrowUpRight } from "lucide-react"

const experiences = [
    {
        company: "Amazon Leo",
        websiteURL: "https://leo.amazon.com",
        position: "Machine Learning Engineer",
        period: "Feb 2026 — Present",
        description: "Currently working.",
        skills: ["Python", "Machine Learning", "AWS"],
    },
    {
        company: "Mercor",
        websiteURL: "https://www.mercor.com/research/",
        position: "Software Engineer",
        period: "Nov 2025 — Present",
        description: "Benchmarking developer efficiency across software and terminal environments to evaluate human vs. autonomous agents. Developing data to support the training of Large Language Models via reinforcement learning from human feedback.",
        skills: ["Python", "LLMs", "RLHF", "Data Pipelines"],
    },
    {
        company: "GDIT",
        websiteURL: "https://www.gdit.com/industries/defense/",
        position: "Software Engineer",
        period: "Jun 2025 — Aug 2025",
        description: "Deployed vehicle computer vision plugin within a Multi-Modal ML (MML) system for the Android Tactical Awareness Kit (ATAK) to enhance situational awareness. Accelerated inference time by designing a 3-stage, hierarchical pipeline for lightweight deployment on edge devices. Improved model reliability using Projected Gradient Descent (PGD) adversarial training on custom CNNs.",
        skills: ["Computer Vision", "Android SDK", "CNNs", "Transfer Learning"],
    },
    {
        company: "GDIT",
        websiteURL: "https://www.gdit.com/industries/defense/",
        position: "Technical Project Lead",
        affiliation: "Contract via App Dev",
        period: "Jan 2025 — May 2025",
        description: "Led a cross-functional student engineering team contracted to build a Retrieval Augmented Generation (RAG) pipeline for analysis of large document corpus. Improved data retrieval speed and discovery by implementing dual database management system with relationship mapping and similarity search. Increased search accuracy via custom semantic chunking and NER extraction.",
        skills: ["RAG", "Project Management", "Databases", "NLP"],
    },
    {
        company: "Booz Allen Hamilton",
        websiteURL: "https://www.boozallen.com",
        position: "Technical Project Manager",
        affiliation: "Contract via App Dev",
        period: "Sep 2024 — Dec 2024",
        description: "Managed a student engineering team contracted by the Digital Transformation division to develop an in-house, 0-to-1 software management platform for auditor medical policy review. Automated workflows through cron-based web scraping with document comparison and feature extraction, cutting manual labor costs and errors.",
        skills: ["Web Scraping", "Agile", "Automation", "Leadership"],
    },
    {
        company: "Internal Revenue Service",
        websiteURL: "https://www.irs.gov",
        position: "Software Engineer",
        period: "Jan 2024 — Dec 2024",
        description: "Interned at the Fraud & Analytics division under the Return Review Program (RRP), the unified platform screening all U.S. filings for fraud. Strengthened system reliability and security by modernizing 20-year-old legacy architecture. Supported stakeholder relationships by working with cross-functional teams in Agile sprints.",
        skills: ["Java", "Legacy Modernization", "Agile", "DevOps"],
    },
]

export function Experience() {
    return (
        // group/list controls the dimming of NON-hovered items
        <div className="group/list">
            {experiences.map((exp, index) => (
                <div 
                    key={index} 
                    // group/item controls the highlighting of the HOVERED item
                    className="mb-12 group/item relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                >
                    {/* Hover Background Box */}
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:block lg:group-hover/item:bg-slate-800/50 lg:group-hover/item:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover/item:drop-shadow-lg"></div>
                    
                    {/* LEFT COLUMN: Date */}
                    <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        {exp.period}
                    </header>
                    
                    {/* RIGHT COLUMN: Content */}
                    <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                            <a 
                                href={exp.websiteURL} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                            >
                                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                <span>
                                    {exp.position} · <span className="inline-block">{exp.company}<ArrowUpRight className="inline-block h-4 w-4 ml-1 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 motion-reduce:transition-none" /></span>
                                </span>
                            </a>
                        </h3>
                        
                        {exp.affiliation && (
                            <div className="text-slate-500 text-sm mt-1 mb-2">
                                {exp.affiliation}
                            </div>
                        )}
                        
                        <p className="mt-2 text-sm leading-normal text-slate-400">
                            {exp.description}
                        </p>
                        
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                            {exp.skills.map((skill, idx) => (
                                <li key={idx} className="mr-1.5 mt-2">
                                    <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                        {skill}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}
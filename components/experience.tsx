"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" // NEW IMPORT
import { Building, Calendar, ChevronDown } from "lucide-react"

const experiences = [
    {
        company: "Amazon Leo",
        logoURL: "/amzn.jpg",
        websiteURL: "https://leo.amazon.com",
        position: "Machine Learning Engineer",
        affiliation: "Contract", // ADDED AFFILIATION
        startDate: "2026-02-10",
        endDate: "Present",
        description: [
            "Currently working",
        ],
        current: true,
    },
    {
        company: "Mercor",
        logoURL: "/mercor.png",
        websiteURL: "https://www.mercor.com/research/",
        position: "Software Engineer",
        startDate: "2025-11-10",
        endDate: "Present",
        description: [
            "Benchmarking developer efficiency across software and terminal environments to evaluate human vs. autonomous agents",
            "Developing data to support the training of Large Language Models via reinforcement learning from human feedback",
        ],
        current: true,
    },
    {
        company: "General Dynamics Information Technology",
        logoURL: "/gdit.jpeg",
        websiteURL: "https://www.gdit.com/industries/defense/",
        position: "Software Engineer Intern",
        startDate: "2025-06-10",
        endDate: "2025-08-13",
        description: [
            "Deployed vehicle computer vision plugin within a Multi-Modal ML (MML) system for the Android Tactical Awareness Kit (ATAK) to enhance situational awareness",
            "Accelerated inference time by designing a 3-stage, hierarchical pipeline for lightweight deployment on edge devices in resource-constrained operations",
            "Improved model reliability using Projected Gradient Descent (PGD) adversarial training on custom Convolutional Neural Networks (CNNs) and transfer learning",
        ],
    },
    {
        company: "General Dynamics Information Technology",
        logoURL: "/gdit.jpeg",
        websiteURL: "https://www.gdit.com/industries/defense/",
        position: "Technical Project Lead",
        affiliation: "Contract", // ADDED AFFILIATION
        startDate: "2025-01-10",
        endDate: "2025-05-31",
        description: [
            "Led a cross-functional student engineering team contracted to build a Retrieval Augmented Generation (RAG) pipeline for analysis of large document corpus", // TWEAKED FIRST BULLET
            "Improved data retrieval speed and discovery by implementing dual database management system with relationship mapping and similarity search",
            "Increased search accuracy via custom semantic chunking, Name Entity Recognition (NER) extraction, and metadata enrichment"
        ],
    },
    {
        company: "Booz Allen Hamilton",
        logoURL: "/bah.jpg",
        websiteURL: "https://www.boozallen.com",
        position: "Technical Project Manager",
        affiliation: "Contract", // ADDED AFFILIATION
        startDate: "2024-09-10",
        endDate: "2024-12-31",
        description: [
            "Managed a student engineering team contracted by the Digital Transformation division to develop an in-house, 0-to-1 software management platform for auditor medical policy review", // TWEAKED FIRST BULLET
            "Met weekly with CTO and lead engineer to review progress, align on deliverables, and ensure achievement of Key Performance Indicators (KPIs)",
            "Automated workflows through cron-based web scraping with document comparison and feature extraction, cutting manual labor costs and errors"
        ],
    },
    {
        company: "Internal Revenue Service",
        logoURL: "/irs.jpeg",
        websiteURL: "https://www.irs.gov",
        position: "Software Engineer Intern",
        startDate: "2024-01-10",
        endDate: "2024-12-31",
        description: [
            "Interned at the Fraud & Analytics division under the Return Review Program (RRP), the unified platform screening all U.S. filings for fraud and non-compliance",
            "Strengthened system reliability and security by modernizing 20-year-old legacy architecture, advancing enterprise modernization",
            "Supported stakeholder relationships by working with cross-functional teams and divisions in Agile sprints and DevOps meetings"
        ],
    },
]

// Helper to format the period string
const formatPeriod = (startDateStr: string, endDateStr: string) => {
    const startDate = new Date(startDateStr);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    const startFormatted = startDate.toLocaleDateString('en-US', options);

    if (endDateStr === 'Present') {
        return `${startFormatted} - Present`;
    }

    const endDate = new Date(endDateStr);
    const endFormatted = endDate.toLocaleDateString('en-US', options);
    return `${startFormatted} - ${endFormatted}`;
};


export function Experience() {
    const [openExperienceIndex, setOpenExperienceIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="pb-12 pt-24 scroll-mt-28 font-mono">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl md:text-6xl text-center mb-10 text-white tracking-wider font-heading">
                    EXPERIENCE
                </h2>

                <div className={`max-w-4xl mx-auto transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="relative">
                        <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-border -ml-px" />

                        <div className="space-y-8">
                            {experiences.map((exp, index) => {
                                const isOpen = openExperienceIndex === index;
                                return (
                                    <div
                                        key={index}
                                        className="relative flex items-start gap-6"
                                        onMouseEnter={() => setOpenExperienceIndex(index)}
                                        onMouseLeave={() => setOpenExperienceIndex(null)}
                                    >
                                        <div className="relative z-10 flex-shrink-0 mt-1">
                                            <a 
                                                href={exp.websiteURL} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="block transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                                                title={`Visit ${exp.company} website`}
                                            >
                                                <div className={`w-20 h-20 rounded-full bg-muted flex items-center justify-center ring-4 ring-background transition-all duration-300 ${isOpen ? 'ring-primary' : 'ring-border'} ${exp.current ? 'animate-pulse-glow' : ''}`}>
                                                    <Image
                                                        src={exp.logoURL}
                                                        alt={`${exp.company} logo`}
                                                        width={80}
                                                        height={80}
                                                        className="rounded-full object-cover w-full h-full p-1"
                                                    />
                                                </div>
                                            </a>
                                        </div>

                                        <div className="flex-1 overflow-hidden">
                                            <Card className="bg-card/75 elegant-shadow py-2 rounded-3xl">
                                                <CardHeader className="flex-row items-center justify-between p-6 cursor-pointer">
                                                    <div className="space-y-1">
                                                        
                                                        {/* UPDATED TITLE SECTION WITH BADGE */}
                                                        <CardTitle className="text-2xl tracking-wider font-heading flex flex-wrap items-center gap-3">
                                                            {exp.position.toUpperCase()}
                                                            {exp.affiliation && (
                                                                <Badge variant="secondary" className="text-xs font-mono normal-case tracking-normal border-border/50 bg-secondary/50 text-secondary-foreground mt-1 sm:mt-0">
                                                                    {exp.affiliation}
                                                                </Badge>
                                                            )}
                                                        </CardTitle>

                                                        <div className="flex flex-wrap items-center gap-x-2 text-muted-foreground text-medium mt-1">
                                                            <div className="flex items-center gap-2">
                                                                <Building className="h-4 w-4" />
                                                                <span>{exp.company}</span>
                                                            </div>
                                                            <span className="text-muted-foreground/50 hidden sm:inline">•</span>
                                                             <div className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4" />
                                                                <span>{formatPeriod(exp.startDate, exp.endDate)}</span>
                                                             </div>
                                                        </div>
                                                    </div>
                                                    <ChevronDown className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                                </CardHeader>

                                                <div
                                                    className="grid transition-all duration-500 ease-in-out"
                                                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                                                >
                                                    <div className="overflow-hidden">
                                                        <CardContent className="p-6 pt-0">
                                                            <div className="border-t border-border pt-4">
                                                                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed body-text text-sm">
                                                                    {exp.description.map((point, idx) => (
                                                                        <li key={idx}>{point}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </CardContent>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
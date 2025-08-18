"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, MapPin, ChevronDown } from "lucide-react"

const experiences = [
    {
        company: "General Dynamics Information Technology",
        logoURL: "https://images.ctfassets.net/szx3os6exj55/DoBJFVrzCjOUxN1W1uJ1P/f40b228666d952ea0dbdfea63f1095bb/PLACEHOLDER-GDIT-logo-sht_lg_cmyk_pringy-600x450px-09162024.jpg",
        position: "Software Engineer Intern",
        startDate: "2025-06-01",
        endDate: "Present",
        location: "Annapolis Junction, MD",
        description:
            "Developing multimodal deep learning software for precision targeting, navigation intelligence, and situational awareness.",
        technologies: ["Tensorflow", "Keras", "Scikit-Learn", "Android Studio"],
        current: true,
    },
    {
        company: "General Dynamics Information Technology",
        logoURL: "https://images.ctfassets.net/szx3os6exj55/DoBJFVrzCjOUxN1W1uJ1P/f40b228666d952ea0dbdfea63f1095bb/PLACEHOLDER-GDIT-logo-sht_lg_cmyk_pringy-600x450px-09162024.jpg",
        position: "Project Lead",
        startDate: "2025-01-01",
        endDate: "2025-05-31",
        location: "College Park, MD",
        description:
            "Engineered a scalable RAG-powered LLM in AWS Bedrock for email insight and AI analysis for a global email database.",
        technologies: ["AWS Bedrock", "AWS EC2", "LangChain", "Neo4J", "Qdrant", "NLTK", "Flask", "Next.js", "Tailwind CSS"],
    },
    {
        company: "Booz Allen Hamilton",
        logoURL: "https://bizfayetteville.com/images/article/P6M2zix5T3DghFNRcWiXLbPz6qM9CqpWTAle7h2Y.jpg",
        position: "Project Manager",
        startDate: "2024-09-01",
        endDate: "2024-12-31",
        location: "College Park, MD",
        description:
            "Created a Medicaid/CHIP web application for policy comparison, user annotation, and analysis for a US Government contract.",
        technologies: ["PyTorch", "Scikit-Learn", "Selenium", "PostgreSQL", "Express.js", "Next.js", "Tailwind CSS"],
    },
    {
        company: "Internal Revenue Service",
        logoURL: "https://yt3.googleusercontent.com/ytc/AIdro_l7EQrwAPBISw10QVF36IsB-cpyKQ4weQOea7p4iPxQj3U=s900-c-k-c0x00ffffff-no-rj",
        position: "Software Engineer Intern ", // Note: Added a space to make it unique for state key
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        location: "Washington, DC",
        description:
            "Modernized a post-ETL CI/CD pipeline for a criminal auditing and identity compliance tool and resolved defects in the build system.",
        technologies: ["IBM Rational Team Concert", "Jenkins", "Ant", "Maven"],
    },
]

// Helper to format the period string
const formatPeriod = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr);
    const options = { year: 'numeric', month: 'short' };
    const startFormatted = startDate.toLocaleDateString('en-US', options);

    if (endDateStr === 'Present') {
        return `${startFormatted} - Present`;
    }

    const endDate = new Date(endDateStr);
    const endFormatted = endDate.toLocaleDateString('en-US', options);
    return `${startFormatted} - ${endFormatted}`;
};


export function Experience() {
    // Nothing is open by default. Hovering will set the state.
    const [openExperience, setOpenExperience] = useState(null);
    const sectionRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.disconnect();
        };
    }, []);

    return (
        <section ref={sectionRef} id="experience" className="py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-5xl md:text-6xl text-center mb-20 text-gradient tracking-wider font-heading">
                    EXPERIENCE
                </h2>

                <div className={`max-w-4xl mx-auto transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-border -ml-px" />

                        <div className="space-y-8">
                            {experiences.map((exp, index) => {
                                const isOpen = openExperience === exp.position;
                                return (
                                    <div
                                        key={index}
                                        className="relative flex items-start gap-6"
                                        onMouseEnter={() => setOpenExperience(exp.position)}
                                        onMouseLeave={() => setOpenExperience(null)}
                                    >
                                        {/* Logo on the timeline */}
                                        <div className="relative z-10 flex-shrink-0 mt-1">
                                            <div className={`w-20 h-20 rounded-full bg-muted flex items-center justify-center ring-4 ring-background transition-all duration-300 ${isOpen ? 'ring-primary' : 'ring-border'} ${exp.current ? 'animate-pulse-glow' : ''}`}>
                                                <Image
                                                    src={exp.logoURL}
                                                    alt={`${exp.company} logo`}
                                                    width={80}
                                                    height={80}
                                                    className="rounded-full object-cover w-full h-full p-1"
                                                />
                                            </div>
                                        </div>

                                        {/* Accordion Content */}
                                        <div className="flex-1 overflow-hidden">
                                            <Card className="bg-card/50 elegant-shadow">
                                                <CardHeader className="flex-row items-center justify-between p-4">
                                                    <div className="space-y-1">
                                                        <CardTitle className="text-xl tracking-wider font-heading">
                                                            {exp.position.toUpperCase()}
                                                        </CardTitle>
                                                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                                            <Building className="h-4 w-4" />
                                                            <span>{exp.company}</span>
                                                            <span className="text-muted-foreground/50">•</span>
                                                             <span>{formatPeriod(exp.startDate, exp.endDate)}</span>
                                                        </div>
                                                    </div>
                                                    <ChevronDown className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                                </CardHeader>

                                                {/* Collapsible Content */}
                                                <div
                                                    className="grid transition-all duration-500 ease-in-out"
                                                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                                                >
                                                    <div className="overflow-hidden">
                                                        <CardContent className="p-4 pt-0">
                                                            <div className="border-t border-border pt-4">
                                                                <p className="text-muted-foreground mb-6 leading-relaxed body-text">{exp.description}</p>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {exp.technologies.map((tech) => (
                                                                        <Badge key={tech} variant="secondary">{tech}</Badge>
                                                                    ))}
                                                                </div>
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
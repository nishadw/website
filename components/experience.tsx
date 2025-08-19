"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, ChevronDown } from "lucide-react"

const experiences = [
    {
        company: "General Dynamics Information Technology",
        logoURL: "https://images.ctfassets.net/szx3os6exj55/DoBJFVrzCjOUxN1W1uJ1P/f40b228666d952ea0dbdfea63f1095bb/PLACEHOLDER-GDIT-logo-sht_lg_cmyk_pringy-600x450px-09162024.jpg",
        position: "Software Engineer Intern",
        startDate: "2025-06-10",
        endDate: "Present",
        location: "Annapolis Junction, MD",
        description: [
            "Deployed vehicle computer vision plugin on the Android Tactical Awareness Kit to enhance situational awareness",
            "Improved reliability by 30% under adversarial stress tests through PGD training and MobileNet fine-tuning",
            "Achieved 90%+ accuracy using a hybrid of transfer learning and custom CNNs for lightweight deployment",
            "Accelerated inference to under 100ms on edge devices by designing a 3-stage deep learning pipeline"
          ],
        technologies: ["Python", "Java", "HTML", "AWS Lambda", "Android Studio", "Tensorflow", "Keras", "CleverHans", "Scikit-Learn"],
        current: true,
    },
    {
        company: "General Dynamics Information Technology",
        logoURL: "https://images.ctfassets.net/szx3os6exj55/DoBJFVrzCjOUxN1W1uJ1P/f40b228666d952ea0dbdfea63f1095bb/PLACEHOLDER-GDIT-logo-sht_lg_cmyk_pringy-600x450px-09162024.jpg",
        position: "Project Lead",
        startDate: "2025-01-10",
        endDate: "2025-05-31",
        location: "College Park, MD",
        description: [
            "Led cross-functional teams to build scalable RAG pipeline using Llama 3-70B for analysis of 600K+ emails",
            "Improved data retrieval speed and discovery by 95% by implementing relationship mapping and similarity search",
            "Boosted search accuracy by 40% via custom semantic chunking, NER extraction, and metadata enrichment"
        ],
        technologies: ["Python", "Javascript", "AWS Bedrock", "AWS EC2", "LangChain", "Neo4J", "Qdrant", "NLTK", "Flask", "Next.js", "Tailwind CSS"],
    },
    {
        company: "Booz Allen Hamilton",
        logoURL: "https://bizfayetteville.com/images/article/P6M2zix5T3DghFNRcWiXLbPz6qM9CqpWTAle7h2Y.jpg",
        position: "Project Manager",
        startDate: "2024-09-10",
        endDate: "2024-12-31",
        location: "College Park, MD",
        description: [
            "Developed in-house tool to automate medical policy scraping with real-time editing and annotation features",
            "Met weekly with CTO and lead engineer to review progress, align on deliverables, and ensure achievement of KPIs",
            "Saved $50K+ annually by automating workflows and cron-based web scraping, cutting manual effort and errors",
            "Engineered document comparison, feature extraction, and sentiment analysis to streamline policy auditing"
        ],
        technologies: ["Python", "Javascript", "SQL","PyTorch", "Scikit-Learn", "Selenium", "PostgreSQL", "Express.js", "Next.js", "Tailwind CSS"],
    },
    {
        company: "Internal Revenue Service",
        logoURL: "https://www.siegelgale.com/app/uploads/2016/04/SG_AmandaVoss_1-1.jpg",
        position: "Software Engineer Intern ", // Note: Added a space to make it unique for state key
        startDate: "2024-01-10",
        endDate: "2024-12-31",
        location: "Washington, DC",
        description: [
            "Completed 100% of ETL tasks for Q2-Q4 on tax fraud detection system processing 22.5M+ monthly applications",
            "Strengthened system reliability by resolving 50+ defects, modernizing a 20-year-old build and reducing downtime",
            "Deployed division-wide CI/CD pipeline upgrade with 100% code coverage, advancing enterprise modernization"
        ],
        technologies: ["Java", "HTML", "IBM Rational Team Concert", "Jenkins", "Ant", "Maven"],
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
        // --- CHANGE HERE: Added font-mono to the parent container ---
        <section ref={sectionRef} id="experience" className="py-16 font-mono">
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
                                            <Card className="bg-card/50 elegant-shadow py-2">
                                                <CardHeader className="flex-row items-center justify-between p-6 cursor-pointer">
                                                    <div className="space-y-1">
                                                        <CardTitle className="text-2xl tracking-wider font-heading">
                                                            {exp.position.toUpperCase()}
                                                        </CardTitle>
                                                        <div className="flex flex-wrap items-center gap-x-2 text-muted-foreground text-medium">
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

                                                {/* Collapsible Content */}
                                                <div
                                                    className="grid transition-all duration-500 ease-in-out"
                                                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                                                >
                                                    <div className="overflow-hidden">
                                                        <CardContent className="p-6 pt-0">
                                                            <div className="border-t border-border pt-4">
                                                                {/* --- CHANGE HERE: Removed redundant font-mono --- */}
                                                                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 leading-relaxed body-text">
                                                                    {exp.description.map((point, idx) => (
                                                                        <li key={idx}>{point}</li>
                                                                    ))}
                                                                </ul>
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
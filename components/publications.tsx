"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award, ArrowLeft, BookOpen, Presentation } from "lucide-react"

const publications = [
    {
        title: "Easy2Hard-Bench: Standardized Difficulty Labels for Profiling LLM Performance and Generalization",
        authors: "Nishad Wajge, Furong Huang, et al.",
        conference: "NeurIPS",
        journal: "",
        year: "2024",
        date: "2024-12-10",
        description:
            "We present Easy2Hard, an innovative collection of 6 benchmark datasets featuring standardized difficulty labels spanning a wide range of domains. We estimate difficulty by leveraging performance data of human subjects and LLMs on prominent leaderboards, employing ranking systems like Item Response Theory (IRT) and Glicko-2.",
        link: "https://neurips.cc/virtual/2024/poster/97554",
    },
    {
        title: "Should PGA Tour Professionals Consider their Adversary's Strategy? A Case Study of Match Play in Golf",
        authors: "Nishad Wajge and Gautier Stauffer",
        conference: "INFORMS",
        journal: "Computational Statistics",
        year: "2022-2024",
        date: "2024-10-05",
        description:
            "This study explores strategic considerations in professional golf’s Match Play format. Leveraging PGA Tour data, we investigate the impact of an adversary’s strategy. Our findings suggest that while slight adjustments can be advantageous, the overall benefit remains modest.",
        link: "https://link.springer.com/article/10.1007/s00180-024-01555-5",
        highlight: true,
    },
    {
        title: "Campaigns to Overcome Golfers’ Loss-Averse Cognitive Bias",
        authors: "Nishad Wajge and Krista Hill-Cummings",
        conference: "",
        journal: "International Journal for High School Research",
        year: "2024",
        date: "2024-05-20",
        description:
            "Loss-aversion is a conservative mindset that can negatively impact performance. In this study, we systematically surveyed golfers, analyzed relationships among their attributes and loss-aversion, and proposed effective campaigns to help individuals overcome it.",
        link: "https://terra-docs.s3.us-east-2.amazonaws.com/IJHSR/Articles/volume6-issue5/IJHSR_2024_65_93.pdf",
    },
    {
        title: "Trials of Triage: A Look into the Implicit Biases Prevalent in the American Medical System",
        authors: "Nishad Wajge, Phil Mui, et al.",
        conference: "Stanford JUST Health",
        journal: "Annals of Biomedical Science and Engineering",
        year: "2022-2023",
        date: "2023-11-28",
        description:
            "We develop machine-learning techniques to picture the treatment of specific patient demographics during hospital triaging. Using k-NN, F1-scores, random forests, and SHAP values, we analyze patient attributes like insurance and race. Our findings show that patients with private insurance receive better treatment.",
        link: "https://www.biomedscijournal.com/articles/abse-aid1022.php",
    },
]

// Sort publications by date descending (newest first)
const sortedPublications = publications.sort((a, b) => new Date(b.date) - new Date(a.date));

export function Publications() {
    const [isVisible, setIsVisible] = useState(false)
    const [selectedPublication, setSelectedPublication] = useState(sortedPublications[0])
    const [isMobileDetailVisible, setIsMobileDetailVisible] = useState(false)
    const ref = useRef < HTMLElement > (null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )
        const currentRef = ref.current
        if (currentRef) observer.observe(currentRef)
        return () => {
            if (currentRef) observer.unobserve(currentRef)
        }
    }, [])

    const groupedPublications = useMemo(() => {
        return sortedPublications.reduce((acc, pub) => {
            const pubDate = new Date(pub.date);
            const key = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(pubDate);
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(pub);
            return acc;
        }, {});
    }, []);

    const handleSelectPublication = (pub) => {
        setSelectedPublication(pub)
        setIsMobileDetailVisible(true)
    }

    return (
        <section id="publications" ref={ref} className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
                    <h2 className="text-5xl md:text-6xl text-center mb-16 text-gradient tracking-wider font-heading">
                        RESEARCH
                    </h2>

                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:gap-8 rounded-lg elegant-shadow bg-card/50 md:min-h-[600px] overflow-hidden">
                        {/* Master Pane (Left Column) - Timeline */}
                        <div
                            className={`w-full md:w-1/3 lg:w-2/5 p-4 border-b md:border-b-0 md:border-r ${isMobileDetailVisible ? "hidden md:block" : "block"
                                }`}
                        >
                            <div className="relative h-full md:max-h-[600px] overflow-y-auto pr-4">
                                <div className="absolute left-2 top-0 h-full w-0.5 bg-border -z-10"></div>
                                {Object.entries(groupedPublications).map(([groupTitle, pubs]) => (
                                    <div key={groupTitle} className="mb-8">
                                        <div className="flex items-center mb-4">
                                            {/* === CHANGE IS HERE === */}
                                            {/* This is now a single div for a solid color dot */}
                                            <div className="z-10 w-4 h-4 bg-border rounded-full"></div>
                                            <h3 className="ml-4 font-heading text-lg text-primary">{groupTitle}</h3>
                                        </div>
                                        <div className="space-y-2">
                                            {pubs.map((pub) => {
                                                const venueDisplay = [pub.conference, pub.journal].filter(Boolean).join(' | ');
                                                const isSelected = selectedPublication.title === pub.title;
                                                return (
                                                    <div key={pub.title} className="relative pl-8">
                                                        <div className={`absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors ${isSelected ? 'bg-primary' : 'bg-primary-foreground ring-1 ring-border'}`}></div>
                                                        <button
                                                            onClick={() => handleSelectPublication(pub)}
                                                            className={`w-full text-left p-3 rounded-lg transition-colors ${isSelected
                                                                    ? "bg-muted font-semibold"
                                                                    : "hover:bg-muted/50"
                                                                }`}
                                                        >
                                                            <p className="text-base font-heading tracking-wide leading-snug">{pub.title.toUpperCase()}</p>
                                                            <p className="text-xs text-muted-foreground mt-1.5">{venueDisplay}</p>
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detail Pane (Right Column) */}
                        <div
                            className={`w-full md:w-2/3 lg:w-3/5 p-6 ${isMobileDetailVisible ? "block" : "hidden md:block"
                                }`}
                        >
                            <Button
                                variant="ghost"
                                onClick={() => setIsMobileDetailVisible(false)}
                                className="mb-4 md:hidden"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to List
                            </Button>

                            {selectedPublication && (
                                <div
                                    key={selectedPublication.title}
                                    className="animate-content-fade-in flex flex-col h-full"
                                >
                                    <CardHeader className="px-0 pt-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <CardTitle className="text-2xl md:text-3xl leading-tight font-heading tracking-wide">
                                                {selectedPublication.title.toUpperCase()}
                                            </CardTitle>
                                            {selectedPublication.highlight && <Award className="h-6 w-6 text-primary flex-shrink-0" />}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="px-0 flex-grow">
                                        <div className="space-y-4">
                                            <p className="text-base text-muted-foreground body-text">{selectedPublication.authors}</p>
                                            
                                            <div className="flex justify-between items-start pt-2 gap-4">
                                                <div className="space-y-3">
                                                    {selectedPublication.conference && (
                                                        <div className="flex items-center gap-3 text-base">
                                                            <Presentation className="h-5 w-5 text-primary flex-shrink-0" title="Conference" />
                                                            <span className="font-medium body-text">{selectedPublication.conference}</span>
                                                        </div>
                                                    )}
                                                    {selectedPublication.journal && (
                                                        <div className="flex items-center gap-3 text-base">
                                                            <BookOpen className="h-5 w-5 text-sky-500 flex-shrink-0" title="Journal" />
                                                            <span className="font-medium body-text">{selectedPublication.journal}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-shrink-0">
                                                    <Button
                                                        variant="outline"
                                                        className="elegant-shadow hover:elegant-shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-heading tracking-wide"
                                                        onClick={() => window.open(selectedPublication.link, "_blank", "noopener,noreferrer")}
                                                    >
                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                        VIEW PUBLICATION
                                                    </Button>
                                                </div>
                                            </div>

                                            <p className="text-base text-muted-foreground leading-relaxed body-text pt-4">
                                                {selectedPublication.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
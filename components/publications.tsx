"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award, ArrowLeft, BookOpen, Presentation } from "lucide-react"

const publications = [
    {
        title: "Easy2Hard-Bench: Standardized Difficulty Labels for Profiling LLM Performance and Generalization",
        authors: "Nishad Wajge, Furong Huang, et al.",
        conference: ["NeurIPS"],
        journal: [],
        year: "2024",
        date: "2024-12-10",
        description:
            "While generalization over tasks from easy to hard is crucial to profile language models (LLMs), the datasets with fine-grained difficulty annotations for each problem across a broad range of complexity are still missing. Aiming to address this limitation, we present Easy2Hard-Bench, a consistently formatted collection of 6 benchmark datasets spanning various domains, such as mathematics and programming problems, chess puzzles, and reasoning questions. Each problem within these datasets is annotated with numerical difficulty scores. To systematically estimate problem difficulties, we collect abundant performance data on attempts to each problem by humans in the real world or LLMs on the prominent leaderboard. Leveraging the rich performance data, we apply well-established difficulty ranking systems, such as Item Response Theory (IRT) and Glicko-2 models, to uniformly assign numerical difficulty scores to problems. Moreover, datasets in Easy2Hard-Bench distinguish themselves from previous collections by a higher proportion of challenging problems. Through extensive experiments with six state-of-the-art LLMs, we provide a comprehensive analysis of their performance and generalization capabilities across varying levels of difficulty, with the aim of inspiring future research in LLM generalization.",
        link: "https://neurips.cc/virtual/2024/poster/97554",
    },
    {
        title: "Should PGA Tour Professionals Consider their Adversary's Strategy? A Case Study of Match Play in Golf",
        authors: "Nishad Wajge and Gautier Stauffer",
        conference: ["INFORMS"],
        journal: ["Computational Statistics"],
        year: "2022-2024",
        date: "2024-10-05",
        description:
            "This study explores strategic considerations in professional golf’s Match Play format. Leveraging Professional Golfers’ Association Tour data, we investigate the impact of factoring in an adversary’s strategy. Our findings suggest that while slight strategy adjustments can be advantageous in specific scenarios, the overall benefit of considering an opponent’s strategy remains modest. This confirms the common wisdom in golf, reinforcing the recommendation to adhere to optimal stroke-play strategies due to challenges in obtaining precise opponent statistics. The methodology employed here is generic and could offer valuable insights into whether opponents’ performances should also be considered in other two-player or team sports, such as tennis, darts, soccer, volleyball, etc. We hope that this research will pave the way for new avenues of study in these areas.",
        link: "https://link.springer.com/article/10.1007/s00180-024-01555-5",
        highlight: true,
    },
    {
        title: "Campaigns to Overcome Golfers’ Loss-Averse Cognitive Bias",
        authors: "Nishad Wajge and Krista Hill-Cummings",
        conference: [],
        journal: ["International Journal for High School Research"],
        year: "2024",
        date: "2024-05-20",
        description:
            "Loss-aversion is a type of conservative mindset that can negatively impact performance. In this study, we systematically surveyed a pool of golfers. We then analyzed, in detail, the relationships among participants’ attributes and the degree of loss-aversion. Based on these findings, we propose developing effective campaigns to help individuals or teams overcome their loss-aversion.",
        link: "https://terra-docs.s3.us-east-2.amazonaws.com/IJHSR/Articles/volume6-issue5/IJHSR_2024_65_93.pdf",
    },
    {
        title: "Trials of Triage: A Look into the Implicit Biases Prevalent in the American Medical System",
        authors: "Nishad Wajge, Phil Mui, et al.",
        conference: ["SCCUR"],
        journal: ["Stanford JUST Health", "Annals of Biomedical Science and Engineering"],
        year: "2022-2023",
        date: "2023-11-28",
        description:
            "In light of the COVID-19 pandemic and the health crisis left in its wake, our goal is to develop extensive machine-learning techniques to provide a clear picture of the treatment, and possible mistreatment, of specific patient demographics during hospital triaging. We aim to reveal whether a patient’s treatment and hospital disposition is related to the following attributes - Emergency Severity Index (ESI), gender, employment status, insurance status, race, or ethnicity which our 100 MB dataset included. Our work is separated into two parts - the classification task and data analysis. As part of the classification task, we used the k-Nearest-Neighbor classifier, the F1-score, and a random forest. We then analyze the data using SHapley Additive exPlanations (SHAP) values to determine the importance of each attribute. Our findings show that significance varies for each attribute. Notably, we found that patients with private insurance programs receive better treatment compared to patients with federal-run healthcare programs (e.g. Medicaid, Medicare). Furthermore, a patient’s ethnicity has a greater impact on treatment for patients under 40 years of age for any given ESI level. Surprisingly, our findings show language is not a barrier during treatment. We, therefore, conclude that although hospitals may not be doing so intentionally, there is a systemic bias in hospital triaging for specific patient demographics. For future works, we hope to aggregate additional patient data from hospitals to find whether specific demographics of patients receive better healthcare in different parts of the United States.",
        link: "https://www.biomedscijournal.com/articles/abse-aid1022.php",
    },
]

// Sort publications by date descending (newest first)
const sortedPublications = publications.sort((a, b) => new Date(b.date) - new Date(a.date));

// The configurable scramble hook
function useCharacterScramble(text, options = {}) {
  const { revealSpeed = 2, scrambleDuration = 10 } = options;
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    let frameRequest;
    let frameCount = 0;
    const queue = [];
    
    if (text) {
        for (let i = 0; i < text.length; i++) {
            const start = i * revealSpeed;
            const end = start + scrambleDuration;
            queue.push({ to: text[i], start, end, char: '' });
        }
        
        setDisplayText(text.split('').map(() => '').join(''));

        const animate = () => {
            let complete = 0;
            const updatedOutput = queue.map((item) => {
                const { start, end } = item;
                if (frameCount >= start) {
                    if (frameCount <= end) {
                        item.char = chars[Math.floor(Math.random() * chars.length)];
                    } else {
                        item.char = item.to;
                    }
                }
                if (item.char === item.to) complete++;
                return item.char;
            });
            
            setDisplayText(updatedOutput.join(''));
            
            if (complete !== queue.length) {
                frameRequest = requestAnimationFrame(animate);
                frameCount++;
            }
        };
        
        animate();
    } else {
        setDisplayText('');
    }

    return () => cancelAnimationFrame(frameRequest);
  }, [text, revealSpeed, scrambleDuration]); 

  return displayText;
}

function ScrambledText({ text, options }) {
  const scrambledText = useCharacterScramble(text, options);
  return <>{scrambledText}</>;
}


export function Publications() {
    const [isVisible, setIsVisible] = useState(false)
    const [selectedPublication, setSelectedPublication] = useState(sortedPublications[0])
    const [isMobileDetailVisible, setIsMobileDetailVisible] = useState(false)
    const ref = useRef < HTMLElement > (null)

    // --- CHANGE IS HERE: Centralized options for a faster animation ---
    const fastScrambleOptions = { revealSpeed: 0.5, scrambleDuration: 15 };
    const veryFastScrambleOptions = { revealSpeed: 0.2, scrambleDuration: 5 };

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
        <section id="publications" ref={ref} className="py-16 font-mono">
            <div className="container mx-auto px-4">
                <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
                    <h2 className="text-5xl md:text-6xl text-center mb-16 text-gradient tracking-wider font-heading">
                        RESEARCH
                    </h2>

                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:gap-8 rounded-lg elegant-shadow md:min-h-[600px] overflow-hidden">
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
                                            <div className="z-10 w-4 h-4 bg-border rounded-full"></div>
                                            <h3 className="ml-4 font-heading text-lg text-primary">{groupTitle}</h3>
                                        </div>
                                        <div className="space-y-2">
                                            {pubs.map((pub) => {
                                                const venueDisplay = [...pub.conference, ...pub.journal].filter(Boolean).join(' | ');
                                                const isSelected = selectedPublication.title === pub.title;
                                                return (
                                                    <div key={pub.title} className="relative pl-8">
                                                        <div className={`absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors ${isSelected ? 'bg-primary' : 'bg-border'}`}></div>
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
                                                <ScrambledText text={selectedPublication.title.toUpperCase()} options={fastScrambleOptions}/>
                                            </CardTitle>
                                            {selectedPublication.highlight && <Award className="h-6 w-6 text-primary flex-shrink-0" />}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="px-0 flex-grow">
                                        <div className="space-y-4">
                                            <p className="text-base text-muted-foreground body-text">
                                                <ScrambledText text={selectedPublication.authors} options={fastScrambleOptions}/>
                                            </p>
                                            
                                            <div className="flex justify-between items-start pt-2 gap-4">
                                                <div className="space-y-3">
                                                    {selectedPublication.conference?.map((conf, index) => (
                                                        <div key={`conf-${index}`} className="flex items-center gap-3 text-base">
                                                            <Presentation className="h-5 w-5 text-primary flex-shrink-0" title="Conference" />
                                                            <span className="font-medium body-text">
                                                                <ScrambledText text={conf} options={fastScrambleOptions} />
                                                            </span>
                                                        </div>
                                                    ))}
                                                    {selectedPublication.journal?.map((jour, index) => (
                                                        <div key={`jour-${index}`} className="flex items-center gap-3 text-base">
                                                            <BookOpen className="h-5 w-5 text-sky-500 flex-shrink-0" title="Journal" />
                                                            <span className="font-medium body-text">
                                                                <ScrambledText text={jour} options={fastScrambleOptions} />
                                                            </span>
                                                        </div>
                                                    ))}
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

                                            <p className="text-base text-muted-foreground leading-relaxed body-text pt-4 whitespace-pre-wrap">
                                                <ScrambledText text={selectedPublication.description} options={veryFastScrambleOptions} />
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
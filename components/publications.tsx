"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, Award } from "lucide-react"

const publications = [
  {
    title: "Standardized Difficulty Labels for Profiling LLM Performance",
    authors: "Nishad Wajge, et al.",
    venue: "NeurIPS 2024",
    year: "2024",
    type: "Conference",
    description:
      "Produced Easy2Hard-Bench, a 6-dataset benchmark for LLM evaluation in math, coding, chess, and reasoning problems. Conducted testing on 5+ state-of-the-art LLMs to analyze and benchmark performance across various problem metrics. Introduced a standardized, difficulty-aware evaluation with human performance data to refine problem difficulty levels.",
    link: "#",
    highlight: true,
  },
  {
    title: "Should PGA Tour Professionals Consider their Adversary's Strategy?",
    authors: "Nishad Wajge, et al.",
    venue: "INFORMS 2022 | Computational Statistics 2024",
    year: "2022-2024",
    type: "Conference & Journal",
    description:
      "Engineered a game theory-inspired, reinforcement learning decision-making algorithm to optimize playing strategies in golf. Created a Markov Decision Process optimization algorithm for multiplayer turn-based stochastic shortest path problems. Analyzed 500,000+ PGA ShotLink database in Excel and RStudio to construct player avatars with 95% confidence.",
    link: "#",
  },
  {
    title: "Model Classification to Detect Bias in Triaging",
    authors: "Nishad Wajge, et al.",
    venue: "Stanford JUST Health 2022 | Annals of Biomedical Science and Engineering 2023",
    year: "2022-2023",
    type: "Conference & Journal",
    description:
      "Designed a regression model in TensorFlow with KNN Classifier and SHAP Values to analyze 10,000+ triaging database. Leveraged Random Forest classification task in Seaborn and Scikit-learn, developing confusion matrices with 75% accuracy.",
    link: "#",
  },
]

export function Publications() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="publications" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
          <h2 className="text-5xl md:text-6xl text-center mb-16 text-gradient tracking-wider font-heading">
            RESEARCH & PUBLICATIONS
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {publications.map((pub, index) => (
                <Card
                  key={index}
                  className={`bg-card elegant-shadow hover:elegant-shadow-lg transition-all duration-300 hover:-translate-y-1 group ${
                    pub.highlight ? "ring-1 ring-primary/20" : ""
                  } slide-up stagger-${index + 1}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start gap-3">
                          <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors font-heading tracking-wide">
                            {pub.title.toUpperCase()}
                          </CardTitle>
                          {pub.highlight && <Award className="h-5 w-5 text-primary mt-1 flex-shrink-0" />}
                        </div>

                        <p className="text-sm text-muted-foreground body-text">{pub.authors}</p>

                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <span className="text-foreground font-medium body-text">{pub.venue}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground body-text">{pub.year}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-heading tracking-wide">
                            {pub.type.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <FileText className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed body-text">{pub.description}</p>

                    <Button
                      variant="outline"
                      size="sm"
                      className="elegant-shadow hover:elegant-shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-heading tracking-wide"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      VIEW PUBLICATION
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

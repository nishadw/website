"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, Award } from "lucide-react"

const publications = [
  {
    title: "Easy2Hard-Bench: Standardized Difficulty Labels for Profiling LLM Performance and Generalization",
    authors: "Contributed as an Undergraduate Researcher",
    venue: "NeurIPS",
    year: "2024",
    type: "Conference",
    description:
      "Despite the abundance of datasets available for assessing large language models (LLMs), the scarcity of continuous and reliable difficulty labels for individual data points, in most cases, curtails their capacity to benchmark model generalization performance across different levels of complexity. Addressing this limitation, we present Easy2Hard, an innovative collection of 6 benchmark datasets featuring standardized difficulty labels spanning a wide range of domains, such as mathematics and programming problems, chess puzzles, and reasoning questions, providing a much-needed tool for those in demand of a dataset with varying degrees of difficulty for LLM assessment. We estimate the difficulty of individual problems by leveraging the performance data of many human subjects and LLMs on prominent leaderboards. Harnessing the rich human performance data, we employ widely recognized difficulty ranking systems, including the Item Response Theory (IRT) and Glicko-2 models, to uniformly assign difficulty scores to problems. The Easy2Hard datasets distinguish themselves from previous collections by incorporating a significantly higher proportion of challenging problems, presenting a novel and demanding test for state-of-the-art LLMs. Through extensive experiments conducted with six state-of-the-art LLMs on the Easy2Hard datasets, we offer valuable insights into their performance and generalization capabilities across varying degrees of difficulty, setting the stage for future research in LLM generalization.",
    link: "https://neurips.cc/virtual/2024/poster/97554"
  },
  {
    title: "Should PGA Tour Professionals Consider their Adversary's Strategy?",
    authors: "Nishad Wajge and Gautier Stauffer",
    venue: "INFORMS | Computational Statistics (Special Issue: Sports Data Science)",
    year: "2022-2024",
    type: "Conference & Journal",
    description:
      "This study explores strategic considerations in professional golf’s Match Play format. Leveraging Professional Golfers’ Association Tour data, we investigate the impact of factoring in an adversary’s strategy. Our findings suggest that while slight strategy adjustments can be advantageous in specific scenarios, the overall benefit of considering an opponent’s strategy remains modest. This confirms the common wisdom in golf, reinforcing the recommendation to adhere to optimal stroke-play strategies due to challenges in obtaining precise opponent statistics. The methodology employed here is generic and could offer valuable insights into whether opponents’ performances should also be considered in other two-player or team sports, such as tennis, darts, soccer, volleyball, etc. We hope that this research will pave the way for new avenues of study in these areas.",
    link: "https://link.springer.com/article/10.1007/s00180-024-01555-5?utm_source=rct_congratemailt&utm_medium=email&utm_campaign=oa_20241005&utm_content=10.1007%2Fs00180-024-01555-5#citeas",
    highlight: true,
  }, 
  {
    title: "Campaigns to Overcome Golfers’ Loss-Averse Cognitive Bias",
    authors: "Nishad Wajge and Krista Hill-Cummings",
    venue: "International Journal for High School Research",
    year: "2024",
    type: "Journal",
    description:
      "Loss-aversion is a type of conservative mindset that can negatively impact performance. In this study, we systematically surveyed a pool of golfers. We then analyzed, in detail, the relationships among participants’ attributes and the degree of loss-aversion. Based on these findings, we propose developing effective campaigns to help individuals or teams overcome their loss-aversion.",
    link: "https://terra-docs.s3.us-east-2.amazonaws.com/IJHSR/Articles/volume6-issue5/IJHSR_2024_65_93.pdf",
  },
  {
    title: "Using Model Classification to detect Bias in Hospital Triaging",
    authors: "Nishad Wajge, Phil Mui, et al.",
    venue: "Stanford JUST Health | Annals of Biomedical Science and Engineering",
    year: "2022-2023",
    type: "Conference & Journal",
    description:
      "In light of the COVID-19 pandemic and the health crisis left in its wake, our goal is to develop extensive machine-learning techniques to provide a clear picture of the treatment, and possible mistreatment, of specific patient demographics during hospital triaging. We aim to reveal whether a patient’s treatment and hospital disposition is related to the following attributes - Emergency Severity Index (ESI), gender, employment status, insurance status, race, or ethnicity which our 100 MB dataset included. Our work is separated into two parts - the classification task and data analysis. As part of the classification task, we used the k-Nearest-Neighbor classifier, the F1-score, and a random forest. We then analyze the data using SHapley Additive exPlanations (SHAP) values to determine the importance of each attribute. Our findings show that significance varies for each attribute. Notably, we found that patients with private insurance programs receive better treatment compared to patients with federal-run healthcare programs (e.g. Medicaid, Medicare). Furthermore, a patient’s ethnicity has a greater impact on treatment for patients under 40 years of age for any given ESI level. Surprisingly, our findings show language is not a barrier during treatment. Discussion and conclusion: We, therefore, conclude that although hospitals may not be doing so intentionally, there is a systemic bias in hospital triaging for specific patient demographics. For future works, we hope to aggregate additional patient data from hospitals to find whether specific demographics of patients receive better healthcare in different parts of the United States.",
    link: "https://www.biomedscijournal.com/articles/abse-aid1022.php",
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
                      onClick={() => window.open(pub.link, "_blank", "noopener,noreferrer")}
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

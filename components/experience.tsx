"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, MapPin } from "lucide-react"

const experiences = [
  {
    company: "General Dynamics Information Technology",
    position: "Software Engineer Intern",
    period: "Jun 2025 - Present",
    location: "Annapolis Junction, MD",
    description:
      "Developing multimodal deep learning software for precision targeting, navigation intelligence, and situational awareness.",
    technologies: ["Python", "Deep Learning", "Computer Vision", "AWS"],
    current: true,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/General_Dynamics_logo.svg/2560px-General_Dynamics_logo.svg.png",
  },
  {
    company: "General Dynamics Information Technology",
    position: "Technical Project Lead (Contract)",
    period: "Jan 2025 - May 2025",
    location: "College Park, MD",
    description:
      "Engineered a scalable RAG-powered LLM in AWS Bedrock for email insight and analysis on 600,000+ email database. Built LangChain pipeline to populate Neo4J and Qdrant for relationship mapping and similarity search across 150+ entities. Boosted MMR accuracy by 40% with Microsoft E5 semantic chunking, NER analysis, and email metadata.",
    technologies: ["AWS Bedrock", "LangChain", "Neo4J", "Qdrant", "Python", "NLP"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/General_Dynamics_logo.svg/2560px-General_Dynamics_logo.svg.png",
  },
  {
    company: "Booz Allen Hamilton",
    position: "Technical Project Manager (Contract)",
    period: "Sep 2024 - Dec 2024",
    location: "College Park, MD",
    description:
      "Enabled employees to query and annotate 500+ Medicaid/CHIP claims by creating application for U.S. Government contract. Automated policy retrieval with Selenium CRON job, cutting manual effort by 80% and saving $50,000+ annually. Developed policy comparison, keyword generation, and sentiment analysis with BART, Scikit-learn, and GLiNER.",
    technologies: ["Selenium", "PostgreSQL", "Express.js", "BART", "Scikit-learn", "GLiNER"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Booz_Allen_Hamilton_logo.svg/2560px-Booz_Allen_Hamilton_logo.svg.png",
  },
  {
    company: "Internal Revenue Service",
    position: "Software Engineer Intern",
    period: "Jan 2024 - Dec 2024",
    location: "Washington, DC",
    description:
      "Modernized 100% of post-ETL processes for criminal auditing tool that analyzes 750,000+ taxpayer applications each day. Resolved 50+ defects in Java and migrated 20-year-old build system from Ant to Maven in IBM Rational Team Concert. Deployed division-wide Jenkins CI/CD pipeline upgrade from JDK 11 to 17 with 100% path coverage in JUnit.",
    technologies: ["Java", "Maven", "Jenkins", "IBM RTC", "JUnit", "CI/CD"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Seal_of_the_United_States_Internal_Revenue_Service.svg/2048px-Seal_of_the_United_States_Internal_Revenue_Service.svg.png",
  },
]

export function Experience() {
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
    <section id="experience" ref={ref} className="py-24">
      <div className="container mx-auto px-4">
        <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
          <h2 className="text-5xl md:text-6xl text-center mb-16 text-gradient tracking-wider font-heading">
            PROFESSIONAL JOURNEY
          </h2>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary to-primary/20" />

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div key={index} className={`relative flex items-start gap-8 slide-up stagger-${index + 1}`}>
                    {/* Timeline dot */}
                    <div className="relative z-10 flex-shrink-0 mt-6">
                      <div className={`w-3 h-3 rounded-full bg-primary ${exp.current ? "ring-4 ring-primary/20" : ""}`}>
                        {exp.current && (
                          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <Card className="flex-1 bg-card elegant-shadow hover:elegant-shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
                      {/* Company Logo Background */}
                      <div className="absolute top-4 right-4 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                        <img
                          src={exp.logo || "/placeholder.svg"}
                          alt={`${exp.company} logo`}
                          className="w-full h-full object-contain filter grayscale logo-float"
                        />
                      </div>

                      {/* Large Background Logo */}
                      <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-3 group-hover:opacity-5 transition-opacity duration-500">
                        <img
                          src={exp.logo || "/placeholder.svg"}
                          alt={`${exp.company} logo`}
                          className="w-full h-full object-contain filter grayscale logo-float"
                          style={{ animationDelay: "1s" }}
                        />
                      </div>

                      <CardHeader className="pb-4 relative z-10">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="space-y-2">
                            <CardTitle className="text-xl group-hover:text-primary transition-colors tracking-wider font-heading">
                              {exp.position.toUpperCase()}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Building className="h-4 w-4" />
                              <span className="body-text">{exp.company}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span className="body-text">{exp.period}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span className="body-text">{exp.location}</span>
                              </div>
                            </div>
                          </div>
                          {exp.current && (
                            <Badge className="bg-primary text-primary-foreground font-heading tracking-wider">
                              CURRENT
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-muted-foreground mb-6 leading-relaxed body-text">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="hover:bg-primary hover:text-primary-foreground transition-all duration-200 body-text"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

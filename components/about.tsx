"use client"

import { useEffect, useRef, useState } from "react"

const skills = [
  { name: "PYTHON", level: 95, category: "LANGUAGES" },
  { name: "JAVA", level: 92, category: "LANGUAGES" },
  { name: "R", level: 85, category: "LANGUAGES" },

  { name: "AWS (SageMaker, Lambda, Bedrock)", level: 83, category: "CLOUD" },

  { name: "TENSORFLOW / KERAS", level: 93, category: "ML/AI" },
  { name: "LANGCHAIN", level: 90, category: "ML/AI" },

  // { name: "EXCEL", level: 90, category: "BI" },
]

// const interests = [
//   { name: "MACHINE LEARNING", description: "Deep learning & neural networks" },
//   { name: "DATA SCIENCE", description: "Statistical analysis & insights" },
//   { name: "GOVERNMENT TECH", description: "National security applications" },
//   { name: "RESEARCH", description: "Academic publications & innovation" },
//   { name: "GOLF", description: "Club president & national competitor" },
// ]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [skillsVisible, setSkillsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setSkillsVisible(true), 300)
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
    <section id="about" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
          <h2 className="text-5xl md:text-6xl text-center mb-16 text-gradient tracking-wider font-heading">ABOUT ME</h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Bio Section */}
              <div className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed body-text mb-6">
                    I’m a Computer Science student at the University of Maryland, specializing in <span className="font-medium">Machine Learning</span>, with minors in <span className="font-medium">Business</span> and <span className="font-medium">Statistics</span>.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed body-text mb-6">
                    My work centers around <span className="font-medium">modernizing data pipelines</span> and building <span className="font-medium">zero-to-one solutions</span>. My research explores <span className="font-medium">reinforcement learning</span> to help advance human decision-making through AGI.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed body-text mb-6">
                    Outside of tech, I enjoy <span className="font-medium">playing golf</span>, <span className="font-medium">hiking</span>, <span className="font-medium">traveling</span>, or just spending time outdoors.
                  </p>

                  <p className="text-lg text-muted-foreground leading-relaxed body-text">
                    I’m always looking to make a <span className="font-medium">meaningful impact</span>—whether through work, volunteering, or collaboration. <span className="font-medium">Feel free to reach out</span> if you'd like to connect!
                  </p>

                  
                </div>

                {/* <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "YEARS EXPERIENCE", value: "3+", delay: "stagger-1" },
                    { label: "PROJECTS COMPLETED", value: "15+", delay: "stagger-2" },
                    { label: "PUBLICATIONS", value: "3", delay: "stagger-3" },
                    { label: "LINES OF CODE", value: "100K+", delay: "stagger-4" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`text-center p-6 bg-card rounded-lg elegant-shadow hover:elegant-shadow-lg transition-all duration-300 hover:-translate-y-1 ${stat.delay}`}
                    >
                      <div className="text-3xl text-primary mb-2 tracking-wider font-heading">{stat.value}</div>
                      <div className="text-sm text-muted-foreground body-text">{stat.label}</div>
                    </div>
                  ))}
                </div> */}
              </div>

              {/* Skills Section */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl mb-8 text-primary tracking-wider font-heading">TOP TECHNICAL SKILLS</h3>
                  <div className="space-y-6">
                    {skills.map((skill, index) => (
                      <div key={skill.name} className="group">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-foreground font-heading tracking-wide">{skill.name}</span>
                          <span className="text-xs text-muted-foreground px-3 py-1 bg-secondary rounded-full body-text">
                            {skill.category}
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out ${
                              skillsVisible ? "opacity-100" : "opacity-0"
                            }`}
                            style={{
                              width: skillsVisible ? `${skill.level}%` : "0%",
                              transitionDelay: `${index * 100}ms`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interests Section
            <div className="mt-20">
              <h3 className="text-2xl mb-12 text-center text-accent tracking-wider font-heading">AREAS OF INTEREST</h3>
              <div className="grid md:grid-cols-5 gap-6">
                {interests.map((interest, index) => (
                  <div
                    key={interest.name}
                    className={`group p-6 bg-card rounded-lg elegant-shadow hover:elegant-shadow-lg transition-all duration-300 hover:-translate-y-2 text-center stagger-${
                      index + 1
                    }`}
                  >
                    <h4 className="text-foreground mb-3 group-hover:text-primary transition-colors font-heading tracking-wide">
                      {interest.name}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed body-text">{interest.description}</p>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

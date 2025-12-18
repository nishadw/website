"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowDown, FileText, Code2, BookOpen, User, TrendingUp, Brain, Gamepad2, Target, Network } from "lucide-react"
import { Link } from "react-scroll"
import { Analytics } from "@vercel/analytics/next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// --- Scramble hooks (Unchanged) ---
function useCharacterScramble(text: string, options = {}, startCondition = true) {
  const { revealSpeed = 2, scrambleDuration = 20, totalDuration } = options as any
  const [displayText, setDisplayText] = useState("")
  const chars = "!@#$%^&*!@#$%^&*"

  useEffect(() => {
    let frameRequest: number
    let frameCount = 0
    const queue: any[] = []

    if (startCondition && text) {
      const effectiveRevealSpeed = totalDuration
        ? (totalDuration - scrambleDuration) / text.length
        : revealSpeed

      for (let i = 0; i < text.length; i++) {
        const start = i * effectiveRevealSpeed
        const end = start + scrambleDuration
        queue.push({ to: text[i], start, end, char: "" })
      }

      setDisplayText(text.split("").map(() => "").join(""))

      const animate = () => {
        let complete = 0
        const updatedOutput = queue.map((item) => {
          const { start, end } = item
          if (frameCount >= start) {
            if (frameCount <= end) {
              item.char = chars[Math.floor(Math.random() * chars.length)]
            } else {
              item.char = item.to
            }
          }
          if (item.char === item.to) complete++
          return item.char
        })

        setDisplayText(updatedOutput.join(""))

        if (complete !== queue.length) {
          frameRequest = requestAnimationFrame(animate)
          frameCount++
        }
      }

      animate()
    } else if (!startCondition) {
      setDisplayText("")
    }

    return () => cancelAnimationFrame(frameRequest)
  }, [text, revealSpeed, scrambleDuration, totalDuration, startCondition])

  return displayText
}

function ScrambledText({ text, options, startCondition }: any) {
  const scrambledText = useCharacterScramble(text, options, startCondition)
  return <>{scrambledText || " "}</>
}

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

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

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [])

  // Data
  const coursework = [
    "Computational Game Theory", "Machine Learning", "Artificial Intelligence", "Computer Vision", "Data Science", "Computer Systems", "Data Structures & Algorithms", "Organization of Programming Languages", 
    "Statistical Computing", "Applied Probability & Statistics", 
     "Financial Markets", "Supply Chain Management", "Accounting", "Microeconomics", "Discrete Mathematics", "Multivariate Calculus", "Linear Algebra"
  ]
  
  const skillCategories = [
    {
      category: "Languages",
      items: ["Python", "C/C++", "Java", "JavaScript", "SQL", "R", "Rust", "OCaml", "Bash", "x86-64"]
    },
    {
      category: "AI & Data",
      items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "LangChain", "RStudio", "MatLab", "SAS", "NumPy"]
    },
    {
      category: "Dev & Cloud",
      items: ["React.js", "Node.js", "Flask", "AWS", "Jenkins", "PostgreSQL", "Neo4J", "Qdrant", "Linux", "Git"]
    }
  ]

  // Unified Speed Option
  const bioOptions = { totalDuration: 80, scrambleDuration: 15 }

  return (
    <section id="hero" ref={ref} className="relative min-h-screen container mx-auto pb-12 pt-4 flex items-center justify-center">
      
      {/* Bento Grid Layout */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

        {/* 1. Profile Box */}
        <Card className="lg:row-span-2 bg-card/75 elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl flex flex-col items-center justify-center p-8 text-center border-border/50">
           <div className="relative inline-block mb-8 mt-4">
              <img
                src="/p2.png?height=300&width=300"
                alt="Nishad Wajge"
                className="w-72 h-80 rounded-3xl mx-auto object-cover object-center elegant-shadow-lg hover:scale-105 transition-transform duration-500 float-animation"
              />
            </div>
            <h1 className="text-4xl md:text-5xl leading-tight tracking-wider font-heading text-white mb-6">
              <ScrambledText text="NISHAD WAJGE" options={bioOptions} startCondition={isVisible} />
            </h1>
            
            <div className="flex justify-center space-x-3">
              {[
                { icon: Github, href: "https://github.com/nishadw", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/nishadwajge", label: "LinkedIn" },
                { icon: Mail, href: "mailto:nishad.wajge@gmail.com", label: "Email" },
                { icon: FileText, href: "https://drive.google.com/file/d/17JyEIwqFjnf9VDQoQ39DiKqNPmQqbm9E/view?usp=sharing", label: "Resume" },
              ].map(({ icon: Icon, href, label }, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className={`bg-card/50 elegant-shadow hover:elegant-shadow-lg hover:scale-110 transition-all duration-300 rounded-xl h-12 w-12`}
                  asChild
                >
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon className="h-6 w-6 text-white" />
                  </a>
                </Button>
              ))}
            </div>
        </Card>

        {/* 2. About Me */}
        <Card className="md:col-span-2 bg-card/75 elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl border-border/50">
          <CardHeader>
             <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl font-heading tracking-wide">
                    <ScrambledText text="About Me" options={bioOptions} startCondition={isVisible} />
                </CardTitle>
             </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm font-mono leading-relaxed">
              <ScrambledText 
                text="I am a student at the University of Maryland studying Computer Science, Business, and Statistics. I enjoy building systems that leverage data to solve complex problems. I'm always looking to make a meaningful impact through my work, so feel free to reach out!" 
                options={bioOptions} 
                startCondition={isVisible} 
              />
            </p>
          </CardContent>
        </Card>

        {/* 3. Areas of Interest */}
        <Card className="bg-card/75 elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-heading tracking-wide">
                  <ScrambledText text="Areas of Interest" options={bioOptions} startCondition={isVisible} />
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col gap-4 mt-1">
                
                {/* ML/AI */}
                <div className="flex items-start gap-3">
                   <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                      <Brain className="h-4 w-4 text-primary" />
                   </div>
                   <div>
                      <h3 className="font-semibold text-white text-sm">
                        <ScrambledText text="Artificial Intelligence" options={bioOptions} startCondition={isVisible} />
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        <ScrambledText text="Computer Vision, Generative AI, Natural Language Processing, & Neural Networks" options={bioOptions} startCondition={isVisible} />
                      </p>
                   </div>
                </div>

                {/* Quant */}
                <div className="flex items-start gap-3">
                   <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-primary" />
                   </div>
                   <div>
                      <h3 className="font-semibold text-white text-sm">
                        <ScrambledText text="Quantitative Finance" options={bioOptions} startCondition={isVisible} />
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        <ScrambledText text="Algorithmic Trading, Stochastic Modeling, Time-Series Analysis, & Risk Management" options={bioOptions} startCondition={isVisible} />
                      </p>
                   </div>
                </div>

                {/* Game Theory */}
                <div className="flex items-start gap-3">
                   <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                      <Gamepad2 className="h-4 w-4 text-primary" />
                   </div>
                   <div>
                      <h3 className="font-semibold text-white text-sm">
                        <ScrambledText text="Game Theory" options={bioOptions} startCondition={isVisible} />
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        <ScrambledText text="Markov Decision Processes, Stochastic Optimization, & Reinforcement Learning" options={bioOptions} startCondition={isVisible} />
                      </p>
                   </div>
                </div>

                {/* Software Engineering */}
                <div className="flex items-start gap-3">
                   <div className="mt-1 bg-primary/10 p-2 rounded-lg">
                      <Network className="h-4 w-4 text-primary" />
                   </div>
                   <div>
                      <h3 className="font-semibold text-white text-sm">
                        <ScrambledText text="Software Engineering" options={bioOptions} startCondition={isVisible} />
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        <ScrambledText text="DevOps, Cloud Computing, Full Stack Development, & System Design" options={bioOptions} startCondition={isVisible} />
                      </p>
                   </div>
                </div>

             </div>
          </CardContent>
        </Card>

        {/* 4. Technical Skills */}
        <Card className="bg-card/75 elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl border-border/50">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                    <Code2 className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl font-heading tracking-wide">
                        <ScrambledText text="Technical Skills" options={bioOptions} startCondition={isVisible} />
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                  {skillCategories.map((group) => (
                    <div key={group.category} className="space-y-2">
                      <h4 className="text-xs font-semibold font-mono text-muted-foreground uppercase tracking-wider pl-1">
                        <ScrambledText text={group.category} options={bioOptions} startCondition={isVisible} />
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((skill) => (
                          <Badge 
                            key={skill} 
                            variant="outline" 
                            className="font-mono bg-background/50 hover:bg-primary/20 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
            </CardContent>
        </Card>

        {/* 5. Coursework */}
        <Card className="lg:col-span-3 bg-card/75 elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl border-border/50">
             <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl font-heading tracking-wide">
                        <ScrambledText text="Academic coursework" options={bioOptions} startCondition={isVisible} />
                    </CardTitle>
                </div>
            </CardHeader>
             <CardContent>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course) => (
                    <Badge 
                        key={course} 
                        variant="outline" 
                        className="font-mono bg-background/50 hover:bg-primary/20 transition-colors"
                    >
                        {course}
                    </Badge>
                  ))}
                </div>
            </CardContent>
        </Card>

      </div>

      <Analytics />
    </section>
  )
}
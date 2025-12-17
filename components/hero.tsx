"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowDown, FileText, GraduationCap, Code2, BookOpen, User } from "lucide-react"
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
    "Computational Game Theory", "Machine Learning", "Artificial Intelligence", "Computer Vision",
    "Data Science", "Computer Systems", "Statistical Computing",
    "Applied Probability & Statistics", "Data Structures & Algorithms", "Supply Chain Management", "Accounting", "Microeconomics", "Discrete Mathematics",
  ]
  
  const skills = [
      // Languages
      "Python", "Java", "C/C++", "JavaScript", "SQL", "R", "Rust", "Bash", "Assembly",
      // Frameworks & Libraries
      "PyTorch", "TensorFlow", "Keras", "Scikit-learn", "LangChain", "React.js", "Node.js", "Flask",
      // Tools & DBs
      "Git", "Linux", "AWS", "PostgreSQL", "GraphQL", "Neo4J", "Qdrant", "SAS", "MatLab"
    ]

  const bioOptions = { totalDuration: 80, scrambleDuration: 15 }

  return (
    <section id="hero" ref={ref} className="relative min-h-screen container mx-auto px-4 py-24 flex items-center justify-center">
      
      {/* Bento Grid Layout */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

        {/* 1. Profile Box (Larger Image, Left Side) */}
        <Card className="lg:row-span-2 bg-card/75 elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl flex flex-col items-center justify-center p-8 text-center border-border/50">
           <div className="relative inline-block mb-8 mt-4">
              {/* Image made significantly bigger */}
              <img
                src="/p2.png?height=300&width=300"
                alt="Nishad Wajge"
                className="w-72 h-80 rounded-3xl mx-auto object-cover object-center elegant-shadow-lg hover:scale-105 transition-transform duration-500 float-animation"
              />
            </div>
            <h1 className="text-4xl md:text-5xl leading-tight tracking-wider font-heading text-white mb-6">
              <ScrambledText text="NISHAD WAJGE" options={{ revealSpeed: 4, scrambleDuration: 10 }} startCondition={isVisible} />
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

        {/* 2. About Me (Top Right - Wide) */}
        <Card className="md:col-span-2 bg-card/75 elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl border-border/50">
          <CardHeader>
             <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <CardTitle className="text-xl font-heading tracking-wide">About Me</CardTitle>
             </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground font-mono leading-relaxed">
              <ScrambledText 
                text="I am a Computer Science student with a strong interest in software engineering, artificial intelligence, game theory, and securities trading. I enjoy building systems that leverage data to solve complex problems." 
                options={{ totalDuration: 40, scrambleDuration: 5 }} 
                startCondition={isVisible} 
              />
            </p>
          </CardContent>
        </Card>

        {/* 3. Education (Middle Right - Small Box) */}
        <Card className="bg-card/75 elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl font-heading tracking-wide">
                  <ScrambledText text="Education" options={bioOptions} startCondition={isVisible} />
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col gap-1">
                <p className="font-semibold text-primary text-lg leading-relaxed">
                  University of Maryland, College Park
                </p>
                <p className="text-muted-foreground font-mono text-med leading-relaxed">
                  2023 - 2026 <br/> 
                  Computer Science & Machine Learning <br/>
                  Minors: Business, Statistics <br/> <br/>
                  Clubs: App Development Club, Google Developer Student Club, Club Golf
                </p>
             </div>
          </CardContent>
        </Card>

        {/* 4. Technical Skills (Middle Right - Small Box) */}
        <Card className="bg-card/75 elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl border-border/50">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    <Code2 className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl font-heading tracking-wide">Tech Stack</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="font-mono bg-background/50 hover:bg-primary/20 transition-colors">{skill}</Badge>
                  ))}
                </div>
            </CardContent>
        </Card>

        {/* 5. Coursework / Interests (Bottom - Full Width) */}
        <Card className="lg:col-span-3 bg-card/75 elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl border-border/50">
             <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl font-heading tracking-wide">Academic Focus</CardTitle>
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

      {/* Explore More Button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <Link
          to="experience"
          smooth={true}
          duration={1000}
          offset={-50}
          containerId="scroll-container"
        >
          <Button variant="ghost" className="group animate-hover-up-down hover:bg-transparent text-muted-foreground hover:text-white transition-all duration-300 font-heading tracking-wider">
            <span className="mr-2">EXPLORE MORE </span>
            <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>

      <Analytics />
    </section>
  )
}
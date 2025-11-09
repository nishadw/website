"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowDown, FileText, GraduationCap, Trophy } from "lucide-react"
import { Link } from "react-scroll"
import { Analytics } from "@vercel/analytics/next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Scramble text hook
function useCharacterScramble(text, options = {}, startCondition = true) {
  const { revealSpeed = 2, scrambleDuration = 20, totalDuration } = options
  const [displayText, setDisplayText] = useState("")
  const chars = "!@#$%^&*!@#$%^&*"

  useEffect(() => {
    let frameRequest
    let frameCount = 0
    const queue = []

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

function ScrambledText({ text, options, startCondition }) {
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

  const coursework = [
    "Computational Game Theory", "Machine Learning", 
    "Data Science", "Computer Systems", "Statistical Computing",
    "Probability & Statistics", "Data Structures & Algorithms", "Supply Chain Management", "Accounting"
  ]

  const bioOptions = { totalDuration: 80, scrambleDuration: 15 }

  return (
    <section id="hero" ref={ref} className="relative min-h-screen container mx-auto px-4 flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">

        {/* Left Column */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className={`space-y-8 ${isVisible ? "fade-in" : "opacity-0"}`}>
            <div className="mb-12">
              <div className="relative inline-block mt-20">
                <img
                  src="/p2.png?height=180&width=180"
                  alt="Nishad Wajge"
                  className="w-72 h-80 rounded-3xl mx-auto object-cover object-center scale-125 elegant-shadow-lg hover:scale-150 transition-transform duration-500 float-animation"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-6xl md:text-8xl leading-tight tracking-wider font-heading text-white">
                <ScrambledText text="NISHAD WAJGE" options={{ revealSpeed: 6, scrambleDuration: 10 }} startCondition={isVisible} />
              </h1>
            </div>

            <div className="flex justify-center space-x-2">
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
                  className={`bg-card/75 elegant-shadow hover:elegant-shadow-lg hover:scale-110 transition-all duration-300 stagger-${index + 1} rounded-xl`}
                  asChild
                >
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon className="h-32 w-32 text-white " />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div id="about" className="flex flex-col justify-center items-center font-mono">
          <div className={`${isVisible ? "fade-in" : "opacity-0"} space-y-8`}>

            {/* University Card */}
            <Card className="elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl bg-card/75 ">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <GraduationCap className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-2xl font-heading tracking-wide">
                      <ScrambledText text="University of Maryland – College Park" options={bioOptions} startCondition={isVisible} />
                    </CardTitle>
                    <p className="font-semibold text-primary">
                      <ScrambledText text="BS Computer Science (Machine Learning)" options={bioOptions} startCondition={isVisible} />
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <ScrambledText text="Minors: Business, Statistics • 2023 – 2026" options={bioOptions} startCondition={isVisible} />
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className = "ml-12">
                <h4 className="font-heading tracking-wide mb-3 text-med">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course) => (
                    <Badge key={course} variant="secondary" className="font-mono px-3 py-1">{course}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* App Dev */}
            <Card className="elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl bg-card/75">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Trophy className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-2xl font-heading tracking-wide">
                      <ScrambledText text="App Dev Club – Project Lead" options={bioOptions} startCondition={isVisible} />
                    </CardTitle>
                    <p className="font-semibold text-primary">
                      <ScrambledText text="Sep 2024 – May 2025" options={bioOptions} startCondition={isVisible} />
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <ScrambledText text="Previous Position: Project Manager" options={bioOptions} startCondition={isVisible} />
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Club Golf Card */}
            <Card className="elegant-shadow hover:elegant-shadow-lg transition-all duration-300 rounded-3xl bg-card/75">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Trophy className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-2xl font-heading tracking-wide">
                      <ScrambledText text="Club Golf – Vice President" options={bioOptions} startCondition={isVisible} />
                    </CardTitle>
                    <p className="font-semibold text-primary">
                      <ScrambledText text="Jan 2025 – Present" options={bioOptions} startCondition={isVisible} />
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <ScrambledText text="Previous Position: Social Media Chair" options={bioOptions} startCondition={isVisible} />
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            

          </div>
        </div>

      </div>

      {/* Explore More Button */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2">
        <Link
          to="experience"
          smooth={true}
          duration={1000}
          offset={-50}
          // STEP 3: Add this prop
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

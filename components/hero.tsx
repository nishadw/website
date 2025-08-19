"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowDown, FileText, GraduationCap, Trophy } from "lucide-react"
import { Link } from "react-scroll"
import { Analytics } from "@vercel/analytics/next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// The hook now accepts a 'totalDuration' to synchronize animations
function useCharacterScramble(text, options = {}, startCondition = true) {
  const { revealSpeed = 2, scrambleDuration = 20, totalDuration } = options
  const [displayText, setDisplayText] = useState("")
  const chars = "!<>-_\\/[]{}—=+*^?#________"

  useEffect(() => {
    let frameRequest
    let frameCount = 0
    const queue = []

    if (startCondition && text) {
      // If totalDuration is provided, calculate revealSpeed dynamically
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

// Helper component to easily apply the hook
function ScrambledText({ text, options, startCondition }) {
  const scrambledText = useCharacterScramble(text, options, startCondition)
  return <>{scrambledText || " "}</> // Return a space to maintain layout height
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

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const coursework = [
    "Computational Game Theory", "Machine Learning", "Data Structures & Algorithms",
    "Data Science", "Computer Systems", "Statistical Computing", "Discrete Mathematics",
    "Probability & Statistics", "Multivariable Calculus", "Linear Algebra",
    "Supply Chain Management", "Accounting"
  ]

  // Using 'totalDuration' for a fast, synchronized effect across all text
  const bioOptions = { totalDuration: 80, scrambleDuration: 15 }

  return (
    <section id="hero" ref={ref} className="relative min-h-screen container mx-auto px-4 flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full">
        
        {/* ============================================= */}
        {/* ========== LEFT COLUMN (HERO) =============== */}
        {/* ============================================= */}
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

            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl text-gradient leading-tight tracking-wider font-heading">
                <ScrambledText text="NISHAD WAJGE" options={{ revealSpeed: 6, scrambleDuration: 10 }} startCondition={isVisible} />
              </h1>
            </div>

            <div className="flex justify-center space-x-2 pt-2">
              {[
                { icon: Github, href: "https://github.com/nishadw", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/nishadwajge", label: "LinkedIn" },
                { icon: Mail, href: "mailto:nishad.wajge@gmail.com", label: "Email" },
                { icon: FileText, href: "https://drive.google.com/file/d/17JyEIwqFjnf9VDQoQ39DiKqNPmQqbm9E/view?usp=sharing", label: "Resume" },
              ].map(({ icon: Icon, href, label }, index) => (
                <Button key={index} variant="outline" size="icon" className={`elegant-shadow hover:elegant-shadow-lg hover:scale-110 transition-all duration-300 stagger-${index + 1}`} asChild>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon className="h-8 w-8" />
                  </a>
                </Button>
              ))}
            </div>

            {/* The "EXPLORE MORE" button has been moved out of this column */}

          </div>
        </div>

        {/* ============================================= */}
        {/* ========== RIGHT COLUMN (ABOUT) ============= */}
        {/* ============================================= */}
        <div id="about" className="flex flex-col justify-center font-mono">
          <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
            <div className="space-y-6 text-md text-muted-foreground leading-relaxed body-text">
              <p><ScrambledText text="Studying Computer Science and Machine Learning with minors in Business and Statistics at UMD." options={bioOptions} startCondition={isVisible} /></p>
              <p><ScrambledText text="Exploring the research and application of Game Theory, AI/ML, NLP, and Software Engineering to aid human decision-making." options={bioOptions} startCondition={isVisible} /></p>
              <p><ScrambledText text="Always looking to make a meaningful impact with my work, so feel free to reach out!" options={bioOptions} startCondition={isVisible} /></p>
            </div>

            <div className="space-y-8 mt-12">
              <Card className="elegant-shadow hover:elegant-shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <GraduationCap className="h-8 w-8 text-primary mt-1" />
                    <div>
                      <CardTitle className="text-2xl font-heading tracking-wide"><ScrambledText text="University of Maryland" options={bioOptions} startCondition={isVisible} /></CardTitle>
                      <p className="font-semibold text-primary"><ScrambledText text="BS Computer Science (Machine Learning)" options={bioOptions} startCondition={isVisible} /></p>
                      <p className="text-sm text-muted-foreground"><ScrambledText text="Minors: Business, Statistics • 2023 – 2026" options={bioOptions} startCondition={isVisible} /></p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-heading tracking-wide mb-3">Relevant Coursework:</h4>
                  <div className="flex flex-wrap gap-2">
                    {coursework.map((course) => (<Badge key={course} variant="secondary" className="body-text">{course}</Badge>))}
                  </div>
                </CardContent>
              </Card>

              <Card className="elegant-shadow hover:elegant-shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Trophy className="h-8 w-8 text-primary mt-1" />
                    <div>
                      <CardTitle className="text-2xl font-heading tracking-wide"><ScrambledText text="Club Golf – President" options={bioOptions} startCondition={isVisible} /></CardTitle>
                      <p className="font-semibold text-primary"><ScrambledText text="Jan 2025 – Present" options={bioOptions} startCondition={isVisible} /></p>
                      <p className="text-sm text-muted-foreground"><ScrambledText text="Previous Position: Social Media Chair" options={bioOptions} startCondition={isVisible} /></p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* ========================================================= */}
      {/* ========== CENTERED AND ANIMATED EXPLORE BUTTON ========= */}
      {/* ========================================================= */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2"> 
        <Link to="experience" smooth={true} duration={1000} offset={-50}>
          <Button variant="ghost" className="group animate-hover-up-down hover:bg-transparent text-muted-foreground hover:text-primary transition-all duration-300 font-heading tracking-wider">
            <span className="mr-2">EXPLORE MORE</span>
            <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>

      <Analytics />
    </section>
  )
}
"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Trophy, MapPin, Calendar } from "lucide-react"

export function About() {
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
      { threshold: 0.1 },
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
    "Data Structures & Algorithms", "Machine Learning", "Data Science",
    "Computational Game Theory", "Computer Systems", "Statistical Computing",
    "Applied Probability & Statistics", "Discrete Math", "Multivariate Calculus", "Linear Algebra",
  ]

  return (
    <section id="about" ref={ref} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
          <h2 className="text-5xl md:text-6xl text-center mb-16 text-gradient tracking-wider font-heading">ABOUT ME</h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Bio */}
              <div className="space-y-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed body-text">
                    I’m a Computer Science student at the University of Maryland, specializing in <span className="font-medium text-foreground">Machine Learning</span>, with minors in <span className="font-medium text-foreground">Business</span> and <span className="font-medium text-foreground">Statistics</span>.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed body-text">
                    My work centers around <span className="font-medium text-foreground">modernizing data pipelines</span> and building <span className="font-medium text-foreground">zero-to-one solutions</span>. My research explores <span className="font-medium text-foreground">reinforcement learning</span> to help advance human decision-making through AGI.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed body-text">
                    Outside of tech, I enjoy <span className="font-medium text-foreground">playing golf</span>, <span className="font-medium text-foreground">hiking</span>, <span className="font-medium text-foreground">traveling</span>, or just spending time outdoors. I’m always looking to make a meaningful impact—<span className="font-medium text-foreground">feel free to reach out</span> if you'd like to connect!
                  </p>
                </div>
              </div>

              {/* Right Column: Education & Leadership */}
              <div className="space-y-8">
                {/* Education Card */}
                <Card className="elegant-shadow hover:elegant-shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <GraduationCap className="h-8 w-8 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-xl font-heading tracking-wide">University of Maryland</CardTitle>
                        <p className="font-semibold text-primary">BS Computer Science (Machine Learning)</p>
                        <p className="text-sm text-muted-foreground">Minors: Business, Statistics • 2023 – 2026</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-heading tracking-wide mb-3">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-2">
                      {coursework.map((course) => (
                        <Badge key={course} variant="secondary" className="body-text">{course}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Leadership Card */}
                <Card className="elegant-shadow hover:elegant-shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Trophy className="h-8 w-8 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-xl font-heading tracking-wide">Club Golf – President</CardTitle>
                        <p className="font-semibold text-primary">Jan 2025 – Present</p>
                        <p className="text-sm text-muted-foreground">Previous Position: Social Media Chair (Handicap: 4.4)</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
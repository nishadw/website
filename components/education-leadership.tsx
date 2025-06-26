"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Trophy, MapPin, Calendar } from "lucide-react"

export function EducationLeadership() {
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

  const coursework = [
    "Data Structures & Algorithms",
    "Machine Learning",
    "Data Science",
    "Computational Game Theory",
    "Computer Systems",
    "Statistical Computing",
    "Applied Probability & Statistics",
    "Discrete Math",
    "Multivariate Calculus",
    "Linear Algebra",
  ]

  return (
    <section id="education" ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Education & Leadership</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Education */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">University of Maryland – College Park</CardTitle>
                    </div>
                    <p className="text-lg font-semibold text-primary mb-1">
                      BS Computer Science (Concentration: Machine Learning)
                    </p>
                    <p className="text-muted-foreground mb-2">Minors: Business, Statistics</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Aug 2023 – Dec 2026</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>College Park, MD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-semibold mb-3">Relevant Coursework:</h4>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((course) => (
                    <Badge key={course} variant="secondary" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leadership */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">Club Golf - President</CardTitle>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Jan 2025 – Present</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>College Park, MD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Directed practices, tournaments, and fundraisers, leading team to rank third in the national ranking
                  and 2x National bids. Collaborated with other clubs to organize events while serving as a liaison for
                  alumni and prospective club members.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-primary border-primary">
                    3rd National Ranking
                  </Badge>
                  <Badge variant="outline" className="text-primary border-primary">
                    2x National Bids
                  </Badge>
                  <Badge variant="secondary">Leadership</Badge>
                  <Badge variant="secondary">Event Management</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

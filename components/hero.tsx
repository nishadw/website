"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowDown, FileText } from "lucide-react"
import { Link } from "react-scroll" // ✅ added for smooth scroll
import { Analytics } from "@vercel/analytics/next"  // <-- added import

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative">
      <div className="container mx-auto px-4 text-center">
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
              NISHAD WAJGE
            </h1>

            <div className="space-y-2">
              <p className="text-xl md:text-2xl text-muted-foreground font-heading tracking-wider">
                COMPUTER SCIENCE + MACHINE LEARNING @ UNIVERSITY OF MARYLAND, COLLEGE PARK
              </p>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
            </div>
          </div>

          <div className="flex justify-center space-x-2 pt-2">
            {[
              { icon: Github, href: "https://github.com/nishadw", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/nishadwajge", label: "LinkedIn" },
              { icon: Mail, href: "mailto:nishad.wajge@gmail.com", label: "Email" },
              { icon: FileText, href: "https://drive.google.com/file/d/17JyEIwqFjnf9VDQoQ39DiKqNPmQqbm9E/view?usp=sharing", label: "Resume" }
            ].map(({ icon: Icon, href, label }, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className={`elegant-shadow hover:elegant-shadow-lg hover:scale-110 transition-all duration-300 stagger-${index + 1}`}
                asChild
              >
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon className="h-8 w-8" />
                </a>
              </Button>
            ))}
          </div>

          <div className="pt-8">
            <Link to="about" smooth={true} duration={1000} offset={-96}>
              <Button
                variant="ghost"
                className="group hover:bg-transparent text-muted-foreground hover:text-primary transition-all duration-300 font-heading tracking-wider"
              >
                <span className="mr-2">EXPLORE MORE</span>
                <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Analytics /> {/* Added here to track page views */}
    </section>
  )
}

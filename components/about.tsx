"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Trophy } from "lucide-react"

// The configurable scramble hook with a start condition
function useCharacterScramble(text, options = {}, startCondition = true) {
  const { revealSpeed = 2, scrambleDuration = 20 } = options;
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    let frameRequest;
    let frameCount = 0;
    const queue = [];

    if (startCondition && text) {
        for (let i = 0; i < text.length; i++) {
            const start = i * revealSpeed;
            const end = start + scrambleDuration;
            queue.push({ to: text[i], start, end, char: '' });
        }
        
        setDisplayText(text.split('').map(() => '').join(''));

        const animate = () => {
            let complete = 0;
            const updatedOutput = queue.map((item) => {
                const { start, end } = item;
                if (frameCount >= start) {
                    if (frameCount <= end) {
                        item.char = chars[Math.floor(Math.random() * chars.length)];
                    } else {
                        item.char = item.to;
                    }
                }
                if (item.char === item.to) complete++;
                return item.char;
            });
            
            setDisplayText(updatedOutput.join(''));
            
            if (complete !== queue.length) {
                frameRequest = requestAnimationFrame(animate);
                frameCount++;
            }
        };
        
        animate();
    } else if (!startCondition) {
        setDisplayText('');
    }

    return () => cancelAnimationFrame(frameRequest);
  }, [text, revealSpeed, scrambleDuration, startCondition]); 

  return displayText;
}

// Helper component to easily apply the hook
function ScrambledText({ text, options, startCondition }) {
  const scrambledText = useCharacterScramble(text, options, startCondition);
  return <>{scrambledText || ' '}</>; // Return a space to maintain layout height
}


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
    "Applied Probability & Statistics",
  ]

  const bioOptions = { revealSpeed: 1, scrambleDuration: 30 };
  const cardOptions = { revealSpeed: 4, scrambleDuration: 10 };

  return (
    <section id="about" ref={ref} className="py-24 bg-muted/30 font-mono">
      <div className="container mx-auto px-4">
        <div className={`${isVisible ? "fade-in" : "opacity-0"}`}>
          <h2 className="text-5xl md:text-6xl text-center mb-16 text-gradient tracking-wider font-heading">ABOUT</h2>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed body-text">
                  <ScrambledText text="Studying Computer Science and Machine Learning with minors in Business and Statistics at UMD." options={bioOptions} startCondition={isVisible} />
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed body-text">
                  <ScrambledText text="Exploring the research and application of game theory, deep learning, and software engineering to advance human decision-making." options={bioOptions} startCondition={isVisible} />
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed body-text">
                  <ScrambledText text="Enjoy hiking, golfing, following the stock market, and just spending time outdoors." options={bioOptions} startCondition={isVisible} />
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed body-text">
                  <ScrambledText text="Always looking to make a meaningful impact with my work, so feel free to reach out!" options={bioOptions} startCondition={isVisible} />
                </p>
              </div>

              <div className="space-y-8">
                <Card className="elegant-shadow hover:elegant-shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <GraduationCap className="h-8 w-8 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-xl font-heading tracking-wide">
                          <ScrambledText text="University of Maryland" options={cardOptions} startCondition={isVisible} />
                        </CardTitle>
                        <p className="font-semibold text-primary">
                          <ScrambledText text="BS Computer Science (Machine Learning)" options={cardOptions} startCondition={isVisible} />
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <ScrambledText text="Minors: Business, Statistics • 2023 – 2026" options={cardOptions} startCondition={isVisible} />
                        </p>
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

                <Card className="elegant-shadow hover:elegant-shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Trophy className="h-8 w-8 text-primary mt-1" />
                      <div>
                        <CardTitle className="text-xl font-heading tracking-wide">
                          <ScrambledText text="Club Golf – President" options={cardOptions} startCondition={isVisible} />
                        </CardTitle>
                        <p className="font-semibold text-primary">
                          <ScrambledText text="Jan 2025 – Present" options={cardOptions} startCondition={isVisible} />
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <ScrambledText text="Previous Position: Social Media Chair" options={cardOptions} startCondition={isVisible} />
                        </p>
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
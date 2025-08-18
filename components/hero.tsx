"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowDown, FileText } from "lucide-react"
import { Link } from "react-scroll"
import { Analytics } from "@vercel/analytics/next"

// The configurable scramble hook
function useCharacterScramble(text, options = {}) {
  const { revealSpeed = 2, scrambleDuration = 20 } = options;
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    let frameRequest;
    let frameCount = 0;
    const queue = [];
    
    if (text) {
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
    } else {
        setDisplayText('');
    }

    return () => cancelAnimationFrame(frameRequest);
  }, [text, revealSpeed, scrambleDuration]); 

  return displayText;
}

// A helper component to easily apply the hook
function ScrambledText({ text, options }) {
  const scrambledText = useCharacterScramble(text, options);
  return <>{scrambledText}</>;
}


export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 relative">
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
              <ScrambledText text="NISHAD WAJGE" options={{ revealSpeed: 6, scrambleDuration: 25 }}/>
            </h1>

            <div className="space-y-2">
              {/* --- CHANGE IS HERE: Removed 'font-mono' to inherit Jet Brains Mono from the body --- */}
              <p className="text-xl md:text-lg text-muted-foreground tracking-wider font-mono">
                <ScrambledText text="COMPUTER SCIENCE + MACHINE LEARNING @ UNIVERSITY OF MARYLAND — COLLEGE PARK" options={{ revealSpeed: 1, scrambleDuration: 15 }} />
              </p>
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
      <Analytics />
    </section>
  )
}
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home, Mail, Linkedin, Github, ExternalLink, FileText,
  GraduationCap, Focus, Computer, SquareTerminal, Truck, ChevronRight,
} from "lucide-react"

const experienceItems = [
  { name: "Amazon", icon: Truck, href: "/experience#amazon" },
  { name: "Mercor", icon: SquareTerminal, href: "/experience#mercor" },
  { name: "General Dynamics", icon: Focus, href: "/experience#gdit" },
  { name: "Internal Revenue Service", icon: Computer, href: "/experience#irs" },
]

const publicationItems = [
  { name: "Easy2Hard-Bench", href: "https://neurips.cc/virtual/2024/poster/97554" },
  { name: "Stochastic Optimization in Sports", href: "https://link.springer.com/article/10.1007/s00180-024-01555-5" },
  { name: "Campaigns to Overcome Loss-Aversion", href: "https://terra-docs.s3.us-east-2.amazonaws.com/IJHSR/Articles/volume6-issue5/IJHSR_2024_65_93.pdf" },
  { name: "Trials of Triage", href: "https://www.biomedscijournal.com/journals/abse/abse-aid1022.php" },
]

const contactItems = [
  { name: "Email", icon: Mail, href: "mailto:nishad.wajge@gmail.com" },
  { name: "Linkedin", icon: Linkedin, href: "https://linkedin.com/in/nishadwajge" },
  { name: "GitHub", icon: Github, href: "https://github.com/nishadw" },
  { name: "Google Scholar", icon: GraduationCap, href: "https://scholar.google.com/citations?user=8h70LbUAAAAJ&hl=en" },
]

function IconSwap({ Icon }: { Icon: React.ElementType }) {
  return (
    <div className="relative h-4 w-4 shrink-0">
      <Icon className="absolute inset-0 h-4 w-4 text-[#52525b] transition-opacity duration-150 group-hover:opacity-0" />
      <ChevronRight className="absolute inset-0 h-4 w-4 text-[#a1a1aa] opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
    </div>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isExperience = pathname === "/experience"

  return (
    <aside className="w-72 bg-[#1a1a1a] border-r border-white/5 flex flex-col h-full shrink-0 hidden md:flex relative z-40">

      {/* Profile Header */}
      <div className="h-12 flex items-center px-4 font-mono text-white tracking-tight border-b border-white/5 shrink-0">
        Nishad Wajge
      </div>

      <div className="flex-1 overflow-y-auto py-5 px-3 space-y-8 scrollbar-hide font-mono">

        {/* Home */}
        <div className="space-y-0.5">
          <Link href="/" className={`group flex items-center gap-2 px-2 py-1.5 text-[13px] rounded-md transition-colors hover:bg-white/[0.03] ${isHome ? "text-[#f4f4f5]" : "text-[#a1a1aa] hover:text-[#f4f4f5]"}`}>
            <IconSwap Icon={Home} />
            Home
          </Link>
        </div>

        {/* Experience */}
        <div>
          <h3 className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#52525b]">Experience</h3>
          <div className="space-y-0.5">
            {experienceItems.map((item, i) => {
              const id = item.href.split("#")[1]
              return (
                <Link
                  key={i}
                  href={item.href}
                  onClick={(e) => {
                    if (isExperience) {
                      e.preventDefault()
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className={`group flex items-center gap-2 px-2 py-1.5 text-[13px] rounded-md transition-colors hover:bg-white/[0.03] ${isExperience ? "text-[#f4f4f5]" : "text-[#a1a1aa] hover:text-[#f4f4f5]"}`}
                >
                  <IconSwap Icon={item.icon} />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Publications */}
        <div>
          <h3 className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#52525b]">Publications</h3>
          <div className="space-y-0.5">
            {publicationItems.map((item, i) => (
              <a key={i} href={item.href} target="_blank" rel="noreferrer"
                className="group flex items-center justify-between px-2 py-1.5 text-[13px] text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-white/[0.03] rounded-md transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <IconSwap Icon={FileText} />
                  <span className="truncate">{item.name}</span>
                </div>
                <ExternalLink className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#52525b] ml-2" />
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#52525b]">Contact</h3>
          <div className="space-y-0.5">
            {contactItems.map((item, i) => (
              <a key={i} href={item.href} target="_blank" rel="noreferrer"
                className="group flex items-center justify-between px-2 py-1.5 text-[13px] text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-white/[0.03] rounded-md transition-colors"
              >
                <div className="flex items-center gap-2">
                  <IconSwap Icon={item.icon} />
                  {item.name}
                </div>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#52525b]" />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Footer */}
      <div className="p-4 text-[11px] text-[#52525b] border-t border-white/5 shrink-0 font-mono">
        © Nishad Wajge, 2026
      </div>

    </aside>
  )
}

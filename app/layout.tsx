import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PHProvider } from './providers'
import PostHogPageView from '../components/PostHogPageView'
import { 
  Home, 
  Mail, 
  Linkedin, 
  Github, 
  ExternalLink,  
  FileText,
  GraduationCap,
  Focus,
  Computer,
  SquareTerminal,
  Car,
} from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nishad Wajge",
  description: "Machine Learning & Software Engineering",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <PHProvider>
        <body className={`${inter.className} bg-[#121212] text-[#a1a1aa] antialiased flex h-screen overflow-hidden`}>
          <PostHogPageView />
          
          {/* ================= SIDEBAR (NAVBAR) ================= */}
          {/* Updated background to #1a1a1a per reference images */}
          <aside className="w-72 bg-[#1a1a1a] border-r border-white/5 flex flex-col h-full shrink-0 hidden md:flex relative z-40">
            
            {/* Profile Header */}
            <div className="h-12 flex items-center px-4 font-mono text-white tracking-tight border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2">
                Nishad Wajge
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-5 px-3 space-y-8 scrollbar-hide font-mono">
              
              {/* Home Link */}
              <div className="space-y-0.5">
                <a href="/" className="flex items-center gap-2 px-2 py-1.5 text-[13px] text-[#f4f4f5] hover:bg-white/[0.03] rounded-md transition-colors">
                  <Home className="h-4 w-4 text-[#a1a1aa]" />
                  Home
                </a>
              </div>

              {/* Experience Section */}
              <div>
                <h3 className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#52525b]">Experience</h3>
                <div className="space-y-0.5">
                  {[
                    { name: "Amazon", icon: Car, href: "/experience#amazon" },
                    { name: "Mercor", icon: SquareTerminal, href: "/experience#mercor" },
                    { name: "General Dynamics", icon: Focus, href: "/experience#gdit" },
                    { name: "Internal Revenue Service", icon: Computer, href: "/experience#irs" },
                  ].map((item, i) => (
                    <a key={i} href={item.href} className="group flex items-center justify-between px-2 py-1.5 text-[13px] text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-white/[0.03] rounded-md transition-colors">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-[#52525b] group-hover:text-[#a1a1aa] transition-colors" />
                        {item.name}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Research Section (Sliding Marquee for long titles) */}
              <div>
                <h3 className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#52525b]">Publications</h3>
                <div className="space-y-0.5">
                  {[
                    { name: "Easy2Hard-Bench", href: "https://neurips.cc/virtual/2024/poster/97554" },
                    { name: "MDPs for Stochastic Shortest Path in Golf", href: "https://link.springer.com/article/10.1007/s00180-024-01555-5" },
                    { name: "Campaigns to Overcome Cognitive Bias", href: "https://terra-docs.s3.us-east-2.amazonaws.com/IJHSR/Articles/volume6-issue5/IJHSR_2024_65_93.pdf" },
                    { name: "Model Classification to detect Bias in Hospital Triaging", href: "https://www.biomedscijournal.com/journals/abse/abse-aid1022.php" },
                  ].map((item, i) => (
                    <a 
                      key={i} 
                      href={item.href} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="group flex items-center justify-between px-2 py-1.5 text-[13px] text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-white/[0.03] rounded-md transition-colors overflow-hidden"
                    >
                      <div className="flex items-center gap-2 overflow-hidden w-full">
                        <FileText className="h-4 w-4 shrink-0 text-[#52525b] group-hover:text-[#a1a1aa] transition-colors relative z-10 bg-inherit" />
                        <div className="relative overflow-hidden whitespace-nowrap w-full">
                          <div className="inline-block transition-transform duration-[4000ms] ease-linear group-hover:-translate-x-[calc(100%-120px)]">
                            {item.name}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#52525b] ml-2" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#52525b]">Contact</h3>
                <div className="space-y-0.5">
                  {[
                    { name: "Email", icon: Mail, href: "mailto:nishad.wajge@gmail.com" },
                    { name: "Linkedin", icon: Linkedin, href: "https://linkedin.com/in/nishadwajge" },
                    { name: "GitHub", icon: Github, href: "https://github.com/nishadw" },
                    { name: "Google Scholar", icon: GraduationCap, href: "https://scholar.google.com/citations?user=8h70LbUAAAAJ&hl=en" },
                  ].map((item, i) => (
                    <a key={i} href={item.href} target="_blank" rel="noreferrer" className="group flex items-center justify-between px-2 py-1.5 text-[13px] text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-white/[0.03] rounded-md transition-colors font-mono">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-[#52525b] group-hover:text-[#a1a1aa] transition-colors" />
                        {item.name}
                      </div>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#52525b]" />
                    </a>
                  ))}
                </div>
              </div>
              
            </div>

            {/* Footer */}
            <div className="p-4 text-[11px] text-[#52525b] border-t border-white/5 shrink-0 bg-transparent font-mono">
              © Nishad Wajge, 2026
            </div>
          </aside>

          {/* ================= MAIN CONTENT ================= */}
          <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
            {children}
          </main>

        </body>
      </PHProvider>
    </html>
  )
}
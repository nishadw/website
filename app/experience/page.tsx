const contact = [
  { label: "LinkedIn", href: "https://linkedin.com/in/nishadwajge" },
  { label: "GitHub", href: "https://github.com/nishadw" },
]

const allExperience = [
  {
    id: "amazon",
    company: "Amazon Lab126",
    role: "Software Engineer Intern",
    period: "Jun 2026 — Present",
    points: [
      "Shipped on-device voice recognition pipeline deployed across millions of vehicles.",
      "Optimized models for low-latency inference and secured biometric storage against spoofing.",
    ],
  },
  {
    id: "amazon-leo",
    company: "Amazon Leo",
    role: "Machine Learning Engineer",
    period: "Jan 2026 — May 2026",
    points: [
      "Forecasted space safety policy shifts using an ensemble of time-series foundation models.",
      "Extracted relational ontology across international agency documents with NLP pipelines.",
    ],
  },
  {
    id: "gdit",
    company: "General Dynamics Information Technology",
    role: "Software Engineer Intern",
    period: "Jun 2025 — Aug 2025",
    points: [
      "Deployed an edge-native computer vision pipeline for real-time vehicle detection.",
      "Hardened model inference robustness on noisy sensor data through adversarial training.",
    ],
  },
  {
    id: "gdit-lead",
    company: "General Dynamics Information Technology",
    role: "Engineering Project Lead",
    period: "Jan 2025 — May 2025",
    points: [
      "Led team of engineers building an agentic RAG pipeline over a large-scale data lakehouse.",
      "Accelerated data discovery through a hybrid graph and vector database architecture.",
    ],
  },
  {
    id: "bah",
    company: "Booz Allen Hamilton",
    role: "Engineering Project Manager",
    period: "Sep 2024 — Dec 2024",
    points: [
      "Automated medical policy audits via summarization and sentiment analysis pipelines.",
      "Built full-stack, human-in-the-loop scraping and audit pipeline to cut manual review time.",
    ],
  },
  {
    id: "irs",
    company: "Internal Revenue Service",
    role: "Software Engineer Intern",
    period: "Jan — Dec 2024",
    points: [
      "Deployed division-wide CI/CD pipeline upgrade processing every U.S. tax application.",
      "Modernized legacy fraud detection ETL pipeline to accelerate build times.",
    ],
  },
]

type ExpEntry = {
  id: string
  company: string
  role: string
  period: string
  points: string[]
}

function ExperienceEntry({ exp }: { exp: ExpEntry }) {
  return (
    <section
      id={exp.id}
      className="py-9 border-b border-white/[0.06] last:border-0 scroll-mt-20"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
        <div>
          <h2 className="text-[15px] font-semibold text-[#e8e8e8] mb-0.5">{exp.company}</h2>
          <p className="text-[13px] text-[#a0a0a0]">{exp.role}</p>
        </div>
        <span className="text-[12px] text-[#6e6e6e] font-mono shrink-0">{exp.period}</span>
      </div>

      <ul className="space-y-2">
        {exp.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-[13px] leading-relaxed text-[#a0a0a0]">
            <span className="text-[#6e6e6e] shrink-0">—</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[780px] mx-auto px-8 pt-16 pb-32">

        <div className="mb-10 pb-8 border-b border-white/[0.06]">
          <h1 className="text-[32px] font-medium text-[#e8e8e8] tracking-[-0.02em]">Work History</h1>
        </div>

        <div>
          {allExperience.map((exp, idx) => (
            <ExperienceEntry key={idx} exp={exp} />
          ))}
        </div>

        <div className="flex items-center justify-between text-[13px] text-[#6e6e6e] border-t border-white/[0.06] pt-8 mt-8">
          <div className="flex items-center gap-6">
            {contact.map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noreferrer" className="hover:text-[#e8e8e8] transition-colors">
                {c.label}
              </a>
            ))}
          </div>
          <span>© Nishad Wajge 2026</span>
        </div>

      </div>
    </div>
  )
}

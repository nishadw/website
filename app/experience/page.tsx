const contact = [
  { label: "LinkedIn", href: "https://linkedin.com/in/nishadwajge" },
  { label: "GitHub", href: "https://github.com/nishadw" },
]

const allExperience = [
  {
    id: "amazon",
    company: "Amazon — Lab126",
    role: "Software Engineer Intern",
    period: "Jun 2026 — Present",
    points: [
      "Shipped an on-device voice recognition pipeline deployed across millions of vehicles.",
      "Optimized models for low-latency on-device inference and secured biometric voice storage against spoofing.",
    ],
  },
  {
    id: "amazon-leo",
    company: "Amazon — Leo (formerly Project Kuiper)",
    role: "Applied AI Engineer",
    period: "Jan 2026 — May 2026",
    points: [
      "Forecasted space safety policy shifts using an ensemble of time-series foundation models.",
      "Extracted a relational ontology across tens of thousands of agency documents with NLP pipelines.",
    ],
  },
  {
    id: "gdit",
    company: "General Dynamics Information Technology",
    role: "Software Engineer Intern",
    period: "Jun 2025 — Aug 2025",
    points: [
      "Deployed an edge-native computer vision pipeline for real-time vehicle detection.",
      "Hardened model robustness on noisy sensor data through adversarial training and quantized inference.",
    ],
  },
  {
    id: "gdit-lead",
    company: "General Dynamics Information Technology",
    role: "Engineering Project Lead",
    period: "Jan 2025 — May 2025",
    points: [
      "Led a team of engineers building an agentic RAG pipeline over a large-scale data lakehouse.",
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
      "Built a full-stack, human-in-the-loop scraping and audit pipeline to cut manual review time.",
    ],
  },
  {
    id: "irs",
    company: "Internal Revenue Service",
    role: "Software Engineer Intern",
    period: "Jan — Dec 2024",
    points: [
      "Deployed a division-wide CI/CD pipeline upgrade processing hundreds of millions of tax applications.",
      "Modernized a legacy fraud detection ETL pipeline to accelerate build times.",
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
      className="group relative py-10 border-b border-white/[0.05] last:border-0 scroll-mt-20 pl-5"
    >
      <span className="absolute left-0 top-10 bottom-10 w-[2px] metallic-bg opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-6">
        <div>
          <h2 className="text-[15px] font-semibold text-[#d0d0d0] tracking-tight mb-1">{exp.company}</h2>
          <p className="text-[12px] text-[#909090] font-mono">{exp.role}</p>
        </div>
        <span className="text-[11px] text-[#909090] font-mono shrink-0">{exp.period}</span>
      </div>

      <ul className="space-y-2.5">
        {exp.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-[13px] leading-relaxed text-[#909090]">
            <span className="text-[#909090] mt-px shrink-0 font-mono">—</span>
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
      <div className="max-w-[720px] mx-auto px-8 pt-16 pb-32">

        <div className="mb-12 pb-8 border-b border-white/[0.05]">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono tabular-nums tracking-widest metallic">01</span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold metallic">Experience</span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>
          <h1 className="text-[32px] font-medium text-[#efefef] tracking-[-0.02em]">Work History</h1>
        </div>

        <div>
          {allExperience.map((exp, idx) => (
            <ExperienceEntry key={idx} exp={exp} />
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px] text-[#909090] border-t border-white/[0.05] pt-8 mt-8">
          <div className="flex items-center gap-7 font-mono tracking-wide">
            {contact.map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noreferrer" className="hover:text-[#b0b0b0] transition-colors duration-150">
                {c.label}
              </a>
            ))}
          </div>
          <span className="font-mono">© Nishad Wajge 2026</span>
        </div>

      </div>
    </div>
  )
}

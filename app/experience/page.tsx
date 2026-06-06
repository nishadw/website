const contact = [
  { label: "LinkedIn", href: "https://linkedin.com/in/nishadwajge" },
  { label: "GitHub", href: "https://github.com/nishadw" },
]

const allExperience = [
  {
    id: "amazon",
    company: "Amazon — Smart Vehicles",
    role: "Software Development Engineer Intern",
    period: "Jun 2026 — Present",
    points: [
      "Compress and adapt multimodal foundation models for deployment directly on vehicle hardware.",
      "Build the inference stack powering in-vehicle voice assistants, from speech recognition through response generation.",
    ],
  },
  {
    id: "amazon-leo",
    company: "Amazon — Leo (formerly Project Kuiper)",
    role: "Applied AI Engineer (contract)",
    period: "Jan 2026 — May 2026",
    points: [
      "Forecast space policy shifts across government agencies using an ensemble of time-series foundation models.",
      "Structure large unstructured document corpora into clean, deduplicated topic clusters for downstream modeling.",
      "Improve signal quality in noisy policy data through temporal smoothing and filtering techniques.",
    ],
  },
  {
    id: "mercor",
    company: "Mercor",
    role: "Software Engineer",
    period: "Nov 2025 — May 2026",
    points: [
      "Build preference datasets for RLHF alignment of multimodal foundation models on complex tasks.",
      "Establish human performance baselines for autonomous agents operating across technical environments.",
      "Construct supervised fine-tuning datasets for advanced programming and agentic terminal workflows.",
    ],
  },
  {
    id: "gdit",
    company: "General Dynamics Information Technology",
    role: "Software Engineer Intern",
    period: "Jun 2025 — Aug 2025",
    points: [
      "Deploy a computer vision module for real-time vehicle detection within a multimodal ML system at the edge.",
      "Harden model robustness against distribution shift through adversarial training techniques.",
      "Optimize the inference pipeline for low-latency operation on streaming data using quantization and concurrency.",
    ],
  },
  {
    id: "gdit-lead",
    company: "General Dynamics Information Technology",
    role: "Engineering Project Lead (contract)",
    period: "Jan 2025 — May 2025",
    points: [
      "Lead a cross-functional engineering team building an agentic RAG pipeline over a large-scale document lake on AWS.",
      "Architect a hybrid graph and vector database design to dramatically improve data discoverability.",
      "Enhance retrieval quality through custom semantic chunking and entity-aware metadata enrichment.",
    ],
  },
  {
    id: "bah",
    company: "Booz Allen Hamilton",
    role: "Engineering Project Manager (contract)",
    period: "Sep 2024 — Dec 2024",
    points: [
      "Build full-stack tooling to automate medical policy extraction with real-time editing and annotation capabilities.",
      "Engineer backend data pipelines and web scraping systems for large-scale document aggregation.",
      "Integrate NLP models for compliance automation across summarization, extraction, and sentiment tasks.",
    ],
  },
  {
    id: "irs",
    company: "Internal Revenue Service",
    role: "Software Engineer Intern",
    period: "Jan — Dec 2024",
    points: [
      "Maintain ETL workflows underpinning enterprise fraud detection and tax compliance systems.",
      "Modernize CI/CD pipelines and version control integrations as part of infrastructure uplift.",
      "Migrate legacy systems to current build automation frameworks to accelerate deployment cycles.",
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
          <p className="text-[12px] text-[#383838] font-mono">{exp.role}</p>
        </div>
        <span className="text-[11px] text-[#2c2c2c] font-mono shrink-0">{exp.period}</span>
      </div>

      <ul className="space-y-2.5">
        {exp.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-[13px] leading-relaxed text-[#3d3d3d]">
            <span className="text-[#272727] mt-px shrink-0 font-mono">—</span>
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

        <div className="flex items-center justify-between text-[11px] text-[#252525] border-t border-white/[0.05] pt-8 mt-8">
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

import Footer from "@/components/Footer"

const allExperience = [
  {
    id: "amazon",
    company: "Amazon Lab126",
    role: "Software Engineer Intern",
    period: "Jun 2026 — Sep 2026",
    points: [
      "Shipped an on-device speaker identification module to millions of vehicles, off the response path.",
      "Quantized the embedding model for real-time recognition on ARM silicon.",
      "Built an MLOps loop fed by fleet data for continuous fine-tuning of SLMs, ASR, TTS.",
    ],
  },
  {
    id: "amazon-leo",
    company: "Amazon Leo",
    role: "ML Engineering Lead",
    period: "Jan 2026 — May 2026",
    points: [
      "Forecasted space policy shifts a year out with an ensemble of time-series models.",
      "Extracted a relational ontology across international agency documents with ETL and NLP pipelines.",
    ],
  },
  {
    id: "gdit",
    company: "General Dynamics Information Technology",
    role: "Software Engineer Intern",
    period: "Jun 2025 — Aug 2025",
    points: [
      "Deployed an edge-native vision pipeline for vehicle detection and geospatial telemetry.",
      "Hardened inference on noisy sensor data through adversarial training.",
      "Architected a thread-safe, quantized three-stage pipeline over live video feeds.",
    ],
  },
  {
    id: "gdit-lead",
    company: "General Dynamics Information Technology",
    role: "Engineering Project Lead",
    period: "Jan 2025 — May 2025",
    points: [
      "Led a team of engineers shipping a hybrid graph and vector RAG pipeline to analysts.",
      "Raised retrieval accuracy with custom chunking and named-entity recognition, cutting discovery time.",
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
      "Upgraded division-wide CI/CD for fraud detection across tens of millions of tax applications.",
      "Halved build times by migrating a twenty-year-old Java system from Ant to Maven.",
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
      className="py-9 border-b border-hair last:border-0 scroll-mt-20"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
        <div>
          <h2 className="text-[19px] font-semibold text-ink mb-0.5">{exp.company}</h2>
          <p className="text-[17px] text-body">{exp.role}</p>
        </div>
        <span className="text-[16px] text-meta font-mono shrink-0">{exp.period}</span>
      </div>

      <ul className="space-y-2">
        {exp.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-[17px] leading-relaxed text-body">
            <span className="text-meta shrink-0">—</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-[960px] mx-auto px-8 pt-16 pb-32">

        <div className="mb-10 pb-8 border-b border-hair">
          <h1 className="text-[44px] font-medium text-ink tracking-[-0.02em]">Experience</h1>
        </div>

        <div>
          {allExperience.map((exp, idx) => (
            <ExperienceEntry key={idx} exp={exp} />
          ))}
        </div>

        <Footer className="mt-8" />

      </div>
    </div>
  )
}

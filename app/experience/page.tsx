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
      "Build and optimize multimodal foundation models for on-device edge deployment using quantization, ONNX Runtime, and PEFT.",
      "Design low-latency inference pipelines for in-vehicle voice assistants spanning the full ASR, LLM, and TTS stack.",
    ],
  },
  {
    id: "amazon-leo",
    company: "Amazon — Leo (formerly Project Kuiper)",
    role: "Applied AI Engineer (Contract)",
    period: "Jan 2026 — May 2026",
    points: [
      "Forecast space policy shifts 12 months ahead across government agencies using a time-series foundation model ensemble.",
      "Process large document corpora into structured topics via semantic deduplication, NLI filtering, and LLM-as-judge scoring.",
      "Improve signal-to-noise ratio by 42% via temporal smoothing, cutting noise and enhancing downstream model predictability.",
      "Achieve 91% backtested accuracy using a Chronos, Prophet, and TimesFM ensemble trained on 9 years of historical data.",
      "Eliminate idle GPU costs to zero via autoscaling and fp16 batching, doubling throughput on right-sized cloud infrastructure.",
    ],
  },
  {
    id: "mercor",
    company: "Mercor",
    role: "Software Engineer",
    period: "Nov 2025 — May 2026",
    points: [
      "Engineer large-scale RLHF preference datasets to align multimodal foundation models across complex task domains.",
      "Establish human performance baselines for autonomous agents across cloud, data science, and cryptography environments.",
      "Construct supervised fine-tuning datasets targeting advanced programming and agentic terminal execution workflows.",
    ],
  },
  {
    id: "gdit",
    company: "General Dynamics Information Technology",
    role: "Software Engineer Intern",
    period: "Jun 2025 — Aug 2025",
    points: [
      "Deploy edge-native computer vision within a multimodal ML system for real-time vehicle detection at scale.",
      "Achieve 95%+ out-of-sample accuracy via adversarial training, ensuring robustness against distribution shifts.",
      "Deliver sub-100ms inference latency on streaming data via a concurrent, three-stage quantized pipeline.",
    ],
  },
  {
    id: "gdit-lead",
    company: "General Dynamics Information Technology",
    role: "Engineering Project Lead (Contract)",
    period: "Jan 2025 — May 2025",
    points: [
      "Direct a 10-engineer team building an agentic RAG pipeline to analyze a 600K+ document data lake on AWS Bedrock.",
      "Improve data discovery by 95%+ by architecting a hybrid graph and vector database design using Neo4j and Qdrant.",
      "Increase retrieval accuracy by 40% through custom semantic chunking and NER-based metadata enrichment in LangChain.",
    ],
  },
  {
    id: "bah",
    company: "Booz Allen Hamilton",
    role: "Engineering Project Manager (Contract)",
    period: "Sep 2024 — Dec 2024",
    points: [
      "Develop full-stack applications to automate medical policy extraction with real-time editing and annotation.",
      "Engineer automated web scraping and backend data pipelines to streamline large-scale document aggregation.",
      "Integrate NLP models for compliance automation across document summarization, feature extraction, and sentiment analysis.",
    ],
  },
  {
    id: "irs",
    company: "Internal Revenue Service",
    role: "SWE Intern",
    period: "Jan — Dec 2024",
    points: [
      "Manage ETL workflows supporting high-volume, enterprise-scale fraud detection and tax compliance systems.",
      "Lead infrastructure modernization by upgrading CI/CD pipelines and enterprise version control integrations.",
      "Migrate legacy codebases to modern build automation frameworks, significantly accelerating system deployments.",
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

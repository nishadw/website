import Link from "next/link"

const experiences = [
  { company: "Amazon", position: "Software Development Engineer Intern", period: "Summer 2026", id: "amazon" },
  { company: "Mercor", position: "Software Engineer", period: "Nov 2025 — May 2026", id: "mercor" },
  { company: "General Dynamics IT", position: "Software Engineer Intern", period: "Jun 2025 — Aug 2025", id: "gdit" },
  { company: "Internal Revenue Service", position: "Software Engineer Intern", period: "Jan — Dec 2024", id: "irs" },
]

const contracts = [
  { company: "Amazon", position: "Technical Advisor, ML Engineering", period: "Jan 2026 — May 2026", id: "amazon-leo" },
  { company: "General Dynamics IT", position: "Engineering Project Lead", period: "Jan 2025 — May 2025", id: "gdit-lead" },
  { company: "Booz Allen Hamilton", position: "Engineering Project Manager", period: "Sep 2024 — Dec 2024", id: "bah" },
]

const publications = [
  {
    title: "Bayesian estimation and statistical benchmarking for large language models",
    venue: "NeurIPS",
    href: "https://neurips.cc/virtual/2024/poster/97554",
  },
  {
    title: "Dynamic strategy optimization in turn-based stochastic games via Markov decision processes",
    venue: "INFORMS",
    href: "https://link.springer.com/article/10.1007/s00180-024-01555-5",
  },
  {
    title: "Game-theoretic interpretability via Shapley additive explanations in ensemble classifiers",
    venue: "",
    href: "https://www.biomedscijournal.com/journals/abse/abse-aid1022.php",
  },
  {
    title: "Statistical modeling of decision theory and risk-aversion under uncertainty",
    venue: "",
    href: "https://terra-docs.s3.us-east-2.amazonaws.com/IJHSR/Articles/volume6-issue5/IJHSR_2024_65_93.pdf",
  },
]

const contact = [
  { label: "LinkedIn", href: "https://linkedin.com/in/nishadwajge" },
  { label: "GitHub", href: "https://github.com/nishadw" },
]

function SectionHeader({ number, label, sub }: { number: string; label: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <span className="text-[10px] font-mono tabular-nums tracking-widest metallic">{number}</span>
      <span className="text-[10px] tracking-[0.2em] uppercase font-semibold metallic">{label}</span>
      {sub && <span className="text-[10px] text-[#272727] font-mono">{sub}</span>}
      <div className="flex-1 h-px bg-white/[0.05]" />
    </div>
  )
}

function ExpRow({ company, position, period, href }: {
  company: string; position: string; period: string; href: string
}) {
  return (
    <Link
      href={href}
      className="group relative flex items-center justify-between py-4 border-b border-white/[0.05] hover:border-white/[0.08] pl-4 transition-colors duration-150"
    >
      <span className="absolute left-0 top-3 bottom-3 w-[2px] metallic-bg opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <span className="text-[13px] font-semibold text-[#b0b0b0] group-hover:text-[#f0f0f0] transition-colors shrink-0 w-44">
          {company}
        </span>
        <span className="text-[13px] text-[#383838] truncate">{position}</span>
      </div>
      <span className="text-[11px] text-[#2c2c2c] ml-6 shrink-0 font-mono">{period}</span>
    </Link>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[720px] mx-auto px-8 pt-20 pb-32">

        {/* ── HERO ── */}
        <div className="mb-14">
          <h1 className="text-[54px] font-medium text-[#efefef] leading-[1.0] tracking-[-0.03em] mb-5">
            Nishad Wajge
          </h1>

          <div className="flex items-center gap-2.5 mb-2">
            <span className="block w-5 h-px metallic-bg" />
            <span className="text-[11px] font-mono tracking-wide metallic">
              Engineering @ Amazon Smart Vehicles
            </span>
          </div>
          <div className="flex items-center gap-2.5 mb-8">
            <span className="block w-5 h-px metallic-bg" />
            <span className="text-[11px] font-mono tracking-wide metallic">
              CS @ University of Maryland, College Park
            </span>
          </div>

          <p className="text-[14px] text-[#4a4a4a] leading-relaxed max-w-[475px] mb-2">
            Researcher and engineer working across software engineering,
            artificial intelligence, game theory, and mechanistic interpretability.
          </p>
          <p className="text-[14px] text-[#4a4a4a] leading-relaxed mb-10">
            Reach me via LinkedIn or email - [firstname] dot [lastname] at gmail dot com
          </p>
        </div>

        {/* ── EXPERIENCE ── */}
        <section className="mb-14">
          <SectionHeader number="01" label="Experience" />
          <div>
            {experiences.map((exp, idx) => (
              <ExpRow key={idx} company={exp.company} position={exp.position} period={exp.period} href={`/experience#${exp.id}`} />
            ))}
          </div>
        </section>

        {/* ── CONSULTING ── */}
        <section className="mb-14">
          <SectionHeader number="02" label="Consulting" sub="· via UMD ADC" />
          <div>
            {contracts.map((exp, idx) => (
              <ExpRow key={idx} company={exp.company} position={exp.position} period={exp.period} href={`/experience#${exp.id}`} />
            ))}
          </div>
        </section>

        {/* ── PUBLICATIONS ── */}
        <section className="mb-24">
          <SectionHeader number="03" label="Publications" />
          <div>
            {publications.map((pub, idx) => (
              <a
                key={idx}
                href={pub.href}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-start py-4 border-b border-white/[0.05] hover:border-white/[0.08] pl-5 transition-colors duration-150"
              >
                <span className="absolute left-0 top-4 bottom-4 w-[2px] metallic-bg opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                <span className="text-[11px] font-mono text-[#272727] mt-0.5 shrink-0 tabular-nums w-7">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] text-[#4a4a4a] group-hover:text-[#b0b0b0] transition-colors leading-relaxed block">
                    {pub.title}
                  </span>
                  {pub.venue && (
                    <span className="text-[10px] font-mono metallic opacity-50 group-hover:opacity-90 transition-opacity mt-1 block tracking-wide">
                      {pub.venue}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── CONTACT / FOOTER ── */}
        <div className="flex items-center justify-between text-[11px] text-[#252525] border-t border-white/[0.05] pt-8">
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

import Link from "next/link"

// Homepage shows only the most recent few; the rest live on /experience.
const VISIBLE_EXPERIENCES = 3

const experiences = [
  { company: "Amazon", position: "Software Engineer Intern", period: "Jun 2026 — Sep 2026", id: "amazon" },
  { company: "Amazon", position: "Machine Learning Engineer", period: "Jan 2026 — May 2026", id: "amazon-leo" },
  { company: "General Dynamics", position: "Software Engineer Intern", period: "Jun 2025 — Aug 2025", id: "gdit" },
  { company: "General Dynamics", position: "Engineering Project Lead", period: "Jan 2025 — May 2025", id: "gdit-lead" },
  { company: "Booz Allen Hamilton", position: "Engineering Project Manager", period: "Sep 2024 — Dec 2024", id: "bah" },
  { company: "Internal Revenue Service", position: "Software Engineer Intern", period: "Jan 2024 — Dec 2024", id: "irs" },
]

const publications = [
  {
    title: "* Bayesian estimation and statistical benchmarking for large language models",
    venue: "Neural Information Processing Systems",
    href: "https://neurips.cc/virtual/2024/poster/97554",
  },
  {
    title: "* Dynamic strategy optimization in turn-based stochastic games via Markov decision processes",
    venue: "Institute of Operations Research and Management Sciences",
    href: "https://link.springer.com/article/10.1007/s00180-024-01555-5",
  },
  {
    title: "Game-theoretic interpretability via Shapley additive explanations in ensemble classifiers",
    venue: "Stanford Medicine",
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

function SectionHeader({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-4">
      <h2 className="text-[15px] font-semibold text-[#e8e8e8]">{label}</h2>
      {sub && <span className="text-[12px] text-[#6e6e6e]">{sub}</span>}
    </div>
  )
}

function ExpRow({ company, position, period, href }: {
  company: string; position: string; period: string; href: string
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between py-3.5 border-b border-white/[0.06]"
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <span className="text-[13px] font-semibold text-[#a0a0a0] group-hover:text-[#e8e8e8] transition-colors shrink-0 w-44">
          {company}
        </span>
        <span className="text-[13px] text-[#a0a0a0] truncate">{position}</span>
      </div>
      <span className="text-[12px] text-[#6e6e6e] ml-6 shrink-0 font-mono">{period}</span>
    </Link>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[780px] mx-auto px-8 pt-20 pb-32">

        {/* ── HERO ── */}
        <div className="mb-12">
          <h1 className="text-[44px] font-medium text-[#e8e8e8] leading-[1.1] tracking-[-0.02em] mb-6">
            Nishad Wajge
          </h1>

          {/* <p className="text-[14px] text-[#6e6e6e] mb-7">
            Computer Science @ University of Maryland, College Park
          </p> */}

          <p className="text-[14px] leading-relaxed mb-2">
            Researcher and engineer interested in the areas of
            software, game theory, statistics, and ml.
          </p>

          <p className="text-[14px] leading-relaxed">
            Best way to reach me is linkedin or alternatively by email: [firstname] dot [lastname] at gmail dot com
          </p>
        </div>

        {/* ── EXPERIENCE ── */}
        <section className="mb-12">
          <SectionHeader label="Experience" />
          <div>
            {experiences.slice(0, VISIBLE_EXPERIENCES).map((exp, idx) => (
              <ExpRow key={idx} company={exp.company} position={exp.position} period={exp.period} href={`/experience#${exp.id}`} />
            ))}
          </div>
          <Link
            href="/experience"
            className="inline-block pt-4 text-[13px] text-[#6e6e6e] hover:text-[#e8e8e8] transition-colors"
          >
            {experiences.length - VISIBLE_EXPERIENCES} more roles →
          </Link>
        </section>

        {/* ── PUBLICATIONS ── */}
        <section className="mb-12">
          <SectionHeader label="Research" />
          <div>
            {publications.map((pub, idx) => (
              <a
                key={idx}
                href={pub.href}
                target="_blank"
                rel="noreferrer"
                className="group block py-3.5 border-b border-white/[0.06]"
              >
                <span className="text-[13px] leading-relaxed text-[#a0a0a0] group-hover:text-[#e8e8e8] transition-colors block">
                  {pub.title}
                </span>
                <span className="text-[12px] text-[#6e6e6e] mt-0.5 block">
                  {pub.venue}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── CONTACT / FOOTER ── */}
        <div className="flex items-center justify-between text-[13px] text-[#6e6e6e] border-t border-white/[0.06] pt-8">
          <div className="flex items-center gap-6">
            {contact.map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noreferrer" className="hover:text-[#e8e8e8] transition-colors">
                {c.label}
              </a>
            ))}
          </div>
          <span>
            © Nishad Wajge{" "}
            <Link href="/now" className="hover:text-[#e8e8e8] transition-colors">2026</Link>
          </span>
        </div>

      </div>
    </div>
  )
}

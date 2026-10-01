import Link from "next/link"
import Footer from "@/components/Footer"
import { allExperience } from "@/lib/experience"

// The home page shows the current role in full; the rest live on /experience.
const [current] = allExperience

const publications = [
  {
    title: "Gradient Fidelity in Learned World Models",
    venue: "In preparation \u00b7 First author",
    href: "",
  },
  {
    title: "Standardized Difficulty Labels for Profiling LLMs",
    venue: "Neural Information Processing Systems, 2024 \u00b7 Undergraduate Researcher",
    href: "https://neurips.cc/virtual/2024/poster/97554",
  },
  {
    title: "Should Professionals Consider Their Adversary's Strategy?",
    venue: "Computational Statistics, 2024 \u00b7 First author",
    href: "https://link.springer.com/article/10.1007/s00180-024-01555-5",
  },
  // {
  //   title: "Game-theoretic interpretability via Shapley additive explanations in ensemble classifiers",
  //   venue: "Stanford Medicine JUST Health",
  //   href: "https://www.biomedscijournal.com/journals/abse/abse-aid1022.php",
  // },
  // {
  //   title: "Statistical modeling of decision theory and risk-aversion under uncertainty",
  //   venue: "",
  //   href: "https://terra-docs.s3.us-east-2.amazonaws.com/IJHSR/Articles/volume6-issue5/IJHSR_2024_65_93.pdf",
  // },
]

function SectionHeader({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <h2 className="text-[28px] font-medium text-ink tracking-[-0.015em]">{label}</h2>
      {sub && <span className="text-[17px] text-meta">{sub}</span>}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-[1080px] mx-auto px-8 pt-20 pb-32">

        {/* ── HERO ── */}
        <div className="mb-12">
          <h1 className="text-[60px] font-medium text-ink leading-[1.1] tracking-[-0.02em] mb-6">
            Nishad Wajge
          </h1>

          {/* <p className="text-[18px] text-meta mb-7">
            Computer Science @ University of Maryland, College Park
          </p> */}

          <p className="text-[18px] leading-relaxed mb-2">
            Researcher and engineer interested in the areas of
            software, game theory, statistics, and machine learning.
          </p>

          <p className="text-[18px] leading-relaxed">
            Best way to reach me is linkedin or alternatively by email: [firstname] dot [lastname] at gmail dot com
          </p>
        </div>

        {/* ── PUBLICATIONS ── */}
        <section className="mb-12">
          <SectionHeader label="Research" />
          <div>
            {publications.map((pub, idx) => {
              const body = (
                <>
                  <span className="text-[17px] leading-relaxed text-body group-hover:text-ink transition-colors block">
                    {pub.title}
                  </span>
                  <span className="text-[16px] text-meta mt-0.5 block">
                    {pub.venue}
                  </span>
                </>
              )
              // Unpublished work has no link yet; render it as plain text.
              return pub.href ? (
                <a
                  key={idx}
                  href={pub.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block py-3.5 border-b border-hair"
                >
                  {body}
                </a>
              ) : (
                <div key={idx} className="block py-3.5 border-b border-hair">
                  {body}
                </div>
              )
            })}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section className="mb-12">
          <SectionHeader label="Experience" />

          <div className="pb-5 border-b border-hair">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
              <div>
                <h3 className="text-[18px] font-semibold text-ink mb-0.5">{current.company}</h3>
                <p className="text-[17px] text-body">{current.role}</p>
              </div>
              <span className="text-[16px] text-meta font-mono shrink-0">{current.period}</span>
            </div>

            <ul className="space-y-2">
              {current.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-[17px] leading-relaxed text-body">
                  <span className="text-meta shrink-0">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/experience"
            className="inline-block pt-4 text-[17px] text-meta hover:text-ink transition-colors"
          >
            {allExperience.length - 1} earlier roles →
          </Link>
        </section>

        {/* ── FOOTER ── */}
        <Footer />

      </div>
    </div>
  )
}

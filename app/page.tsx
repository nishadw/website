import Link from "next/link"
import type { ReactNode } from "react"
import Footer from "@/components/Footer"
import SectionHeader from "@/components/SectionHeader"
import { groupExperience } from "@/lib/experience"
import { allResearch } from "@/lib/research"

const groups = groupExperience()

/* Title at the left, particulars held to the right rule, both on one
   baseline. The research and project indexes share it. */
function Row({
  title,
  meta,
  href,
}: {
  title: ReactNode
  meta: string
  href?: string
}) {
  const body = (
    <>
      <span className="text-[19px] leading-snug text-ink group-hover:underline">{title}</span>
      <span className="text-[16px] text-meta sm:text-right sm:shrink-0 sm:pl-8">{meta}</span>
    </>
  )
  const cls =
    "group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-y-0.5 py-3 border-b border-hair"

  if (!href) return <div className={cls}>{body}</div>
  return (
    <Link href={href} className={cls}>
      {body}
    </Link>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 pt-20 pb-28">

        <header className="mb-16">
          <h1 className="text-[68px] text-ink leading-[1.05] mb-7">Nishad Wajge</h1>

          <p className="text-[20px] leading-relaxed mb-1.5">
            Researcher and engineer interested in software, game theory, statistics, and machine learning.
          </p>

          <p className="text-[20px] leading-relaxed text-meta">
            Reachable on{" "}
            <a
              href="https://linkedin.com/in/nishadwajge"
              target="_blank"
              rel="noreferrer"
              className="text-ink hover:underline"
            >
              LinkedIn
            </a>
            , or at [firstname] dot [lastname] at gmail dot com.
          </p>
        </header>

        {/* ── EXPERIENCE ──
            Grouped by employer: six roles read as four places, which is the
            shape of a CV header rather than a resume. */}
        <section className="mb-16">
          <SectionHeader
            label="Experience"
            action={
              <Link href="/experience" className="hover:underline">
                detail →
              </Link>
            }
          />
          {groups.map((g) => (
            <div
              key={g.org}
              className="grid sm:grid-cols-[minmax(0,23rem)_1fr] gap-x-8 py-3 border-b border-hair"
            >
              <span className="text-[19px] leading-snug text-ink">{g.org}</span>
              <span>
                {g.roles.map((r) => (
                  <Link
                    key={r.id}
                    href={`/experience#${r.id}`}
                    className="group flex items-baseline justify-between gap-6"
                  >
                    <span className="text-[17px] text-meta group-hover:text-ink group-hover:underline">
                      {r.unit ? `${r.unit} · ${r.role}` : r.role}
                    </span>
                    <span className="text-[16px] text-meta tnum shrink-0">{r.period}</span>
                  </Link>
                ))}
              </span>
            </div>
          ))}
        </section>

        {/* ── RESEARCH ── Title, publisher, author status. Nothing else. */}
        <section className="mb-20">
          <SectionHeader
            label="Research"
            action={
              <Link href="/research" className="hover:underline">
                detail →
              </Link>
            }
          />
          {allResearch.map((p) => (
            <Row
              key={p.id}
              title={p.title}
              meta={`${p.publisher} · ${p.status}`}
              href={`/research#${p.id}`}
            />
          ))}
        </section>

        <Footer />

      </div>
    </div>
  )
}

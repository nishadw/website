import type { Metadata } from "next"
import type { FC } from "react"
import Link from "next/link"
import Footer from "@/components/Footer"
import SectionHeader from "@/components/SectionHeader"
import {
  researchProjects,
  engineeringProjects,
  projectTitle,
  type Project,
} from "@/lib/projects"
import { allExperience, expName } from "@/lib/experience"
import {
  FigFirstPassage,
  FigAttention,
  FigCascade,
  FigPositioning,
  FigDifficulty,
  FigMatchPlay,
  FigTriage,
} from "@/components/ProjectFigures"

export const metadata: Metadata = {
  title: "Projects · Nishad Wajge",
  description:
    "Published and in-preparation research, and the engineering behind it: calibrated event-time forecasting, difficulty-calibrated LLM benchmarks, time-series forecasting of policy attention, on-device vision, and institutional positioning from 13F filings.",
}

// Each project is drawn by its own plate. Keyed here rather than in the data
// file so lib/projects.ts stays free of JSX and can be read on the server.
const figures: Record<string, FC> = {
  "first-passage": FigFirstPassage,
  "space-sustainability": FigAttention,
  atak: FigCascade,
  positioning: FigPositioning,
  difficulty: FigDifficulty,
  "match-play": FigMatchPlay,
  triage: FigTriage,
}

function Entry({ project }: { project: Project }) {
  const Figure = figures[project.id]
  // Several of these are the work behind a role. Point at it, rather than
  // letting one piece of work read as two separate things.
  const role = project.experienceId
    ? allExperience.find((e) => e.id === project.experienceId)
    : undefined

  return (
    <section id={project.id} className="py-11 border-b border-hair last:border-0 scroll-mt-20">
      <div className="grid md:grid-cols-[360px_1fr] gap-x-14 gap-y-6 items-start">
        {Figure && <Figure />}

        <div>
          <h3 className="text-[26px] text-ink leading-snug mb-1">{projectTitle(project)}</h3>
          <p className="text-[16px] text-meta mb-5">{project.context}</p>

          <p className="text-[19px] leading-relaxed text-body mb-5">{project.blurb}</p>

          <p className="text-[16px] text-meta mb-4">{project.keywords.join(" · ")}</p>

          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[17px]">
            {project.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-ink hover:underline">
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
            {role && (
              <Link href={`/experience#${role.id}`} className="text-ink hover:underline">
                {expName(role)} →
              </Link>
            )}
            {project.note && <span className="text-[16px] text-meta italic">{project.note}</span>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 pt-16 pb-28">

        <div className="mb-14 pb-7 border-b border-ink">
          <h1 className="display-caps text-[44px] text-ink">Projects</h1>
          <p className="text-[19px] text-body leading-relaxed mt-4">
            Papers first, then the engineering. Each plate runs in three panels: the problem, the
            machinery, and the result. The objects carry across the panels, so a single mark can be
            followed the whole way through.
          </p>
        </div>

        {/* Published and in-preparation work, kept apart from the build work so
            a result never reads as one more side project. */}
        <section className="mb-16">
          <SectionHeader label="Research" />
          {researchProjects.map((p) => (
            <Entry key={p.id} project={p} />
          ))}
        </section>

        <section className="mb-20">
          <SectionHeader label="Engineering" />
          {engineeringProjects.map((p) => (
            <Entry key={p.id} project={p} />
          ))}
        </section>

        <Footer />

      </div>
    </div>
  )
}

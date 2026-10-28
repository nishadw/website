import type { FC } from "react"
import { projectTitle, type Project } from "@/lib/projects"
import {
  FigFirstPassage,
  FigAttention,
  FigCascade,
  FigPositioning,
  FigDifficulty,
  FigMatchPlay,
  FigTriage,
} from "@/components/ProjectFigures"

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

/* The plate and the write-up, as one block.
 *
 * Shared by /research, where a project stands on its own, and /experience,
 * where it sits under the role that produced it. Sharing it is what keeps the
 * same work from being written twice in two voices. */
export default function ProjectDetail({
  project,
  // On /experience the role heading already carries the company and dates, so
  // the context line would only repeat them.
  showContext = true,
}: {
  project: Project
  showContext?: boolean
}) {
  const Figure = figures[project.id]

  return (
    <div className="grid md:grid-cols-[360px_1fr] gap-x-14 gap-y-6 items-start">
      {Figure && <Figure />}

      <div>
        <h3 className="text-[26px] text-ink leading-snug mb-1">{projectTitle(project)}</h3>
        {showContext && <p className="text-[16px] text-meta mb-5">{project.context}</p>}

        <p className={`text-[19px] leading-relaxed text-body mb-5 ${showContext ? "" : "mt-3"}`}>
          {project.blurb}
        </p>

        <p className="text-[16px] text-meta mb-4">{project.keywords.join(" · ")}</p>

        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[17px]">
          {project.links.map((l) => {
            const offsite = l.href.startsWith("http")
            return (
              <a
                key={l.href}
                href={l.href}
                {...(offsite ? { target: "_blank", rel: "noreferrer" } : {})}
                className="text-ink hover:underline"
              >
                {l.label} <span aria-hidden="true">{offsite ? "↗" : "→"}</span>
              </a>
            )
          })}
          {project.note && <span className="text-[16px] text-meta italic">{project.note}</span>}
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import Footer from "@/components/Footer"
import { allExperience, expName, type ExpEntry } from "@/lib/experience"
import { allProjects, projectShort } from "@/lib/projects"

function ExperienceEntry({ exp }: { exp: ExpEntry }) {
  // Where the role's work is written up as a project, send the reader there
  // instead of repeating it.
  const project = exp.projectId ? allProjects.find((p) => p.id === exp.projectId) : undefined

  return (
    <section
      id={exp.id}
      className="py-9 border-b border-hair last:border-0 scroll-mt-20"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
        <div>
          <h2 className="text-[22px] text-ink mb-0.5">{expName(exp)}</h2>
          <p className="text-[18px] text-meta">{exp.role}</p>
        </div>
        <span className="text-[16px] text-meta tnum shrink-0">{exp.period}</span>
      </div>

      <ul className="space-y-2">
        {exp.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-[19px] leading-relaxed text-body">
            <span className="text-meta shrink-0">·</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {project && (
        <Link
          href={`/projects#${project.id}`}
          className="inline-block mt-4 text-[17px] text-meta hover:underline"
        >
          {projectShort(project)} →
        </Link>
      )}
    </section>
  )
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 pt-16 pb-28">

        <div className="mb-4 pb-7 border-b border-ink">
          <h1 className="display-caps text-[44px] text-ink">Experience</h1>
        </div>

        <div>
          {allExperience.map((exp) => (
            <ExperienceEntry key={exp.id} exp={exp} />
          ))}
        </div>

        <Footer className="mt-8" />

      </div>
    </div>
  )
}

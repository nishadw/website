import type { Metadata } from "next"
import Footer from "@/components/Footer"
import ProjectDetail from "@/components/ProjectDetail"
import { allExperience, expName, type ExpEntry } from "@/lib/experience"
import { projectById } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Experience · Nishad Wajge",
  description:
    "Amazon Lab126, Amazon Leo, General Dynamics Information Technology, Booz Allen Hamilton, and the Internal Revenue Service.",
}

function ExperienceEntry({ exp }: { exp: ExpEntry }) {
  // What a role actually produced belongs to the role. Where there is a
  // write-up, it is set here rather than standing somewhere else as a second
  // entry with the same contents.
  const project = exp.projectId ? projectById(exp.projectId) : undefined

  return (
    <section id={exp.id} className="py-10 border-b border-hair last:border-0 scroll-mt-20">
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
        <div className="mt-8 pt-8 border-t border-hair">
          <p className="display-caps text-[15px] text-meta mb-5">How it works</p>
          <ProjectDetail project={project} showContext={false} />
        </div>
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

        {allExperience.map((exp) => (
          <ExperienceEntry key={exp.id} exp={exp} />
        ))}

        <Footer className="mt-8" />

      </div>
    </div>
  )
}

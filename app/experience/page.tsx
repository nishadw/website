import Footer from "@/components/Footer"
import { allExperience, type ExpEntry } from "@/lib/experience"

function ExperienceEntry({ exp }: { exp: ExpEntry }) {
  return (
    <section
      id={exp.id}
      className="py-9 border-b border-hair last:border-0 scroll-mt-20"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
        <div>
          <h2 className="text-[18px] font-semibold text-ink mb-0.5">{exp.company}</h2>
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
      <div className="max-w-[1080px] mx-auto px-8 pt-16 pb-32">

        <div className="mb-10 pb-8 border-b border-hair">
          <h1 className="text-[44px] font-medium text-ink tracking-[-0.02em]">Experience</h1>
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

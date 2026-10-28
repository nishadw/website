import type { Metadata } from "next"
import Footer from "@/components/Footer"
import SectionHeader from "@/components/SectionHeader"
import ProjectDetail from "@/components/ProjectDetail"
import { researchProjects, independentProjects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Research · Nishad Wajge",
  description:
    "Exact first-passage likelihoods for neural diffusions, standardized difficulty labels for profiling LLMs, match play as a Markov decision process, and implicit bias in hospital triage.",
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 pt-16 pb-28">

        <div className="mb-14 pb-7 border-b border-ink">
          <h1 className="display-caps text-[44px] text-ink">Research</h1>
          <p className="text-[19px] text-body leading-relaxed mt-4">
            Each plate runs in three panels: the problem, the machinery, and the result. The objects
            carry across the panels, so a single mark can be followed the whole way through. Work
            done inside a role is written up under that role on{" "}
            <a href="/experience" className="text-ink hover:underline">
              Experience
            </a>
            .
          </p>
        </div>

        <section className="mb-16">
          <SectionHeader label="Papers" />
          {researchProjects.map((p) => (
            <section
              key={p.id}
              id={p.id}
              className="py-11 border-b border-hair last:border-0 scroll-mt-20"
            >
              <ProjectDetail project={p} />
            </section>
          ))}
        </section>

        {/* Built on no one's payroll, which is worth saying plainly. */}
        <section className="mb-20">
          <SectionHeader label="Independent work" />
          {independentProjects.map((p) => (
            <section
              key={p.id}
              id={p.id}
              className="py-11 border-b border-hair last:border-0 scroll-mt-20"
            >
              <ProjectDetail project={p} />
            </section>
          ))}
        </section>

        <Footer />

      </div>
    </div>
  )
}

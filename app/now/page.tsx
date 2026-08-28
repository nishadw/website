import Link from "next/link"
import EquityCurve, { type EquityPoint } from "@/components/EquityCurve"

// PLACEHOLDER PATH — replace with real year-end marks before publishing.
// Only the endpoints are real: these intermediate values are the smooth
// annualized-equivalent path (49.0%/yr and 13.0%/yr), not actual year results.
const curve: EquityPoint[] = [
  { year: "2021", portfolio: 100, benchmark: 100 },
  { year: "2022", portfolio: 149, benchmark: 113 },
  { year: "2023", portfolio: 222, benchmark: 128 },
  { year: "2024", portfolio: 331, benchmark: 144 },
  { year: "2025", portfolio: 493, benchmark: 163 },
  { year: "2026", portfolio: 734, benchmark: 184 },
]

const pastimes = [
  { label: "Reading",    detail: "Currently reading: The Brothers Karamazov, Letters from a Stoic" },
  { label: "Golf",       detail: "A work in progress (Handicap: 6.4)" },
  { label: "Movies",     detail: "Godfather, Schindler's List, 12 Angry Men" },
]

function SectionHeader({ label }: { label: string }) {
  return (
    <h2 className="text-[15px] font-semibold text-[#e8e8e8] mb-4">{label}</h2>
  )
}

export default function NowPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[780px] mx-auto px-8 pt-20 pb-32">

        {/* Header */}
        <div className="mb-14">
          <h1 className="text-[44px] font-medium text-[#e8e8e8] leading-[1.1] tracking-[-0.02em]">
            Behind the Scenes
          </h1>
        </div>

        {/* Investing */}
        <section className="mb-14">
          <SectionHeader label="Investing" />

          <div className="pl-4 border-l border-white/[0.05]">
            <p className="text-[13px] text-[#a0a0a0] leading-relaxed mb-6">
              My approach is fairly ordinary. I own a small number of companies 
              I can explain in plain language, usually because I suspect macroeconomic catalysts ahead of them are not priced in.
              I'm wrong often enough that I've started leaning on statistical methods to check my own judgment.
            </p>
            <EquityCurve data={curve} />
          </div>
        </section>

        {/* Pastimes */}
        <section className="mb-24">
          <SectionHeader label="Pastimes" />
          <div>
            {pastimes.map((h) => (
              <div key={h.label} className="flex items-start gap-6 py-3 border-b border-white/[0.06]">
                <span className="text-[13px] font-semibold text-[#e8e8e8] w-20 shrink-0">{h.label}</span>
                <span className="text-[13px] text-[#a0a0a0]">{h.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="flex items-center justify-between text-[13px] text-[#6e6e6e] border-t border-white/[0.06] pt-8">
          <Link href="/" className="hover:text-[#e8e8e8] transition-colors">
            ← nishad.page
          </Link>
          <span>© Nishad Wajge 2026</span>
        </div>

      </div>
    </div>
  )
}

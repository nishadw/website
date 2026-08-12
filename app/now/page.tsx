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

// Fill in your real figures. Showing a benchmark keeps it honest, not braggy.
const investing = {
  since: "2021",
  twr: "49.0%",       // time-weighted — how the assets performed
  irr: "40.4%",       // money-weighted — how my actual cash performed
  multiple: "3.7×",   // on total invested capital
  benchmark: "13.0%", // S&P 500, same window
}

const pastimes = [
  { label: "Reading",    detail: "The Brothers Karamazov | Letters from a Stoic | Thinking Strategically" },
  { label: "Golf",       detail: "Need to figure out why I'm slicing it so much" },
  { label: "Travelling", detail: "Visiting all 7 continents" },
  { label: "Movies",     detail: "Godfather Part I | The Good, The Bad and The Ugly | Schindler's List" },
]

function SectionHeader({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <span className="text-[10px] font-mono tabular-nums tracking-widest metallic">{number}</span>
      <span className="text-[10px] tracking-[0.2em] uppercase font-semibold metallic">{label}</span>
      <div className="flex-1 h-px bg-white/[0.05]" />
    </div>
  )
}

function Metric({ label, value, note, primary }: {
  label: string; value: string; note?: string; primary?: boolean
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.15em] text-[#707070] font-mono mb-1.5">
        {label}
      </div>
      <div
        className={
          primary
            ? "text-[22px] font-medium text-[#d0d0d0] tracking-tight tabular-nums leading-none"
            : "text-[15px] font-medium text-[#909090] tracking-tight tabular-nums leading-none pt-[6px]"
        }
      >
        {value}
      </div>
      {note && (
        <div className="text-[10px] font-mono text-[#5a5a5a] mt-1.5">{note}</div>
      )}
    </div>
  )
}

export default function NowPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[720px] mx-auto px-8 pt-20 pb-32">

        {/* Header */}
        <div className="mb-14">
          <h1 className="text-[54px] font-medium text-[#efefef] leading-[1.0] tracking-[-0.03em] mb-4">
            Behind the Scenes
          </h1>
        </div>

        {/* Investing */}
        <section className="mb-14">
          <SectionHeader number="01" label="Investing" />

          <div className="pl-4 border-l border-white/[0.05]">
            <p className="text-[13px] text-[#909090] leading-relaxed mb-6">
              Since {investing.since}, I've built a diversified portfolio around a simple idea: 
              owning comapnies with structural gaps and whose story I can explain to a friend. More recently, I've started 
              bringing quantitative techniques into my process—using data to test my assumptions, 
              think more systematically about risk, and size positions based on conviction rather than emotion.
            </p>
            <EquityCurve data={curve} />

            {/* Annualized returns — two honest ways to measure the same portfolio */}
            <div className="flex flex-wrap items-start gap-x-10 gap-y-5 mb-5">
              <Metric
                label="Time-weighted"
                value={investing.twr}
                note="asset performance"
                primary
              />
              <Metric
                label="Money-weighted (IRR)"
                value={investing.irr}
                note="my actual cash"
                primary
              />
              <Metric
                label="S&P 500"
                value={investing.benchmark}
                note="same window"
              />
              <Metric
                label="Value ÷ deposits"
                value={investing.multiple}
                note="all cash in, to date"
              />
            </div>

            <p className="text-[11px] text-[#707070] leading-relaxed border-t border-white/[0.05] pt-4">
              All figures annualized since {investing.since}. Time-weighted return measures how the
              positions themselves compounded, ignoring when I added money; money-weighted return
              (IRR) measures how my out-of-pocket cash actually grew, since later deposits had less
              time to work. The gap between the two is the cost of adding capital late, not a
              disagreement about the results.
            </p>
          </div>
        </section>

        {/* Pastimes */}
        <section className="mb-24">
          <SectionHeader number="02" label="Pastimes" />
          <div>
            {pastimes.map((h) => (
              <div key={h.label} className="flex items-start gap-6 py-3 border-b border-white/[0.04]">
                <span className="text-[13px] font-semibold text-[#909090] w-20 shrink-0">{h.label}</span>
                <span className="text-[13px] text-[#909090]">{h.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-[#909090] border-t border-white/[0.05] pt-8">
          <Link href="/" className="font-mono hover:text-[#888] transition-colors duration-150">
            ← nishad.page
          </Link>
          <span className="font-mono">© Nishad Wajge 2026</span>
        </div>

      </div>
    </div>
  )
}

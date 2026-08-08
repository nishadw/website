import Link from "next/link"


// Fill in your real figures. Showing a benchmark keeps it honest, not braggy.
const investing = {
  since: "2021",
  annualized: "24.57%",
  benchmark: "S&P 500 · 13%",
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
              Since {investing.since}, I've run my portfolio around a few rules: diversify across
              uncorrelated themes, follow structural gaps, and only own businesses whose
              economics I can explain to a friend. Lately I've added more quant techniques, which taught me to size
              positions by conviction, not emotion.
            </p>
            <div className="flex items-end gap-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#707070] font-mono mb-1.5">
                  Annualized return · since {investing.since}
                </div>
                <div className="text-[22px] font-medium text-[#d0d0d0] tracking-tight tabular-nums">
                  {investing.annualized}
                </div>
              </div>
              <div className="pb-1">
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#707070] font-mono mb-1.5">
                  Benchmark
                </div>
                <div className="text-[12px] text-[#909090] font-mono tabular-nums">
                  {investing.benchmark}
                </div>
              </div>
            </div>
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

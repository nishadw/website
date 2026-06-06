import Link from "next/link"


const hobbies = [
  { label: "Hiking",     detail: "Finding new lock screen images" },
  { label: "Golf",       detail: "Need to figure out why I'm slicing it so much" },
  { label: "Travelling", detail: "Chasing new cities, food, and experiences" },
  { label: "Movies",     detail: "Godfather Part I; The Good, The Bad and The Ugly; Schindler's List; Incendies" },
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
          <p className="text-[11px] font-mono text-[#2a2a2a]">June 2026</p>
        </div>

        {/* Learning */}
        <section className="mb-14">
          <SectionHeader number="01" label="Learning" />
          <p className="text-[14px] text-[#4a4a4a] leading-relaxed mb-7 pl-4 border-l border-white/[0.05]">
            Outside of work, I try to keep up with AI research, especially around
            interpretability, alignment, and the long-horizon implications of our current trajectory.
          </p>
        </section>

        {/* Stock Market */}
        <section className="mb-14">
          <SectionHeader number="02" label="Stock Market Investments" />

          <div className="pl-4 border-l border-white/[0.05]">
            <p className="text-[13px] text-[#3a3a3a] leading-relaxed mb-3">
              I invest with a macro discretionary approach, trying to build a small, concentrated portfolio of companies that are mispriced or have strong growth potential.
              Currently, I am investing in a plethora of land, energy, infrastructure, and industrial companies that I believe will benefit from long-term secular trends.
            </p>
          </div>
        </section>

        {/* My Life */}
        <section className="mb-24">
          <SectionHeader number="03" label="Hobbies & Interests" />
          <div>
            {hobbies.map((h) => (
              <div key={h.label} className="flex items-start gap-6 py-3 border-b border-white/[0.04]">
                <span className="text-[13px] font-semibold text-[#555] w-20 shrink-0">{h.label}</span>
                <span className="text-[13px] text-[#383838]">{h.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] text-[#252525] border-t border-white/[0.05] pt-8">
          <Link href="/" className="font-mono hover:text-[#888] transition-colors duration-150">
            ← nishad.page
          </Link>
          <span className="font-mono">© Nishad Wajge 2026</span>
        </div>

      </div>
    </div>
  )
}

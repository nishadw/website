import Footer from "@/components/Footer"
import SectionHeader from "@/components/SectionHeader"
import EquityCurve, { type EquityPoint } from "@/components/EquityCurve"
import ProjectDetail from "@/components/ProjectDetail"
import { independentProjects } from "@/lib/projects"

// Two years of real marks. SnapTrade's balance history only reaches back twelve
// months, so the earlier stretch is rebuilt: unwind all 296 recorded trades,
// dividends and fees backward from today's holdings to recover the position vector
// on any past day, then mark it to daily closes. The rebuild agrees with the
// broker's own balance history to 0.47% mean absolute error across thirteen
// checkpoints, and to the cent on 2026-09-18.
//
// The account took in no deposits, withdrawals or transfers over the whole span
// (getAccountActivities returns only BUY, SELL, DIVIDEND, INTEREST and EXPENSE),
// so account value is the return series outright — nothing to adjust for, and no
// contribution dressed up as a gain. Benchmark is SPY with dividends reinvested.
// Both indexed to 0% at 2024-09-30. The last point is the month to date.
//
// This is not inception: the account already held 19,504 dollars of stock on the
// first day the trade record reaches. It is the longest honest window available.
const curve: EquityPoint[] = [
  { label: "Sep '24", portfolio: 100.0, benchmark: 100.0 },
  { label: "Oct '24",     portfolio: 108.4, benchmark:  99.1 },
  { label: "Nov '24",     portfolio: 116.1, benchmark: 105.0 },
  { label: "Dec '24",     portfolio: 120.1, benchmark: 102.5 },
  { label: "Jan '25", portfolio: 117.9, benchmark: 105.2 },
  { label: "Feb '25",     portfolio: 118.3, benchmark: 103.9 },
  { label: "Mar '25",     portfolio: 105.5, benchmark:  98.1 },
  { label: "Apr '25",     portfolio:  99.9, benchmark:  97.3 },
  { label: "May '25",     portfolio: 110.6, benchmark: 103.4 },
  { label: "Jun '25",     portfolio: 114.0, benchmark: 108.7 },
  { label: "Jul '25",     portfolio: 110.1, benchmark: 111.2 },
  { label: "Aug '25",     portfolio: 115.0, benchmark: 113.5 },
  { label: "Sep '25",     portfolio: 135.4, benchmark: 117.5 },
  { label: "Oct '25",     portfolio: 145.4, benchmark: 120.3 },
  { label: "Nov '25",     portfolio: 152.8, benchmark: 120.6 },
  { label: "Dec '25",     portfolio: 148.5, benchmark: 120.7 },
  { label: "Jan '26", portfolio: 161.1, benchmark: 122.4 },
  { label: "Feb '26",     portfolio: 148.4, benchmark: 121.4 },
  { label: "Mar '26",     portfolio: 138.2, benchmark: 115.4 },
  { label: "Apr '26",     portfolio: 165.1, benchmark: 127.5 },
  { label: "May '26",     portfolio: 160.8, benchmark: 134.2 },
  { label: "Jun '26",     portfolio: 160.8, benchmark: 132.8 },
  { label: "Jul '26",     portfolio: 157.8, benchmark: 132.9 },
  { label: "Aug '26",     portfolio: 172.8, benchmark: 136.4 },
  { label: "Sep '26", portfolio: 169.3, benchmark: 137.9 },
]

const pastimes = [
  { label: "Reading",    detail: "The Brothers Karamazov, The White Nights, Letters from a Stoic" },
  { label: "Golf",       detail: "A constant work in progress (Handicap: 6.4)" },
  { label: "Movies",     detail: "Godfather, Schindler's List, 12 Angry Men, Ratatouille" },
]

export default function NowPage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 pt-20 pb-28">

        {/* Header */}
        <div className="mb-14">
          <h1 className="display-caps text-[52px] text-ink leading-[1.12]">
            Interests
          </h1>
        </div>

        {/* Pastimes */}
        <section className="mb-16">
          <SectionHeader label="Pastimes" />
          <div>
            {pastimes.map((h) => (
              <div key={h.label} className="flex items-start gap-6 py-3 border-b border-hair">
                <span className="text-[19px] text-ink w-28 shrink-0">{h.label}</span>
                <span className="text-[19px] text-body">{h.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Investing */}
        <section className="mb-20">
          <SectionHeader label="Investing" />

          <div>
            
            <EquityCurve
              data={curve}
              gridlines={[100, 125, 150, 175]}
              yMin={94}
              yMax={181}
              tickEvery={4}
            />

            <p className="text-[19px] text-body leading-relaxed">
              I own a small handful of companies based on a belief of future macro trends. Most of my
              choices are discretionary, but I have begun to use a systematic approach for a small portion of the portfolio.
            </p>

            {/* The systematic half, in full. */}
            {independentProjects.map((project) => (
              <div key={project.id} id={project.id} className="mt-10 pt-8 border-t border-hair scroll-mt-20">
                <ProjectDetail project={project} showContext={false} />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <Footer />

      </div>
    </div>
  )
}

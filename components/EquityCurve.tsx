// Indexed equity curve: portfolio vs benchmark, both = 100 at t0, one shared axis.
// Pure SVG, no client JS — hover states are CSS-only via group-hover.

export type EquityPoint = {
  year: string
  portfolio: number // indexed to 100 at the first point
  benchmark: number // indexed to 100 at the first point
}

const PORTFOLIO_COLOR = "#e4e4e7"
const BENCHMARK_COLOR = "#6b6b70"

// Geometry (viewBox units)
const W = 640
const H = 172
const PLOT_L = 26
const PLOT_R = 500
const PLOT_T = 12
const PLOT_B = 128
const Y_MIN = 100

export default function EquityCurve({
  data,
  gridlines = [100, 300, 500, 700],
  yMax = 760,
}: {
  data: EquityPoint[]
  gridlines?: number[]
  yMax?: number
}) {
  const step = (PLOT_R - PLOT_L) / (data.length - 1)
  const x = (i: number) => PLOT_L + i * step
  const y = (v: number) => PLOT_B - ((v - Y_MIN) / (yMax - Y_MIN)) * (PLOT_B - PLOT_T)

  const path = (key: "portfolio" | "benchmark") =>
    data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join(" ")

  const last = data[data.length - 1]
  const multiple = (v: number) => `${(v / 100).toFixed(1)}×`
  const tick = (v: number) => `${v / 100}×`

  return (
    <figure className="mb-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        // Explicit ratio so the box can never collapse to zero height if
        // intrinsic sizing from the viewBox doesn't resolve.
        style={{ aspectRatio: `${W} / ${H}` }}
        className="block w-full h-auto"
        role="img"
        aria-label={`Growth of the portfolio versus the S&P 500 from ${data[0].year} to ${last.year}, both indexed to 100 at the start. The portfolio ends at ${multiple(last.portfolio)} and the benchmark at ${multiple(last.benchmark)}.`}
      >
        {/* Gridlines — solid hairlines, one shade off the surface */}
        {gridlines.map((g) => (
          <g key={g}>
            <line
              x1={PLOT_L}
              x2={PLOT_R}
              y1={y(g)}
              y2={y(g)}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
            <text
              x={PLOT_L - 8}
              y={y(g) + 3}
              textAnchor="end"
              className="fill-[#5a5a5a] text-[9px] font-mono tabular-nums"
            >
              {tick(g)}
            </text>
          </g>
        ))}

        {/* Year labels */}
        {data.map((d, i) => (
          <text
            key={d.year}
            x={x(i)}
            y={PLOT_B + 18}
            textAnchor="middle"
            className="fill-[#5a5a5a] text-[9px] font-mono tabular-nums"
          >
            {d.year}
          </text>
        ))}

        {/* Series — thin 2px lines, benchmark under portfolio */}
        <path
          d={path("benchmark")}
          fill="none"
          stroke={BENCHMARK_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={path("portfolio")}
          fill="none"
          stroke={PORTFOLIO_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Endpoint markers, ringed in the surface color so they read over the line */}
        <circle cx={x(data.length - 1)} cy={y(last.benchmark)} r="3.5" fill={BENCHMARK_COLOR} stroke="#0a0a0a" strokeWidth="2" />
        <circle cx={x(data.length - 1)} cy={y(last.portfolio)} r="3.5" fill={PORTFOLIO_COLOR} stroke="#0a0a0a" strokeWidth="2" />

        {/* Direct labels — identity sits beside each mark, never color alone */}
        <text x={PLOT_R + 14} y={y(last.portfolio) + 3} className="fill-[#b0b0b0] text-[10px] font-mono">
          Portfolio {multiple(last.portfolio)}
        </text>
        <text x={PLOT_R + 14} y={y(last.benchmark) + 3} className="fill-[#808080] text-[10px] font-mono">
          S&amp;P 500 {multiple(last.benchmark)}
        </text>

        {/* Hover layer — crosshair + readout, one column at a time */}
        {data.map((d, i) => (
          <g key={`hover-${d.year}`} className="group">
            <rect
              x={Math.max(PLOT_L, x(i) - step / 2)}
              y={PLOT_T - 6}
              width={Math.min(PLOT_R, x(i) + step / 2) - Math.max(PLOT_L, x(i) - step / 2)}
              height={PLOT_B - PLOT_T + 24}
              fill="transparent"
            />
            <line
              x1={x(i)}
              x2={x(i)}
              y1={PLOT_T - 6}
              y2={PLOT_B}
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
            />
            <circle
              cx={x(i)}
              cy={y(d.benchmark)}
              r="3.5"
              fill={BENCHMARK_COLOR}
              stroke="#0a0a0a"
              strokeWidth="2"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
            />
            <circle
              cx={x(i)}
              cy={y(d.portfolio)}
              r="3.5"
              fill={PORTFOLIO_COLOR}
              stroke="#0a0a0a"
              strokeWidth="2"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
            />
            <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
              <text x={PLOT_L + 6} y={PLOT_T + 12} className="fill-[#909090] text-[10px] font-mono tabular-nums">
                {d.year}
              </text>
              <text x={PLOT_L + 6} y={PLOT_T + 26} className="fill-[#b0b0b0] text-[10px] font-mono tabular-nums">
                Portfolio {multiple(d.portfolio)}
              </text>
              <text x={PLOT_L + 6} y={PLOT_T + 40} className="fill-[#808080] text-[10px] font-mono tabular-nums">
                S&amp;P 500 {multiple(d.benchmark)}
              </text>
            </g>
          </g>
        ))}
      </svg>
      <figcaption className="text-[10px] font-mono text-[#5a5a5a] mt-2">
        Growth of a dollar invested at the start of {data[0].year}. Time-weighted, so the size and
        timing of deposits don&apos;t flatter the line.
      </figcaption>
    </figure>
  )
}

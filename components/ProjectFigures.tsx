import type { CSSProperties, ReactNode } from "react"

/* Seven plates, one per project, each a three-panel sequence.
 *
 * The panels are not a slideshow. The objects persist: a filing becomes a
 * position change becomes a ranked candidate; a photograph becomes a point on
 * a latent path becomes a tick on a time axis. Chrome that belongs to one
 * panel (axes, labels, one-off marks) cross-fades around them. A reader who
 * watches one mark can follow the whole argument, which is the point.
 *
 * Everything is inline SVG in the two palette tokens: a few kilobytes apiece,
 * sharp at any density, and held on panel one under `prefers-reduced-motion`.
 * Timing lives in app/figures.css; coordinates here are matched to it.
 */

const VB_W = 360
const VB_H = 220

type FigVars = Record<string, string>
const v = (x: FigVars) => x as CSSProperties

// A morph target: where the object sits in panel 2 and panel 3, as an offset
// from where it is drawn, plus the scale it takes there.
type Pose = { x?: number; y?: number; s?: number; sx?: number; sy?: number }

function morph(p2: Pose, p3: Pose, extra: FigVars = {}): CSSProperties {
  return v({
    "--p2x": `${p2.x ?? 0}px`,
    "--p2y": `${p2.y ?? 0}px`,
    "--p2sx": `${p2.sx ?? p2.s ?? 1}`,
    "--p2sy": `${p2.sy ?? p2.s ?? 1}`,
    "--p3x": `${p3.x ?? 0}px`,
    "--p3y": `${p3.y ?? 0}px`,
    "--p3sx": `${p3.sx ?? p3.s ?? 1}`,
    "--p3sy": `${p3.sy ?? p3.s ?? 1}`,
    ...extra,
  })
}

type Scene = {
  caption: string
  // Drawn beneath the persisting objects: grounds, grids, axes.
  under?: ReactNode
  // Drawn above them: labels, brackets, anything that must stay readable.
  node?: ReactNode
}

const T9 = "fill-meta text-[9px]"
const T10 = "fill-meta text-[10px]"
const T11 = "fill-ink text-[11px]"

function Plate({
  label,
  scenes,
  carriers,
  dur = "15s",
}: {
  label: string
  scenes: Scene[]
  // The objects that persist across all three panels.
  carriers?: ReactNode
  dur?: string
}) {
  return (
    <figure className="fig" style={v({ "--dur": dur })}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
        className="block w-full h-auto"
        role="img"
        aria-label={label}
      >
        <rect x="0.5" y="0.5" width={VB_W - 1} height={VB_H - 1} fill="none" className="stroke-hair" />

        {scenes.map((s, i) =>
          s.under ? (
            <g key={`u${i}`} className={`fig-anim a-s${i + 1}`}>
              {s.under}
            </g>
          ) : null
        )}

        {carriers}

        {scenes.map((s, i) =>
          s.node ? (
            <g key={`n${i}`} className={`fig-anim a-s${i + 1}`}>
              {s.node}
            </g>
          ) : null
        )}
      </svg>

      <figcaption className="mt-2.5 flex items-start justify-between gap-4">
        <span className="relative block flex-1 h-[38px] text-[14px] leading-[1.35] text-meta italic">
          {scenes.map((s, i) => (
            <span key={i} className={`absolute inset-0 fig-anim a-s${i + 1}`}>
              {s.caption}
            </span>
          ))}
        </span>
        <span className="flex items-center gap-1.5 shrink-0 pt-1.5" aria-hidden="true">
          {scenes.map((_, i) => (
            <span key={i} className="relative block h-[3px] w-[14px] bg-hair">
              <span className={`absolute inset-0 bg-ink fig-anim a-s${i + 1}`} />
            </span>
          ))}
        </span>
      </figcaption>
    </figure>
  )
}

type Num = number | string

function Arrow({
  x1,
  y1,
  x2,
  y2,
  cls = "stroke-meta",
  width = 1,
  dash,
}: {
  x1: Num
  y1: Num
  x2: Num
  y2: Num
  cls?: string
  width?: number
  dash?: string
}) {
  const [ax, ay, bx, by] = [x1, y1, x2, y2].map(Number)
  const a = Math.atan2(by - ay, bx - ax)
  const h = 5
  const p = (t: number) =>
    `${(bx - h * Math.cos(a - t)).toFixed(1)},${(by - h * Math.sin(a - t)).toFixed(1)}`
  return (
    <>
      <line x1={ax} y1={ay} x2={bx} y2={by} strokeWidth={width} strokeDasharray={dash} className={cls} />
      <polyline points={`${p(0.42)} ${bx},${by} ${p(-0.42)}`} fill="none" strokeWidth={width} className={cls} />
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   1 · Exact first-passage likelihoods
       Four photographs become four points on a latent path, then four
       marks of history on a forecast axis.
   ═══════════════════════════════════════════════════════════════════════ */

// The latent path. The four visit times are nodes on it, so the observations
// land exactly on the trajectory when they move.
const VISITS = [62, 122, 182, 242]
const VISIT_Y = [147, 128, 104, 78]
const WALK =
  "34,152 46,145 58,149 62,147 74,138 86,142 98,131 110,135 122,128 134,118 146,122 158,110 170,114 182,104 194,96 206,100 218,88 230,92 242,78 254,66 266,56 272,48"
const WALK_FAINT_A =
  "34,152 50,148 66,152 82,144 98,148 114,138 130,142 146,132 162,136 178,124 194,128 210,114 226,118 242,102 258,88 274,70 288,56 296,48"
const WALK_FAINT_B =
  "34,152 52,154 70,148 88,152 106,146 124,150 142,142 160,146 178,136 196,140 214,130 232,134 250,122 268,112 286,92 304,72 318,56 324,48"
// Where the visit marks compress to once the panel becomes a forecast.
const HIST_X = [40, 56, 72, 88]

export function FigFirstPassage() {
  return (
    <Plate
      label="Three panels. Observations taken at four irregular visits, with the event falling after the last one. The same four observations become points on a latent diffusion that crosses a boundary. The four then compress into history on a time axis, under the predicted event-time density and its interval."
      carriers={VISITS.map((x, i) => (
        <g
          key={x}
          className="fig-anim a-morph"
          style={morph(
            { y: VISIT_Y[i] - 96, s: 0.22 },
            { x: HIST_X[i] - x, y: 80, s: 0.18 }
          )}
        >
          <rect
            x={x - 15}
            y="82"
            width="28"
            height="28"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
            className="fill-page stroke-ink"
          />
          <circle
            cx={x - 1}
            cy="96"
            r={4 + i * 2}
            fill="none"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
            className="stroke-ink"
          />
        </g>
      ))}
      scenes={[
        {
          caption: "The subject is observed at four irregular visits. The event happens after the last one, at an unknown time.",
          under: <line x1="30" y1="160" x2="334" y2="160" strokeWidth="1" className="stroke-ink" />,
          node: (
            <>
              {VISITS.map((x, i) => (
                <g key={x}>
                  <line x1={x} y1="160" x2={x} y2="167" strokeWidth="1" className="stroke-ink" />
                  <text x={x} y="182" textAnchor="middle" className={T9}>
                    t{i}
                  </text>
                </g>
              ))}
              <rect
                x="286"
                y="82"
                width="28"
                height="28"
                fill="none"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                className="stroke-meta"
              />
              <text x="300" y="102" textAnchor="middle" className="fill-meta text-[14px]">
                ?
              </text>
              <line x1="300" y1="160" x2="300" y2="167" strokeWidth="1" strokeDasharray="2 2" className="stroke-meta" />
              <path d="M242,140 L242,132 L300,132 L300,140" fill="none" strokeWidth="1.2" className="stroke-ink" />
              <text x="271" y="126" textAnchor="middle" className={T9}>
                event in this interval
              </text>
              <text x="30" y="200" className={T9}>
                interval censored · no continuous monitoring
              </text>
            </>
          ),
        },
        {
          caption: "Each observation pins a latent diffusion whose clock is set by the conditions. The event is its first passage across the boundary.",
          under: (
            <>
              <line x1="30" y1="34" x2="30" y2="162" strokeWidth="1" className="stroke-hair" />
              <line x1="30" y1="162" x2="334" y2="162" strokeWidth="1" className="stroke-hair" />
              <polyline points={WALK_FAINT_A} fill="none" strokeWidth="1" strokeLinejoin="round" className="stroke-hair" />
              <polyline points={WALK_FAINT_B} fill="none" strokeWidth="1" strokeLinejoin="round" className="stroke-hair" />
              <polyline points={WALK} fill="none" strokeWidth="1.4" strokeLinejoin="round" className="stroke-ink" />
            </>
          ),
          node: (
            <>
              <line x1="30" y1="48" x2="334" y2="48" strokeWidth="1" strokeDasharray="4 3" className="stroke-ink" />
              <text x="24" y="45" textAnchor="end" className={T9}>
                b
              </text>
              <circle cx="272" cy="48" r="3.4" strokeWidth="1.2" className="fill-page stroke-ink" />
              <text x="278" y="42" className={T9}>
                first passage
              </text>
              <text x="30" y="182" className={T9}>
                learned drift · Arrhenius clock · Fokker–Planck transition
              </text>
              <text x="334" y="182" textAnchor="end" className={T9}>
                time
              </text>
            </>
          ),
        },
        {
          caption: "Solving the Kolmogorov equations on a grid gives the event-time density exactly, so the reported interval is calibrated rather than nominal.",
          under: <line x1="30" y1="176" x2="334" y2="176" strokeWidth="1" className="stroke-ink" />,
          node: (
            <>
              <text x="64" y="196" textAnchor="middle" className={T9}>
                history
              </text>
              <line x1="100" y1="52" x2="100" y2="176" strokeWidth="1" strokeDasharray="2 3" className="stroke-meta" />
              <text x="105" y="60" className={T9}>
                today
              </text>
              <path
                d="M100,175 C148,172 170,150 200,130 C230,111 258,130 288,155 C308,168 322,173 334,175"
                fill="none"
                strokeWidth="1.6"
                className="stroke-ink"
              />
              <line x1="160" y1="92" x2="160" y2="176" strokeWidth="1" className="stroke-meta" />
              <line x1="268" y1="92" x2="268" y2="176" strokeWidth="1" className="stroke-meta" />
              <path d="M160,86 L160,78 L268,78 L268,86" fill="none" strokeWidth="1.2" className="stroke-ink" />
              <text x="214" y="72" textAnchor="middle" className={T10}>
                80% credible interval
              </text>
              <path d="M205,126 L210,118 L200,118 Z" className="fill-ink" />
              <line x1="205" y1="126" x2="205" y2="176" strokeWidth="1.4" className="stroke-ink" />
              <text x="100" y="196" className={T9}>
                P(event by day h | history)
              </text>
              <text x="334" y="196" textAnchor="end" className={T9}>
                days ahead
              </text>
            </>
          ),
        },
      ]}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   2 · Time-series forecasting of policy attention
       Nine documents become nine points in a topic map, then nine
       observations of one series that is extrapolated forward.
   ═══════════════════════════════════════════════════════════════════════ */

// Home positions: three source stacks of three.
const DOCS = [0, 1, 2].flatMap((r) =>
  [0, 1, 2].map((k) => ({ x: 30 + k * 5, y: 44 + r * 54 + k * 4, cx: 51 + k * 5, cy: 48.5 + r * 54 + k * 4 }))
)
// Panel 2: four topic clusters.
const TOPIC_PTS = [
  [84, 58], [104, 64], [94, 78],
  [200, 50], [218, 62], [208, 76],
  [112, 144], [130, 156],
  [246, 142],
]
// Panel 3: one biweekly series.
const SERIES_PTS = [
  [60, 150], [80, 143], [100, 147], [120, 134], [140, 127],
  [160, 118], [180, 113], [200, 101], [220, 93],
]

export function FigAttention() {
  return (
    <Plate
      label="Three panels. Ten scrapers feed documents through a relevance gate that keeps rejects as an audit trail. The surviving documents cluster into a registry of topics. Each topic's biweekly attention series is then extrapolated past the present inside a widening forecast cone."
      carriers={DOCS.map((d, i) => (
        <g
          key={i}
          className="fig-anim a-morph"
          style={morph(
            { x: TOPIC_PTS[i][0] - d.cx, y: TOPIC_PTS[i][1] - d.cy, sx: 0.13, sy: 0.56 },
            { x: SERIES_PTS[i][0] - d.cx, y: SERIES_PTS[i][1] - d.cy, sx: 0.1, sy: 0.5 }
          )}
        >
          <rect
            x={d.x}
            y={d.y}
            width="42"
            height="9"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            className="fill-page stroke-ink"
          />
        </g>
      ))}
      scenes={[
        {
          caption: "Ten scrapers pull six years of academic, government and industry writing. Every document clears a relevance gate before it counts.",
          node: (
            <>
              {["academic", "policy", "industry"].map((lab, r) => (
                <g key={lab}>
                  <text x="26" y={44 + r * 54 + 32} className={T9}>
                    {lab}
                  </text>
                  <Arrow x1="86" y1={48 + r * 54} x2="142" y2="104" />
                </g>
              ))}
              <rect x="148" y="84" width="52" height="40" strokeWidth="1.2" className="fill-page stroke-ink" />
              <text x="174" y="108" textAnchor="middle" className={T11}>
                gate
              </text>
              <text x="174" y="76" textAnchor="middle" className={T9}>
                NLI relevance
              </text>
              <Arrow x1="200" y1="104" x2="258" y2="104" cls="stroke-ink" width={1.2} />
              <text x="264" y="100" className={T10}>
                ≈24,000
              </text>
              <text x="264" y="114" className={T9}>
                kept
              </text>
              <Arrow x1="174" y1="124" x2="174" y2="166" dash="2 3" />
              <text x="182" y="172" className={T9}>
                rejects retained as an audit trail
              </text>
            </>
          ),
        },
        {
          caption: "What survives is embedded and matched into a registry: the concerns the field is actually arguing about.",
          under: (
            <>
              {[
                [94, 66, 38, 28],
                [208, 62, 32, 26],
                [120, 150, 32, 22],
                [246, 142, 26, 20],
              ].map(([cx, cy, rx, ry]) => (
                <ellipse
                  key={cx}
                  cx={cx}
                  cy={cy}
                  rx={rx}
                  ry={ry}
                  fill="none"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                  className="stroke-hair"
                />
              ))}
            </>
          ),
          node: (
            <>
              {[
                [94, 104, "debris"],
                [208, 96, "tracking"],
                [120, 180, "disposal"],
                [246, 170, "traffic"],
              ].map(([cx, cy, lab]) => (
                <text key={lab as string} x={cx as number} y={cy as number} textAnchor="middle" className={T10}>
                  {lab}
                </text>
              ))}
              <text x="30" y="206" className={T9}>
                BGE embeddings · topic registry · biweekly buckets
              </text>
            </>
          ),
        },
        {
          caption: "Each topic becomes a series. A sequence model extrapolates it past the present, with the cone widening as the horizon grows.",
          under: (
            <>
              <line x1="40" y1="44" x2="40" y2="178" strokeWidth="1" className="stroke-hair" />
              <line x1="40" y1="178" x2="334" y2="178" strokeWidth="1" className="stroke-ink" />
              <polyline
                points={SERIES_PTS.map((p) => p.join(",")).join(" ")}
                fill="none"
                strokeWidth="1.4"
                strokeLinejoin="round"
                className="stroke-meta"
              />
            </>
          ),
          node: (
            <>
              <polyline
                points="220,93 258,78 296,66 328,54"
                fill="none"
                strokeWidth="1.8"
                strokeDasharray="5 3"
                strokeLinejoin="round"
                className="stroke-ink"
              />
              <path d="M220,93 L328,36" fill="none" strokeWidth="1" strokeDasharray="2 3" className="stroke-hair" />
              <path d="M220,93 L328,80" fill="none" strokeWidth="1" strokeDasharray="2 3" className="stroke-hair" />
              <line x1="220" y1="44" x2="220" y2="178" strokeWidth="1" strokeDasharray="2 3" className="stroke-meta" />
              <text x="220" y="38" textAnchor="middle" className={T9}>
                now
              </text>
              <text x="276" y="38" textAnchor="middle" className={T9}>
                forecast
              </text>
              <text x="40" y="196" className={T9}>
                attention per topic, biweekly
              </text>
              <text x="334" y="196" textAnchor="end" className={T9}>
                horizon
              </text>
            </>
          ),
        },
      ]}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   3 · On-device vision cascade
       Three models inside a handset unfold into three stages, then fold
       back into the single label they produce.
   ═══════════════════════════════════════════════════════════════════════ */

const STAGE_X = [115, 203, 291]
const CHIP_X = [152, 176, 200]

export function FigCascade() {
  return (
    <Plate
      label="Three panels. A handset in the field with no network, carrying three models. The three unfold into a cascade in which each stage handles only what the previous one could not resolve. They fold back into a single label, dropped as a map pin."
      carriers={
        <>
          {/* The frame being classified */}
          <g
            className="fig-anim a-morph"
            style={morph({ x: -130, y: 1, sx: 0.47, sy: 0.48 }, { x: 70, y: -2, s: 0.19 })}
          >
            <rect
              x="140"
              y="64"
              width="72"
              height="58"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              className="fill-page stroke-ink"
            />
            <path
              d="M148,116 L166,90 L180,110 L192,96 L206,116 Z"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="fill-page stroke-meta"
            />
            <circle cx="196" cy="78" r="5" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" className="stroke-meta" />
          </g>

          {/* The three models */}
          {CHIP_X.map((x, i) => (
            <g
              key={x}
              className="fig-anim a-morph"
              style={morph(
                { x: STAGE_X[i] - x, y: -57, sx: 3.44, sy: 2.56 },
                { x: 102 - x, y: -32, s: 0.55 }
              )}
            >
              <rect
                x={x - 9}
                y="141"
                width="18"
                height="18"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
                className="fill-page stroke-ink"
              />
            </g>
          ))}
        </>
      }
      scenes={[
        {
          caption: "A handset in the field, carrying three models and no connection to anything.",
          under: (
            <>
              <rect x="124" y="26" width="112" height="168" rx="10" strokeWidth="1.4" className="fill-page stroke-ink" />
              <line x1="124" y1="46" x2="236" y2="46" strokeWidth="1" className="stroke-hair" />
            </>
          ),
          node: (
            <>
              <text x="180" y="176" textAnchor="middle" className={T9}>
                three models, on the device
              </text>
              <g>
                <path d="M256,70 A22,22 0 0 1 290,70" fill="none" strokeWidth="1.2" className="stroke-meta" />
                <path d="M262,78 A14,14 0 0 1 284,78" fill="none" strokeWidth="1.2" className="stroke-meta" />
                <circle cx="273" cy="86" r="2" className="fill-meta" />
                <line x1="250" y1="92" x2="296" y2="60" strokeWidth="1.6" className="stroke-ink" />
              </g>
              <text x="273" y="108" textAnchor="middle" className={T9}>
                no network
              </text>
              <text x="60" y="100" textAnchor="middle" className={T11}>
                what is
              </text>
              <text x="60" y="114" textAnchor="middle" className={T11}>
                that?
              </text>
              <text x="24" y="200" className={T9}>
                seconds, disconnected, in the field
              </text>
            </>
          ),
        },
        {
          caption: "The three unfold into a cascade. Each stage sees only what the one before it could not settle, so the budget goes to the hard frames.",
          node: (
            <>
              {STAGE_X.map((x, i) => (
                <g key={x}>
                  <text x={x} y="97" textAnchor="middle" className={T11}>
                    L{i + 1}
                  </text>
                  <text x={x} y="58" textAnchor="middle" className={T9}>
                    {["fast triage", "transfer stage", "fine-grained"][i]}
                  </text>
                  <Arrow x1={x} y1="116" x2={x} y2="152" dash="2 3" />
                  <text x={x} y="170" textAnchor="middle" className={T9}>
                    {["resolved here", "harder frames", "remainder"][i]}
                  </text>
                </g>
              ))}
              <Arrow x1="64" y1="93" x2="84" y2="93" cls="stroke-ink" width={2.4} />
              <Arrow x1="146" y1="93" x2="172" y2="93" cls="stroke-ink" width={1.6} />
              <Arrow x1="234" y1="93" x2="260" y2="93" cls="stroke-ink" width={1} />
              <line x1="84" y1="152" x2="322" y2="152" strokeWidth="1" className="stroke-ink" />
              <rect
                x="34"
                y="80"
                width="22"
                height="22"
                fill="none"
                strokeWidth="1"
                strokeDasharray="2 2"
                className="stroke-meta fig-anim a-pulse"
                style={v({ "--dur": "3s" })}
              />
              <text x="45" y="124" textAnchor="middle" className={T9}>
                ε hardened
              </text>
              <text x="24" y="200" className={T9}>
                TensorFlow Lite · quantized · thread-safe over live video
              </text>
            </>
          ),
        },
        {
          caption: "The three agree on one label. It drops as a map pin, pushed to the team the moment a server is reachable.",
          under: (
            <>
              <rect x="26" y="40" width="180" height="150" strokeWidth="1.2" className="fill-page stroke-ink" />
              {[62, 98, 134, 170].map((x) => (
                <line key={x} x1={x} y1="40" x2={x} y2="190" strokeWidth="1" className="stroke-hair" />
              ))}
              {[70, 100, 130, 160].map((y) => (
                <line key={y} x1="26" y1={y} x2="206" y2={y} strokeWidth="1" className="stroke-hair" />
              ))}
              <path d="M30,156 C66,140 92,148 126,120 C156,96 180,98 206,82" fill="none" strokeWidth="1" className="stroke-meta" />
              <path
                d="M102,104 C94,104 88,110 88,118 C88,129 102,148 102,148 C102,148 116,129 116,118 C116,110 110,104 102,104 Z"
                strokeWidth="1.4"
                className="fill-page stroke-ink"
              />
              <line x1="118" y1="112" x2="226" y2="92" strokeWidth="1" className="stroke-meta" />
              <rect x="226" y="72" width="104" height="40" strokeWidth="1.2" className="fill-page stroke-ink" />
            </>
          ),
          node: (
            <>
              <text x="262" y="88" className={T10}>
                classified
              </text>
              <text x="262" y="102" className={T9}>
                pushed to TAK
              </text>
              <text x="102" y="206" textAnchor="middle" className={T9}>
                three models, one answer
              </text>
              <text x="26" y="206" className={T9}>
                no round trip, no server dependency
              </text>
            </>
          ),
        },
      ]}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   4 · Institutional positioning
       Six parsed positions become six signed weight changes, then the six
       names the model expects to appear next quarter.
   ═══════════════════════════════════════════════════════════════════════ */

const TOK_X = [254, 282, 310, 254, 282, 310]
const TOK_Y = [84, 84, 84, 108, 108, 108]
const DELTA = [52, -32, 66, -22, 58, -38]
const RANK_W = [120, 98, 76, 58, 42, 28]

export function FigPositioning() {
  const ZERO = 112
  return (
    <Plate
      label="Three panels. Quarterly filings from twelve institutions parsed off EDGAR into positions. The same positions become signed weight changes above and below a zero line. They then become the ranked set of names the model expects each book to open next quarter, beside a conviction gauge."
      carriers={TOK_X.map((x, i) => {
        const up = DELTA[i] > 0
        const h = Math.abs(DELTA[i])
        const barX = 48 + i * 48
        const barCy = up ? ZERO - h / 2 : ZERO + h / 2
        const rankCx = 204 + RANK_W[i] / 2
        const rankCy = 62 + i * 22
        return (
          <g
            key={i}
            className="fig-anim a-morph"
            style={morph(
              { x: barX - x, y: barCy - TOK_Y[i], sx: 24 / 14, sy: h / 14 },
              { x: rankCx - x, y: rankCy - TOK_Y[i], sx: RANK_W[i] / 14, sy: 9 / 14 }
            )}
          >
            <rect x={x - 7} y={TOK_Y[i] - 7} width="14" height="14" className={up ? "fill-ink" : "fill-meta"} />
          </g>
        )
      })}
      scenes={[
        {
          caption: "Twelve institutions disclose their holdings each quarter. The filings are parsed off EDGAR, not off an aggregator.",
          under: (
            <>
              {[0, 1, 2, 3].map((k) => (
                <rect
                  key={k}
                  x={28 + k * 7}
                  y={62 + k * 8}
                  width="58"
                  height="74"
                  strokeWidth="1.2"
                  className="fill-page stroke-ink"
                />
              ))}
              <rect x="246" y="68" width="88" height="56" strokeWidth="1.2" className="fill-page stroke-ink" />
            </>
          ),
          node: (
            <>
              {[0, 1, 2, 3, 4].map((k) => (
                <line key={k} x1="56" y1={92 + k * 11} x2="106" y2={92 + k * 11} strokeWidth="1" className="stroke-hair" />
              ))}
              <text x="49" y="82" className={T10}>
                13F
              </text>
              <text x="28" y="168" className={T9}>
                SEC EDGAR · twelve CIKs · quarterly
              </text>
              <Arrow x1="122" y1="106" x2="156" y2="106" cls="stroke-ink" width={1.2} />
              <rect x="156" y="84" width="58" height="44" fill="none" strokeWidth="1.2" className="stroke-ink" />
              <text x="185" y="110" textAnchor="middle" className={T11}>
                parse
              </text>
              <Arrow x1="214" y1="106" x2="244" y2="106" cls="stroke-ink" width={1.2} />
              <text x="246" y="142" className={T9}>
                positions, by quarter
              </text>
            </>
          ),
        },
        {
          caption: "Each position resolves into a signed weight change: what the book added to, trimmed, or let go of entirely.",
          under: <line x1="28" y1={ZERO} x2="332" y2={ZERO} strokeWidth="1" className="stroke-ink" />,
          node: (
            <>
              <text x="28" y="34" className={T9}>
                added
              </text>
              <text x="28" y="198" className={T9}>
                trimmed or exited
              </text>
              <text x="332" y="198" textAnchor="end" className={T9}>
                Δ portfolio weight, quarter over quarter
              </text>
            </>
          ),
        },
        {
          caption: "A gradient-boosted regressor scores conviction; a sequence model ranks the positions each book is likely to open next.",
          under: (
            <>
              <path d="M28,186 A46,46 0 0 1 120,186" fill="none" strokeWidth="1.2" className="stroke-ink" />
              <line x1="174" y1="40" x2="174" y2="196" strokeWidth="1" className="stroke-hair" />
            </>
          ),
          node: (
            <>
              <line
                x1="74"
                y1="186"
                x2="74"
                y2="146"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="stroke-ink fig-anim a-needle o-bottom"
                style={v({ "--dur": "5s" })}
              />
              <circle cx="74" cy="186" r="3" className="fill-ink" />
              <text x="24" y="200" textAnchor="middle" className={T9}>
                −1
              </text>
              <text x="124" y="200" textAnchor="middle" className={T9}>
                +1
              </text>
              <text x="74" y="130" textAnchor="middle" className={T10}>
                conviction
              </text>
              <text x="204" y="42" className={T10}>
                predicted new positions
              </text>
              <text x="204" y="206" className={T9}>
                ranked by predicted weight
              </text>
            </>
          ),
        },
      ]}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   5 · Standardized difficulty labels
       Twelve problems leave their buckets, spread along a continuous
       scale, and rise onto an accuracy profile.
   ═══════════════════════════════════════════════════════════════════════ */

// Home: six easy, four medium, two hard.
const BUCKET_PTS: [number, number][] = [
  [50, 140], [70, 140], [90, 140], [50, 118], [70, 118], [90, 118],
  [154, 140], [174, 140], [154, 118], [174, 118],
  [258, 140], [278, 140],
]
const SCALE_X = Array.from({ length: 12 }, (_, i) => 44 + i * 24)
const CURVE_Y = [52, 56, 61, 68, 76, 84, 94, 104, 115, 127, 139, 152]

export function FigDifficulty() {
  return (
    <Plate
      label="Three panels. Problems sorted into three coarse difficulty buckets. The same problems spread along one continuous standardized scale estimated from attempt records. They then rise onto an accuracy profile that separates two models a single score would not."
      carriers={BUCKET_PTS.map(([x, y], i) => (
        <g
          key={i}
          className="fig-anim a-morph"
          style={morph(
            { x: SCALE_X[i] - x, y: 138 - y, s: 0.34 + i * 0.045 },
            { x: SCALE_X[i] - x, y: CURVE_Y[i] - y, s: 0.3 }
          )}
        >
          <circle cx={x} cy={y} r="7" className="fill-meta" />
        </g>
      ))}
      scenes={[
        {
          caption: "Benchmarks record difficulty in three buckets. Problems inside one bucket are not remotely alike.",
          under: (
            <>
              {[30, 134, 238].map((x) => (
                <rect key={x} x={x} y="46" width="90" height="114" strokeWidth="1.2" className="fill-page stroke-ink" />
              ))}
            </>
          ),
          node: (
            <>
              {["easy", "medium", "hard"].map((lab, b) => (
                <text key={lab} x={75 + b * 104} y="178" textAnchor="middle" className={T10}>
                  {lab}
                </text>
              ))}
              <text x="30" y="36" className={T9}>
                one label, very different problems
              </text>
            </>
          ),
        },
        {
          caption: "Item-response theory and Glicko-2 re-estimate every problem on one continuous standardized scale, from human and model attempt records.",
          under: <line x1="30" y1="156" x2="334" y2="156" strokeWidth="1" className="stroke-ink" />,
          node: (
            <>
              <path
                d="M34,56 C100,58 130,64 180,82 C230,100 270,106 332,108"
                fill="none"
                strokeWidth="1.5"
                className="stroke-ink"
              />
              <text x="38" y="48" className={T9}>
                P(solved)
              </text>
              <text x="30" y="174" className={T10}>
                easy
              </text>
              <text x="334" y="174" textAnchor="end" className={T10}>
                hard
              </text>
              <text x="30" y="198" className={T9}>
                six datasets · mathematics, programming, chess, reasoning
              </text>
            </>
          ),
        },
        {
          caption: "Accuracy against that scale is a curve, not a scalar. It shows exactly where each model stops generalizing.",
          under: (
            <>
              <line x1="30" y1="34" x2="30" y2="176" strokeWidth="1" className="stroke-hair" />
              <line x1="30" y1="176" x2="334" y2="176" strokeWidth="1" className="stroke-ink" />
            </>
          ),
          node: (
            <>
              <path
                d={`M34,52 ${SCALE_X.map((x, i) => `L${x},${CURVE_Y[i]}`).join(" ")} L334,160`}
                fill="none"
                strokeWidth="1.6"
                strokeLinejoin="round"
                className="stroke-ink"
              />
              <path
                d="M34,60 C84,68 112,92 144,122 C180,154 248,168 334,172"
                fill="none"
                strokeWidth="1.4"
                strokeDasharray="5 3"
                className="stroke-meta"
              />
              <text x="252" y="92" className={T10}>
                model A
              </text>
              <text x="62" y="112" className={T10}>
                model B
              </text>
              <line x1="144" y1="122" x2="144" y2="176" strokeWidth="1" strokeDasharray="2 3" className="stroke-meta" />
              <text x="150" y="192" className={T9}>
                B falls off here
              </text>
              <text x="20" y="104" textAnchor="middle" transform="rotate(-90 20 104)" className={T9}>
                accuracy
              </text>
              <text x="334" y="192" textAnchor="end" className={T9}>
                difficulty
              </text>
            </>
          ),
        },
      ]}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   6 · Match play as a Markov decision process
       Two balls leave the same tee, land on two candidate policies, and
       settle onto the measured gain from conditioning.
   ═══════════════════════════════════════════════════════════════════════ */

export function FigMatchPlay() {
  const tee: [number, number] = [44, 180]
  return (
    <Plate
      label="Three panels. A golf hole scored by hole rather than by stroke. Two candidate policies, one blind to the opponent and one conditioned on their distribution, each with its own dispersion ellipse. The measured gain from conditioning across match states, near zero outside one narrow band."
      carriers={[
        { to2: [252, 112] as [number, number], to3: [120, 110] as [number, number], dx: 0 },
        { to2: [298, 68] as [number, number], to3: [236, 76] as [number, number], dx: 6 },
      ].map((c, i) => (
        <g
          key={i}
          className="fig-anim a-morph"
          style={morph(
            { x: c.to2[0] - tee[0] - c.dx, y: c.to2[1] - tee[1] },
            { x: c.to3[0] - tee[0] - c.dx, y: c.to3[1] - tee[1] }
          )}
        >
          <circle cx={tee[0] + c.dx} cy={tee[1]} r="3.4" strokeWidth="1.2" className={i === 0 ? "fill-ink stroke-ink" : "fill-page stroke-ink"} />
        </g>
      ))}
      scenes={[
        {
          caption: "Match play is scored by hole, not by stroke. A blow-up costs one hole, and a birdie wins exactly one.",
          under: (
            <>
              <ellipse cx="290" cy="76" rx="52" ry="36" fill="none" strokeWidth="1" strokeDasharray="4 4" className="stroke-meta" />
              <ellipse cx="178" cy="144" rx="34" ry="18" fill="none" strokeWidth="1" strokeDasharray="1.5 3" className="stroke-meta" />
            </>
          ),
          node: (
            <>
              <line x1="298" y1="66" x2="298" y2="34" strokeWidth="1.2" className="stroke-ink" />
              <path d="M298,36 L316,42 L298,48 Z" strokeWidth="1" className="fill-ink stroke-ink" />
              <circle cx="298" cy="68" r="2.4" className="fill-ink" />
              <text x="290" y="124" textAnchor="middle" className={T9}>
                green
              </text>
              <text x="178" y="148" textAnchor="middle" className={T9}>
                hazard
              </text>
              <line x1="36" y1="176" x2="52" y2="176" strokeWidth="1.4" className="stroke-ink" />
              <text x="44" y="198" textAnchor="middle" className={T9}>
                tee
              </text>
              <text x="30" y="40" className={T10}>
                a two-player turn-based stochastic game
              </text>
            </>
          ),
        },
        {
          caption: "Two policies leave the same tee: one solved blind to the opponent, one solved against their shot distribution.",
          under: (
            <>
              <ellipse cx="290" cy="76" rx="52" ry="36" fill="none" strokeWidth="1" strokeDasharray="4 4" className="stroke-meta" />
              <ellipse cx="178" cy="144" rx="34" ry="18" fill="none" strokeWidth="1" strokeDasharray="1.5 3" className="stroke-meta" />
              <line x1="44" y1="180" x2="252" y2="112" strokeWidth="1.3" className="stroke-ink" />
              <line x1="50" y1="180" x2="298" y2="68" strokeWidth="1.3" strokeDasharray="5 3" className="stroke-ink" />
            </>
          ),
          node: (
            <>
              <line x1="298" y1="66" x2="298" y2="34" strokeWidth="1.2" className="stroke-ink" />
              <path d="M298,36 L316,42 L298,48 Z" strokeWidth="1" className="fill-ink stroke-ink" />
              <ellipse cx="252" cy="112" rx="28" ry="15" fill="none" strokeWidth="1" strokeDasharray="3 3" className="stroke-ink" />
              <ellipse cx="298" cy="68" rx="28" ry="15" fill="none" strokeWidth="1" strokeDasharray="3 3" className="stroke-ink" />
              <text x="248" y="142" textAnchor="middle" className={T9}>
                opponent-blind
              </text>
              <text x="300" y="100" textAnchor="middle" className={T9}>
                conditioned
              </text>
              <text x="178" y="148" textAnchor="middle" className={T9}>
                hazard
              </text>
              <text x="30" y="40" className={T9}>
                value iteration over match state × lie × distance
              </text>
            </>
          ),
        },
        {
          caption: "Across every match state the gain is near zero. It exists in one narrow band, and opponent statistics that precise are not obtainable.",
          under: (
            <>
              <line x1="34" y1="110" x2="334" y2="110" strokeWidth="1" className="stroke-ink" />
              <line x1="34" y1="40" x2="34" y2="180" strokeWidth="1" className="stroke-hair" />
              <path
                d="M38,110 C70,108 92,112 120,110 C150,107 168,111 196,109 C212,108 220,74 236,76 C250,78 254,108 268,110 C292,113 312,108 332,110"
                fill="none"
                strokeWidth="1.6"
                strokeLinejoin="round"
                className="stroke-ink"
              />
            </>
          ),
          node: (
            <>
              <line x1="236" y1="76" x2="236" y2="110" strokeWidth="1" strokeDasharray="2 3" className="stroke-meta" />
              <text x="236" y="64" textAnchor="middle" className={T9}>
                one narrow band
              </text>
              <text x="44" y="102" className={T9}>
                no gain
              </text>
              <text x="24" y="90" textAnchor="middle" transform="rotate(-90 24 90)" className={T9}>
                gain
              </text>
              <text x="34" y="198" className={T9}>
                match state · holes remaining × margin
              </text>
            </>
          ),
        },
      ]}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════════
   7 · Implicit bias in triage
       Six recorded attributes stretch into their attributions, then two of
       them resolve into the admission gap the others cannot explain.
   ═══════════════════════════════════════════════════════════════════════ */

const ATTRS = [
  { label: "insurance", w: 112 },
  { label: "ESI", w: 92 },
  { label: "ethnicity", w: 62 },
  { label: "age", w: -46 },
  { label: "gender", w: -26 },
  { label: "language", w: 8 },
]
const CHIP_Y = [58, 82, 106, 130, 154, 178]

export function FigTriage() {
  const ZERO = 176
  const CHIP_X = 292
  return (
    <Plate
      label="Three panels. A cohort of patients sorted at triage into admitted and discharged, from six recorded attributes. The attributes stretch into Shapley attributions ranked by how much each carried the decision. Two of them resolve into the admission gap between private and federal insurance at equal severity."
      carriers={ATTRS.map((a, i) => {
        const pos = a.w > 0
        const w = Math.abs(a.w)
        const barCx = pos ? ZERO + w / 2 : ZERO - w / 2
        const barCy = 48 + i * 25
        // Panel three keeps the two that matter and retires the rest.
        const finale: Pose =
          i === 0
            ? { x: 104 - CHIP_X, y: 118 - CHIP_Y[i], sx: 64 / 16, sy: 98 / 12 }
            : i === 1
              ? { x: 232 - CHIP_X, y: 138 - CHIP_Y[i], sx: 64 / 16, sy: 58 / 12 }
              : { x: 176 - CHIP_X, y: 168 - CHIP_Y[i], s: 0.02 }
        return (
          <g
            key={a.label}
            className="fig-anim a-morph"
            style={morph({ x: barCx - CHIP_X, y: barCy - CHIP_Y[i], sx: w / 16, sy: 15 / 12 }, finale)}
          >
            <rect x={CHIP_X - 8} y={CHIP_Y[i] - 6} width="16" height="12" className={pos ? "fill-ink" : "fill-meta"} />
          </g>
        )
      })}
      scenes={[
        {
          caption: "Every arrival is sorted at the door: admitted, or sent home. Six attributes are on the record when that happens.",
          under: (
            <>
              <rect x="152" y="40" width="80" height="50" strokeWidth="1.2" className="fill-page stroke-ink" />
              <rect x="152" y="130" width="80" height="50" strokeWidth="1.2" className="fill-page stroke-ink" />
            </>
          ),
          node: (
            <>
              {Array.from({ length: 18 }, (_, i) => (
                <circle key={i} cx={34 + (i % 3) * 13} cy={58 + Math.floor(i / 3) * 18} r="4" className="fill-meta" />
              ))}
              <text x="47" y="184" textAnchor="middle" className={T10}>
                at triage
              </text>
              <Arrow x1="76" y1="98" x2="146" y2="66" />
              <Arrow x1="76" y1="118" x2="146" y2="156" />
              <text x="192" y="70" textAnchor="middle" className={T11}>
                admitted
              </text>
              <text x="192" y="160" textAnchor="middle" className={T11}>
                discharged
              </text>
              {ATTRS.map((a, i) => (
                <text key={a.label} x="280" y={CHIP_Y[i] + 4} textAnchor="end" className={T9}>
                  {a.label}
                </text>
              ))}
            </>
          ),
        },
        {
          caption: "Shapley values weigh what each attribute contributed. Insurance status carried more than the severity index itself.",
          under: <line x1={ZERO} y1="30" x2={ZERO} y2="192" strokeWidth="1" className="stroke-ink" />,
          node: (
            <>
              <text x={ZERO} y="206" textAnchor="middle" className={T9}>
                0
              </text>
              {ATTRS.map((a, i) => {
                const pos = a.w > 0
                const w = Math.abs(a.w)
                return (
                  <text
                    key={a.label}
                    x={pos ? ZERO + w + 7 : ZERO - w - 7}
                    y={52 + i * 25}
                    textAnchor={pos ? "start" : "end"}
                    className={T10}
                  >
                    {a.label}
                  </text>
                )
              })}
              <text x="26" y="206" className={T9}>
                ← discharged
              </text>
              <text x="334" y="206" textAnchor="end" className={T9}>
                admitted →
              </text>
            </>
          ),
        },
        {
          caption: "Matched on severity, admission rate still differs by insurance program. Language, against expectation, was not a barrier.",
          under: <line x1="52" y1="168" x2="316" y2="168" strokeWidth="1" className="stroke-ink" />,
          node: (
            <>
              <path d="M70,46 L70,38 L290,38 L290,46" fill="none" strokeWidth="1.2" className="stroke-ink" />
              <text x="180" y="32" textAnchor="middle" className={T10}>
                matched on Emergency Severity Index
              </text>
              <text x="104" y="184" textAnchor="middle" className={T10}>
                private plan
              </text>
              <text x="232" y="184" textAnchor="middle" className={T10}>
                federal plan
              </text>
              <line x1="140" y1="70" x2="200" y2="70" strokeWidth="1" strokeDasharray="2 3" className="stroke-meta" />
              <text x="334" y="104" textAnchor="end" className={T9}>
                a gap severity
              </text>
              <text x="334" y="116" textAnchor="end" className={T9}>
                does not explain
              </text>
              <text x="52" y="204" className={T9}>
                admission rate
              </text>
            </>
          ),
        },
      ]}
    />
  )
}

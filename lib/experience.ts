export type ExpEntry = {
  id: string
  // The employer, used to group consecutive roles on the home page.
  org: string
  // The team within it, where the team is the thing worth naming.
  unit?: string
  role: string
  period: string
  points: string[]
  // Where a role's work is written up as a project, the two link to each
  // other rather than being listed twice as if they were separate things.
  projectId?: string
}

// Single source of truth. The home page groups these by employer; /experience
// shows every role in full. Newest first.
//
// Bullets stay high level: the mechanism, never the magnitude. Numbers live in
// the resume, which is sent on request.
export const allExperience: ExpEntry[] = [
  {
    id: "amazon",
    org: "Amazon",
    unit: "Lab126",
    role: "Software Engineer Intern",
    period: "Jun–Sep 2026",
    points: [
      "Shipped a C++ on-device speaker identification module to a production vehicle fleet, off the response path.",
      "Quantized the embedding model to INT8 ONNX for real-time recognition on ARM silicon.",
      "Built an MLOps loop fed by fleet data for continuous fine-tuning of SLMs, ASR and TTS.",
    ],
  },
  {
    id: "amazon-leo",
    org: "Amazon",
    unit: "Leo",
    role: "ML Engineering Lead",
    period: "Jan–May 2026",
    projectId: "space-sustainability",
    points: [
      "Forecasted G7 space policy a year out with a three-model time-series ensemble.",
      "Built an ETL turning a data lake into a queryable database, and smoothed signals temporally to cut Type I errors.",
    ],
  },
  {
    id: "gdit",
    org: "General Dynamics Information Technology",
    role: "Software Engineer Intern",
    period: "Jun–Aug 2025",
    projectId: "atak",
    points: [
      "Deployed a zero-to-one edge vision module detecting vehicles and streaming geospatial telemetry to connected users.",
      "Held out-of-sample accuracy on noisy sensor data through projected gradient descent adversarial training.",
      "Architected a thread-safe, quantized three-stage pipeline running on a TPU over live video feeds.",
    ],
  },
  {
    id: "gdit-lead",
    org: "General Dynamics Information Technology",
    role: "Engineering Project Lead",
    period: "Jan–May 2025",
    points: [
      "Led a team of engineers shipping a hybrid graph and vector RAG pipeline over an agency record corpus to analysts.",
      "Raised retrieval accuracy with custom chunking and named-entity recognition, cutting analyst discovery time.",
    ],
  },
  {
    id: "bah",
    org: "Booz Allen Hamilton",
    role: "Engineering Project Manager",
    period: "Sep–Dec 2024",
    points: [
      "Automated medical policy audits with summarization and sentiment analysis pipelines.",
      "Built a full-stack, human-in-the-loop scraping and audit pipeline to cut manual review time.",
    ],
  },
  {
    id: "irs",
    org: "Internal Revenue Service",
    role: "Software Engineer Intern",
    period: "Jan–Dec 2024",
    points: [
      "Upgraded division-wide Jenkins CI/CD (JDK 11 to 17) for fraud detection across national tax applications.",
      "Cut build times for the division by migrating a twenty-year-old Java system from Ant to Maven.",
    ],
  },
]

export type ExpGroup = { org: string; roles: ExpEntry[] }

// Consecutive roles at one employer collapse into a single block, so six rows
// on the home page read as four employers rather than six separate jobs.
export function groupExperience(entries: ExpEntry[] = allExperience): ExpGroup[] {
  return entries.reduce<ExpGroup[]>((groups, e) => {
    const last = groups[groups.length - 1]
    if (last && last.org === e.org) last.roles.push(e)
    else groups.push({ org: e.org, roles: [e] })
    return groups
  }, [])
}

// "Amazon Lab126" where there is a team worth naming, "Booz Allen Hamilton"
// where the employer is the whole name.
export const expName = (e: ExpEntry) => (e.unit ? `${e.org} ${e.unit}` : e.org)

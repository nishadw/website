export type ExpEntry = {
  id: string
  // The employer, used to group consecutive roles on the home page.
  org: string
  // The team within it, where the team is the thing worth naming.
  unit?: string
  role: string
  period: string
  location?: string
  points: string[]
  // Where a role's work is written up in full, the two link to each other
  // rather than being listed twice as if they were separate things.
  projectId?: string
}

// Single source of truth, kept in step with the resume: same roles, same
// dates, same claims. The home page groups these by employer; /experience
// shows every role in full. Newest first.
export const allExperience: ExpEntry[] = [
  {
    id: "amazon",
    org: "Amazon",
    unit: "Lab126",
    role: "Software Engineer Intern",
    period: "Jun–Sep 2026",
    location: "Sunnyvale, CA",
    points: [
      "Shipped C++ speaker ID to 22M+ vehicles at 97% match rate, personalizing Alexa with zero added latency",
      "Designed 1M+ trial evals with bootstrap CIs and McNemar tests for continuous SLM and TTS fine-tuning",
      "Sped up inference from 309ms to 77ms on ARM via INT8 quantization and contention-aware multithreading",
      "Engineered encrypted voiceprint storage and cross-profile sync, safely keeping biometric data on-device",
    ],
  },
  {
    id: "amazon-leo",
    org: "Amazon",
    unit: "Leo",
    role: "ML Project Lead (contract)",
    period: "Jan–May 2026",
    location: "College Park, MD",
    projectId: "space-sustainability",
    points: [
      "Forecasted G7 space policy shifts 12 months ahead at 91% backtested accuracy via a 3-model time-series ensemble",
      "Built weekly ETL pipeline that dedupes, filters, and LLM-labels 33K+ documents with human-in-the-loop review",
      "Raised signal-to-noise 42% across 10 Poisson-noisy signals via biweekly aggregation, cutting false positives 25%",
    ],
  },
  {
    id: "gdit",
    org: "General Dynamics Information Technology",
    role: "Software Engineer Intern",
    period: "Jun–Aug 2025",
    location: "Annapolis Junction, MD",
    projectId: "atak",
    points: [
      "Deployed a 0-to-1 edge vision system that detects vehicles in real time and streams their locations to operators",
      "Hardened model to perturbed sensor data via PGD adversarial training, lifting out-of-sample accuracy 40% to 95%",
      "Architected a thread-safe 3-stage quantized pipeline that processes live video on a mobile TPU in 91ms",
    ],
  },
  {
    id: "gdit-lead",
    org: "General Dynamics Information Technology",
    role: "ML Project Lead (contract)",
    period: "Jan–May 2025",
    location: "College Park, MD",
    points: [
      "Led 13 engineers to ship an agentic RAG assistant on AWS Bedrock that lets 50+ analysts search 600K+ records",
      "Cut analyst search time from 2 hrs to 5 min and raised retrieval accuracy 40% via hybrid graph-vector search",
    ],
  },
  {
    id: "bah",
    org: "Booz Allen Hamilton",
    role: "Engineering Project Manager",
    period: "Sep–Dec 2024",
    location: "McLean, VA",
    points: [
      "Automated medical policy audits with summarization and sentiment analysis pipelines",
      "Built a full-stack, human-in-the-loop scraping and audit pipeline to cut manual review time",
    ],
  },
  {
    id: "irs",
    org: "Internal Revenue Service",
    role: "Software Engineer Intern",
    period: "Jan–Dec 2024",
    location: "Washington, DC",
    points: [
      "Delivered ETL for a fraud detection system screening 270M+ tax filings a year and upgraded CI/CD to JDK 17",
      "Halved build times for 1,000+ engineers by migrating a 20-year-old Java build system from Ant to Maven",
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

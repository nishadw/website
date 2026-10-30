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

// Single source of truth. The home page groups these by employer;
// /experience shows every role in full. Newest first.
//
// Bullets stay deliberately high level: what the work was for, never the
// figures or the stack. The resume carries those, and the resume is sent to
// people who asked for it rather than published to everyone who did not.
export const allExperience: ExpEntry[] = [
  {
    id: "amazon",
    org: "Amazon",
    unit: "Lab126",
    role: "Software Engineer Intern",
    period: "Jun–Sep 2026",
    location: "Sunnyvale, CA",
    points: [
      "Shipped speaker identification to a production vehicle fleet, so the assistant knows who is talking without anyone waiting longer for an answer",
      "Designed the evaluation that decides whether a retrained model is genuinely better than the one it would replace",
      "Kept voice biometrics encrypted on the device itself, and in sync across profiles",
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
      "Forecast where space policy is heading a year out, from what the field is publishing now",
      "Built the pipeline that turns a sprawl of documents into a signal clean enough to forecast against",
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
      "Built a vision system from nothing that identifies what a camera is looking at and puts it on everyone's map",
      "Made it hold up against inputs meant to deceive it, not only against clean test data",
      "Ran the whole thing on the handset, fast enough for live video and with no network to depend on",
    ],
  },
  {
    id: "gdit-lead",
    org: "General Dynamics Information Technology",
    role: "ML Project Lead (contract)",
    period: "Jan–May 2025",
    location: "College Park, MD",
    points: [
      "Led the team that built an assistant analysts could ask a question of, instead of searching a record corpus by hand",
      "Turned an afternoon of digging into a few minutes, and made the answers more often right",
    ],
  },
  {
    id: "bah",
    org: "Booz Allen Hamilton",
    role: "Engineering Project Manager",
    period: "Sep–Dec 2024",
    location: "McLean, VA",
    points: [
      "Automated the reading of medical policy documents, with a person kept in the loop on every judgment",
      "Replaced a manual audit with one that surfaces only what actually needs a human",
    ],
  },
  {
    id: "irs",
    org: "Internal Revenue Service",
    role: "Software Engineer Intern",
    period: "Jan–Dec 2024",
    location: "Washington, DC",
    points: [
      "Delivered the data pipeline behind fraud detection on the national filing system",
      "Rebuilt an aging build system so an entire division stopped waiting on it",
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

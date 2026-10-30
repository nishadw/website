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
// Two bullets a role, high level: what the work was and what it was for.
// No figures and no stack. The resume carries those, and it goes to people
// who asked for it rather than to everyone who did not.
export const allExperience: ExpEntry[] = [
  {
    id: "amazon",
    org: "Amazon",
    unit: "Lab126",
    role: "Software Engineer Intern",
    period: "Jun–Sep 2026",
    location: "Sunnyvale, CA",
    points: [
      "Shipped on-device speaker identification to a production vehicle fleet, personalizing the voice assistant without added latency",
      "Designed the statistical evaluation governing whether a retrained model is promoted over the one in production",
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
      "Forecast the direction of international space policy a year ahead from current academic, government and industry publishing",
      "Built the ingestion and filtering pipeline that made those signals reliable enough to forecast against",
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
      "Delivered an edge vision system from scratch that identifies objects in live video and streams their positions to operators in the field",
      "Hardened the models against deliberately deceptive inputs and brought the full pipeline onto the handset, with no network dependency",
    ],
  },
  {
    id: "gdit-lead",
    org: "General Dynamics Information Technology",
    role: "ML Project Lead (contract)",
    period: "Jan–May 2025",
    location: "College Park, MD",
    points: [
      "Led an engineering team building a retrieval assistant that let analysts query an agency record corpus directly",
      "Reduced analyst discovery time from hours to minutes while improving retrieval accuracy",
    ],
  },
  {
    id: "bah",
    org: "Booz Allen Hamilton",
    role: "Engineering Project Manager",
    period: "Sep–Dec 2024",
    location: "McLean, VA",
    points: [
      "Automated the review of medical policy documents, with human judgment retained at each decision point",
      "Replaced a manual audit process with one that surfaces only the cases requiring review",
    ],
  },
  {
    id: "irs",
    org: "Internal Revenue Service",
    role: "Software Engineer Intern",
    period: "Jan–Dec 2024",
    location: "Washington, DC",
    points: [
      "Delivered the data pipeline underlying fraud detection across the national filing system",
      "Modernized the division's build and delivery system, removing a long-standing bottleneck for its engineers",
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

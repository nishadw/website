import { paperById } from "./research"

export type ProjectLink = { label: string; href: string }

export type Project = {
  id: string
  // Set when the project is a paper. The title then comes from lib/research.ts
  // rather than being written twice and allowed to drift.
  researchId?: string
  // Used only when there is no paper behind it.
  title?: string
  // A short form, for places the full title would wrap.
  short?: string
  // Affiliation and year.
  context: string
  // Two or three declarative sentences. Keywords carry the stack, so the prose
  // does not have to.
  blurb: string
  // Methods, not tools. A reader at a desk or a lab is looking for what the
  // work is made of, and a framework list tells them nothing they want.
  keywords: string[]
  links: ProjectLink[]
  // Several of these are the work behind a role, not a side project. When set,
  // the entry links to that role on /experience rather than standing apart
  // from it, so the same work is never counted twice.
  experienceId?: string
  // Why there is no repository link, when there is none.
  note?: string
}

export const projectTitle = (p: Project) =>
  p.researchId ? (paperById(p.researchId)?.title ?? p.title ?? p.id) : (p.title ?? p.id)

export const projectShort = (p: Project) => p.short ?? projectTitle(p)

// Newest and heaviest first.
export const allProjects: Project[] = [
  {
    id: "first-passage",
    researchId: "first-passage",
    short: "First-passage likelihoods",
    context: "First author · in preparation",
    blurb:
      "An avocado is photographed every few days until it spoils. From those few looks, predict the day it turns, with an interval you can plan against. The hidden state is a diffusion; spoilage is the moment it first crosses a line, solved exactly rather than simulated.",
    keywords: ["neural SDEs", "first-passage times", "Fokker–Planck equations", "interval censoring"],
    links: [{ label: "Repository", href: "https://github.com/nishadw/produce-sde" }],
  },
  {
    id: "space-sustainability",
    title: "Time-Series Forecasting of Space Policy Attention",
    short: "Policy attention forecasting",
    context: "Amazon Leo · 2026",
    blurb:
      "Orbit is getting crowded, and the arguments about it start in writing long before they reach policy. This reads six years of what the field published and forecasts which concerns are gathering and which are dying out, so a team sees a debate forming instead of reacting to one.",
    keywords: ["time-series forecasting", "natural-language inference", "topic modeling", "signal extraction"],
    links: [],
    experienceId: "amazon-leo",
    note: "Private repository.",
  },
  {
    id: "atak",
    title: "Adversarially Hardened On-Device Vision Cascade",
    short: "On-device vision cascade",
    context: "General Dynamics Information Technology · ATAK · 2025",
    blurb:
      "Someone in the field points a camera at something and needs to know what it is now, with no signal and no server. Three models answer in turn, each taking only what the one before it could not settle, and all three are trained to fail predictably when the input is meant to deceive.",
    keywords: ["cascaded inference", "adversarial robustness", "on-device vision", "quantization"],
    links: [],
    experienceId: "gdit",
    note: "Private repository.",
  },
  {
    id: "positioning",
    title: "Predicting Institutional Positioning from 13F Filings",
    short: "Institutional positioning",
    context: "Personal project · 2026",
    blurb:
      "Large institutions disclose what they hold once a quarter, and everyone reads it late. This takes the filings as they land, scores how much conviction each move carries, and names the positions a book is likely to open next.",
    keywords: ["sequence forecasting", "simplex projection", "gradient boosting", "conviction scoring"],
    links: [{ label: "Repository", href: "https://github.com/nishadw/13f-positioning" }],
  },
  {
    id: "difficulty",
    researchId: "difficulty",
    short: "Difficulty calibration",
    context: "Research assistant · NeurIPS 2024, Datasets & Benchmarks",
    blurb:
      "Benchmarks call a problem easy, medium or hard, which tells you almost nothing. This puts difficulty on a continuous scale learned from how people and models actually did, so accuracy becomes a curve and you can see exactly where a model gives out.",
    keywords: ["item-response theory", "Glicko-2 rating", "difficulty calibration", "generalization"],
    links: [
      { label: "Paper", href: "https://arxiv.org/abs/2409.18433" },
      { label: "Repository", href: "https://github.com/umd-huang-lab/Easy2Hard-Bench" },
      {
        label: "Dataset",
        href: "https://huggingface.co/collections/furonghuang-lab/easy2hard-bench-666a0d26f3932ecb92c112c2",
      },
    ],
  },
  {
    id: "match-play",
    researchId: "match-play",
    short: "Match play as an MDP",
    context: "First author · Computational Statistics, 2024",
    blurb:
      "Should a professional play differently because of who they are across from? Posed as a two-player game on tour shot data, the answer is almost always no: the edge is real in a narrow band of situations and swamped everywhere else by not knowing your opponent well enough.",
    keywords: ["game theory", "Markov decision processes", "stochastic games", "value iteration"],
    links: [
      { label: "Paper", href: "https://link.springer.com/article/10.1007/s00180-024-01555-5" },
      { label: "Preprint", href: "https://arxiv.org/abs/2309.14403" },
      { label: "Repository", href: "https://github.com/nishadw/game-theory-golf" },
    ],
  },
  {
    id: "triage",
    researchId: "triage",
    short: "Implicit bias in triage",
    context: "Co-author · Annals of Biomedical Science and Engineering, 2023 · JUST Health, Stanford School of Medicine, 2022",
    blurb:
      "Who gets admitted at the emergency room door, and what actually decided it. At the same severity, patients on federally run insurance were admitted less often than those on private plans. Language, against expectation, was not a barrier.",
    keywords: ["Shapley attribution", "game-theoretic interpretability", "ensemble classification"],
    links: [
      { label: "Paper", href: "https://www.biomedscijournal.com/journals/abse/abse-aid1022.php" },
      { label: "JUST Health", href: "https://web.stanford.edu/group/coedme_justhealt/cgi-bin/wordpress/wp-content/uploads/2022/12/JUSTHealth-Fall-2022-Edition.pdf" },
      { label: "Repository", href: "https://github.com/nishadw/trials-of-triage" },
    ],
  },
]

// Every piece of work belongs in exactly one place.
//
// A paper is research. The deliverable of an internship is that role, so it is
// written up under the role on /experience rather than standing beside it as a
// second thing with the same contents. What is left is work done on no one's
// payroll, which is its own category and worth saying so.
export const researchProjects = allProjects.filter((p) => p.researchId)
export const roleProjects = allProjects.filter((p) => p.experienceId)
export const independentProjects = allProjects.filter((p) => !p.researchId && !p.experienceId)

export const projectById = (id: string) => allProjects.find((p) => p.id === id)

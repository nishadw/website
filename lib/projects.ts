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
  // Chosen for signal, not coverage: the terms a reader at a lab or a desk
  // would recognise and a generic stack listing would bury.
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
    context: "University of Maryland · first author, in preparation",
    blurb:
      "Forecasts time to an irreversible event from observations taken at irregular visits, which is how food spoils, equipment degrades and disease declares itself. The latent state is a neural diffusion whose clock is a physical function of the conditions; the event is its first passage across a learned boundary, and the event-time law is solved on a grid from the Kolmogorov equations rather than sampled. The likelihood is proper under interval censoring, so the reported interval is calibrated rather than nominal.",
    keywords: ["neural SDE", "first passage", "Fokker–Planck", "interval censoring", "JAX", "Diffrax"],
    links: [{ label: "Repository", href: "https://github.com/nishadw/ripen" }],
  },
  {
    id: "space-sustainability",
    title: "Time-Series Forecasting of Space Policy Attention",
    short: "Policy attention forecasting",
    context: "Amazon Leo × App Dev Club · 2026",
    blurb:
      "Forecasts which concerns in space sustainability are gaining attention and which are fading, across six years of academic, government and industry writing. Ten scrapers yield roughly 24,000 documents; each clears a natural-language-inference relevance gate before it counts, and rejected documents are retained as an audit trail. Windows are biweekly by measurement: at weekly granularity most topics never clear the minimum-observation floor and the series is Poisson noise.",
    keywords: ["sequence forecasting", "Mamba", "DeBERTa NLI gating", "BGE embeddings", "AWS CDK"],
    links: [],
    experienceId: "amazon-leo",
    note: "Private repository.",
  },
  {
    id: "atak",
    title: "Adversarially Hardened On-Device Vision Cascade",
    short: "On-device vision cascade",
    context: "General Dynamics Information Technology · ATAK · 2025 · AFCEA SIPS",
    blurb:
      "Classifies imagery on the handset in seconds and pushes a label and a map pin to TAK servers when one is reachable. Three models run as a cascade, each handling only what the previous stage could not resolve, so the device spends its budget on the hard frames. All three are hardened with projected gradient descent: a model that fails predictably under a deceptive input is worth more in the field than one scoring a point higher on a clean test set.",
    keywords: ["model cascade", "TensorFlow Lite", "INT8 quantization", "PGD hardening", "TPU inference"],
    links: [],
    experienceId: "gdit",
    note: "Private repository.",
  },
  {
    id: "positioning",
    title: "Predicting Institutional Positioning from 13F Filings",
    short: "Institutional positioning",
    context: "Quantitative research · 2026",
    blurb:
      "Parses quarterly 13F filings from twelve institutions directly off EDGAR and scores every position change for conviction. A gradient-boosted regressor predicts next-quarter weight change per name; a Temporal Fusion Transformer predicts the whole book, its output projected onto the probability simplex after each backward pass so the model can represent an exit rather than a vanishing residual.",
    keywords: ["Temporal Fusion Transformer", "simplex projection", "gradient boosting", "SEC EDGAR", "FRED"],
    links: [
      { label: "Live dashboard", href: "/stocks/" },
      { label: "Repository", href: "https://github.com/nishadw/13f-analyzer" },
    ],
  },
  {
    id: "difficulty",
    researchId: "difficulty",
    short: "Difficulty calibration",
    context: "UMIACS · NeurIPS 2024, Datasets & Benchmarks",
    blurb:
      "Replaces coarse difficulty buckets with a continuous, standardized difficulty score for every problem across six datasets, estimated by item-response theory and Glicko-2 from human attempt records and model evaluations. Accuracy against that scale is a curve rather than a scalar, which is what makes easy-to-hard generalization measurable at all.",
    keywords: ["item-response theory", "Glicko-2", "difficulty calibration", "LLM evaluation"],
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
    context: "Computational Statistics, 2024 · first author",
    blurb:
      "Match play in golf, posed as a two-player turn-based stochastic game and solved as a Markov decision process on PGA Tour ShotLink data. Conditioning on the opponent is advantageous in a narrow set of match states and is otherwise dominated by optimal stroke-play strategy, since opponent statistics precise enough to act on are not obtainable in practice. The method extends to any two-player sport scored in turns.",
    keywords: ["Markov decision processes", "stochastic games", "value iteration", "ShotLink"],
    links: [
      { label: "Paper", href: "https://link.springer.com/article/10.1007/s00180-024-01555-5" },
      { label: "Preprint", href: "https://arxiv.org/abs/2309.14403" },
      { label: "Repository", href: "https://github.com/nishadw/mdp-golf" },
    ],
  },
  {
    id: "triage",
    researchId: "triage",
    short: "Implicit bias in triage",
    context: "Annals of Biomedical Science and Engineering, 2023 · co-author",
    blurb:
      "Classifies hospital triage dispositions from the attributes recorded at intake, then attributes each decision with Shapley values. At a given Emergency Severity Index, patients on federally run insurance programs were admitted less often than patients on private plans, and ethnicity weighed more heavily on patients under forty. Language was not a barrier.",
    keywords: ["Shapley attribution", "balanced random forest", "clinical records"],
    links: [
      { label: "Paper", href: "https://www.biomedscijournal.com/journals/abse/abse-aid1022.php" },
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

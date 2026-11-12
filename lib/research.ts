export type Paper = {
  id: string
  title: string
  // Where it appeared, or where it is headed.
  publisher: string
  // Author status, and nothing else.
  status: string
  href: string
}

// The single source for paper titles. Projects that are papers resolve their
// title from here, so the two can never drift apart. Newest first.
export const allResearch: Paper[] = [
  {
    id: "first-passage",
    title: "Neural Stochastic Differential Equations for Produce Quality",
    publisher: "In preparation",
    status: "First author",
    href: "",
  },
  {
    id: "difficulty",
    title: "Easy2Hard-Bench",
    publisher: "NeurIPS 2024",
    status: "Research assistant",
    href: "https://neurips.cc/virtual/2024/poster/97554",
  },
  {
    id: "match-play",
    title: "A Game-Theoretic Study of Adversary Strategy in Golf",
    publisher: "Computational Statistics, 2024",
    status: "First author",
    href: "https://link.springer.com/article/10.1007/s00180-024-01555-5",
  },
  {
    id: "triage",
    title: "Using Model Classification to Detect Bias in Hospital Triaging",
    publisher: "Annals of Biomedical Science and Engineering, 2023",
    status: "Co-author",
    href: "https://www.biomedscijournal.com/journals/abse/abse-aid1022.php",
  },
]

export const paperById = (id: string) => allResearch.find((p) => p.id === id)

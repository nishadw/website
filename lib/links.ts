// Single source of truth for the off-site links. The nav keeps them to the
// right of the bar, away from the page tabs; the footer repeats them.
export type ExternalLink = { label: string; href: string }

export const externalLinks: ExternalLink[] = [
  { label: "Scholar", href: "https://scholar.google.com/citations?user=8h70LbUAAAAJ&hl=en" },
  { label: "LinkedIn", href: "https://linkedin.com/in/nishadwajge" },
  { label: "GitHub", href: "https://github.com/nishadw" },
]

// The page tabs. Order is the order a stranger should read them in.
export const navTabs: ExternalLink[] = [
  { label: "Experience", href: "/experience" },
  { label: "Research", href: "/research" },
  { label: "Interests", href: "/now" },
]

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/nishadwajge" },
  { label: "GitHub", href: "https://github.com/nishadw" },
]

// Arrow reserves its space at all times so hovering never nudges the row.
function ExternalArrow() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
    >
      <path
        d="M2.6 7.4 7.4 2.6M7.4 2.6H3.9M7.4 2.6V6.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-between text-[17px] text-meta border-t border-hair pt-8 ${className}`}
    >
      <div className="flex items-center gap-6">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1 hover:text-ink transition-colors"
          >
            {l.label}
            <ExternalArrow />
          </a>
        ))}
      </div>
      <span>© Nishad Wajge 2026</span>
    </div>
  )
}

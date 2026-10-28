import type { ReactNode } from "react"

// One section title for every page: small caps on the baseline, with an
// optional link sitting on the same baseline at the far right, and the rule
// closing the header rather than opening the list.
export default function SectionHeader({
  label,
  action,
  className = "",
}: {
  label: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={`flex items-baseline justify-between gap-6 border-b border-ink pb-2 mb-1 ${className}`}>
      <h2 className="display-caps text-[22px] text-ink">{label}</h2>
      {action && <span className="text-[16px] text-meta shrink-0">{action}</span>}
    </div>
  )
}

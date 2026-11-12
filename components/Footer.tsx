import { externalLinks } from "@/lib/links"

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-y-3 text-[17px] text-meta border-t border-hair pt-8 ${className}`}
    >
      <div className="flex items-center gap-6">
        {externalLinks.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="hover:underline">
            {l.label}
          </a>
        ))}
      </div>
      <span className="tnum">© Nishad Wajge 2026</span>
    </div>
  )
}

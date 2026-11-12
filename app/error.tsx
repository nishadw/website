'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

// Route-level boundary. React render errors never reach window.onerror,
// so capture_exceptions alone would miss them.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    posthog.captureException(error, { digest: error.digest })
  }, [error])

  return (
    <div className="max-w-[960px] mx-auto px-8 pt-20 pb-32">
      <h1 className="text-[28px] font-medium text-ink mb-4">Something broke.</h1>
      <button
        type="button"
        onClick={reset}
        className="text-[17px] text-meta hover:text-ink transition-colors underline underline-offset-4"
      >
        Try again
      </button>
    </div>
  )
}

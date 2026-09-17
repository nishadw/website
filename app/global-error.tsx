'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

// Catches errors thrown by the root layout itself. It replaces <html>, so it
// must render its own document shell.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    posthog.captureException(error, { digest: error.digest, boundary: 'global' })
  }, [error])

  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '5rem 2rem' }}>
        <h1 style={{ fontSize: 28, fontWeight: 500, marginBottom: 16 }}>Something broke.</h1>
        <button type="button" onClick={reset} style={{ textDecoration: 'underline' }}>
          Try again
        </button>
      </body>
    </html>
  )
}

// app/providers.tsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { ThemeProvider } from 'next-themes'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only', 
  })
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

// Writes `class="dark"` (or nothing) on <html>; the palette in globals.css keys off it.
// Starts from the OS setting and follows it until the toggle stores a choice.
export function Themed({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
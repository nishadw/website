// app/providers.tsx
'use client'
import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { ThemeProvider } from 'next-themes'

const PH_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
// Events go through /ingest (rewritten in next.config.mjs) so ad blockers
// do not drop them. ui_host keeps toolbar/replay links pointing at PostHog itself.
const PH_UI_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.posthog.com'

if (typeof window !== 'undefined' && PH_KEY && !posthog.__loaded) {
  posthog.init(PH_KEY, {
    api_host: '/ingest',
    ui_host: PH_UI_HOST,
    defaults: '2025-11-30',

    // Everything the free tier includes, switched on client-side.
    person_profiles: 'always',            // person per visitor, anonymous or not
    autocapture: true,                    // clicks, inputs, form submits
    capture_pageview: 'history_change',   // SPA route changes count as pageviews
    capture_pageleave: true,              // needed for bounce rate / time on page
    capture_dead_clicks: true,
    rageclick: true,
    capture_heatmaps: true,               // heatmaps + scroll depth
    capture_exceptions: true,             // error tracking
    capture_performance: { web_vitals: true, network_timing: true },
    disable_session_recording: false,     // replay; also enabled in project settings
    enable_recording_console_log: true,
    session_recording: { maskAllInputs: true },
    // Surveys and feature flags load on demand; both are on in project settings.

    debug: process.env.NODE_ENV === 'development',
  })
}

// One listener for every outbound link. Autocapture records the click, but a
// named event with the destination makes funnels and insights trivial.
function useOutboundClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      let url: URL
      try { url = new URL(a.href, window.location.href) } catch { return }
      if (url.origin === window.location.origin) return
      posthog.capture('outbound_link_clicked', {
        href: url.href,
        host: url.host,
        text: a.textContent?.trim().slice(0, 80),
        from_path: window.location.pathname,
      })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  useOutboundClicks()
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

import { withPostHogConfig } from '@posthog/nextjs-config'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Proxying PostHog under /ingest keeps analytics out of ad-blocker lists.
  skipTrailingSlashRedirect: true,
  // /projects was split: papers and independent work moved to /research, and
  // work done inside a role moved under that role on /experience. Keep the old
  // path working for anything already linking to it.
  async redirects() {
    return [
      { source: '/projects', destination: '/research', permanent: true },
      // /stocks moved to GitHub Pages on 2026-11-17 and its files were removed from this repository.
      // They were a password gate plus an AES-GCM payload, and this repo is PUBLIC, so the encrypted
      // file was downloadable by anyone and could be attacked offline at leisure. It now lives in the
      // private stock-forecasting repo and is published from there. Not permanent: the host may move again.
      { source: '/stocks', destination: 'https://nishadw.github.io/stock-forecasting/stocks/', permanent: false },
      { source: '/stocks/:path*', destination: 'https://nishadw.github.io/stock-forecasting/stocks/', permanent: false },
    ]
  },
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: 'https://us-assets.i.posthog.com/static/:path*' },
      { source: '/ingest/:path*', destination: 'https://us.i.posthog.com/:path*' },
    ]
  },
}

// Source maps make error-tracking stack traces readable. Upload only when a
// personal API key is present (Vercel prod), so local and preview builds are
// unchanged. Maps are deleted after upload; nothing ships to the browser.
const POSTHOG_PERSONAL_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY

export default POSTHOG_PERSONAL_API_KEY
  ? withPostHogConfig(nextConfig, {
      personalApiKey: POSTHOG_PERSONAL_API_KEY,
      projectId: process.env.POSTHOG_PROJECT_ID ?? '268323',
      host: 'https://us.posthog.com',
      sourcemaps: {
        enabled: true,
        releaseName: 'website',
        releaseVersion: process.env.VERCEL_GIT_COMMIT_SHA,
        deleteAfterUpload: true,
      },
    })
  : nextConfig

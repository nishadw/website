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
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: 'https://us-assets.i.posthog.com/static/:path*' },
      { source: '/ingest/:path*', destination: 'https://us.i.posthog.com/:path*' },
      {
        source: '/stocks/:path*',
        destination: 'https://13f-analyzer-beta.vercel.app/:path*',
      },
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

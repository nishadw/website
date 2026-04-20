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
  async rewrites() {
    return [
      {
        source: '/stocks/:path*',
        destination: 'https://13f-analyzer-beta.vercel.app/:path*',
      },
    ]
  },
}

export default nextConfig

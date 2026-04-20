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
        destination: 'https://13f-analyzer-6fp3kyd0o-nishadws-projects.vercel.app/:path*',
      },
    ]
  },
}

export default nextConfig

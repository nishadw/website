import type { Metadata } from "next"
import "./globals.css"
import { PHProvider } from './providers'
import PostHogPageView from '../components/PostHogPageView'
import TopNav from '../components/TopNav'

export const metadata: Metadata = {
  title: "Nishad Wajge",
  description: "Machine Learning & Software Engineering",
  icons: {
    icon: '/icon.png?v=3',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <PHProvider>
        <body className="bg-[#0a0a0a] text-[#a0a0a0] antialiased">
          <PostHogPageView />
          <TopNav />
          <main className="pt-12">
            {children}
          </main>
        </body>
      </PHProvider>
    </html>
  )
}

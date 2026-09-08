import type { Metadata } from "next"
import "./globals.css"
import { PHProvider, Themed } from './providers'
import PostHogPageView from '../components/PostHogPageView'
import TopNav from '../components/TopNav'
import ThemeToggle from '../components/ThemeToggle'

export const metadata: Metadata = {
  title: "Nishad Wajge",
  description: "Machine Learning & Software Engineering",
  icons: {
    icon: '/icon.png?v=3',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-page text-body antialiased">
        <Themed>
          <PHProvider>
            <PostHogPageView />
            <TopNav />
            <main className="pt-12">
              {children}
            </main>
            <ThemeToggle />
          </PHProvider>
        </Themed>
      </body>
    </html>
  )
}

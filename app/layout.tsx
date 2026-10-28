import type { Metadata } from "next"
import "./globals.css"
import { PHProvider, Themed } from './providers'
import TopNav from '../components/TopNav'

export const metadata: Metadata = {
  title: "Nishad Wajge",
  description: "Researcher and engineer \u2014 software, game theory, statistics, machine learning.",
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
            <TopNav />
            <main className="pt-12">
              {children}
            </main>
          </PHProvider>
        </Themed>
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PHProvider } from './providers'
import PostHogPageView from '../components/PostHogPageView'
import PageTransition from '../components/PageTransition'
import Sidebar from '../components/Sidebar'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nishad Wajge",
  description: "Machine Learning & Software Engineering",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <PHProvider>
        <body className={`${inter.className} bg-[#121212] text-[#a1a1aa] antialiased flex h-screen overflow-hidden`}>
          <PostHogPageView />
          <Sidebar />
          <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
            <PageTransition>{children}</PageTransition>
          </main>
        </body>
      </PHProvider>
    </html>
  )
}

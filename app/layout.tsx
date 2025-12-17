import type React from "react"
import type { Metadata } from "next"
import { Bebas_Neue } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import VantaBackgroundClient from "@/components/VantaBackgroundClient"
import { PHProvider } from "./providers" // <--- 1. Add this import

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nishad's Portfolio",
  description: "SWE & ML Researcher",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/favicon.ico?v=2", sizes: "16x16", type: "image/x-icon" },
      { url: "/favicon.ico?v=2", sizes: "32x32", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={bebasNeue.variable}>
      <body className="font-body relative min-h-screen">
        <PHProvider> {/* <--- 2. Open Wrapper here */}
          
          {/* Persistent Vanta.js background */}
          <VantaBackgroundClient />

          {/* Navigation and page content */}
          <Navigation />
          {children}
          
        </PHProvider> {/* <--- 3. Close Wrapper here */}
      </body>
    </html>
  )
}
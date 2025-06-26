import type React from "react"
import type { Metadata } from "next"
import { Bebas_Neue } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nishad Wajge - Portfolio",
  description: "Software Engineer & Machine Learning Researcher",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={bebasNeue.variable}>
      <body className="font-body">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

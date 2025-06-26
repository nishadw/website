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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={bebasNeue.variable}>
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="16x16" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="32x32" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-body">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

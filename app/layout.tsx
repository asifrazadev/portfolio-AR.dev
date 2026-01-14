import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { CustomCursor } from "./components/ui/CustomCursor"
import { SmoothScroll } from "./components/ui/SmoothScroll"

import { ConditionalLayout } from "./components/ui/ConditionalLayout"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Asif Raza | Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. Building scalable, performant web applications with exceptional user experiences.",
  keywords: ["Full Stack Developer", "React Developer", "Next.js", "TypeScript", "Node.js", "Web Developer", "Asif Raza"],
  authors: [{ name: "Asif Raza" }],
  creator: "Asif Raza",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asif-raza-dev.vercel.app",
    title: "Asif Raza | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    siteName: "Asif Raza Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asif Raza | Full Stack Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
    creator: "@Dev_AsifRaza",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://chexuaukmzlbavwtehvp.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://chexuaukmzlbavwtehvp.supabase.co" />
      </head>
      <body>
        <Providers>

          <CustomCursor />
          <SmoothScroll />
          <div className="aurora-hero"></div>
          <div className="noise-overlay"></div>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  )
}
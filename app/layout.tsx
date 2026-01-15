import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import { PortfolioWrapper } from "./components/PortfolioWrapper"
import { SmoothScroll } from "./components/ui/SmoothScroll"
import { Footer } from "./components/footer/footer"
import { ConditionalLayout } from "./components/ui/ConditionalLayout"
import GoogleAnalytics from "./components/Gtag" // Add this import

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
  title: "Asif Raza | Full Stack Developer & Next.js Expert",
  description: "Experienced Full Stack Developer specializing in React, Next.js, and Node.js. I build scalable, high-performance web applications and custom software solutions.",
  alternates: {
    canonical: "https://asif-raza-dev.vercel.app",
  },
   other: {
       linkedin:"https://www.linkedin.com/in/asifraza-dev/",
       github: "https://github.com/asifrazadev",
        x:"https://x.com/asifrazadev"
    },
  keywords: [
  "Full Stack Developer",
  "Asif Raza",
  "Asif Raza Full Stack Developer",
  "asif raza dev",
  "asif raza full stack developer",
  "asif raza full stack developer in rawalpindi",
  "asif raza full stack developer in islamabad",
  "asif raza full stack developer in pakistan",
  "React Developer",
  "Next.js Developer",
  "TypeScript Developer",
  "Node.js Developer",
  "Web Developer",
  "MERN Stack Developer",
  "React Next.js Developer",
  "Full Stack Web Developer Pakistan",
  "Best Full Stack Developer in Rawalpindi",
  "Top React Developer in Islamabad",
  "Asif Raza React Developer",
  "Asif Raza Next.js Developer",
  "Asif Raza Node.js Developer",
  "Asif Raza MERN Developer",
  "Freelance Full Stack Developer Rawalpindi",
  "Freelance Web Developer Islamabad",
  "Hire Full Stack Developer in Pakistan",
  "Hire React Developer Rawalpindi",
  "Asif Raza portfolio",
  "Asif Raza developer portfolio",
  "Full Stack Developer near me Rawalpindi",
  "React Next.js TypeScript Node.js Developer",
  "Modern Web Developer Pakistan",
  "JavaScript Full Stack Developer",
  "Asif Raza web development",
  "Asif Raza software engineer",
  "Rawalpindi full stack developer",
  "Islamabad full stack developer",
  "Pakistan full stack developer 2026",
  "Remote Full Stack Developer Pakistan",
  "Asif Raza GitHub",
  "Asif Raza Twitter",
  "Asif Raza X developer"
],
  authors: [{ name: "Asif Raza" }],
  creator: "Asif Raza",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asif-raza-dev.vercel.app",
    title: "Asif Raza | Full Stack Developer & Next.js Expert",
    description: "Experienced Full Stack Developer specializing in React, Next.js, and Node.js. I build scalable, high-performance web applications and custom software solutions.",
    siteName: "Asif Raza Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asif Raza | Full Stack Developer & Next.js Expert",
    description: "Experienced Full Stack Developer specializing in React, Next.js, and Node.js. I build scalable, high-performance web applications and custom software solutions.",
    creator: "@asifrazadev",
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
        <meta name="google-site-verification" content="1M3XO-nCmHH0kjiq-CXHBSBy8novSU2UZpwZOODP1rs" />
        <link rel="preconnect" href="https://chexuaukmzlbavwtehvp.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://chexuaukmzlbavwtehvp.supabase.co" />
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Asif Raza",
      "url": "https://asif-raza-dev.vercel.app",
      "sameAs": [
        "https://www.linkedin.com/in/asifraza-dev/",
        "https://github.com/asifrazadev",
        "https://x.com/asifrazadev"
      ],
      "jobTitle": "Full Stack Developer",
    }),
  }}
/>
      </head>
      <body>
        <GoogleAnalytics /> 
        
        <PortfolioWrapper>
          <SmoothScroll />
          <div className="aurora-hero"></div>
          <div className="noise-overlay"></div>
          <ConditionalLayout>
            {children}
            <Footer />
          </ConditionalLayout>
        </PortfolioWrapper>
      </body> 
    </html>
  )
}
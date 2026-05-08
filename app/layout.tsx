import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"
import { PortfolioWrapper } from "./components/PortfolioWrapper"
import { SmoothScroll } from "./components/ui/SmoothScroll"
import { Footer } from "./components/footer/footer"
import { ConditionalLayout } from "./components/ui/ConditionalLayout"
import GoogleAnalytics from "./components/Gtag"
import { WebMCPProvider } from "./components/WebMCPProvider"

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
  metadataBase: new URL("https://asifraza.site"),
  title: "Asif Raza | Software Engineer & Next.js Expert",
  description: "Experienced Software Engineer specializing in React, Next.js, and Node.js. I build scalable, high-performance web applications and custom software solutions.",
  alternates: {
  canonical: "https://www.asifraza.site/",
  },
  other: {
       linkedin:"https://www.linkedin.com/in/asifraza-dev/",
       github: "https://github.com/asifrazadev",
        x:"https://x.com/asifrazadev",
        'profile:first_name': 'Asif',
  'profile:last_name': 'Raza',
  'profile:username': 'asifraza-dev',
    },
    
      icons:"https://asifraza.site/favicon.ico",
    
  keywords: [
  "Software Engineer",
  "Asif Raza",
  "Asif Raza Software Engineer",
  "asif raza dev",
  "asif raza software engineer",
  "asif raza software engineer in rawalpindi",
  "asif raza software engineer in islamabad",
  "asif raza software engineer in pakistan",
  "React Developer",
  "Next.js Developer",
  "TypeScript Developer",
  "Node.js Developer",
  "Web Developer",
  "MERN Stack Developer",
  "React Next.js Developer",
  "Software Engineer Pakistan",
  "Best Software Engineer in Rawalpindi",
  "Top React Developer in Islamabad",
  "Asif Raza React Developer",
  "Asif Raza Next.js Developer",
  "Asif Raza Node.js Developer",
  "Asif Raza MERN Developer",
  "Freelance Software Engineer Rawalpindi",
  "Freelance Web Developer Islamabad",
  "Hire Software Engineer in Pakistan",
  "Hire React Developer Rawalpindi",
  "Asif Raza portfolio",
  "Asif Raza developer portfolio",
  "Software Engineer near me Rawalpindi",
  "React Next.js TypeScript Node.js Developer",
  "Modern Web Developer Pakistan",
  "JavaScript Software Engineer",
  "Asif Raza web development",
  "Asif Raza software engineer",
  "Rawalpindi software engineer",
  "Islamabad software engineer",
  "Pakistan software engineer 2026",
  "Remote Software Engineer Pakistan",
  "Asif Raza GitHub",
  "Asif Raza Twitter",
  "Asif Raza X developer"
],
  authors: [{ name: "Asif Raza" }],
  creator: "Asif Raza",
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://asifraza.site/",
    title: "Asif Raza | Software Engineer & Next.js Expert",
    description: "Experienced Software Engineer specializing in React, Next.js, and Node.js. I build scalable, high-performance web applications and custom software solutions.",
    siteName: "Asif Raza Portfolio",
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Asif Raza | Software Engineer & Next.js Expert',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asif Raza | Software Engineer & Next.js Expert",
    description: "Experienced Software Engineer specializing in React, Next.js, and Node.js. I build scalable, high-performance web applications and custom software solutions.",
    creator: "@asifrazadev",
    images: ['/og-image.jpg'],
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
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Asif Raza',
      url: 'http://asifraza.site/',
      sameAs: [
        'https://www.linkedin.com/in/asifraza-dev/',
        'https://github.com/asifrazadev',
        'https://x.com/asifrazadev',
      ],
      jobTitle: 'Software Engineer',
      description: 'Experienced Software Engineer in Rawalpindi, Pakistan specializing in React, Next.js, TypeScript, Node.js.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rawalpindi',
        addressRegion: 'Punjab',
        addressCountry: 'PK',
      },
      knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MERN Stack'],
    }),
  }}
/>
      </head>
      <body>
        <GoogleAnalytics /> 
        <WebMCPProvider />
        
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
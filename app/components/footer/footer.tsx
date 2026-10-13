'use client'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="site-footer w-full mt-20">
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} Asif Raza</span>
        <span>Available worldwide · UTC+5</span>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link href="/#work">Work</Link>
        <Link href="/#experience">Experience</Link>
        <Link href="/#blog">Writing</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </nav>
      <a className="back-to-top" href="#top">Back to top ↑</a>
    </footer>
  )
}
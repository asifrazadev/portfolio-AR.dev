'use client'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="site-footer w-full py-8 text-center text-xs md:text-sm font-mono border-t mt-20">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <span>© {new Date().getFullYear()} Asif Raza</span>
        <span className="hidden md:inline text-white/30">|</span>
        <span>Contract & freelance opportunities welcome</span>
        <span className="hidden md:inline text-white/30">|</span>
        <span>UTC+5 (Pakistan)</span>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4 text-white/50">
        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        <span className="hidden md:inline text-white/30">|</span>
        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
      </div>
    </footer>
  )
}
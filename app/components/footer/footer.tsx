'use client'

export function Footer() {
  return (
    <footer className="w-full py-8 text-center text-xs md:text-sm text-gray-500 font-mono border-t border-white/5 mt-20">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <span>© {new Date().getFullYear()} Asif Raza</span>
        <span className="hidden md:inline text-white/10">|</span>
        <span>Contract & freelance opportunities welcome</span>
        <span className="hidden md:inline text-white/10">|</span>
        <span>UTC+5 (Pakistan)</span>
      </div>
    </footer>
  )
}
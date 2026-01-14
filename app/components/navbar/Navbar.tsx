'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const navItems = [
  { href: '#home', icon: 'ph-house', title: 'Home' },
  { href: '#work', icon: 'ph-briefcase', title: 'Work' },
  { href: '#experience', icon: 'ph-trend-up', title: 'Experience' },
  { href: '#skills', icon: 'ph-stack', title: 'Skills' },
  { href: '#about', icon: 'ph-user', title: 'About' },
  { href: '#contact', icon: 'ph-envelope', title: 'Contact' },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            if (id) setActiveSection(id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center font-heading font-bold text-sm text-black">
            AR
          </div>
          <span className="font-heading text-base font-semibold tracking-tight hidden md:block">
            Asif Raza
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-2xl transition-all duration-300 ${
                activeSection === item.href.slice(1)
                  ? 'text-white -translate-y-0.5'
                  : 'text-white/40 hover:text-white hover:-translate-y-0.5'
              }`}
              title={item.title}
            >
              <i className={`ph ${item.icon}`}></i>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-2xl text-white/80 hover:text-white transition-colors"
        >
          <i className="ph ph-list"></i>
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-[60] md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Backdrop */}
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Sidebar */}
        <div 
          className={`absolute top-0 right-0 bottom-0 w-[280px] bg-[#0A0A0A] border-l border-white/10 p-6 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <span className="font-heading text-lg font-bold text-white">Menu</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all"
            >
              <i className="ph ph-x text-xl"></i>
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                  activeSection === item.href.slice(1)
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`ph ${item.icon} text-2xl`}></i>
                <span className="font-medium text-lg">{item.title}</span>
                {activeSection === item.href.slice(1) && (
                  <i className="ph ph-caret-right ml-auto text-white/50"></i>
                )}
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-8 border-t border-white/10 text-center">
             <p className="text-white/30 text-xs font-mono">© 2024 Asif Raza</p>
          </div>
        </div>
      </div>
    </>
  )
}

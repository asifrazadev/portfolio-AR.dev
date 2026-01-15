'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
const logo = require('../../../public/logo.svg')

import { 
  BriefcaseIcon, 
  TrendUpIcon, 
  StackIcon, 
  UserIcon, 
  EnvelopeIcon, 
  ListIcon, 
  XIcon, 
  CaretRightIcon 
} from '@phosphor-icons/react'

const navItems = [
  { href: '/#about', icon: UserIcon, title: 'About' },
  { href: '/#work', icon: BriefcaseIcon, title: 'Work' },
  { href: '/#experience', icon: TrendUpIcon, title: 'Experience' },
  { href: '/#skills', icon: StackIcon, title: 'Skills' },
  { href: '/#contact', icon: EnvelopeIcon, title: 'Contact' },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState('about')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            if (id) setActiveSection(id.toString())
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
      <nav 
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Asif Raza Home">
            <Image 
              src={logo} 
              alt="Asif Raza" 
              width={150} 
              height={40} 
              priority
              className="w-auto h-8 md:h-10 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item, index) => {
             return(
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link
                href={item.href}
                className={`text-2xl transition-all duration-300 block relative ${
                  activeSection == item.href.slice(2)
                    ? 'text-white'
                    : 'text-white/40'
                }`}
                title={item.title}
                aria-label={item.title}
              >
                <motion.div
                  whileHover={{ scale: 1.2, color: '#ffffff' }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <item.icon size={24} />
                </motion.div>
                
                {activeSection === item.href.slice(2) && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute -bottom-2 left-1/2 w-1 h-1 bg-white rounded-full"
                    style={{ translateX: '-50%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          )})}
        </div>

        {/* Mobile Toggle */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-2xl text-white/80 hover:text-white transition-colors"
          aria-label="Toggle mobile menu"
          whileTap={{ scale: 0.9 }}
        >
          <ListIcon size={24} />
        </motion.button>
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
              aria-label="Close mobile menu"
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              console.log(item.href.slice(2),activeSection)
              return  (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                  activeSection === item.href.slice(2)
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={24} />
                <span className="font-medium text-lg">{item.title}</span>
                {activeSection === item.href.slice(2) && (
                  <CaretRightIcon size={16} className="ml-auto text-white/50" />
                )}
              </Link>
            )})}
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

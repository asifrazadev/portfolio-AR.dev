'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, HouseIcon } from '@phosphor-icons/react'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#050505] text-white p-6">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none animate-[pulse_8s_ease-in-out_infinite_reverse]"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* 404 Glitch Text */}
        <h1 className="font-heading font-black text-[150px] md:text-[200px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/0 select-none relative">
          404
          <span className="absolute inset-0 text-white/10 blur-sm translate-x-1 translate-y-1">404</span>
        </h1>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>

        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link 
            href="/" 
            className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-3 hover:-translate-y-1 transition-transform hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
          >
            <HouseIcon size={20} weight="bold" />
            <span>Back to Home</span>
          </Link>
          
          <a 
            href="/" 
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full flex items-center gap-3 hover:bg-white/10 transition-colors"
          >
            <ArrowLeftIcon size={20} weight="bold" />
            <span>Go Back</span>
          </a>
        </div>
      </div>
    </div>
  )
}

'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { 
  ArrowDownRightIcon, 
  CodeIcon, 
  DatabaseIcon, 
  RocketIcon, 
  CloudIcon 
} from '@phosphor-icons/react'
import { getSocialIcon } from '@/app/components/ui/SocialIcons'
import { FadeIn } from '../ui/FadeIn'

export function Hero() {
  const { about } = usePortfolio()
  
  return (
      
      <section className="max-w-9xl w-full flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center " id="about">
        
        {/* Content */}
        <div className="max-w-5xl mx-auto">

             <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-8">
               HELLO,<br />
               <span className="text-white/50 text-5xl md:text-7xl lg:text-8xl">I&apos;M</span> <span className="text-white text-5xl md:text-7xl lg:text-8xl">ASIF</span>
             </h1>
           
             <h2 className="text-2xl md:text-3xl font-light text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
               SOFTWARE ENGINEER<br />
               <span className="text-gray-500">BASED IN PAKISTAN.</span>
             </h2>

           <div className="flex flex-wrap justify-center gap-4 mb-6">
              {about?.social_links?.map((link, index) => {
                const Icon = getSocialIcon(link.icon)
                console.log('Rendering social link:', link.platform, 'with icon:', Icon)
                return (
                  <FadeIn key={index} delay={0.3 + (index * 0.1)}>
                    <a
                      href={link.platform=="Email"?"mailto:"+link.url:link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110"
                      title={link.platform}
                    >
                      <Icon size={24} />
                    </a>
                  </FadeIn>
                )
              })}
           </div>

           <FadeIn delay={0.5}>
             <div className="flex items-center justify-center gap-6">
                <a 
                  href="#work"
                  className="px-10 py-5 bg-white text-black font-semibold rounded-full flex items-center gap-2 transition-transform hover:-translate-y-1 text-lg"
                >
                  <span>View My Work</span>
                  <ArrowDownRightIcon size={20} />
                </a>
              </div>
           </FadeIn>
        </div>
      </section>
  )
}
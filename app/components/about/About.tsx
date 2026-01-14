'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  const { about, loading } = usePortfolio()

  if (loading || !about) {
    return (
      <section id="about" className="py-16 md:py-24">
        <SectionHeading title="About Me" />
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-8 md:p-12 animate-pulse">
            <div className="flex flex-col md:flex-row gap-8 items-start">
               <div className="w-24 h-24 rounded-full bg-white/10 flex-shrink-0"></div>
               <div className="flex-1 space-y-4 w-full">
                  <div className="h-8 w-48 bg-white/10 rounded mb-4"></div>
                  <div className="space-y-3 opacity-60">
                      <div className="h-4 w-full bg-white/10 rounded"></div>
                      <div className="h-4 w-full bg-white/10 rounded"></div>
                      <div className="h-4 w-[90%] bg-white/10 rounded"></div>
                      <div className="h-4 w-[95%] bg-white/10 rounded"></div>
                  </div>
                  <div className="pt-6 flex gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/10"></div>
                     <div className="w-10 h-10 rounded-full bg-white/10"></div>
                     <div className="w-10 h-10 rounded-full bg-white/10"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-16 md:py-24">
      <SectionHeading title="About Me" />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/2 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 md:p-8">
          <p className="text-xl leading-relaxed text-white mb-6">{about.intro}</p>

          {about.bio.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-gray-400 mb-4">
              {paragraph}
            </p>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
            {about.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-3 items-start">
                <i className={`ph ph-${highlight.icon} text-2xl text-white/80`}></i>
                <div>
                  <h3 className="text-sm font-semibold mb-1 text-white">{highlight.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'

export function About() {
  const { about, loading } = usePortfolio()

  if (loading || !about) {
    return (
      <section id="about" className="py-16 md:py-24">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="font-heading text-2xl md:text-3xl uppercase tracking-wider text-white">About Me</h2>
          <div className="flex-grow h-px bg-white/10"></div>
        </div>
        <div className="text-center py-16 text-gray-400">Loading about...</div>
      </section>
    )
  }

  return (
    <section id="about" className="py-12 md:py-16">
      <div className="flex items-center gap-6 mb-10">
        <h2 className="font-heading text-xl md:text-2xl uppercase tracking-wider text-white">About Me</h2>
        <div className="flex-grow h-px bg-white/10"></div>
      </div>

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
                  <h4 className="text-sm font-semibold mb-1 text-white">{highlight.title}</h4>
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

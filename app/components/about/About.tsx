'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  const { about } = usePortfolio()

  return (
    <section id="about" className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <SectionHeading title="About Me" />
          <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center group hover:bg-white-[0.07] transition-colors duration-500">

            {/* Background glowing effects for premium feel */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-500" />

            {/* Content */}
            <div className="flex-1 space-y-6 relative z-10">

              <div className="text-gray-400 leading-relaxed text-lg space-y-4">
                <p>
                  As an engineering-driven creator, I bridge the gap between complex functionality and beautiful design.
                </p>
                <p>
                  My focus is on crafting intelligent, scalable, and visually striking applications that solve real business problems.
                </p>
                <p>
                  Whether designing intuitive interfaces or architecting robust backends, I deliver modern digital experiences that convert visitors into loyal users and drive measurable growth.
                </p>
              </div>
            </div>

            {/* Image (Conditionally rendered if uploaded through the admin panel) */}
            {about?.image_url && (
              <div className="aspect-square w-48 md:w-64 rounded-2xl overflow-hidden border border-white/10 shrink-0 relative z-10 box-shadow p-2 bg-white/5">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <img
                    src={about.image_url}
                    alt="About Me"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            )}

          </div>
        </FadeIn>
      </div>
    </section>
  )
}

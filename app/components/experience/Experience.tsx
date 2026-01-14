'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { ExperienceItem } from './ExperienceItem'
import { SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  const { experience, loading } = usePortfolio()

  if (loading) {
    return (
      <section id="experience" className="py-12 md:py-16">
        <div className="flex items-center gap-6 mb-10">
          <h2 className="font-heading text-xl md:text-2xl uppercase tracking-wider text-white">Professional Journey</h2>
          <div className="flex-grow h-px bg-white/10"></div>
        </div>
        <div className="text-center py-16 text-gray-400">Loading experience...</div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-16 md:py-24">
      <SectionHeading title="Professional Journey" />

      <div className="pl-0 md:pl-8 border-l-0 md:border-l border-white/10 flex flex-col gap-8">
        {experience.map((item, index) => (
          <ExperienceItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

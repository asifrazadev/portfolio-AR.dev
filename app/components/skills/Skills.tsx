'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { SectionHeading } from '../ui/SectionHeading'
import { FadeIn } from '../ui/FadeIn'

export function Skills() {
  const { skills, loading } = usePortfolio()

  if (loading) {
    return (
      <section id="skills" className="py-16 max-w-7xl mx-auto md:py-24">
        <SectionHeading title="Capabilities" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 animate-pulse h-[320px] flex flex-col">
              <div className="w-10 h-10 bg-white/10 rounded mb-6"></div>
              <div className="h-8 w-40 bg-white/10 rounded mb-8"></div>
              <div className="space-y-4 flex-1">
                {[1, 2, 3, 4].map(j => (
                  <div key={j} className="h-4 w-full bg-white/5 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const skillsByCategory = {
    Frontend: skills.filter((s) => s.category === 'Frontend'),
    Backend: skills.filter((s) => s.category === 'Backend'),
    Tools: skills.filter((s) => s.category === 'Tools'),
  }

  const categoryIcons = {
    Frontend: 'ph-browsers',
    Backend: 'ph-server',
    Tools: 'ph-toolbox',
  }

  return (
    <section id="skills" className="py-12 md:py-16">
      <div className="">
        <SectionHeading title="Capabilities" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(skillsByCategory).map(([category, items], index) => (
          <FadeIn key={category} delay={index * 0.1} className="h-full">
            <article className="bg-white/2 backdrop-blur-2xl rounded-2xl p-6 border border-white/5 h-full">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                <i className={`ph ${categoryIcons[category as keyof typeof categoryIcons]} text-3xl text-white`}></i>
                <h3 className="font-heading text-lg font-semibold">{category}</h3>
              </div>
              <ul className="space-y-2  sm:grid md:grid-cols-1 sm:grid-cols-2 xl:grid-cols-2  list-disc list-inside text-gray-400">
                {items.map((skill) => (
                  <li
                    key={skill.id}
                    className="text-sm"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

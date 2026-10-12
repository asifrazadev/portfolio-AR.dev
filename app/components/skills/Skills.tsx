'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { SectionHeading } from '../ui/SectionHeading'
import { FadeIn } from '../ui/FadeIn'

export function Skills() {
  const { skills, loading } = usePortfolio()

  if (loading) {
    return (
      <section id="skills" className="section-shell">
        <SectionHeading title="Capabilities" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skill-card p-8 animate-pulse h-[320px] flex flex-col">
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
    <section id="skills" className="section-shell">
      <div>
        <SectionHeading title="Capabilities" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {Object.entries(skillsByCategory).map(([category, items], index) => (
          <FadeIn key={category} delay={index * 0.1} className="h-full">
            <article className="skill-card p-6 h-full">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[var(--line)]">
                <i className={`ph ${categoryIcons[category as keyof typeof categoryIcons]} text-2xl`}></i>
                <h3 className="font-heading text-lg font-semibold">{category}</h3>
              </div>
              <ul className="stack-list list-none">
                {items.map((skill) => (
                  <li
                    key={skill.id}
                    className="stack-item"
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

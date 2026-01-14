'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'

export function Skills() {
  const { skills, loading } = usePortfolio()

  if (loading) {
    return (
      <section id="skills" className="py-16 md:py-24">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="font-heading text-2xl md:text-3xl uppercase tracking-wider text-white">Skills & Technologies</h2>
          <div className="flex-grow h-px bg-white/10"></div>
        </div>
        <div className="text-center py-16 text-gray-400">Loading skills...</div>
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
      <div className="flex items-center gap-6 mb-10">
        <h2 className="font-heading text-xl md:text-2xl uppercase tracking-wider text-white">Skills & Technologies</h2>
        <div className="flex-grow h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(skillsByCategory).map(([category, items]) => (
          <article key={category} className="bg-white/2 backdrop-blur-2xl rounded-2xl p-5 md:p-6 border border-white/5 transition-all duration-400 hover:bg-white/4 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/10" data-tilt>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
              <i className={`ph ${categoryIcons[category as keyof typeof categoryIcons]} text-3xl text-white`}></i>
              <h3 className="font-heading text-lg font-semibold">{category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/20"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

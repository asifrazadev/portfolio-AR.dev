'use client'

import { Experience } from '@/app/lib/supabase/types'
import { useInView } from '@/app/hooks/useInView'

interface ExperienceItemProps {
  item: Experience
  index: number
}

export function ExperienceItem({ item, index }: ExperienceItemProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <div 
      ref={ref} 
      className={`relative transition-all duration-700 transform ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="experience-row group relative">
        {/* Timeline line segment that glows on hover */}
        {/* Timeline line segment */}
        {/* Positioned to overlay the main border line */}
        <div className="hidden md:block absolute left-[calc(-2rem-1px)] top-0 h-[calc(100%+var(--spacing)*8)] w-[2px] bg-white/5 z-[1] origin-top"></div>
        {/* Dot */}
        <div className="hidden md:block absolute left-[-2.35rem] top-0 w-3 h-3 bg-[#050505] border-2 border-white rounded-full z-[2]"></div>
        
        <div className="experience-date font-heading text-white/50 text-xs">{item.date_range}</div>

        <div className="experience-role">
          <h3 className="text-base font-medium mb-1.5 text-white">{item.title}</h3>
          <span className="text-white/50 text-[10px] uppercase tracking-wider block mb-2">{item.company}</span>
        </div>

        <div className="experience-card experience-detail p-0 border-0">
          <p className="text-white/55 text-xs mb-4">{item.description}</p>
          <ul className="list-none flex flex-col gap-2 text-white/55 text-xs">
            {item.achievements.map((achievement, idx) => (
              <li key={idx} className="relative pl-6">
                <span className="absolute left-0 text-white">→</span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

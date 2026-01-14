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
      <div className="group relative">
        {/* Timeline line segment that glows on hover */}
        {/* Timeline line segment */}
        {/* Positioned to overlay the main border line */}
        <div className="hidden md:block absolute left-[calc(-2rem-1px)] top-0 h-[calc(100%+var(--spacing)*8)] w-[2px] bg-white/5 z-[1] origin-top"></div>
        {/* Dot */}
        <div className="hidden md:block absolute left-[-2.35rem] top-0 w-3 h-3 bg-[#050505] border-2 border-white rounded-full z-[2]"></div>
        
        <div className="font-heading text-gray-400 mb-2 text-sm">{item.date_range}</div>
        
        <div className="bg-white/2 backdrop-blur-2xl rounded-2xl p-5 border border-white/5">
          <h3 className="text-xl font-medium mb-1.5">{item.title}</h3>
          <span className="text-white text-xs uppercase tracking-wider block mb-3">{item.company}</span>
          <p className="text-gray-400 text-sm mb-4">{item.description}</p>
          <ul className="list-none flex flex-col gap-2 text-gray-400">
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

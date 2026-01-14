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
        {/* Positioned to overlay the main border line */}
        <div className="hidden md:block absolute left-[calc(-2rem-1px)] top-0 h-full w-[2px] bg-transparent group-hover:bg-blue-400 group-hover:shadow-[0_0_8px_rgba(96,165,250,0.8)] transition-all duration-300 z-[1] origin-top"></div>

        {/* Dot */}
        <div className="hidden md:block absolute left-[-2.35rem] top-6 w-3 h-3 bg-[#050505] border-2 border-white rounded-full z-[2] transition-colors duration-300 group-hover:border-blue-400 group-hover:shadow-[0_0_10px_rgba(96,165,250,0.5)]"></div>
        
        <div className="font-heading text-gray-400 mb-2 text-sm">{item.date_range}</div>
        
        <div className="bg-white/2 backdrop-blur-2xl rounded-2xl p-5 border border-white/5 transition-all duration-400 group-hover:bg-white/4 group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:border-white/10" data-tilt>
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

'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { ExperienceItem } from './ExperienceItem'
import { SectionHeading } from '../ui/SectionHeading'
import { FadeIn } from '../ui/FadeIn'

export function Experience() {
  const { experience, loading } = usePortfolio()

  if (loading) {
    return (
      <section id="experience" className="py-16 md:py-24">
        <SectionHeading title="Track Record" />
        <div className="pl-0 md:pl-8 border-l-0 md:border-l border-white/10 flex flex-col gap-12">
           {[1, 2, 3].map((i) => (
             <div key={i} className="relative pl-8 md:pl-0 block md:flex gap-12">
                 {/* Date Skeleton */}
                 <div className="md:w-32 flex-shrink-0 mb-2 md:mb-0 pt-1">
                     <div className="h-4 w-24 bg-white/5 animate-pulse rounded"></div>
                 </div>
                 {/* Content Skeleton */}
                 <div className="flex-1 pb-12 border-b border-white/5">
                     <div className="h-8 w-48 bg-white/5 animate-pulse rounded mb-3"></div>
                     <div className="h-4 w-32 bg-white/5 animate-pulse rounded mb-6 opacity-60"></div>
                     <div className="space-y-3 mb-6 opacity-40">
                         <div className="h-4 w-full bg-white/5 animate-pulse rounded"></div>
                         <div className="h-4 w-[95%] bg-white/5 animate-pulse rounded"></div>
                         <div className="h-4 w-[85%] bg-white/5 animate-pulse rounded"></div>
                     </div>
                     <div className="flex gap-2">
                        {[1,2,3].map(j => <div key={j} className="h-6 w-16 bg-white/5 animate-pulse rounded-full"></div>)}
                     </div>
                 </div>
             </div>
           ))}
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-16 md:py-24">
      <SectionHeading title="Track Record" />

      <div className="pl-0 md:pl-8 border-l-0 md:border-l-0  border-white/10 flex flex-col gap-8">
        {experience.map((item, index) => (
          <FadeIn key={item.id} delay={index * 0.1}>
            <ExperienceItem item={item} index={index} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

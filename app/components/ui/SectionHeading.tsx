'use client'

import { useInView } from '@/app/hooks/useInView'

interface SectionHeadingProps {
  title: string
}

export function SectionHeading({ title }: SectionHeadingProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <div 
      ref={ref}
      className={`section-heading flex items-center gap-6 transition-all duration-1000 transform ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h2 className="font-heading font-bold whitespace-nowrap">
        {title}
      </h2>
      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  )
}

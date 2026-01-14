'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import * as PhosphorIcons from '@phosphor-icons/react'

const getIconComponent = (iconName: string) => {
  if (!iconName) return PhosphorIcons.QuestionIcon
  
  // Convert kebab-case to PascalCase and append 'Icon' (e.g., rocket-launch -> RocketLaunchIcon)
  const pascalName = iconName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') + 'Icon'
  
  const Icon = (PhosphorIcons as any)[pascalName]
  return Icon ? Icon : PhosphorIcons.QuestionIcon
}

export function Contact() {
  const { about } = usePortfolio()

  return (
    <div className="w-full" id="contact">
      <div className="bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-700"></div>
        
        <h2 className="font-heading text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 mb-6">
          Let&apos;s work together
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-xl">
          Interested in building something awesome? I&apos;m currently available for freelance projects and open to new opportunities.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:contact@dev-asifraza.com"
            className="group/btn relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden"
          >
            <span className="relative z-10 group-hover/btn:text-white transition-colors">Say Hello!</span>
            <div className="absolute inset-0 bg-black translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
          </a>
          
          {about?.social_links?.map((link, index) => {
            const Icon = getIconComponent(link.icon)
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 border border-white/10"
                data-magnetic
                aria-label={`${link.platform} Profile`}
              >
                <Icon size={24} />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

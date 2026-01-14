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
      <div className="bg-white/5 rounded-3xl p-8 mb-6 md:p-12 border border-white/10 relative overflow-hidden group flex flex-col items-center text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all duration-700"></div>
        
        <h2 className="font-heading text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 mb-6">
          Let&apos;s work together
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
          Interested in building something awesome? I&apos;m currently available for freelance projects and open to new opportunities.
        </p>

        <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full group/socials">
            {about?.social_links?.slice().sort((a, b) => (a.platform === 'Email' ? -1 : 1)).map((link) => {
              const Icon = getIconComponent(link.icon)
              const isEmail = link.platform === 'Email'
              const href = isEmail && !link.url.startsWith('mailto:') ? `mailto:${link.url}` : link.url
              
              return (
              <a 
                  key={link.platform}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-4 rounded-2xl border border-white/5 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/10 hover:!opacity-100 group-hover/socials:opacity-40"
                  data-magnetic
                  aria-label={`${link.platform} Profile`}
                >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all duration-300">
                  <Icon size={24} weight="light" className="text-white group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-400 mb-1 group-hover:text-blue-400/80 transition-colors">{link.platform}</div>
                  <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                    {isEmail ? 'Send Email' : 'Connect'}
                  </div>
                </div>
              </a>)
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

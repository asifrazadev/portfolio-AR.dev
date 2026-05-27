'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { getSocialIcon } from '@/app/components/ui/SocialIcons'
import { FadeIn } from '../ui/FadeIn'

export function Contact() {
  const { about } = usePortfolio()

  return (
    <section className="w-full" id="contact">
      <FadeIn>
        <div className="bg-white/5 rounded-3xl p-8 mb-6 md:p-12 border border-white/10 relative overflow-hidden group flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-all duration-700"></div>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
            Let&apos;s work together
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Interested in building something awesome? I&apos;m currently available for freelance projects and open to new opportunities.
          </p>

          <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full group/socials">
              {about?.social_links?.slice().sort((a, b) => (a.platform === 'Email' ? -1 : 1)).map((link) => {
                const Icon = getSocialIcon(link.icon)
                const isEmail = link.platform === 'Email' || link.platform ==="email"
                const href = isEmail && !link.url.startsWith('mailto:') ? `mailto:${link.url}` : link.url
                
                return (
                <a 
                    key={link.platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-4 rounded-2xl border border-white/5 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:!opacity-100 group-hover/socials:opacity-40"
                    data-magnetic
                    aria-label={`${link.platform} Profile`}
                  >
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/20 transition-all duration-300">
                    <Icon size={24} weight="light" className="text-white group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400 mb-1 group-hover:text-gray-300 transition-colors">{link.platform}</div>
                    <div className="text-sm font-medium text-white group-hover:text-white transition-colors">
                      {isEmail ? 'Send Email' : 'Connect'}
                    </div>
                  </div>
                </a>)
              })}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { getSocialIcon } from '@/app/components/ui/SocialIcons'
import { FadeIn } from '../ui/FadeIn'

export function Contact() {
  const { about } = usePortfolio()

  return (
    <section className="section-shell w-full" id="contact">
      <FadeIn>
        <div className="contact-panel relative overflow-hidden group flex flex-col items-center">
          <p className="eyebrow mb-6">Available for select opportunities</p>
          <h2 className="font-heading font-bold">
            Let&apos;s build something together.
          </h2>
          <p className="muted-copy mb-8 max-w-xl mx-auto text-sm">
            Tell me what you&apos;re building, where you want to go, and what a successful launch looks like.
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
                    className="flex items-center gap-4 group p-4 rounded-xl border border-black/10 bg-black/5 transition-all duration-300 hover:bg-black/10 hover:border-black/20 hover:!opacity-100 group-hover/socials:opacity-40"
                    data-magnetic
                    aria-label={`${link.platform} Profile`}
                  >
                  <div className="w-12 h-12 rounded-full bg-black/5 border border-black/10 flex items-center justify-center group-hover:border-black/30 group-hover:bg-black/10 transition-all duration-300">
                    <Icon size={24} weight="light" className="text-current transition-colors" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs opacity-60 mb-1 transition-colors">{link.platform}</div>
                    <div className="text-sm font-medium transition-colors">
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

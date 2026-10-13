'use client'

import { ArrowDownRightIcon } from '@phosphor-icons/react'
import { FadeIn } from '../ui/FadeIn'

export function Hero() {
  const phoneNumber = '+923341045680'
  const message = 'Hi Asif, I would like to book a free consultation for my business website.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <section className="hero-section w-full" id="hero">
      <div className="w-full grid md:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-20 items-center">
        <div className="text-left">
          <p className="eyebrow mb-5">Available for select opportunities</p>
          <h1 className="hero-title font-heading font-bold mb-7">
            <span>I build digital</span>
            <span>products that</span>
            <em>work.</em>
          </h1>
          <p className="hero-copy mb-8">
            Full-stack developer focused on scalable web products and intelligent workflows—from polished interfaces to the systems behind them.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <FadeIn delay={0.5}>
              <a
                href={whatsappUrl}
                className="button-primary flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
              >
                Book a free consultation
              </a>
            </FadeIn>
            <FadeIn delay={0.5}>
              <a
                href="#work"
                className="button-secondary flex items-center gap-2 transition-transform hover:-translate-y-0.5"
              >
                <span>View case studies</span>
                <ArrowDownRightIcon size={15} />
              </a>
            </FadeIn>
          </div>
        </div>
        <div className="hero-art hidden md:block" aria-label="Code product illustration">
          <div className="hero-orbit hero-orbit-back" />
          <div className="hero-orbit hero-orbit-front" />
          <span className="hero-badge hero-badge-top">full-stack</span>
          <div className="hero-code-card">
            <div className="hero-code-bar">
              <span>product.ts</span>
              <span>•••</span>
            </div>
            <pre>{`const idea = "ambitious";

const product =
  await build(idea);

return product.scale();`}</pre>
            <span className="hero-code-status">● Shipped with intent</span>
          </div>
          <div className="hero-contact-pill"><span>AVAILABLE</span> WHATSAPP <strong>↗</strong></div>
          <span className="hero-location">Rawalpindi, PK · 33.6° N</span>
        </div>
      </div>
      <div className="hero-stats">
        <div><strong>01</strong><span>focused discipline</span></div>
        <div><strong>20+</strong><span>successful projects</span></div>
        <div><strong>50+</strong><span>systems shipped</span></div>
        <div><strong>80+</strong><span>happy collaborators</span></div>
      </div>
    </section>
  )
}
'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  const { about } = usePortfolio()

  return (
    <section id="about" className="section-shell w-full">
      <div>
        <FadeIn>
          <SectionHeading title="Your Engineering Partner" />
          <div className="about-card relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6 relative z-10">
              <div className="muted-copy leading-relaxed text-base md:text-lg space-y-4">
                <p>
                  Instead of just writing code, I partner with businesses to solve complex technical challenges and deliver measurable ROI.
                </p>
                <p>
                  My focus is on crafting intelligent, scalable, and high-performance applications that streamline your operations and enhance your digital presence.
                </p>
                <p>
                  Whether it&apos;s optimizing performance to increase conversion rates or architecting robust backends for internal tools, I build digital experiences designed to drive real business growth.
                </p>
              </div>
            </div>

            {about?.image_url && (
              <div className="aspect-square w-48 md:w-64 rounded-lg overflow-hidden border border-[var(--line)] shrink-0 relative z-10 p-2">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <img
                    src={about.image_url}
                    alt="About Me"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            )}

          </div>
        </FadeIn>
      </div>
    </section>
  )
}

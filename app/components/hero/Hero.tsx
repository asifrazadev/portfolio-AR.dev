'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import {
  ArrowDownRightIcon,
} from '@phosphor-icons/react'
import { getSocialIcon } from '@/app/components/ui/SocialIcons'
import { FadeIn } from '../ui/FadeIn'
import Image from 'next/image'
import heroImage from '@/public/hero.png'

export function Hero() {
  const { about } = usePortfolio()

  return (
    <section className="w-full min-h-[calc(100vh-4rem)] flex items-center" id="hero">

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE (Content) */}
        <div className="text-left">

          {/* Intro */}
          <p className="text-sm text-gray-500 mb-4 uppercase tracking-wider">
            Full-Stack Developer
          </p>

          {/* Heading */}
          <h1 className="font-heading font-bold leading-tight mb-6">
            <span className="block text-4xl md:text-5xl lg:text-6xl text-white">
              I build websites
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-white/60">
              that grow your business
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-8">
            Fast, modern, and conversion-focused websites designed to turn visitors into real customers.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <FadeIn delay={0.5}>
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-black font-semibold rounded-full flex items-center gap-2 hover:-translate-y-1 transition transition-transform"
              >
                Get Free Audit
              </a>
            </FadeIn>

            <FadeIn delay={0.5}>
              <a
                href="#work"
                className="px-8 py-4 bg-white text-black font-semibold rounded-full flex items-center gap-2 transition-transform hover:-translate-y-1 "
              >
                <span>View My Work</span>
                <ArrowDownRightIcon size={15} />
              </a>
            </FadeIn>
          </div>

          {/* Socials */}

        </div>

        {/* RIGHT SIDE (Visual space) */}
        <div className="hidden md:flex items-center justify-center">

          {/* Minimal abstract element (keeps your theme) */}
          <div className="w-90 h-90 rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-80 h-80 bg-white/5 overflow-hidden rounded-full border border-white/10">
              <Image src={heroImage} alt="Hero" fill className="object-cover  !static !w-full !h-full" />
            </div>
          </div>
          <div className="absolute items-center right-0 space-y-4">
            {about?.social_links?.map((link, index) => {
              const Icon = getSocialIcon(link.icon)
              return (
                <FadeIn key={index} delay={0.3 + (index * 0.1)}>
                  <a
                    key={index}
                    href={link.platform == "Email" ? "mailto:" + link.url : link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition"
                  >
                    <Icon size={20} />
                  </a>
                </FadeIn>
              )
            })}
          </div>
        </div>

      </div>

    </section>
  )
}
'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { 
  ArrowDownRightIcon, 
  CodeIcon, 
  DatabaseIcon, 
  RocketIcon, 
  CloudIcon 
} from '@phosphor-icons/react'
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

export function Hero() {
  const { about } = usePortfolio()
  
  return (
    <section className="min-h-[100vh-64px] grid md:grid-cols-[1.2fr_0.8fr] items-center gap-12 py-8 md:py-0 relative overflow-hidden" id="home">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm text-xs font-medium text-emerald-400 mb-8 transition-colors hover:bg-emerald-500/10 hover:border-emerald-500/20">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse"></span>
          <span>Open to opportunities</span>
        </div>

        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight font-semibold mb-8">
         <span className="">Hi,</span>
          <br /> <span className=" bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-bold"></span> <span className=" bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-6xl md:text-7xl lg:text-8xl text-transparent font-bold">Asif Raza</span><br/>
          <span className="bg-gradient-to-r  block from-blue-300 to-purple-300 bg-clip-text text-transparent font-medium">Full Stack Developer</span>
        </h1>

        <div className="flex flex-wrap flex-col sm:flex-row items-start sm:items-center ">
          <a 
            href="#work"
            className="px-10 py-4 bg-white text-black font-semibold rounded-full text-sm md:text-md flex items-center gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
            data-magnetic
          >
            <span>View My Work</span>
            <ArrowDownRightIcon size={20} />
          </a>
          <div className="flex gap-4 m-4 ">
            {about?.social_links?.map((link, index) => {
              const Icon = getIconComponent(link.icon)
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white text-xl transition-all duration-200 hover:bg-white hover:text-black hover:border-white"
                  data-magnetic
                  title={link.platform}
                  aria-label={`${link.platform} Profile`}
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Floating icons with glow effects - no cards */}
      <div className="relative h-[500px] hidden md:flex items-center justify-center" aria-hidden="true">
        {/* Frontend Icon - top left */}
        <div className="absolute top-[15%] right-[75%] group animate-[float_6s_ease-in-out_infinite]">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            <CodeIcon weight="fill" className="text-7xl text-blue-400 relative z-10 drop-shadow-[0_0_20px_rgba(96,165,250,0.8)] group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        {/* Backend Icon - right center */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 group animate-[float_6s_ease-in-out_infinite_2s]">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            <DatabaseIcon weight="fill" className="text-7xl text-emerald-400 relative z-10 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)] group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        {/* Deploy Icon - bottom left */}
        <div className="absolute bottom-[15%] right-[75%] group animate-[float_6s_ease-in-out_infinite_4s]">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            <RocketIcon weight="fill" className="text-7xl text-orange-400 relative z-10 drop-shadow-[0_0_20px_rgba(251,146,60,0.8)] group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        {/* Cloud Icon - center */}
        <div className="absolute top-[40%] right-[50%] group animate-[float_6s_ease-in-out_infinite_3s]">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            <CloudIcon weight="fill" className="text-7xl text-purple-400 relative z-10 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </section>
  )
}
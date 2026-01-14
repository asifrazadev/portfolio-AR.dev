'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePortfolio } from '@/app/context/PortfolioContext'
import { GithubLogoIcon, GlobeIcon, ArrowRightIcon } from '@phosphor-icons/react'

// Project Card Component
type CardVariant = 'hero' | 'pillar' | 'standard' | 'banner'

const ProjectCardContent = ({ project, variant,index }: { project: any, variant: CardVariant,index:number }) => {
  // 1. HERO VARIANT (Massive, Immersive)
  if (variant === 'hero') {
    return (
      <div className="relative h-full w-full flex flex-col justify-end px-4 md:px-10 p-8 md:p-10 z-10 group-hover:translate-y-[-2px] transition-transform duration-500">
         {/* Background Image */}
         {project.image_url && (
            <div className="absolute inset-0 z-0">
               <Image src={project.image_url} alt={project.title} fill className="object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
            </div>
         )}
         
         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <span className="px-3 py-1 bg-white text-black text-[11px] font-black uppercase tracking-widest rounded shadow-[0_0_15px_rgba(255,255,255,0.3)]">Featured Project</span>
            </div>
            
            <h3 className="font-heading text-xl md:text-3xl font-black text-white mb-4 leading-[0.9] tracking-tighter drop-shadow-2xl">
               {project.title}
            </h3>
            
            <p className="text-gray-200 text-xs md:text-sm line-clamp-2 max-w-2xl mb-8 font-medium leading-relaxed drop-shadow-md">
               {project.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 border-t border-white/20 pt-3">
               <div className="flex flex-wrap gap-2">
                  {project.tags?.slice(0, 3).map((tag: string) => (
                     <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-white rounded-full">{tag}</span>
                  ))}
               </div>
               
               <div className="flex-1"></div>
               <div className="flex items-center gap-2">
                <Link href={project.github_url} className="flex items-center gap-2 px-3 py-2 justify-center rounded-full border border-white/5 hover:bg-white/10 text-gray-500 hover:text-white transition-all text-xs"><GithubLogoIcon size={14} className="hidden md:block" />{" "} GitHub</Link>
                <Link href={project.live_url} className="flex items-center gap-2 px-3 py-2 justify-center rounded-full border border-white/5 hover:bg-white/10 text-gray-500 hover:text-white transition-all text-xs"><GlobeIcon size={14} className="hidden md:block" />{" "} Live</Link>
 <Link href={`/projects/${project.slug}`} className="group/btn flex items-center gap-2 bg-white text-black px-3 py-2 rounded-full font-bold text-xs hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105">
                  View Case Study <ArrowRightIcon className="hidden md:block group-hover/btn:translate-x-1 transition-transform" />
               </Link>

               </div>
              
            </div>
         </div>
      </div>
    )
  }

  // 2. PILLAR VARIANT (Vertical, Structural)
  if (variant === 'pillar') {
    return (
       <div className="relative h-full p-6 md:p-8 flex flex-col z-10 bg-gradient-to-br from-white/[0.03] to-transparent">
          <div className="flex justify-between items-start mb-4">
             <div>
                <span className="text-xs font-mono text-emerald-400 block mb-2 tracking-widest uppercase opacity-80">{project.year}</span>
                <h3 className="font-heading text-xl md:text-3xl  font-bold text-white leading-none mb-3 tracking-tight">{project.title}</h3>
                <div className="w-12 h-1.5 bg-emerald-500 rounded-full"></div>
             </div>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
             <p className="text-gray-300 text-xs md:text-sm leading-relaxed border-l-2 border-emerald-500/30 pl-4">
                {project.description}
             </p>
             
             {/* Tech Stack List - Fills space nicely */}
             <div className="mt-auto space-y-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Technologies</span>
                <div className="flex flex-col gap-2">
                    {project.tags?.slice(0, 5).map((tag: string) => (
                    <div key={tag} className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                        <div className="w-1 h-1 bg-gray-600 rounded-full"></div> 
                        {tag}
                    </div>
                    ))}
                </div>
             </div>
             
             <Link href={`/projects/${project.slug}`} className="w-full py-3 mt-2 border border-white/10 rounded-xl text-center text-xs font-bold hover:bg-white/5 transition-all text-white uppercase tracking-widest hover:border-white/20">
                Explore
             </Link>
          </div>
       </div>
    )
  }

  // 3. BANNER VARIANT (Wide, Horizontal)
  if (variant === 'banner') {
     return (
        <div className="relative h-full px-6 py-6 md:px-6 md:pr-12 md:flex flex-col md:flex-row items-start md:items-center justify-between z-10 bg-gradient-to-r from-blue-500/5 to-purple-500/5 gap-6 md:gap-0">
           <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12 flex-1 w-full md:w-[calc(100%-48px)] ">
               <div className="flex flex-row flex-shrink-0 md:max-w-1/2">
                  <h3 className="font-heading text-xl md:text-3xl font-black text-white tracking-tight text-nowrap truncate ">{project.title}</h3>
                  <div className="h-12 ml-4 w-px bg-white/10 hidden md:block"></div>
               </div>
               
               <div className="block w-full md:w-auto truncate">
                  <p className="text-gray-400 text-xs md:text-sm max-w-xl text-nowrap font-medium mb-3 line-clamp-2 truncate mr-3">
                     {(project.description?.length || 0) > 80 ? project.description.slice(0, 80) + "..." : project.description}
                  </p>
                  
                  <div className="flex gap-2 flex-wrap h-7 overflow-hidden content-start">
                      {project.tags?.map((tag: string) => (
                         <span key={tag} className="px-3 py-1 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase shadow-lg whitespace-nowrap">
                            {tag}
                         </span>
                      ))} 
                  </div>
               </div>
           </div>
           
           <Link href={`/projects/${project.slug}`} className="mt-2 md:w-12 md:h-12 md:mt-0 flex-shrink-0 py-2 md:py-0 md:px-0 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          <span className="mr-2 block md:hidden font-medium text-xs">
            View Case Study
          </span>
              <ArrowRightIcon size={18} weight="bold" />
         
           </Link>
           
           
           
           {/* Decorative bg element */}
           <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        </div>
     )
  }

  // 4. STANDARD VARIANT (Rest of cards)
  return (
    <div aria-label={variant +index} className="relative h-full p-4 flex flex-col z-10 group-hover:bg-white/[0.03] transition-colors">
        {/* Header: Title + Year + Links */}
        <div className="flex justify-between gap-5 items-center mb-2">
           <div className="flex items-center  overflow-hidden">
              <h3 className="font-heading text-xl font-bold text-white leading-tight tracking-tight group-hover:text-blue-300 transition-colors truncate">
                 {project.title}
              </h3>
           </div>
           <span className="text-sm font-mono text-gray-500 opacity-60 flex-shrink-0">{project.year}</span>
        
            </div>

         {project.description && variant === 'standard' && index < 2 && <p className="text-gray-400 text-xs md:text-sm mb-2 leading-relaxed line-clamp-4 flex-1 font-light opacity-80">
           {project.description}
        </p> }
        
        {/* Spacer to push footer down if description is hidden */}
        <div className="flex gap-1.5 flex-wrap md:max-w-[90%] truncate">
                {project.tags && project.tags.length > 0 ? (
                    project.tags.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="text-[9px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {tag}
                    </span>
                    ))
                ) : (
                    <span className="text-[9px] text-gray-600">No tags</span>
                )}
            </div>
        {/* Footer: Tags + View Button */}
        <div className="flex text-xs items-center justify-start pt-3">
             {project.github_url && <a href={project.github_url} className="flex mr-2 items-center gap-2 px-2 py-1 justify-center rounded-full border border-white/5 hover:bg-white/10 text-gray-500 hover:text-white transition-all "><GithubLogoIcon size={14} />{" "} GitHub</a>}

             {project.live_url && <a href={project.live_url} className="flex mr-2 items-center gap-1 px-3 py-1.5 justify-center rounded-full border border-white/5 hover:bg-white/10 text-gray-500 hover:text-white transition-all"><GlobeIcon size={14} />{" "} Live</a>}

            <Link href={`/projects/${project.slug}`} className="flex items-center gap-1  font-bold text-white hover:text-blue-400 transition-colors uppercase tracking-wider group/link bg-white/5 px-3 py-1.5 rounded-full hover:bg-white/10">
               View <ArrowRightIcon className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
        </div>
    </div>
  )
}

// Helper to get Bento Pattern based on project count (Dynamic & Optimized)
function getLayoutPattern(count: number) {
  const patterns: { col: string, row: string, variant: CardVariant }[] = []
  
  if (count === 0) return []

  // CASE 1: Single item - Full width hero
  if (count === 1) {
    patterns.push({ col: 'col-span-12', row: 'row-span-2', variant: 'hero' })
    return patterns
  }

  // CASE 2: Two items - Hero + Standard
  if (count === 2) {
    patterns.push({ col: 'col-span-12 md:col-span-8', row: 'row-span-2', variant: 'hero' })
    patterns.push({ col: 'col-span-12 md:col-span-4', row: 'row-span-2', variant: 'standard' })
    return patterns
  }

  // CASE 3: Three items - Hero + Standard + Banner
  if (count === 3) {
    patterns.push({ col: 'col-span-12 md:col-span-8', row: 'row-span-2', variant: 'hero' })
    patterns.push({ col: 'col-span-12 md:col-span-4', row: 'row-span-2', variant: 'standard' })
    patterns.push({ col: 'col-span-12', row: 'row-span-1', variant: 'banner' })
    return patterns
  }

  // CASE 4: Four items - Hero + 2 Standards + Banner
  if (count === 4) {
    patterns.push({ col: 'col-span-12 md:col-span-8', row: 'row-span-2', variant: 'hero' })
    patterns.push({ col: 'col-span-12 md:col-span-4', row: 'row-span-1', variant: 'standard' })
    patterns.push({ col: 'col-span-12 md:col-span-4', row: 'row-span-1', variant: 'standard' })
    patterns.push({ col: 'col-span-12', row: 'row-span-1', variant: 'banner' })
    return patterns
  }

  // CASE 5+: Hero + Pillar + Fill remaining with standards/banners
  // Layout: [Hero 8x2] [Pillar 4x3]
  //         [Std 4x1 ] [Pillar    ]
  //         [Std 4x1 ] [Pillar    ]
  //         ... more rows below
  
  // Item 1: Hero (8x2)
  patterns.push({ col: 'col-span-12 md:col-span-8', row: 'row-span-2', variant: 'hero' })
  
  // Item 2: Pillar (4x3)
  patterns.push({ col: 'col-span-12 md:col-span-4', row: 'row-span-1 md:row-span-3', variant: 'pillar' })
  
  // Items 3-4: Fill under hero (row 3, cols 1-4 and 5-8)
  if (count >= 3) {
    patterns.push({ col: 'col-span-12 md:col-span-4', row: 'row-span-1', variant: 'standard' })
  }
  if (count >= 4) {
    patterns.push({ col: 'col-span-12 md:col-span-4', row: 'row-span-1', variant: 'standard' })
  }
  
  // Items 5+: Fill remaining spots
  // Use a repeating pattern: 3 standards per row, or 2 standards + banner
  const remaining = count - 4
  
  for (let i = 0; i < remaining; i++) {
    const position = i % 3
    const isLastItem = (i === remaining - 1)
    
    if (isLastItem && position !== 0) {
      // Last item and not at start of row - make it fill the rest
      if (position === 1) {
        // One item before, fill remaining 8 cols
        patterns.push({ col: 'col-span-12 md:col-span-8', row: 'row-span-1', variant: 'banner' })
      } else {
        // Two items before, fill remaining 4 cols
        patterns.push({ col: 'col-span-12 md:col-span-4', row: 'row-span-1', variant: 'standard' })
      }
    } else if (isLastItem && position === 0) {
      // Last item at start of new row - full width banner
      patterns.push({ col: 'col-span-12', row: 'row-span-1', variant: 'banner' })
    } else {
      // Regular standard card (4 cols)
      patterns.push({ col: 'col-span-12 md:col-span-4', row: 'row-span-1', variant: 'standard' })
    }
  }
  
  return patterns
}

// Simplified CSS Dense Packing Component
export function Work() {
  const { projects: allProjects, loading } = usePortfolio()
  
  // Use real projects directly (No Mocks forced)
  const projects = useMemo(() => {

    return allProjects?.slice(0, 10)
    
  }, [allProjects])

  // Sort: Featured first
  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (a.featured !== b.featured) return b.featured ? 1 : -1
      return 0
    })
  }, [projects])
  
  // Calculate Layout Pattern only when count changes
  const layoutPattern = useMemo(() => getLayoutPattern(sortedProjects.length), [sortedProjects.length])

  if (loading) {
    return (
      <section id="work" className="py-12">
        <div className="max-w-[1600px] mx-auto px-4">
          <h2 className="text-5xl mb-12 text-white">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[1,2,3].map(i => (
                 <div key={i} className="h-96 bg-white/5 animate-pulse rounded-3xl"></div>
             ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="work" className="py-12">
      <div className="max-w-[1600px] mx-auto px-4">
       <div className="flex items-center gap-8 mb-8">
        <h2 className="font-heading text-2xl md:text-3xl uppercase tracking-wider text-white">Featured Work</h2>
        <div className="flex-grow h-px bg-white/10"></div>
      </div>
        
        {/* Dynamic Grid Layout (Responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-max md:auto-rows-[140px]">
          {sortedProjects.map((project, index) => {
             // Use dynamic layout pattern, or fallback to standard if out of bounds (safe-guard)
             const layout = layoutPattern[index] || { col: 'col-span-12 md:col-span-4', row: 'row-span-1', variant: 'standard' }

             return ( 
                <div
                    key={project.id}
                    className={`
                        group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl 
                        overflow-hidden transition-all duration-300 hover:bg-white/10 hover:shadow-2xl 
                        hover:scale-[1.01] hover:border-white/20
                        ${layout.col} ${layout.row}
                    `}
                >
                    <ProjectCardContent 
                        project={project}
                        index={index}
                        variant={layout.variant as CardVariant} 
                    />
                </div>
             )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePortfolio } from '@/app/context/PortfolioContext'
import type { Project } from '@/app/lib/supabase/types'
import { GithubLogoIcon, GlobeIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { SectionHeading } from '../ui/SectionHeading'
import { FadeIn } from '../ui/FadeIn'

// Project Card Component
type CardVariant = 'hero' | 'pillar' | 'standard' | 'banner'

const ProjectCardContent = ({ project, variant, index }: { project: Project, variant: CardVariant, index: number }) => {
   return (
      <article className={`project-content project-content--${variant}`}>
         {project.image_url && (
            <div className="project-preview">
               <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  priority={index === 0}
                  {...(index === 0 ? { fetchPriority: "high" } : {})}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
               />
            </div>
         )}

         <div className="project-content-body">
            <div className="project-card-heading">
               <div>
                  {index === 0 && <span className="project-kicker">Featured work</span>}
                  <h3>{project.title}</h3>
               </div>
               <span className="project-year">{project.year}</span>
            </div>

            {project.description && <p className="project-description">{project.description}</p>}

            <div className="project-card-footer">
               <div className="project-tags">
                  {project.tags?.slice(0, 4).map((tag: string) => <span key={tag}>{tag}</span>)}
               </div>
               <div className="project-links">
                  {project.github_url && (
                     <a href={project.github_url} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source on GitHub`}>
                        <GithubLogoIcon size={14} /> GitHub
                     </a>
                  )}
                  {project.live_url && (
                     <a href={project.live_url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title} live site`}>
                        <GlobeIcon size={14} /> Live
                     </a>
                  )}
                  <Link href={`/projects/${project.slug}`} aria-label={`View ${project.title} details`}>
                     View <ArrowRightIcon size={14} />
                  </Link>
               </div>
            </div>
         </div>
      </article>
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
         <section id="work" className="section-shell">
            <div className="max-w-[1600px] mx-auto px-4">
               <SectionHeading title="Selected Projects I've Built" />
               <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-max md:auto-rows-[140px]">
                  {/* Skeleton 1: Hero (Large) */}
                  <div className="col-span-12 md:col-span-8 row-span-2 bg-white/5 animate-pulse rounded-3xl border border-white/5 p-8 flex flex-col justify-end">
                     <div className="w-32 h-6 bg-white/10 rounded mb-4"></div>
                     <div className="w-48 md:w-96 h-8 md:h-12 bg-white/10 rounded mb-4"></div>
                     <div className="w-full max-w-lg h-16 bg-white/10 rounded mb-6 opacity-50"></div>
                     <div className="flex gap-2">
                        <div className="w-20 h-8 bg-white/10 rounded-full"></div>
                        <div className="w-20 h-8 bg-white/10 rounded-full"></div>
                     </div>
                  </div>
                  {/* Skeleton 2: Standard (Tall) */}
                  <div className="col-span-12 md:col-span-4 row-span-2 bg-white/5 animate-pulse rounded-3xl border border-white/5 p-6 flex flex-col">
                     <div className="w-full h-8 bg-white/10 rounded mb-2"></div>
                     <div className="w-24 h-4 bg-white/10 rounded mb-auto opacity-50"></div>
                     <div className="w-full h-32 bg-white/10 rounded mt-4 opacity-50"></div>
                  </div>
                  {/* Skeleton 3: Banner (Wide) */}
                  <div className="col-span-12 row-span-1 bg-white/5 animate-pulse rounded-3xl border border-white/5 p-6 flex items-center gap-6">
                     <div className="w-48 h-8 bg-white/10 rounded flex-shrink-0"></div>
                     <div className="h-8 w-px bg-white/10"></div>
                     <div className="flex-1 space-y-2 opacity-50">
                        <div className="h-3 w-3/4 bg-white/10 rounded"></div>
                        <div className="h-3 w-1/2 bg-white/10 rounded"></div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      )
   }

   return (
      <section id="work" className="section-shell work-section">
         <div>
            <div className="work-intro">
               <h2 className="work-title">Built for real people,<br /><em>not just portfolios.</em></h2>
            </div>

            {/* Dynamic Grid Layout (Responsive) */}
            <div className="project-grid">
               {sortedProjects.map((project, index) => {
                  // Use dynamic layout pattern, or fallback to standard if out of bounds (safe-guard)
                  const layout = layoutPattern[index] || { col: 'col-span-12 md:col-span-4', row: 'row-span-1', variant: 'standard' }

                  return (
                     <FadeIn
                        key={project.id}
                        delay={index * 0.1}
                        className={`
                        project-card group project-card--${layout.variant}
                    `}
                     >
                        <ProjectCardContent
                           project={project}
                           index={index}
                           variant={layout.variant as CardVariant}
                        />
                     </FadeIn>
                  )
               })}
            </div>
         </div>
      </section>
   )
}

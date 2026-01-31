import { notFound } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import type { Metadata } from 'next'
import type { Project } from '@/app/lib/supabase/types'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon, ArrowSquareOutIcon, GithubLogoIcon, CheckCircleIcon } from '@/app/components/ui/ClientIcons'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

async function getProject(slug: string): Promise<Project | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Asif Raza`,
    description: project.overview || project.description,
    alternates: {
      canonical: `http://asifraza.site/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.overview || project.description,
      images: project.image_url ? [project.image_url] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug} = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    author: {
        '@type': 'Person',
        name: 'Asif Raza',
    },
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
  }

  return (
    <main  className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section - Side-by-Side Layout to reduce bulk */}
      <section id='work' className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left order-2 lg:order-1">
          <Link href="/#work" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 text-sm font-medium group">
            <ArrowLeftIcon size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>

          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-4">{project.year}</span>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[0.9] tracking-tight text-white">{project.title}</h1>
          <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-xl">{project.description}</p>

          <div className="flex gap-2 flex-wrap mb-10">
            {project.tags.map((tag) => (
              <span key={tag} className="md:px-3 px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 flex-wrap">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-black font-bold text-sm rounded-full inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <ArrowSquareOutIcon size={20} />
                <span>View Live</span>
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/5 text-white border border-white/10 font-bold text-sm rounded-full inline-flex items-center gap-2 transition-all duration-200 hover:bg-white/10 hover:border-white/30"
              >
                <GithubLogoIcon size={20} />
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="lg:col-span-6 order-1 lg:order-2">
           {project.image_url && (
            <div className={`relative  h-fit ${project.tags.map(tag => tag.toLowerCase()).includes('mobile') ? 'w-fit mx-auto' : 'w-full'} rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a] group`}>
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                style={{ objectFit: 'contain' }}
                priority
                className="group-hover:scale-105 max-h-[400px] !static !h-fit transition-transform duration-700"
              />
              {/* Ambient glow behind image */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-emerald-500/20 blur-3xl -z-10 opacity-60"></div>
            </div>
           )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto">
        {/* Overview */}
        {project.overview && (
          <section className="mb-20">
            <h2 className="font-heading text-2xl mb-6 text-white border-b border-white/10 pb-4 inline-block">Overview</h2>
            <p className="md:text-lg text-base leading-relaxed text-gray-300">{project.overview}</p>
          </section>
        )}

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-20">
          {project.problem && (
            <section>
              <h2 className="font-heading text-2xl mb-4 text-white">The Problem</h2>
              <p className="md:text-lg text-base leading-relaxed text-gray-400">{project.problem}</p>
            </section>
          )}

          {project.solution && (
            <section>
              <h2 className="font-heading text-2xl mb-4 text-white">The Solution</h2>
              <p className="md:text-lg text-base leading-relaxed text-gray-400">{project.solution}</p>
            </section>
          )}
        </div>

        {/* Tech Stack - Compact Grid */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <section className="mb-20">
            <h2 className="font-heading text-2xl mb-6 text-white">Tech Stack</h2>
            <div className="flex flex-wrap gap-3 text-xs md:text-sm">
              {project.tech_stack.map((tech) => (
                <div key={tech} className="md:px-5 px-3 py-2 bg-white/5 border border-white/10 rounded-full md:font-medium text-gray-300 hover:bg-white/10 transition-colors cursor-default">
                  {tech}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Features & Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-20">
          {/* Features */}
          {project.features && project.features.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl mb-6 text-white">Key Features</h2>
              <ul className="list-none space-y-4">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex gap-4 text-gray-400 group">
                    <span className="text-emerald-400 mt-1.5 text-xs group-hover:scale-125 transition-transform">●</span>
                    <span className="md:text-lg text-base leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl mb-6 text-white">Challenges</h2>
              <ul className="list-none space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex gap-4 text-gray-400 group">
                    <span className="text-orange-400 mt-1.5 text-xs group-hover:scale-125 transition-transform">●</span>
                    <span className="md:text-lg text-base leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Results - Compact Cards */}
        {project.results && project.results.length > 0 && (
          <section className="mb-20">
            <h2 className="font-heading text-2xl mb-6 text-white">Results & Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.results.map((result, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-white/3 border border-white/5 rounded-2xl hover:bg-white/5 transition-all hover:-translate-y-1">
                  <CheckCircleIcon size={24} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="md:text-lg text-base leading-relaxed text-gray-300">{result}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Gallery */}
      {project.gallery_images && project.gallery_images.length > 0 && (
        <section className="mb-24 max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl mb-12 text-center text-white">Gallery</h2>
          <div className={`grid grid-cols-1 ${project.tags.some(tag => tag.toLowerCase().includes('mobile')) ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-8`}>
            {project.gallery_images.map((image, index) => (
              <div key={index} className="relative w-full h-fit rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="group-hover:scale-105 !static !h-fit transition-transform duration-700"
                  style={{ objectFit: 'contain' }}
                />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="text-center py-12 px-4 md:py-24 bg-gradient-to-t from-white/5 to-transparent rounded-[3rem] mt-12 max-w-4xl mx-auto border border-white/5">
        <h2 className="font-heading text-3xl md:text-5xl mb-6 text-white">Interested in working together?</h2>
        <p className="text-lg text-gray-400 mb-6 md:mb-10 max-w-md mx-auto">Let's build something amazing for your next project.</p>
        <Link href="/#contact" className="px-10 py-4 bg-white text-black font-bold text-lg rounded-full inline-block transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          Get in Touch
        </Link>
      </section>
    </main>
  )
}

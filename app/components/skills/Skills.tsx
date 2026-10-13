'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { SectionHeading } from '../ui/SectionHeading'
import { FadeIn } from '../ui/FadeIn'

export function Skills() {
  const { skills, about, loading } = usePortfolio()

  if (loading) {
    return (
      <section id="skills" className="section-shell">
        <SectionHeading title="Capabilities" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skill-card p-8 animate-pulse h-[320px] flex flex-col">
              <div className="w-10 h-10 bg-white/10 rounded mb-6"></div>
              <div className="h-8 w-40 bg-white/10 rounded mb-8"></div>
              <div className="space-y-4 flex-1">
                {[1, 2, 3, 4].map(j => (
                  <div key={j} className="h-4 w-full bg-white/5 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const skillsByCategory = {
    Frontend: skills.filter((s) => s.category === 'Frontend'),
    Backend: skills.filter((s) => s.category === 'Backend'),
    Tools: skills.filter((s) => s.category === 'Tools'),
  }

  return (
    <section id="skills" className="section-shell skills-section">
      <div className="skills-intro">
        <div>
          <span className="eyebrow">Profile / toolkit</span>
          <h2>Building with range.<br />Thinking in <em>systems.</em></h2>
          <p>I&apos;m a software engineering student and full-stack developer who enjoys turning complex requirements into products that feel clear, fast, and dependable.</p>
        </div>
        <div className="skills-list">
          {Object.entries(skillsByCategory).map(([category, items], index) => (
            <FadeIn key={category} delay={index * 0.1}>
              <div className="skills-row">
                <span className="skills-index">0{index + 1}</span>
                <span className="skills-icon">{category.slice(0, 2)}</span>
                <strong>{category}</strong>
                <span>{items.map(item => item.name).join(' · ')}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="certification-grid">
        <article className="education-card">
          <span className="eyebrow">Education</span>
          <p className="education-period">{about?.education?.period || '2024-28'}</p>
          <h3>{about?.education?.title || "Bachelor's in Software Engineering"}</h3>
          <p>{about?.education?.school || 'National University of Modern Languages'}</p>
          <strong>{about?.education?.grade || 'CGPA 3.5'}</strong>
        </article>
        <article className="certification-card">
          <span className="eyebrow">Selected certifications</span>
          <div>
            {(about?.certifications?.length ? about.certifications : [
              { issuer: 'IBM', title: 'Full Stack Software Developer' },
              { issuer: 'Meta', title: 'React Native Specialization' },
              { issuer: 'Meta', title: 'Front-End Developer' },
            ]).map((certificate, index) => (
              <div className="certification-row" key={`${certificate.issuer}-${index}`}>
                <small>{certificate.issuer}</small>
                <strong>{certificate.title}</strong>
                <span>↗</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

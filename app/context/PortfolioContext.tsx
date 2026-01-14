'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from '@/app/lib/supabase/client'
import type { Project, Experience, Skill, About } from '@/app/lib/supabase/types'

interface PortfolioContextType {
  projects: Project[]
  experience: Experience[]
  skills: Skill[]
  about: About | null
  loading: boolean
  refetch: () => Promise<void>
  
  // Project methods
  createProject: (project: any) => Promise<void>
  updateProject: (id: string, project: any) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  
  // Experience methods
  createExperience: (exp: any) => Promise<void>
  updateExperience: (id: string, exp: any) => Promise<void>
  deleteExperience: (id: string) => Promise<void>
  
  // Skill methods
  createSkill: (skill: any) => Promise<void>
  createSkills: (skills: any[]) => Promise<void>
  updateSkill: (id: string, skill: any) => Promise<void>
  deleteSkill: (id: string) => Promise<void>
  
  // About methods
  updateAbout: (about: any) => Promise<void>
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

interface PortfolioProviderProps {
  children: ReactNode
  initialData?: {
    projects: Project[]
    experience: Experience[]
    skills: Skill[]
    about: About | null
  }
}

export function PortfolioProvider({ children, initialData }: PortfolioProviderProps) {
  const [projects, setProjects] = useState<Project[]>(initialData?.projects || [])
  const [experience, setExperience] = useState<Experience[]>(initialData?.experience || [])
  const [skills, setSkills] = useState<Skill[]>(initialData?.skills || [])
  const [about, setAbout] = useState<About | null>(initialData?.about || null)
  const [loading, setLoading] = useState(!initialData)

  const supabase = createClient()

  const fetchData = async () => {
    // If we already have data (from initialData), we don't need to set loading=true for a background refresh
    // unless explicit refetch is requested. But for simplicity, we can keep loading behavior or optimize.
    // For now, let's allow background updates without full loading spinner if we have data.
    if (!initialData) setLoading(true)
    
    try {
      const [projectsRes, experienceRes, skillsRes, aboutRes] = await Promise.all([
        supabase.from('projects').select('*').order('order'),
        supabase.from('experience').select('*').order('order'),
        supabase.from('skills').select('*').order('order'),
        supabase.from('about').select('*').single(),
      ])

      // @ts-ignore
      if (projectsRes.data) setProjects(projectsRes.data)
      // @ts-ignore
      if (experienceRes.data) setExperience(experienceRes.data)
      // @ts-ignore
      if (skillsRes.data) setSkills(skillsRes.data)
      // @ts-ignore
      if (aboutRes.data) setAbout(aboutRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Only fetch if no initial data, or if we want to ensure fresh data on mount (optional)
    // Given the aggressive caching goal, we can skip client fetch if we have initialData
    if (!initialData) {
      fetchData()
    }
  }, [initialData])

  // Project methods
  const createProject = async (project: any) => {
    // @ts-ignore
    const { data, error } = await supabase.from('projects').insert(project).select().single()
    if (!error && data) {
      setProjects([...projects, data])
    }
  }

  const updateProject = async (id: string, project: any) => {
    // @ts-ignore
    const { data, error } = await supabase.from('projects').update(project).eq('id', id).select().single()
    if (!error && data) {
      setProjects(projects.map(p => p.id === id ? data : p))
    }
  }

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (!error) {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  // Experience methods
  const createExperience = async (exp: any) => {
    // @ts-ignore
    const { data, error } = await supabase.from('experience').insert(exp).select().single()
    if (!error && data) {
      setExperience([...experience, data])
    }
  }

  const updateExperience = async (id: string, exp: any) => {
    // @ts-ignore
    const { data, error } = await supabase.from('experience').update(exp).eq('id', id).select().single()
    if (!error && data) {
      setExperience(experience.map(e => e.id === id ? data : e))
    }
  }

  const deleteExperience = async (id: string) => {
    const { error } = await supabase.from('experience').delete().eq('id', id)
    if (!error) {
      setExperience(experience.filter(e => e.id !== id))
    }
  }

  // Skill methods
  const createSkill = async (skill: any) => {
    // @ts-ignore
    const { data, error } = await supabase.from('skills').insert(skill).select().single()
    if (!error && data) {
      setSkills([...skills, data])
    }
  }

  const createSkills = async (skillsArray: any[]) => {
    // @ts-ignore
    const { data, error } = await supabase.from('skills').insert(skillsArray).select()
    if (!error && data) {
      setSkills([...skills, ...data])
    }
  }

  const updateSkill = async (id: string, skill: any) => {
    // @ts-ignore
    const { data, error } = await supabase.from('skills').update(skill).eq('id', id).select().single()
    if (!error && data) {
      setSkills(skills.map(s => s.id === id ? data : s))
    }
  }

  const deleteSkill = async (id: string) => {
    const { error } = await supabase.from('skills').delete().eq('id', id)
    if (!error) {
      setSkills(skills.filter(s => s.id !== id))
    }
  }

  // About methods
  const updateAbout = async (aboutData: any) => {
    if (!about) return
    // @ts-ignore
    const { data, error } = await supabase.from('about').update(aboutData).eq('id', about.id).select().single()
    if (!error && data) {
      setAbout(data)
    }
  }

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        experience,
        skills,
        about,
        loading,
        refetch: fetchData,
        createProject,
        updateProject,
        deleteProject,
        createExperience,
        updateExperience,
        deleteExperience,
        createSkill,
        createSkills,
        updateSkill,
        deleteSkill,
        updateAbout,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}

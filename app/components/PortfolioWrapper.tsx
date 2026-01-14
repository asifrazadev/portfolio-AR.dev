import { createClient } from '@/app/lib/supabase/server'
import { Providers } from '@/app/providers'
import { ReactNode } from 'react'

export async function PortfolioWrapper({ children }: { children: ReactNode }) {
  const supabase = await createClient()

  // Parallel fetching with simple Next.js caching behavior validation
  // Since we are in a Server Component, these requests happen on the server.
  // We can add aggressive caching configs if needed, but standard fetch in SC is already good.
  const [projects, experience, skills, about] = await Promise.all([
    supabase.from('projects').select('*').order('order'),
    supabase.from('experience').select('*').order('order'),
    supabase.from('skills').select('*').order('order'),
    supabase.from('about').select('*').single(),
  ])

  const initialData = {
    projects: projects.data || [],
    experience: experience.data || [],
    skills: skills.data || [],
    about: about.data || null
  }

  return (
    <Providers initialData={initialData}>
      {children}
    </Providers>
  )
}

'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import ProjectForm from '@/app/components/admin/ProjectForm'
import { useRouter } from 'next/navigation'
import { useState, use } from 'react'

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { projects, updateProject } = usePortfolio()
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const project = projects.find(p => p.id === id)

  if (!project && projects.length > 0) {
     return <div>Project not found</div>
  }
  
  // Wait for projects to load
  if (!project) {
     return <div>Loading...</div>
  }

  const handleSubmit = async (data: any) => {
    setSaving(true)
    await updateProject(id, data)
    setSaving(false)
    router.push('/admin/projects')
  }

  return (
    <div>
      <h1 className="font-heading text-4xl font-bold mb-8">Edit Project: {project.title}</h1>
      <ProjectForm initialData={project} onSubmit={handleSubmit} saving={saving} />
    </div>
  )
}

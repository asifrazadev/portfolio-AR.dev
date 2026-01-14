'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import ProjectForm from '@/app/components/admin/ProjectForm'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewProjectPage() {
  const { createProject } = usePortfolio()
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (data: any) => {
    setSaving(true)
    await createProject(data)
    setSaving(false)
    router.push('/admin/projects')
  }

  return (
    <div>
      <h1 className="font-heading text-4xl font-bold mb-8">New Project</h1>
      <ProjectForm onSubmit={handleSubmit} saving={saving} />
    </div>
  )
}

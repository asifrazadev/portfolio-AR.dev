'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import Link from 'next/link'
import { PlusCircleIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'

export default function AdminProjectsPage() {
  const { projects, deleteProject } = usePortfolio()

  const handleDelete = async (id: string) => {
    if (confirm('Delete this project?')) {
      await deleteProject(id)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-4xl font-bold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:-translate-y-0.5 transition-all flex items-center"
        >
          <PlusCircleIcon size={20} className="mr-2" />
          Add Project
        </Link>
      </div>

      <div className="space-y-4">
        {projects.map(project => (
          <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-start hover:bg-white/[0.07] transition-all">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold">{project.title}</h3>
                {project.featured && (
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Featured</span>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-2">{project.description}</p>
              <div className="flex gap-2 text-xs text-gray-500">
                <span>{project.year}</span>
                <span>•</span>
                <span>{project.tags.join(', ')}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/projects/${project.id}`} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all flex items-center">
                <PencilIcon size={20} />
              </Link>
              <button onClick={() => handleDelete(project.id)} className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all">
                <TrashIcon size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

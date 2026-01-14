'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import Link from 'next/link'

export default function AdminDashboard() {
  const { projects, experience, skills } = usePortfolio()

  const stats = [
    {
      label: 'Projects',
      value: projects.length,
      icon: 'ph-briefcase',
      color: 'blue',
      href: '/admin/projects'
    },
    {
      label: 'Experience',
      value: experience.length,
      icon: 'ph-trend-up',
      color: 'green',
      href: '/admin/experience'
    },
    {
      label: 'Skills',
      value: skills.length,
      icon: 'ph-stack',
      color: 'purple',
      href: '/admin/skills'
    },
    {
      label: 'Featured Projects',
      value: projects.filter(p => p.featured).length,
      icon: 'ph-star',
      color: 'yellow',
      href: '/admin/projects'
    },
  ]

  const recentProjects = projects.slice(0, 5)

  return (
    <div>
      <h1 className="font-heading text-4xl font-bold mb-8">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/[0.07] transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
              <i className={`ph ${stat.icon} text-2xl text-${stat.color}-400`}></i>
            </div>
            <p className="text-4xl font-bold group-hover:scale-105 transition-transform">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-heading text-2xl font-bold">Recent Projects</h2>
          <Link href="/admin/projects" className="text-sm text-gray-400 hover:text-white transition-colors">
            View All →
          </Link>
        </div>
        <div className="space-y-3">
          {recentProjects.length > 0 ? (
            recentProjects.map(project => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{project.title}</h3>
                    {project.featured && (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{project.year} • {project.tags.slice(0, 3).join(', ')}</p>
                </div>
                <Link href="/admin/projects" className="px-3 py-1.5 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-all">
                  Edit
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">No projects yet. Add your first project!</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
        <h2 className="font-heading text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/projects"
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="ph ph-plus-circle text-2xl text-blue-400"></i>
            </div>
            <div>
              <h3 className="font-semibold">Add New Project</h3>
              <p className="text-sm text-gray-400">Create a new project entry</p>
            </div>
          </Link>

          <Link
            href="/admin/experience"
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="ph ph-briefcase text-2xl text-green-400"></i>
            </div>
            <div>
              <h3 className="font-semibold">Add Experience</h3>
              <p className="text-sm text-gray-400">Add work experience</p>
            </div>
          </Link>

          <Link
            href="/admin/skills"
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="ph ph-stack text-2xl text-purple-400"></i>
            </div>
            <div>
              <h3 className="font-semibold">Manage Skills</h3>
              <p className="text-sm text-gray-400">Update your skills</p>
            </div>
          </Link>

          <Link
            href="/admin/about"
            className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="ph ph-user text-2xl text-orange-400"></i>
            </div>
            <div>
              <h3 className="font-semibold">Edit About</h3>
              <p className="text-sm text-gray-400">Update about section</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

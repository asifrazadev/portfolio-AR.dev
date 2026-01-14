'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { useState } from 'react'
import { createClient } from '@/app/lib/supabase/client'
import type { Experience } from '@/app/lib/supabase/types'
import { PlusCircleIcon, PencilIcon, TrashIcon, XIcon } from '@phosphor-icons/react'

export default function AdminExperiencePage() {
  const { experience, refetch } = usePortfolio()
  const [editing, setEditing] = useState<Experience | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  // Achievements state
  const [achievements, setAchievements] = useState<string[]>([])
  const [achievementInput, setAchievementInput] = useState('')

  const openForm = (exp?: Experience) => {
    if (exp) {
      setEditing(exp)
      setAchievements(exp.achievements || [])
    } else {
      setEditing(null)
      setAchievements([])
    }
    setAchievementInput('')
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const exp = {
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      date_range: formData.get('date_range') as string,
      description: formData.get('description') as string,
      achievements: achievements,
      order: parseInt(formData.get('order') as string) || 0,
    }

    if (editing) {
      // @ts-ignore
      await supabase.from('experience').update(exp).eq('id', editing.id)
    } else {
      // @ts-ignore
      await supabase.from('experience').insert(exp)
    }

    setShowForm(false)
    setEditing(null)
    setSaving(false)
    refetch()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this experience?')) {
      const supabase = createClient()
      await supabase.from('experience').delete().eq('id', id)
      refetch()
    }
  }

  const addAchievements = () => {
    if (achievementInput.trim()) {
      const newAchievements = achievementInput.split(',').map(a => a.trim()).filter(a => a && !achievements.includes(a))
      setAchievements([...achievements, ...newAchievements])
      setAchievementInput('')
    }
  }

  const removeAchievement = (achievement: string) => setAchievements(achievements.filter(a => a !== achievement))

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-4xl font-bold">Experience</h1>
        <button
          onClick={() => openForm()}
          className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:-translate-y-0.5 transition-all flex items-center"
        >
          <PlusCircleIcon size={20} className="mr-2" />
          Add Experience
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">{editing ? 'Edit' : 'New'} Experience</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Job Title *</label>
              <input name="title" defaultValue={editing?.title} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company *</label>
              <input name="company" defaultValue={editing?.company} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date Range *</label>
              <input name="date_range" placeholder="e.g., 2022 - Present" defaultValue={editing?.date_range} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Order</label>
              <input name="order" type="number" defaultValue={editing?.order} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea name="description" defaultValue={editing?.description} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" rows={3} />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Achievements * <span className="text-xs text-gray-400">(separate with commas for bulk add)</span></label>
            <div className="flex gap-2 mb-3">
              <input
                value={achievementInput}
                onChange={(e) => setAchievementInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievements())}
                placeholder="e.g., Led team of 5 developers, Increased performance by 40%"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
              />
              <button type="button" onClick={addAchievements} className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all">
                <PlusCircleIcon size={20} className="mr-2" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement) => (
                <span key={achievement} className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg text-sm">
                  {achievement}
                  <button type="button" onClick={() => removeAchievement(achievement)} className="hover:text-green-100">
                    <XIcon size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={saving} className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:-translate-y-0.5 transition-all disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Experience'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {experience.map(exp => (
          <div key={exp.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-start hover:bg-white/[0.07] transition-all">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{exp.company} • {exp.date_range}</p>
              <p className="text-gray-500 text-sm mb-2">{exp.description}</p>
              <div className="flex flex-wrap gap-1">
                {exp.achievements.slice(0, 2).map((achievement, i) => (
                  <span key={i} className="text-xs text-gray-400">• {achievement}</span>
                ))}
                {exp.achievements.length > 2 && (
                  <span className="text-xs text-gray-500">+{exp.achievements.length - 2} more</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openForm(exp)} className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <PencilIcon size={20} />
              </button>
              <button onClick={() => handleDelete(exp.id)} className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all">
                <TrashIcon size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

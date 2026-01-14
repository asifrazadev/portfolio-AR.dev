'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { useState } from 'react'
import { createClient } from '@/app/lib/supabase/client'
import type { Skill } from '@/app/lib/supabase/types'

export default function AdminSkillsPage() {
  const { skills, refetch } = usePortfolio()
  const [editing, setEditing] = useState<Skill | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  // Bulk add state
  const [bulkInput, setBulkInput] = useState('')
  const [bulkCategory, setBulkCategory] = useState<'Frontend' | 'Backend' | 'Tools'>('Frontend')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    const skill = {
      name: formData.get('name') as string,
      category: formData.get('category') as 'Frontend' | 'Backend' | 'Tools',
      order: parseInt(formData.get('order') as string) || 0,
    }

    if (editing) {
      // @ts-ignore
      await supabase.from('skills').update(skill).eq('id', editing.id)
    } else {
      // @ts-ignore
      await supabase.from('skills').insert(skill)
    }

    setShowForm(false)
    setEditing(null)
    setSaving(false)
    refetch()
  }

  const handleBulkAdd = async () => {
    if (!bulkInput.trim()) return
    
    setSaving(true)
    const supabase = createClient()
    const skillNames = bulkInput.split(',').map(s => s.trim()).filter(s => s)
    
    const newSkills = skillNames.map((name, index) => ({
      name,
      category: bulkCategory,
      order: skills.length + index,
    }))

    // @ts-ignore
    await supabase.from('skills').insert(newSkills)
    
    setBulkInput('')
    setSaving(false)
    refetch()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this skill?')) {
      const supabase = createClient()
      await supabase.from('skills').delete().eq('id', id)
      refetch()
    }
  }

  const skillsByCategory = {
    Frontend: skills.filter(s => s.category === 'Frontend'),
    Backend: skills.filter(s => s.category === 'Backend'),
    Tools: skills.filter(s => s.category === 'Tools'),
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-4xl font-bold">Skills</h1>
        <button
          onClick={() => { setShowForm(true); setEditing(null) }}
          className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
        >
          <i className="ph ph-plus mr-2"></i>
          Add Skill
        </button>
      </div>

      {/* Bulk Add */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Bulk Add Skills <span className="text-sm text-gray-400 font-normal">(separate with commas)</span></h3>
        <div className="flex gap-4">
          <select 
            value={bulkCategory} 
            onChange={(e) => setBulkCategory(e.target.value as 'Frontend' | 'Backend' | 'Tools')}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Tools">Tools</option>
          </select>
          <input
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleBulkAdd())}
            placeholder="e.g., React, Next.js, TypeScript, Tailwind CSS"
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
          />
          <button 
            type="button" 
            onClick={handleBulkAdd} 
            disabled={saving}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all disabled:opacity-50"
          >
            <i className="ph ph-plus mr-2"></i>
            Add All
          </button>
        </div>
      </div>

      {/* Single Add Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">{editing ? 'Edit' : 'New'} Skill</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Skill Name *</label>
              <input name="name" defaultValue={editing?.name} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select name="category" defaultValue={editing?.category || 'Frontend'} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30">
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Tools">Tools</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Order</label>
              <input name="order" type="number" defaultValue={editing?.order} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" />
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={saving} className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:-translate-y-0.5 transition-all disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Skill'}
            </button>
            <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-3 gap-6">
        {Object.entries(skillsByCategory).map(([category, items]) => (
          <div key={category} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">{category}</h3>
            <div className="space-y-2">
              {items.map(skill => (
                <div key={skill.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all group">
                  <span>{skill.name}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditing(skill); setShowForm(true) }} className="text-gray-400 hover:text-white">
                      <i className="ph ph-pencil"></i>
                    </button>
                    <button onClick={() => handleDelete(skill.id)} className="text-red-400 hover:text-red-300">
                      <i className="ph ph-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

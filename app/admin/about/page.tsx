'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { useState } from 'react'

export default function AdminAboutPage() {
  const { about, updateAbout } = usePortfolio()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // Form state
  const [intro, setIntro] = useState(about?.intro || '')
  const [bioParagraphs, setBioParagraphs] = useState<string[]>(about?.bio || [])
  const [highlights, setHighlights] = useState<Array<{icon: string, title: string, description: string}>>(about?.highlights || [])

  // Input states
  const [bioInput, setBioInput] = useState('')
  const [highlightForm, setHighlightForm] = useState({ icon: '', title: '', description: '' })

  const startEditing = () => {
    setIntro(about?.intro || '')
    setBioParagraphs(about?.bio || [])
    setHighlights(about?.highlights || [])
    setEditing(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const aboutData = {
      intro,
      bio: bioParagraphs,
      highlights,
    }

    await updateAbout(aboutData)
    setEditing(false)
    setSaving(false)
  }

  // Bio handlers
  const addBioParagraph = () => {
    if (bioInput.trim()) {
      setBioParagraphs([...bioParagraphs, bioInput.trim()])
      setBioInput('')
    }
  }

  const removeBioParagraph = (index: number) => {
    setBioParagraphs(bioParagraphs.filter((_, i) => i !== index))
  }

  // Highlight handlers
  const addHighlight = () => {
    if (highlightForm.icon && highlightForm.title && highlightForm.description) {
      setHighlights([...highlights, { ...highlightForm }])
      setHighlightForm({ icon: '', title: '', description: '' })
    }
  }

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-4xl font-bold">About Section</h1>
        {!editing && (
          <button
            onClick={startEditing}
            className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:-translate-y-0.5 transition-all"
          >
            <i className="ph ph-pencil mr-2"></i>
            Edit About
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">Edit About Section</h2>
          
          {/* Intro */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Intro (Main Headline) *</label>
            <textarea 
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="e.g., I'm a Full Stack Developer passionate about creating exceptional digital experiences."
              required 
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" 
              rows={2} 
            />
          </div>

          {/* Bio Paragraphs */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Bio Paragraphs *</label>
            <div className="flex gap-2 mb-3">
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && (e.preventDefault(), addBioParagraph())}
                placeholder="Add a paragraph about yourself (Ctrl+Enter to add)"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
                rows={3}
              />
              <button type="button" onClick={addBioParagraph} className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all self-start">
                <i className="ph ph-plus mr-2"></i>
                Add
              </button>
            </div>
            <div className="space-y-2">
              {bioParagraphs.map((paragraph, index) => (
                <div key={index} className="flex gap-2 items-start p-3 bg-white/5 rounded-xl">
                  <span className="flex-1 text-sm text-gray-300">{paragraph}</span>
                  <button type="button" onClick={() => removeBioParagraph(index)} className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all">
                    <i className="ph ph-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Highlights *</label>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3">
              <div className="grid grid-cols-3 gap-4 mb-3">
                <input
                  value={highlightForm.icon}
                  onChange={(e) => setHighlightForm({...highlightForm, icon: e.target.value})}
                  placeholder="Icon (e.g., code, rocket, users)"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
                />
                <input
                  value={highlightForm.title}
                  onChange={(e) => setHighlightForm({...highlightForm, title: e.target.value})}
                  placeholder="Title"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
                />
                <input
                  value={highlightForm.description}
                  onChange={(e) => setHighlightForm({...highlightForm, description: e.target.value})}
                  placeholder="Description"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
                />
              </div>
              <button type="button" onClick={addHighlight} className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all w-full">
                <i className="ph ph-plus mr-2"></i>
                Add Highlight
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl relative group">
                  <button 
                    type="button" 
                    onClick={() => removeHighlight(index)} 
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500/20 text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <i className="ph ph-x text-xs"></i>
                  </button>
                  <i className={`ph ph-${highlight.icon} text-2xl mb-2 block`}></i>
                  <h4 className="font-semibold mb-1">{highlight.title}</h4>
                  <p className="text-sm text-gray-400">{highlight.description}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Common icons: code, rocket, users, lightbulb, chart-line, shield-check
            </p>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button type="submit" disabled={saving} className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:-translate-y-0.5 transition-all disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => setEditing(false)} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Intro</h3>
            <p className="text-gray-300">{about?.intro}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Bio Paragraphs ({about?.bio.length || 0})</h3>
            <div className="space-y-3">
              {about?.bio.map((paragraph, i) => (
                <p key={i} className="text-gray-400 p-3 bg-white/5 rounded-xl">{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Highlights ({about?.highlights.length || 0})</h3>
            <div className="grid grid-cols-3 gap-4">
              {about?.highlights.map((highlight, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl">
                  <i className={`ph ph-${highlight.icon} text-2xl mb-2 block`}></i>
                  <h4 className="font-semibold mb-1">{highlight.title}</h4>
                  <p className="text-sm text-gray-400">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

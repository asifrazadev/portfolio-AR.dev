'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { useState } from 'react'
import * as PhosphorIcons from '@phosphor-icons/react'
import { PencilIcon, PlusCircleIcon, TrashIcon, XIcon, ArrowUpIcon, ArrowDownIcon } from '@phosphor-icons/react'

const getIconComponent = (iconName: string) => {
  if (!iconName) return PhosphorIcons.QuestionIcon
  
  // Convert kebab-case to PascalCase and append 'Icon' (e.g., rocket-launch -> RocketLaunchIcon)
  const pascalName = iconName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') + 'Icon'
  
  const Icon = (PhosphorIcons as any)[pascalName]
  return Icon ? Icon : PhosphorIcons.QuestionIcon
}

export default function AdminAboutPage() {
  const { about, updateAbout } = usePortfolio()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // Form state
  const [intro, setIntro] = useState(about?.intro || '')
  const [bioParagraphs, setBioParagraphs] = useState<string[]>(about?.bio || [])
  const [highlights, setHighlights] = useState<Array<{icon: string, title: string, description: string}>>(about?.highlights || [])
  const [socialLinks, setSocialLinks] = useState<Array<{platform: string, url: string, icon: string}>>(about?.social_links || [])

  // Input states
  const [bioInput, setBioInput] = useState('')
  const [highlightForm, setHighlightForm] = useState({ icon: '', title: '', description: '' })
  const [socialForm, setSocialForm] = useState({ platform: '', url: '', icon: '' })

  const startEditing = () => {
    setIntro(about?.intro || '')
    setBioParagraphs(about?.bio || [])
    setHighlights(about?.highlights || [])
    setSocialLinks(about?.social_links || [])
    setEditing(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const aboutData = {
      intro,
      bio: bioParagraphs,
      highlights,
      social_links: socialLinks
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

  // Social Link handlers
  const addSocialLink = () => {
    if (socialForm.platform && socialForm.url && socialForm.icon) {
      setSocialLinks([...socialLinks, { ...socialForm }])
      setSocialForm({ platform: '', url: '', icon: '' })
    }
  }

  const removeSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index))
  }

  const moveSocialLink = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === socialLinks.length - 1)
    ) return

    const newLinks = [...socialLinks]
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    const temp = newLinks[index]
    newLinks[index] = newLinks[swapIndex]
    newLinks[swapIndex] = temp
    setSocialLinks(newLinks)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-4xl font-bold">About Section</h1>
        {!editing && (
          <button
            onClick={startEditing}
            className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:-translate-y-0.5 transition-all flex items-center"
          >
            <PencilIcon size={20} className="mr-2" />
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
              <button type="button" onClick={addBioParagraph} className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all">
                <PlusCircleIcon size={20} className="mr-2" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {bioParagraphs.map((paragraph, index) => (
                <div key={index} className="flex gap-2 items-start p-3 bg-white/5 rounded-xl">
                  <span className="flex-1 text-sm text-gray-300">{paragraph}</span>
                  <button type="button" onClick={() => removeBioParagraph(index)} className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all">
                    <TrashIcon size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Social Links</label>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3">
              <div className="grid grid-cols-3 gap-4 mb-3">
                <input
                  value={socialForm.platform}
                  onChange={(e) => setSocialForm({...socialForm, platform: e.target.value})}
                  placeholder="Platform (e.g., GitHub, Twitter)"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
                />
                <input
                  value={socialForm.url}
                  onChange={(e) => setSocialForm({...socialForm, url: e.target.value})}
                  placeholder="URL (https://...)"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
                />
                 <input
                  value={socialForm.icon}
                  onChange={(e) => setSocialForm({...socialForm, icon: e.target.value})}
                  placeholder="Icon (e.g., github-logo, x-logo)"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
                />
              </div>
              <button type="button" onClick={addSocialLink} className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all w-full flex items-center justify-center">
                <PlusCircleIcon size={20} className="mr-2" />
                Add Social Link
              </button>
            </div>
            
            <div className="space-y-2">
              {socialLinks.map((link, index) => {
                 const Icon = getIconComponent(link.icon)
                 return (
                  <div key={index} className="flex gap-4 items-center p-3 bg-white/5 border border-white/10 rounded-xl">
                    <div className="flex flex-col gap-1">
                      <button 
                        type="button" 
                        onClick={() => moveSocialLink(index, 'up')} 
                        disabled={index === 0}
                        className="text-gray-400 hover:text-white disabled:opacity-30"
                      >
                        <ArrowUpIcon size={14} />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => moveSocialLink(index, 'down')} 
                        disabled={index === socialLinks.length - 1}
                        className="text-gray-400 hover:text-white disabled:opacity-30"
                      >
                        <ArrowDownIcon size={14} />
                      </button>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg">
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{link.platform}</h4>
                      <p className="text-xs text-blue-400 truncate max-w-xs">{link.url}</p>
                    </div>
                    <div className="text-xs text-gray-500 font-mono hidden md:block">{link.icon}</div>
                    <button type="button" onClick={() => removeSocialLink(index)} className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all">
                      <TrashIcon size={18} />
                    </button>
                  </div>
                 )
              })}
            </div>
             <p className="text-xs text-gray-400 mt-2">
              Common icons: github-logo, linkedin-logo, x-logo, instagram-logo, globe, envelope
            </p>
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
              <button type="button" onClick={addHighlight} className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all w-full flex items-center justify-center">
                <PlusCircleIcon size={20} className="mr-2" />
                Add Highlight
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {highlights.map((highlight, index) => {
                const Icon = getIconComponent(highlight.icon)
                return (
                  <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-xl relative group">
                    <button 
                      type="button" 
                      onClick={() => removeHighlight(index)} 
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500/20 text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <XIcon size={12} />
                    </button>
                    <Icon size={32} className="mb-2 block" />
                    <h4 className="font-semibold mb-1">{highlight.title}</h4>
                    <p className="text-sm text-gray-400">{highlight.description}</p>
                  </div>
                )
              })}
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
          
           <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Social Links ({about?.social_links?.length || 0})</h3>
            <div className="flex flex-wrap gap-2">
              {about?.social_links?.map((link, i) => {
                 const Icon = getIconComponent(link.icon)
                 return (
                  <a key={i} href={link.url} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10">
                    <Icon size={20} />
                    <span>{link.platform}</span>
                  </a>
                 )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Highlights ({about?.highlights.length || 0})</h3>
            <div className="grid grid-cols-3 gap-4">
              {about?.highlights.map((highlight, i) => {
                 const Icon = getIconComponent(highlight.icon)
                 return (
                  <div key={i} className="p-4 bg-white/5 rounded-xl">
                    <Icon size={32} className="mb-2 block" />
                    <h4 className="font-semibold mb-1">{highlight.title}</h4>
                    <p className="text-sm text-gray-400">{highlight.description}</p>
                  </div>
                 )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

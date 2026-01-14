'use client'

import { usePortfolio } from '@/app/context/PortfolioContext'
import { useState } from 'react'
import * as PhosphorIcons from '@phosphor-icons/react'
import { PencilIcon, PlusCircleIcon, TrashIcon, XIcon, ArrowUpIcon, ArrowDownIcon, UploadSimpleIcon, SpinnerIcon } from '@phosphor-icons/react'
import { createClient } from '@/app/lib/supabase/client'

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
  const [imageUrl, setImageUrl] = useState(about?.image_url || '')
  const [socialLinks, setSocialLinks] = useState<Array<{platform: string, url: string, icon: string}>>(about?.social_links || [])

  const [uploading, setUploading] = useState(false)

  // Input states
  const [socialForm, setSocialForm] = useState({ platform: '', url: '', icon: '' })

  const startEditing = () => {
    setImageUrl(about?.image_url || '')
    setSocialLinks(about?.social_links || [])
    setEditing(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const aboutData = {
      image_url: imageUrl,
      social_links: socialLinks
    }

    await updateAbout(aboutData)
    setEditing(false)
    setSaving(false)
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


          {/* Profile Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Profile Image</label>
            <div className="mb-3">
               <label className={`block w-full border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-white/30 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={async (e) => {
                      if (!e.target.files || e.target.files.length === 0) return
                      setUploading(true)
                      const supabase = createClient()
                      const file = e.target.files[0]
                      try {
                        const fileExt = file.name.split('.').pop()
                        const fileName = `about-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
                        const { error: uploadError } = await supabase.storage
                          .from('Project Images') // Reusing existing bucket for simplicity
                          .upload(fileName, file)
                        if (uploadError) throw uploadError
                        const { data } = supabase.storage.from('Project Images').getPublicUrl(fileName)
                        if (data) setImageUrl(data.publicUrl)
                      } catch (error: any) {
                        alert('Error uploading image: ' + error.message)
                      } finally {
                        setUploading(false)
                      }
                    }} 
                    className="hidden" 
                  />
                  <div className="flex flex-col items-center gap-2">
                     {uploading ? (
                         <>
                             <SpinnerIcon size={24} className="animate-spin text-blue-400" />
                             <span className="text-sm text-gray-400">Uploading...</span>
                         </>
                     ) : (
                         <>
                             <UploadSimpleIcon size={32} className="text-gray-400" />
                             <span className="text-sm text-gray-400">Click to upload profile photo</span>
                         </>
                     )}
                  </div>
               </label>
            </div>
            {imageUrl && (
              <div className="relative w-32 h-32 bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
                 <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
                 <button 
                   type="button"
                   onClick={() => setImageUrl('')}
                   className="absolute top-1 right-1 w-6 h-6 bg-red-500/80 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                   <XIcon size={14} />
                 </button>
              </div>
            )}
          </div>

          {/* Bio Paragraphs */}


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
            <h3 className="text-lg font-semibold mb-2">Profile Image</h3>
            {about?.image_url ? (
              <div className="mt-4 w-32 h-32 rounded-xl overflow-hidden border border-white/10">
                <img src={about.image_url} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
                <p className="text-gray-400">No profile image set</p>
            )}
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


        </div>
      )}
    </div>
  )
}

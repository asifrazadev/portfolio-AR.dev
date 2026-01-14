'use client'

import { useState, useEffect } from 'react'
import type { Project } from '@/app/lib/supabase/types'
import { createClient } from '@/app/lib/supabase/client'
import Link from 'next/link'
import { PlusCircleIcon, XIcon, UploadSimpleIcon, SpinnerIcon } from '@phosphor-icons/react'

interface ProjectFormProps {
  initialData?: Project
  onSubmit: (data: any) => Promise<void>
  saving: boolean
}

export default function ProjectForm({ initialData, onSubmit, saving }: ProjectFormProps) {
  // Form state for arrays
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [techStack, setTechStack] = useState<string[]>(initialData?.tech_stack || [])
  const [features, setFeatures] = useState<string[]>(initialData?.features || [])
  const [challenges, setChallenges] = useState<string[]>(initialData?.challenges || [])
  const [results, setResults] = useState<string[]>(initialData?.results || [])
  const [galleryImages, setGalleryImages] = useState<string[]>(initialData?.gallery_images || [])
  const [mainImage, setMainImage] = useState(initialData?.image_url || '')

  // Input states for adding new items
  const [tagInput, setTagInput] = useState('')
  const [techInput, setTechInput] = useState('')
  const [featureInput, setFeatureInput] = useState('')
  const [galleryInput, setGalleryInput] = useState('')
  const [challengeInput, setChallengeInput] = useState('')
  const [resultInput, setResultInput] = useState('')
  const [uploading, setUploading] = useState(false)
  // Controlled inputs for auto-slug
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

  // Slug generator
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    
    // Only auto-generate if specific conditions are met
    // If it's a new project OR if the slug hasn't been manually edited yet
    if (!initialData?.id || !slugManuallyEdited) {
       const autoSlug = generateSlug(newTitle)
       setSlug(autoSlug)
    }
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value)
    setSlugManuallyEdited(true)
  }

  // Handlers
  const addTags = () => {
    if (tagInput.trim()) {
      const newTags = tagInput.split(',').map(t => t.trim()).filter(t => t && !tags.includes(t))
      setTags([...tags, ...newTags])
      setTagInput('')
    }
  }
  const removeTag = (tag: string) => setTags(tags.filter(t => t !== tag))

  const addTech = () => {
    if (techInput.trim()) {
      const newTech = techInput.split(',').map(t => t.trim()).filter(t => t && !techStack.includes(t))
      setTechStack([...techStack, ...newTech])
      setTechInput('')
    }
  }
  const removeTech = (tech: string) => setTechStack(techStack.filter(t => t !== tech))

  const addFeatures = () => {
    if (featureInput.trim()) {
      const newFeatures = featureInput.split(',').map(f => f.trim()).filter(f => f && !features.includes(f))
      setFeatures([...features, ...newFeatures])
      setFeatureInput('')
    }
  }
  const removeFeature = (feature: string) => setFeatures(features.filter(f => f !== feature))

  const addChallenges = () => {
    if (challengeInput.trim()) {
      const newChallenges = challengeInput.split(',').map(c => c.trim()).filter(c => c && !challenges.includes(c))
      setChallenges([...challenges, ...newChallenges])
      setChallengeInput('')
    }
  }
  const removeChallenge = (challenge: string) => setChallenges(challenges.filter(c => c !== challenge))

  const addResults = () => {
    if (resultInput.trim()) {
      const newResults = resultInput.split(',').map(r => r.trim()).filter(r => r && !results.includes(r))
      setResults([...results, ...newResults])
      setResultInput('')
    }
  }
  const removeResult = (result: string) => setResults(results.filter(r => r !== result))

  const addGalleryImages = () => {
    if (galleryInput.trim()) {
      const newImages = galleryInput.split(',').map(img => img.trim()).filter(img => img && !galleryImages.includes(img))
      setGalleryImages([...galleryImages, ...newImages])
      setGalleryInput('')
    }
  }
  const removeGalleryImage = (image: string) => setGalleryImages(galleryImages.filter(img => img !== image))

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setUploading(true)
    const supabase = createClient()
    const file = e.target.files[0]
    
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('Project Images')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Error uploading image:', uploadError)
        alert(`Error uploading ${file.name}: ${uploadError.message}`)
        return
      }

      const { data } = supabase.storage.from('Project Images').getPublicUrl(filePath)
      if (data) {
        setMainImage(data.publicUrl)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('An unexpected error occurred during upload')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    setUploading(true)
    const supabase = createClient()
    const newUrls: string[] = []

    try {
      for (const file of Array.from(e.target.files)) {
         const fileExt = file.name.split('.').pop()
         const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
         const filePath = `${fileName}`
         
         const { error: uploadError } = await supabase.storage
            .from('Project Images')
            .upload(filePath, file)
            
         if (uploadError) {
            console.error('Error uploading image:', uploadError)
            alert(`Error uploading ${file.name}: ${uploadError.message}`)
            continue
         }
         
         const { data } = supabase.storage.from('Project Images').getPublicUrl(filePath)
         if (data) {
             newUrls.push(data.publicUrl)
         }
      }
      
      setGalleryImages(prev => [...prev, ...newUrls])
    } catch (error) {
      console.error('Upload error:', error)
      alert('An unexpected error occurred during upload')
    } finally {
      setUploading(false)
      e.target.value = '' 
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const project = {
      title: title,
      description: formData.get('description') as string,
      year: formData.get('year') as string,
      tags: tags,
      image_url: mainImage,
      slug: slug,
      order: parseInt(formData.get('order') as string) || 0,
      featured: formData.get('featured') === 'on',
      overview: formData.get('overview') as string || null,
      problem: formData.get('problem') as string || null,
      solution: formData.get('solution') as string || null,
      tech_stack: techStack.length > 0 ? techStack : null,
      features: features.length > 0 ? features : null,
      challenges: challenges.length > 0 ? challenges : null,
      results: results.length > 0 ? results : null,
      gallery_images: galleryImages.length > 0 ? galleryImages : null,
      live_url: formData.get('live_url') as string || null,
      github_url: formData.get('github_url') as string || null,
    }

    onSubmit(project)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
      {/* Basic Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input 
                name="title" 
                value={title} 
                onChange={handleTitleChange}
                required 
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Year *</label>
            <input name="year" defaultValue={initialData?.year} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug (URL)</label>
            <input 
                name="slug" 
                value={slug}
                onChange={handleSlugChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Order</label>
            <input name="order" type="number" defaultValue={initialData?.order} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" />
          </div>
          <div className="col-span-2">
            <label className="flex items-center gap-2">
              <input name="featured" type="checkbox" defaultChecked={initialData?.featured} className="w-4 h-4" />
              <span className="text-sm font-medium">Featured Project</span>
            </label>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Description *</label>
        <textarea name="description" defaultValue={initialData?.description} required className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" rows={3} />
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Tags * <span className="text-xs text-gray-400">(separate with commas for bulk add)</span></label>
        <div className="flex gap-2 mb-3">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTags())}
            placeholder="e.g., Next.js, TypeScript, React"
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
          />
          <button type="button" onClick={addTags} className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all">
            <PlusCircleIcon size={20} className="mr-2" />
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-lg text-sm">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-blue-100">
                <XIcon size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* URLs */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Links</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Main Project Image</label>
            
            {/* Main Image Upload */}
            <div className="mb-3">
               <label className={`block w-full border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-white/30 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                  <input type="file" accept="image/*" onChange={handleMainImageUpload} className="hidden" />
                  <div className="flex flex-col items-center gap-2">
                     <UploadSimpleIcon size={32} className="text-gray-400" />
                     <span className="text-sm text-gray-400">Click to upload main image</span>
                  </div>
               </label>
            </div>

            <div className="flex gap-2">
              <input 
                name="image_url" 
                value={mainImage} 
                onChange={(e) => setMainImage(e.target.value)}
                placeholder="Or enter image URL..."
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" 
              />
            </div>
            {mainImage && (
              <div className="mt-3 relative aspect-video bg-white/5 border border-white/10 rounded-xl overflow-hidden w-full max-w-md">
                 <img src={mainImage} alt="Main Project" className="w-full h-full object-cover" />
                 <button 
                   type="button"
                   onClick={() => setMainImage('')}
                   className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                 >
                   <XIcon size={18} />
                 </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Live URL</label>
              <input name="live_url" defaultValue={initialData?.live_url || ''} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">GitHub URL</label>
              <input name="github_url" defaultValue={initialData?.github_url || ''} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Fields */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Case Study (Optional)</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Overview</label>
            <textarea name="overview" defaultValue={initialData?.overview || ''} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Problem</label>
            <textarea name="problem" defaultValue={initialData?.problem || ''} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Solution</label>
            <textarea name="solution" defaultValue={initialData?.solution || ''} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30" rows={3} />
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Tech Stack <span className="text-xs text-gray-400">(separate with commas for bulk add)</span></label>
        <div className="flex gap-2 mb-3">
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
            placeholder="e.g., React, Node.js, PostgreSQL"
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
          />
          <button type="button" onClick={addTech} className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all">
            <PlusCircleIcon size={20} className="mr-2" />
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span key={tech} className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg text-sm">
              {tech}
              <button type="button" onClick={() => removeTech(tech)} className="hover:text-purple-100">
                <XIcon size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Key Features <span className="text-xs text-gray-400">(separate with commas for bulk add)</span></label>
        <div className="flex gap-2 mb-3">
          <input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeatures())}
            placeholder="e.g., Real-time updates, Dark mode, Responsive design"
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
          />
          <button type="button" onClick={addFeatures} className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all">
            <PlusCircleIcon size={20} className="mr-2" />
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <span key={feature} className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg text-sm">
              {feature}
              <button type="button" onClick={() => removeFeature(feature)} className="hover:text-green-100">
                <XIcon size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Challenges */}
       <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Challenges <span className="text-xs text-gray-400">(separate with commas)</span></label>
        <div className="flex gap-2 mb-3">
          <input
            value={challengeInput}
            onChange={(e) => setChallengeInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChallenges())}
            placeholder="e.g., Performance optimization, Legacy code migration"
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
          />
          <button type="button" onClick={addChallenges} className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all">
            <PlusCircleIcon size={20} className="mr-2" />
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {challenges.map((challenge) => (
            <span key={challenge} className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 border border-orange-500/30 text-orange-300 rounded-lg text-sm">
              {challenge}
              <button type="button" onClick={() => removeChallenge(challenge)} className="hover:text-orange-100">
                <XIcon size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Results <span className="text-xs text-gray-400">(separate with commas)</span></label>
        <div className="flex gap-2 mb-3">
          <input
            value={resultInput}
            onChange={(e) => setResultInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResults())}
            placeholder="e.g., 50% faster load times, 20% increase in conversion"
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
          />
          <button type="button" onClick={addResults} className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all">
            <PlusCircleIcon size={20} className="mr-2" />
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {results.map((result) => (
            <span key={result} className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 rounded-lg text-sm">
              {result}
              <button type="button" onClick={() => removeResult(result)} className="hover:text-cyan-100">
                <XIcon size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Gallery Images */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Gallery Images</label>
        
        {/* Upload Button */}
        <div className="mb-4">
            <label className={`block w-full border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-white/30 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                <input type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
                <div className="flex flex-col items-center gap-2">
                    {uploading ? (
                        <>
                            <SpinnerIcon size={24} className="animate-spin text-blue-400" />
                            <span className="text-sm text-gray-400">Uploading...</span>
                        </>
                    ) : (
                        <>
                            <UploadSimpleIcon size={32} className="text-gray-400" />
                            <span className="text-sm text-gray-400">Click to upload images</span>
                            <span className="text-xs text-gray-500">(Supports PNG, JPG, WEBP)</span>
                        </>
                    )}
                </div>
            </label>
        </div>

        <label className="block text-sm font-medium mb-2">Or add by URL <span className="text-xs text-gray-400">(separate with commas)</span></label>
        <div className="flex gap-2 mb-3">
          <input
            value={galleryInput}
            onChange={(e) => setGalleryInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addGalleryImages())}
            placeholder="e.g., https://example.com/img1.jpg, https://example.com/img2.jpg"
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
          />
          <button type="button" onClick={addGalleryImages} className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all">
            <PlusCircleIcon size={20} className="mr-2" />
            Add
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {galleryImages.map((image) => (
            <div key={image} className="relative group">
              <div className="aspect-video bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <img src={image} alt="Gallery" className="w-full h-full object-cover" />
              </div>
              <button 
                type="button" 
                onClick={() => removeGalleryImage(image)} 
                className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <XIcon size={18} />
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          These images will appear in the project detail page gallery section
        </p>
      </div>

      <div className="flex gap-4 pt-4 border-t border-white/10">
        <button type="submit" disabled={saving} className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:-translate-y-0.5 transition-all disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Project'}
        </button>
        <Link href="/admin/projects" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
          Cancel
        </Link>
      </div>
    </form>
  )
}

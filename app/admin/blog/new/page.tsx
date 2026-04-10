'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeftIcon } from '@phosphor-icons/react'

const TipTapEditor = dynamic(() => import('@/app/components/admin/TipTapEditor'), { ssr: false })

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function NewBlogPostPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    cover_image: '',
    tags: '',
    reading_time: 5,
    published: false,
  })
  const [content, setContent] = useState<Record<string, unknown>>({})

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setForm(f => ({ ...f, title, slug: slugify(title) }))
  }

  const handleEditorChange = useCallback((json: Record<string, unknown>) => {
    setContent(json)
  }, [])

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setUploading(true)
    const supabase = createClient()
    const file = e.target.files[0]
    
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('Blog Images')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Error uploading image:', uploadError)
        alert(`Error uploading ${file.name}: ${uploadError.message}`)
        return
      }

      const { data } = supabase.storage.from('Blog Images').getPublicUrl(filePath)
      if (data) {
        setForm(f => ({ ...f, cover_image: data.publicUrl }))
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('An unexpected error occurred during upload')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleSubmit = async (published: boolean) => {
    if (!form.title.trim()) return alert('Title is required')
    if (!form.slug.trim()) return alert('Slug is required')
    setSaving(true)
    try {
      const supabase = createClient()
      const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
      const { error } = await supabase.from('blog_posts').insert({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || null,
        content,
        cover_image: form.cover_image || null,
        tags,
        reading_time: form.reading_time,
        published,
      } as never)
      if (error) throw error
      router.push('/admin/blog')
    } catch (err: unknown) {
      alert(`Error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
          <ArrowLeftIcon size={18} /> Back
        </Link>
        <h1 className="font-heading text-3xl font-bold">New Post</h1>
      </div>

      <div className="space-y-5 mb-8">
        <div>
          <input
            type="text"
            placeholder="Post title..."
            value={form.title}
            onChange={handleTitleChange}
            className="w-full bg-transparent font-heading text-4xl font-bold placeholder-white/20 focus:outline-none border-b border-white/10 pb-3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Reading Time (minutes)</label>
            <input
              type="number"
              value={form.reading_time}
              onChange={e => setForm(f => ({ ...f, reading_time: parseInt(e.target.value) || 5 }))}
              min={1}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Excerpt</label>
          <textarea
            placeholder="A short summary of the post..."
            value={form.excerpt}
            onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Cover Image</label>
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageUpload}
                disabled={uploading}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-gray-100"
              />
              {uploading && <div className="flex items-center text-sm text-gray-400">Uploading...</div>}
            </div>
            {form.cover_image && (
              <div className="mt-2">
                <img src={form.cover_image} alt="Cover" className="w-32 h-20 object-cover rounded" />
              </div>
            )}
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="React, Next.js, TypeScript"
              value={form.tags}
              onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
            />
          </div>
        </div>
      </div>

      <div className="border border-white/10 rounded-2xl p-4 mb-8 min-h-[400px]">
        <TipTapEditor onChange={handleEditorChange} />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => handleSubmit(false)}
          disabled={saving}
          className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save as Draft'}
        </button>
        <button
          onClick={() => handleSubmit(true)}
          disabled={saving}
          className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
        >
          {saving ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  )
}

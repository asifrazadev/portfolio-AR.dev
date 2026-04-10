'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import type { BlogPost } from '@/app/lib/supabase/types'

const TipTapEditor = dynamic(() => import('@/app/components/admin/TipTapEditor'), { ssr: false })

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [post, setPost] = useState<BlogPost | null>(null)
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

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single()
      if (data) {
        setPost(data)
        setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || '',
          cover_image: data.cover_image || '',
          tags: data.tags.join(', '),
          reading_time: data.reading_time,
          published: data.published,
        })
        setContent((data.content as Record<string, unknown>) || {})
      }
      setLoading(false)
    }
    fetch()
  }, [id])

  const handleEditorChange = useCallback((json: Record<string, unknown>) => {
    setContent(json)
  }, [])

  const handleSubmit = async (published: boolean) => {
    if (!form.title.trim()) return alert('Title is required')
    setSaving(true)
    try {
      const supabase = createClient()
      const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
      const { error } = await supabase.from('blog_posts').update({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt || null,
        content,
        cover_image: form.cover_image || null,
        tags,
        reading_time: form.reading_time,
        published,
        updated_at: new Date().toISOString(),
      }).eq('id', id)
      if (error) throw error
      router.push('/admin/blog')
    } catch (err: unknown) {
      alert(`Error: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  if (!post) return <div className="text-gray-400">Post not found.</div>

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
          <ArrowLeftIcon size={18} /> Back
        </Link>
        <h1 className="font-heading text-3xl font-bold">Edit Post</h1>
        <span className={`ml-auto px-3 py-1 rounded-full text-xs ${form.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
          {form.published ? 'Published' : 'Draft'}
        </span>
      </div>

      <div className="space-y-5 mb-8">
        <div>
          <input
            type="text"
            placeholder="Post title..."
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
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
            <label className="text-xs text-gray-500 mb-1 block">Cover Image URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={form.cover_image}
              onChange={e => setForm(f => ({ ...f, cover_image: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30"
            />
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
        <TipTapEditor content={content} onChange={handleEditorChange} />
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
          {saving ? 'Publishing...' : form.published ? 'Update' : 'Publish'}
        </button>
      </div>
    </div>
  )
}

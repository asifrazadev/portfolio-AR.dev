'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/lib/supabase/client'
import Link from 'next/link'
import type { BlogPost } from '@/app/lib/supabase/types'
import { PlusCircleIcon, PencilIcon, TrashIcon } from '@phosphor-icons/react'

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    setPosts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchPosts() }, [])

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post permanently?')) return
    const supabase = createClient()
    await supabase.from('blog_posts').delete().eq('id', id)
    fetchPosts()
  }

  const togglePublish = async (post: BlogPost) => {
    const supabase = createClient()
    await supabase.from('blog_posts').update({ published: !post.published }).eq('id', post.id)
    fetchPosts()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-4xl font-bold">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <PlusCircleIcon size={20} />
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-24 bg-white/3 rounded-2xl border border-white/5">
          <p className="text-gray-400 mb-4">No posts yet</p>
          <Link href="/admin/blog/new" className="text-white underline underline-offset-4">Write your first post</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-start hover:bg-white/[0.07] transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${post.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                {post.excerpt && <p className="text-gray-400 text-sm mb-2 line-clamp-2">{post.excerpt}</p>}
                <div className="flex gap-2 text-xs text-gray-500">
                  <span>{new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span>·</span>
                  <span>{post.reading_time} min read</span>
                  {post.tags.length > 0 && (
                    <>
                      <span>·</span>
                      <span>{post.tags.join(', ')}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => togglePublish(post)}
                  className={`px-3 py-2 text-xs rounded-lg transition-all ${post.published ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}`}
                >
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all flex items-center"
                >
                  <PencilIcon size={18} />
                </Link>
                <button
                  onClick={() => deletePost(post.id)}
                  className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                >
                  <TrashIcon size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
